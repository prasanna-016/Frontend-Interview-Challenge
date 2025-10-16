/**
 * WeekView Component
 *
 * Displays appointments for a week (Monday - Sunday) in a grid format.
 * - Generates a 7-day grid
 * - Generates time slots for each day
 * - Positions appointments in the correct day and time
 * - Responsive and color-coded by type
 * - Handles overlapping appointments
 */
'use client';

import { useMemo } from 'react';
import type { PopulatedAppointment, Doctor, TimeSlot } from '@/types';
import { format, addDays, isSameDay, isBefore, isAfter, isEqual, addMinutes } from 'date-fns';

// Color mapping for appointment types (use lowercase keys for consistency)
const APPOINTMENT_TYPE_COLORS: Record<string, string> = {
  checkup: 'bg-blue-500',
  consultation: 'bg-green-500',
  'follow-up': 'bg-orange-400',
  procedure: 'bg-purple-500',
};

interface WeekViewProps {
  appointments: PopulatedAppointment[];
  doctor: Doctor | undefined;
  weekStartDate: Date; // Monday of the week
}

/**
 * WeekView Component
 *
 * Renders a weekly calendar grid (7 days, Mon-Sun) with 30-minute time slots (8 AM - 6 PM),
 * positioning appointments accurately by day and time slot.
 */
export function WeekView({ appointments, doctor, weekStartDate }: WeekViewProps) {
  // Functions to generate week days and time slots, memoized for efficiency
  const getWeekDays = () =>
    Array(7)
      .fill(null)
      .map((_, i) => addDays(weekStartDate, i));

  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    const startHour = 8;
    const endHour = 18;
    for (let hour = startHour; hour < endHour; hour++) {
      // Slot for :00 to :30
      const slotStart1 = new Date(weekStartDate);
      slotStart1.setHours(hour, 0, 0, 0);
      const slotEnd1 = new Date(weekStartDate);
      slotEnd1.setHours(hour, 30, 0, 0);
      slots.push({
        start: slotStart1,
        end: slotEnd1,
        label: format(slotStart1, 'h:mm a'),
      });
      // Slot for :30 to next hour :00
      const slotStart2 = new Date(weekStartDate);
      slotStart2.setHours(hour, 30, 0, 0);
      const slotEnd2 = new Date(weekStartDate);
      slotEnd2.setHours(hour + 1, 0, 0, 0);
      slots.push({
        start: slotStart2,
        end: slotEnd2,
        label: format(slotStart2, 'h:mm a'),
      });
    }
    return slots;
  };

  // Use memoized values for efficiency and fix ESLint dependency warnings
  const weekDays = useMemo(() => getWeekDays(), [weekStartDate]);
  const timeSlots = useMemo(() => generateTimeSlots(), [weekStartDate]);

  /**
   * Filter appointments that fall on the given date (ignoring time)
   */
  function getAppointmentsForDay(date: Date): PopulatedAppointment[] {
    return appointments.filter((apt) =>
      isSameDay(new Date(apt.startTime), date)
    );
  }

  /**
   * Filter appointments active during a specific day and time slot.
   * Includes appointments overlapping the slot period.
   */
  function getAppointmentsForDayAndSlot(date: Date, slotStart: Date): PopulatedAppointment[] {
    return appointments.filter((apt) => {
      const aptStart = new Date(apt.startTime);
      const aptEnd = new Date(apt.endTime);
      // Match same day and check for overlap
      return (
        isSameDay(aptStart, date) &&
        (isBefore(aptStart, addMinutes(slotStart, 30)) || isEqual(aptStart, addMinutes(slotStart, 30))) &&
        (isAfter(aptEnd, slotStart) || isEqual(aptEnd, slotStart))
      );
    });
  }

  /**
   * AppointmentCard component
   * - Compact mode for week view (smaller), non-compact for day view
   * - Shows patient, type, and duration with color-coded background
   */
  const AppointmentCard = ({
    appointment,
    compact = false,
  }: {
    appointment: PopulatedAppointment;
    compact?: boolean;
  }) => {
    const start = new Date(appointment.startTime);
    const end = new Date(appointment.endTime);
    const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

    // Adjust height for compact mode
    const heightPer30Min = compact ? 20 : 40;
    const height = (durationMinutes / 30) * heightPer30Min;

    // Use color config with fallback
    const colorClass = APPOINTMENT_TYPE_COLORS[appointment.type] ?? 'bg-gray-400';

    return (
      <div
        className={`${colorClass} text-white p-1 rounded shadow text-xs truncate`}
        style={{ height: `${height}px` }}
        title={`${appointment.patient.name} — ${appointment.type} (${durationMinutes} min)`}
      >
        <div>{appointment.patient.name}</div>
        {!compact && <div>{appointment.type}</div>}
      </div>
    );
  };

  return (
    <div className="week-view max-w-full overflow-x-auto">
      {/* Header with week range and doctor info */}
      <div className="mb-4 min-w-max">
        <h3 className="text-lg font-semibold text-gray-900">
          {/* Format week range like "Oct 14 - Oct 20, 2024" */}
          {`${format(weekDays[0], 'MMM d')} - ${format(
            weekDays[6],
            'MMM d, yyyy'
          )}`}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            Dr. {doctor.name} - {doctor.specialty}
          </p>
        )}
      </div>

      {/* Weekly calendar grid */}
      <table className="min-w-max border border-gray-200 rounded-lg table-fixed">
        <thead>
          <tr>
            {/* Time column header */}
            <th className="w-20 p-2 text-xs bg-gray-50 border-b border-gray-200">Time</th>

            {/* Day headers */}
            {weekDays.map((day, idx) => (
              <th
                key={idx}
                className="p-2 text-xs bg-gray-50 border-b border-l border-gray-200"
              >
                <div className="font-semibold">{format(day, 'EEE')}</div>
                <div className="text-gray-600">{format(day, 'MMM d')}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, slotIndex) => (
            <tr key={slotIndex} className="border-t border-gray-100">
              {/* Time slot label */}
              <td className="p-2 text-xs text-gray-600">{slot.label}</td>

              {/* Day columns */}
              {weekDays.map((day, dayIndex) => (
                <td key={dayIndex} className="p-1 border-l border-gray-100 align-top min-h-[40px]">
                  {/* Show appointments happening during this day and slot */}
                  {getAppointmentsForDayAndSlot(day, slot.start).map((apt) => (
                    <AppointmentCard key={apt.id} appointment={apt} compact />
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty state message if no appointments */}
      {appointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          No appointments scheduled for this week
        </div>
      )}
    </div>
  );
}
