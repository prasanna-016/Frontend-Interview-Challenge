/**
 * WeekView Component
 *
 * Displays appointments for a week (Monday - Sunday) in a grid format.
 *
 * TODO for candidates:
 * 1. Generate a 7-day grid (Monday through Sunday)
 * 2. Generate time slots for each day
 * 3. Position appointments in the correct day and time
 * 4. Make it responsive (may need horizontal scroll on mobile)
 * 5. Color-code appointments by type
 * 6. Handle overlapping appointments
 */
'use client';

import { useMemo } from 'react';
import type { Appointment, Doctor, TimeSlot } from '@/types';
import { format, addDays, isSameDay, isBefore, isAfter, isEqual, addMinutes } from 'date-fns';

// Color mapping for appointment types
const APPOINTMENT_TYPE_COLORS: Record<string, string> = {
  Checkup: 'bg-blue-500',
  Consultation: 'bg-green-500',
  'Follow-up': 'bg-orange-400',
  Procedure: 'bg-purple-500',
};

interface WeekViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  weekStartDate: Date; // Monday of the week
}

/**
 * WeekView Component
 *
 * Renders a weekly calendar grid (7 days, Mon-Sun) with 30-minute time slots (8 AM - 6 PM).
 * Positions appointments accurately by day and time slot.
 * Supports horizontal scrolling on small screens.
 */
export function WeekView({ appointments, doctor, weekStartDate }: WeekViewProps) {
  /**
   * Generate array of 7 dates starting from the weekStartDate (Monday)
   */
  function getWeekDays(): Date[] {
    return Array(7)
      .fill(null)
      .map((_, i) => addDays(weekStartDate, i));
  }

  /**
   * Generate 30-minute time slots from 8 AM to 6 PM (same as DayView)
   * Returns TimeSlot array with start, end and label.
   */
  function generateTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const startHour = 8;
    const endHour = 18;
    for (let hour = startHour; hour < endHour; hour++) {
      // Slot for :00 to :30
      slots.push({
        start: new Date(weekStartDate.setHours(hour, 0, 0, 0)),
        end: new Date(weekStartDate.setHours(hour, 30, 0, 0)),
        label: format(new Date(weekStartDate.setHours(hour, 0, 0, 0)), 'h:mm a'),
      });
      // Slot for :30 to next hour :00
      slots.push({
        start: new Date(weekStartDate.setHours(hour, 30, 0, 0)),
        end: new Date(weekStartDate.setHours(hour + 1, 0, 0, 0)),
        label: format(new Date(weekStartDate.setHours(hour, 30, 0, 0)), 'h:mm a'),
      });
    }
    return slots;
  }

  /**
   * Filter appointments that fall on the given date (ignoring time)
   */
  function getAppointmentsForDay(date: Date): Appointment[] {
    return appointments.filter((apt) =>
      isSameDay(new Date(apt.startTime), date)
    );
  }

  /**
   * Filter appointments active during a specific day and time slot
   * Includes appointments overlapping the slot period
   */
  function getAppointmentsForDayAndSlot(date: Date, slotStart: Date): Appointment[] {
    return appointments.filter((apt) => {
      const aptStart = new Date(apt.startTime);
      const aptEnd = new Date(apt.endTime);
      // Check if appointment is on the same day AND overlaps the time slot
      return (
        isSameDay(aptStart, date) &&
        (isBefore(aptStart, addMinutes(slotStart, 30)) || isEqual(aptStart, addMinutes(slotStart, 30))) &&
        (isAfter(aptEnd, slotStart) || isEqual(aptEnd, slotStart))
      );
    });
  }

  // Use memoized values for efficiency
  const weekDays = useMemo(() => getWeekDays(), [weekStartDate]);
  const timeSlots = useMemo(() => generateTimeSlots(), [weekStartDate]);

  /**
   * AppointmentCard component
   *
   * Supports compact mode (for week view) and standard mode (for day view).
   * Shows patient name, type, duration with color-coded background.
   */
  const AppointmentCard = ({ appointment, compact = false }: { appointment: Appointment; compact?: boolean }) => {
    const start = new Date(appointment.startTime);
    const end = new Date(appointment.endTime);
    const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

    // Calculate height for day view; in week view (compact) use smaller blocks or just one line
    const heightPer30Min = compact ? 20 : 40;
    const height = (durationMinutes / 30) * heightPer30Min;

    const colorClass = APPOINTMENT_TYPE_COLORS[appointment.type] ?? 'bg-gray-400';

    return (
      <div
        className={`${colorClass} text-white p-1 rounded shadow text-xs truncate`}
        style={{ height: `${height}px` }}
        title={`${appointment.patientName} — ${appointment.type} (${durationMinutes} min)`}
      >
        <div>{appointment.patientName}</div>
        {!compact && <div>{appointment.type}</div>}
      </div>
    );
  };

  return (
    <div className="week-view max-w-full overflow-x-auto">
      {/* Header displaying week range and doctor info */}
      <div className="mb-4 min-w-max">
        <h3 className="text-lg font-semibold text-gray-900">
          {/* Format week range like "Oct 14 - Oct 20, 2024" */}
          {`${format(weekDays[0], 'MMM d')} - ${format(weekDays[6], 'MMM d, yyyy')}`}
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
              <th key={idx} className="p-2 text-xs bg-gray-50 border-b border-l border-gray-200">
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
