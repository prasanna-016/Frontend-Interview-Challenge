/**
 * ScheduleView Component
 *
 * Main container managing header, controls, and calendar views.
 * Integrates DoctorSelector, DayView, WeekView with current states.
 */
'use client';

import { format, startOfWeek } from 'date-fns';
import type { CalendarView } from '@/types';
import { useAppointments } from '@/hooks/useAppointments';
import { DoctorSelector } from './DoctorSelector';
import { DayView } from './DayView';
import { WeekView } from './WeekView';

// Optional user role
type UserRole = 'front-desk' | 'doctor';

// Utility: get Monday of the current week for week selection
function getWeekStart(date: Date) {
  return startOfWeek(date, { weekStartsOn: 1 }); // Monday as start
}

interface ScheduleViewProps {
  selectedDoctorId: string;
  selectedDate: Date;
  view: CalendarView;
  onDoctorChange: (doctorId: string) => void;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
  userRole?: UserRole;
}

export function ScheduleView({
  selectedDoctorId,
  selectedDate,
  view,
  onDoctorChange,
  onDateChange,
  onViewChange,
  userRole = 'front-desk', // Default role
}: ScheduleViewProps) {
  // Use proper parameters for day or week view to fetch appointments
  // The useAppointments hook now returns PopulatedAppointment[]
  const { appointments, doctor, loading, error } = useAppointments(
    view === 'week'
      ? {
          doctorId: selectedDoctorId,
          startDate: getWeekStart(selectedDate),
          endDate: new Date(getWeekStart(selectedDate).getTime() + 7 * 86400000),
        }
      : {
          doctorId: selectedDoctorId,
          date: selectedDate,
        }
  );

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header with doctor info and controls */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Doctor Schedule</h2>
            <p className="text-sm text-gray-600 mt-1">
              {doctor
                ? `Dr. ${doctor.name} – ${doctor.specialty}`
                : 'Select a doctor to view their schedule'}
            </p>
          </div>

          <div className="flex gap-4 flex-wrap items-center">
            {/* Show doctor selector only to front-desk users */}
            {userRole === 'front-desk' && (
              <DoctorSelector selectedDoctorId={selectedDoctorId} onDoctorChange={onDoctorChange} />
            )}

            {/* Inform doctor users they are viewing their own schedule */}
            {userRole === 'doctor' && (
              <div className="text-sm text-blue-700 italic">Viewing your schedule only</div>
            )}

            {/* Date picker available to all user roles */}
            <input
              type="date"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={(e) => onDateChange(new Date(e.target.value))}
              className="border rounded px-3 py-2 text-sm"
            />

            {/* View toggle buttons */}
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 text-sm rounded ${
                  view === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => onViewChange('day')}
              >
                Day
              </button>
              <button
                className={`px-4 py-2 text-sm rounded ${
                  view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => onViewChange('week')}
              >
                Week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main calendar view area */}
      <div className="p-6">
        {loading ? (
          <div className="py-10 text-center text-gray-500">Loading…</div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">Error loading appointments.</div>
        ) : view === 'day' ? (
          // Pass the appointments as PopulatedAppointment[] (from useAppointments hook)
          <DayView appointments={appointments} doctor={doctor} date={selectedDate} />
        ) : (
          <WeekView appointments={appointments} doctor={doctor} weekStartDate={getWeekStart(selectedDate)} />
        )}
      </div>
    </div>
  );
}
