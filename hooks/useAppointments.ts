/**
 * useAppointments Hook
 *
 * This is a custom hook that encapsulates the business logic for fetching
 * and managing appointments. This is the "headless" pattern - separating
 * logic from presentation.
 *
 * TODO for candidates:
 * 1. Implement the hook to fetch appointments based on filters
 * 2. Add loading and error states
 * 3. Consider memoization for performance
 * 4. Think about how to make this reusable for both day and week views
 */
import { useState, useEffect, useMemo } from 'react';
import type { Appointment, Doctor } from '@/types';
import { appointmentService } from '@/services/appointmentService';

/**
 * Parameters for useAppointments hook
 */
interface UseAppointmentsParams {
  doctorId: string;
  date?: Date; // Used for day view
  startDate?: Date; // Used for week view (range)
  endDate?: Date;   // Used for week view (range)
}

/**
 * Return type for useAppointments hook
 */
interface UseAppointmentsReturn {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  loading: boolean;
  error: Error | null;
  // Any additional useful data/functions can go here
}

/**
 * useAppointments custom React hook
 *
 * Fetches and manages appointment data for the specified doctor and date/date range.
 * Handles both day and week (range) views.
 */
export function useAppointments(params: UseAppointmentsParams): UseAppointmentsReturn {
  const { doctorId, date, startDate, endDate } = params;

  // State variables for appointments, loading, and error
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoized doctor data so lookups are not repeated unnecessarily
  const doctor = useMemo(() => {
    return appointmentService.getDoctorById(doctorId);
  }, [doctorId]);

  // Fetch appointments on relevant param changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      let data: Appointment[] = [];
      if (startDate && endDate) {
        // Week view: fetch by date range
        data = appointmentService.getAppointmentsByDoctorAndDateRange(doctorId, startDate, endDate);
      } else if (date) {
        // Day view: fetch for single date
        data = appointmentService.getAppointmentsByDoctorAndDate(doctorId, date);
      } // else, keep empty

      setAppointments(data);
    } catch (err) {
      setError(err as Error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [doctorId, date?.toDateString(), startDate?.toDateString(), endDate?.toDateString()]);

  return {
    appointments,
    doctor,
    loading,
    error,
  };
}

/**
 * BONUS: Additional hooks for convenience/use-cases
 */

// For day view: simplify usage
export function useDayViewAppointments(doctorId: string, date: Date) {
  return useAppointments({ doctorId, date });
}

// For week view: simplifies range handling
export function useWeekViewAppointments(doctorId: string, weekStart: Date) {
  // endDate is exclusive: add +7 days
  const endDate = new Date(weekStart);
  endDate.setDate(weekStart.getDate() + 7);
  return useAppointments({ doctorId, startDate: weekStart, endDate });
}

// Hook for all doctors list, if needed elsewhere
export function useDoctors(): Doctor[] {
  // For basic use, just return synchronously
  return useMemo(() => appointmentService.getAllDoctors(), []);
}
