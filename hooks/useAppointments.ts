import type { Appointment, Doctor, PopulatedAppointment } from '@/types';
import { appointmentService } from '@/services/appointmentService';
import { useState, useEffect, useMemo } from 'react';

/**
 * Parameters for useAppointments hook
 */
interface UseAppointmentsParams {
  doctorId: string;
  date?: Date;
  startDate?: Date;
  endDate?: Date;
}

/**
 * Return type for useAppointments hook
 */
interface UseAppointmentsReturn {
  appointments: PopulatedAppointment[];
  doctor: Doctor | undefined;
  loading: boolean;
  error: Error | null;
}

export function useAppointments(params: UseAppointmentsParams): UseAppointmentsReturn {
  const { doctorId, date, startDate, endDate } = params;

  const [appointments, setAppointments] = useState<PopulatedAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const doctor = useMemo(() => appointmentService.getDoctorById(doctorId), [doctorId]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      let data: Appointment[] = [];

      if (startDate && endDate) {
        data = appointmentService.getAppointmentsByDoctorAndDateRange(doctorId, startDate, endDate);
      } else if (date) {
        data = appointmentService.getAppointmentsByDoctorAndDate(doctorId, date);
      }
      // Populate all appointments to include .doctor and .patient objects
      const populated: PopulatedAppointment[] = data
        .map((apt) => appointmentService.getPopulatedAppointment(apt))
        .filter((apt): apt is PopulatedAppointment => !!apt); // Remove nulls if missing refs

      setAppointments(populated);
    } catch (err) {
      setError(err as Error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [doctorId, date?.toDateString(), startDate?.toDateString(), endDate?.toDateString()]);

  return { appointments, doctor, loading, error };
}
