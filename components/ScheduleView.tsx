/**
 * ScheduleView Component
 *
 * Main schedule container that organizes header, controls, and calendar views.
 * Composes DoctorSelector, DayView, WeekView, and glues their states/interactions together.
 */

'use client';

import { format, startOfWeek } from 'date-fns';
import type { CalendarView } from '@/types';
import { useAppointments } from '@/hooks/useAppointments';
import { DoctorSelector } from './DoctorSelector';
import { DayView } from './DayView';
import { WeekView } from './WeekView';

// Optional: support user roles ("front-desk" or "doctor")
type UserRole = 'front-desk' | 'doctor';

// Utility to get the current week's Monday for week view (used below)
function getWeekStart(date: Date) {
  return startOfWeek(date, { weekStartsOn: 1 }); // 1 = Monday
}

interface ScheduleViewProps {
  selectedDoctorId: string;
  selectedDate: Date;
  view: CalendarView;
  onDoctorChange: (doctorId: string) => void;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
  userRole?: UserRole; // Pass from parent if using role-based logic, else ignore
}

export function ScheduleView({
  selectedDoctorId,
  selectedDate,
  view,
  onDoctorChange,
  onDateChange,
  onViewChange,
  userRole = 'front-desk' // Default, can be omitted
}: ScheduleViewProps) {
  // Fetch appointments and doctor info for current state (day or week)
  const { appointments, doctor, loading, error } = useAppointments(
    view === 'week'
      ? {
          doctorId: selectedDoctorId,
          startDate: getWeekStart(selectedDate),
          endDate: new Date(getWeekStart(selectedDate).getTime() + 7 * 86400000)
        }
      : {
          doctorId: selectedDoctorId,
          date: selectedDate
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
            {/* Doctor selector: only for front-desk or role not set */}
            {(userRole === 'front-desk') && (
              <DoctorSelector
                selectedDoctorId={selectedDoctorId}
                onDoctorChange={onDoctorChange}
              />
            )}
            {/* If doctor user, inform fixed doctor */}
            {(userRole === 'doctor') && (
              <div className="text-sm text-blue-700 italic">
                Viewing your schedule only
              </div>
            )}

            {/* Date picker: available to both roles */}
            <input
              type="date"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={e => onDateChange(new Date(e.target.value))}
              className="border rounded px-3 py-2 text-sm"
            />

            {/* View toggle buttons */}
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 text-sm rounded ${
                  view === 'day'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => onViewChange('day')}
              >
                Day
              </button>
              <button
                className={`px-4 py-2 text-sm rounded ${
                  view === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => onViewChange('week')}
              >
                Week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View (loading, error, or actual calendar) */}
      <div className="p-6">
        {loading ? (
          <div className="py-10 text-center text-gray-500">Loading…</div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">Error loading appointments.</div>
        ) : view === 'day' ? (
          <DayView appointments={appointments} doctor={doctor} date={selectedDate} />
        ) : (
          <WeekView
            appointments={appointments}
            doctor={doctor}
            weekStartDate={getWeekStart(selectedDate)}
          />
        )}
      </div>
    </div>
  );
}
