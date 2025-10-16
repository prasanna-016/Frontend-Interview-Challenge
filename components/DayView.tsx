/**
 * DayView Component
 *
 * Displays appointments for a single day in a timeline format.
 *
 * TODO for candidates:
 * 1. Generate time slots (8 AM - 6 PM, 30-minute intervals)
 * 2. Position appointments in their correct time slots
 * 3. Handle appointments that span multiple slots
 * 4. Display appointment details (patient, type, duration)
 * 5. Color-code appointments by type
 * 6. Handle overlapping appointments gracefully
 */
'use client';

import { useMemo } from 'react';
import type { Appointment, Doctor, TimeSlot } from '@/types';
import { format, isBefore, isAfter, isEqual } from 'date-fns';

// Map appointment types to Tailwind CSS background colors
const APPOINTMENT_TYPE_COLORS: Record<string, string> = {
  Checkup: 'bg-blue-500',
  Consultation: 'bg-green-500',
  'Follow-up': 'bg-orange-400',
  Procedure: 'bg-purple-500',
};

interface DayViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  date: Date;
}

/**
 * DayView Component
 *
 * Displays a daily timeline from 8 AM to 6 PM in 30-minute intervals,
 * showing appointments positioned correctly by start/end time.
 * Handles appointments spanning multiple slots and overlapping appointments.
 */
export function DayView({ appointments, doctor, date }: DayViewProps) {
  /**
   * Generate 30-minute time slots between 8 AM and 6 PM.
   * Each slot contains start time, end time, and label.
   */
  function generateTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const startHour = 8;
    const endHour = 18; // exclusive end at 6PM

    for (let hour = startHour; hour < endHour; hour++) {
      // Slot from hour:00 to hour:30
      const slotStart1 = new Date(date);
      slotStart1.setHours(hour, 0, 0, 0);
      const slotEnd1 = new Date(date);
      slotEnd1.setHours(hour, 30, 0, 0);

      slots.push({
        start: slotStart1,
        end: slotEnd1,
        label: format(slotStart1, 'h:mm a'),
      });

      // Slot from hour:30 to next hour:00
      const slotStart2 = new Date(date);
      slotStart2.setHours(hour, 30, 0, 0);
      const slotEnd2 = new Date(date);
      slotEnd2.setHours(hour + 1, 0, 0, 0);

      slots.push({
        start: slotStart2,
        end: slotEnd2,
        label: format(slotStart2, 'h:mm a'),
      });
    }

    return slots;
  }

  /**
   * Get all appointments overlapping with a given time slot.
   * Overlap condition: appointment starts before slot ends AND ends after slot starts.
   */
  function getAppointmentsForSlot(slot: TimeSlot): Appointment[] {
    return appointments.filter((apt) => {
      const aptStart = new Date(apt.startTime);
      const aptEnd = new Date(apt.endTime);
      return (
        (isBefore(aptStart, slot.end) || isEqual(aptStart, slot.end)) &&
        (isAfter(aptEnd, slot.start) || isEqual(aptEnd, slot.start))
      );
    });
  }

  // Memoize slots for performance; regenerates only if date changes
  const timeSlots = useMemo(() => generateTimeSlots(), [date]);

  /**
   * AppointmentCard Component
   * Shows patient name, appointment type, duration in a colored box.
   * Height is proportional to duration (40px per 30 mins).
   */
  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
    const start = new Date(appointment.startTime);
    const end = new Date(appointment.endTime);
    const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    const heightPer30Min = 40; // pixels height per 30-minute slot
    const height = (durationMinutes / 30) * heightPer30Min;

    // Determine background color for appointment type, fallback to gray
    const colorClass = APPOINTMENT_TYPE_COLORS[appointment.type] ?? 'bg-gray-400';

    return (
      <div
        className={`${colorClass} text-white p-2 rounded absolute left-2 right-2 shadow-lg text-xs overflow-hidden`}
        style={{ height: `${height}px` }}
        title={`${appointment.patientName} — ${appointment.type} (${durationMinutes} min)`}
      >
        <div className="font-semibold truncate">{appointment.patientName}</div>
        <div>{appointment.type}</div>
        <div className="text-xs">{durationMinutes} min</div>
      </div>
    );
  };

  return (
    <div className="day-view max-w-xl mx-auto">
      {/* Header with formatted date and doctor info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {format(date, 'EEEE, MMMM do, yyyy')}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            Dr. {doctor.name} - {doctor.specialty}
          </p>
        )}
      </div>

      {/* Timeline container: scrollable, bordered */}
      <div className="border border-gray-200 rounded-lg overflow-y-auto max-h-[720px] relative">
        {/* Render each time slot with label and appointments */}
        {timeSlots.map((slot, index) => {
          const slotAppointments = getAppointmentsForSlot(slot);

          return (
            <div
              key={index}
              className="flex border-b border-gray-100 relative min-h-[40px] px-12 py-1"
            >
              {/* Time label on left */}
              <div className="w-20 text-right pr-2 text-xs text-gray-500 select-none">
                {slot.label}
              </div>

              {/* Appointment container relative for absolute-positioned cards */}
              <div className="flex-1 relative" style={{ minHeight: '40px' }}>
                {slotAppointments.map((apt) => (
                  <AppointmentCard key={apt.id} appointment={apt} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state when no appointments */}
      {appointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          No appointments scheduled for this day
        </div>
      )}
    </div>
  );
}
