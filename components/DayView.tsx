/**
 * DayView Component
 *
 * Displays appointments for a single day in a timeline format.
 * - Generates time slots (8 AM - 6 PM, 30-minute intervals)
 * - Positions appointments in their correct time slots, including spanning slots
 * - Handles overlapping appointments
 * - Displays appointment details (patient, type, duration)
 * - Color-codes appointments by type
 */
'use client';

import { useMemo } from 'react';
import type { PopulatedAppointment, Doctor, TimeSlot } from '@/types';
import { format, isBefore, isAfter, isEqual } from 'date-fns';

// Map appointment types to Tailwind CSS background colors
const APPOINTMENT_TYPE_COLORS: Record<string, string> = {
  checkup: 'bg-blue-500',
  consultation: 'bg-green-500',
  'follow-up': 'bg-orange-400',
  procedure: 'bg-purple-500',
};

interface DayViewProps {
  appointments: PopulatedAppointment[];
  doctor: Doctor | undefined;
  date: Date;
}

/**
 * Generates all 30-minute slots between 8 AM and 6 PM.
 * Each slot contains start, end, and a human-readable label.
 */
function generateTimeSlots(date: Date): TimeSlot[] {
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
 * Filters appointments that overlap with a given timeslot.
 * Overlap: appointment starts before slot ends AND ends after slot starts.
 */
function getAppointmentsForSlot(slot: TimeSlot, appointments: PopulatedAppointment[]): PopulatedAppointment[] {
  return appointments.filter((apt) => {
    const aptStart = new Date(apt.startTime);
    const aptEnd = new Date(apt.endTime);
    return (
      (isBefore(aptStart, slot.end) || isEqual(aptStart, slot.end)) &&
      (isAfter(aptEnd, slot.start) || isEqual(aptEnd, slot.start))
    );
  });
}

export function DayView({ appointments, doctor, date }: DayViewProps) {
  // Memoize slots for performance, only regenerates if date changes
  const timeSlots = useMemo(() => generateTimeSlots(date), [date]);

  /**
   * AppointmentCard: Renders patient, type, duration as a colored card.
   * Height scales by minutes (40px per 30min slot).
   */
  const AppointmentCard = ({ appointment }: { appointment: PopulatedAppointment }) => {
    const start = new Date(appointment.startTime);
    const end = new Date(appointment.endTime);
    const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    const heightPer30Min = 40; // 30 minutes = 40px
    const height = (durationMinutes / 30) * heightPer30Min;

    // Background color from type
    const colorClass = APPOINTMENT_TYPE_COLORS[appointment.type] ?? 'bg-gray-400';

    return (
      <div
        className={`${colorClass} text-white p-2 rounded absolute left-2 right-2 shadow-lg text-xs overflow-hidden`}
        style={{ height: `${height}px` }}
        title={`${appointment.patient.name} — ${appointment.type} (${durationMinutes} min)`}
      >
        <div className="font-semibold truncate">{appointment.patient.name}</div>
        <div>{appointment.type}</div>
        <div className="text-xs">{durationMinutes} min</div>
      </div>
    );
  };

  return (
    <div className="day-view max-w-xl mx-auto">
      {/* Header info */}
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

      {/* Timeline */}
      <div className="border border-gray-200 rounded-lg overflow-y-auto max-h-[720px] relative">
        {timeSlots.map((slot, index) => {
          const slotAppointments = getAppointmentsForSlot(slot, appointments);

          return (
            <div
              key={index}
              className="flex border-b border-gray-100 relative min-h-[40px] px-12 py-1"
            >
              {/* Time label */}
              <div className="w-20 text-right pr-2 text-xs text-gray-500 select-none">
                {slot.label}
              </div>

              {/* Appointments */}
              <div className="flex-1 relative" style={{ minHeight: '40px' }}>
                {slotAppointments.map((apt) => (
                  <AppointmentCard key={apt.id} appointment={apt} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {appointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          No appointments scheduled for this day
        </div>
      )}
    </div>
  );
}
