/**
 * useAppointments Hook
 *
 * Custom React hook for fetching and managing doctor appointments.
 * - Handles both day and week views by switching based on parameters.
 * - Manages loading and error states for better UX.
 * - Memoizes doctor lookups and supports memoization of appointments if needed.
 * - Reusable for day/week and for any doctor.
 */

import { useState, useEffect, useMemo } from 'react';
import type { Appointment, Doctor } from '@/types';
import { appointmentService } from '@/services/appointmentService';

/**
 * Parameters for useAppointments hook
 */
interface UseAppointmentsParams {
  doctorId: string;
  date?: Date;        // For fetching a single day's appointments
  startDate?: Date;   // For fetching a range (week view)
  endDate?: Date;     // For fetching a range (week view)
}

/**
 * Return type for useAppointments hook
 */
interface UseAppointmentsReturn {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  loading: boolean;
  error: Error | null;
  // Add additional properties/methods here if needed
}

/**
 * Main hook to fetch and manage appointments.
 * - Automatically fetches appointments when doctor or date/range changes.
 * - Returns doctor details, appointment list, loading and error state.
 */
export function useAppointments(params: UseAppointmentsParams): UseAppointmentsReturn {
  const { doctorId, date, startDate, endDate } = params;

  // State for appointments, loading, and errors
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize doctor lookup (only re-do if doctorId changes)
  const doctor = useMemo(
    () => appointmentService.getDoctorById(doctorId),
    [doctorId]
  );

  useEffect(() => {
    // Helper to convert Date to stable key (for effect dependencies)
    const dateKey = date ? date.toDateString() : '';
    const startDateKey = startDate ? startDate.toDateString() : '';
    const endDateKey = endDate ? endDate.toDateString() : '';

    setLoading(true);
    setError(null);

    try {
      let data: Appointment[] = [];

      if (startDate && endDate) {
        // Week (range) view
        data = appointmentService.getAppointmentsByDoctorAndDateRange(doctorId, startDate, endDate);
      } else if (date) {
        // Day view
        data = appointmentService.getAppointmentsByDoctorAndDate(doctorId, date);
      }
      setAppointments(data);
    } catch (err) {
      setError(err as Error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
    // Only rerun effect when filter parameters change
    // Use date keys to avoid infinite loop from object reference changes
  }, [doctorId, date?.toDateString(), startDate?.toDateString(), endDate?.toDateString()]);

  return { appointments, doctor, loading, error };
}

/**
 * Bonus: Helper hooks for common scenarios
 * - These simply call useAppointments with the correct parameters.
 */

// Get appointments for a single day (for day view calendar)
export function useDayViewAppointments(doctorId: string, date: Date) {
  return useAppointments({ doctorId, date });
}

// Get appointments for a week (week view calendar)
export function useWeekViewAppointments(doctorId: string, weekStart: Date) {
  // Week = 7 days; construct end date exclusive
  const endDate = new Date(weekStart);
  endDate.setDate(weekStart.getDate() + 7);
  return useAppointments({ doctorId, startDate: weekStart, endDate });
}

// Get all doctors (useful for selectors/dropdowns)
export function useDoctors(): Doctor[] {
  return useMemo(() => appointmentService.getAllDoctors(), []);
}
