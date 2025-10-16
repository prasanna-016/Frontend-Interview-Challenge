/**
 * AppointmentService
 * 
 * Abstraction for accessing and managing appointment-related data.
 * Provides robust, timezone-safe filtering and useful helpers for calendar views.
 */

import type { Appointment, Doctor, Patient, PopulatedAppointment } from '@/types';
import {
  MOCK_APPOINTMENTS,
  MOCK_DOCTORS,
  MOCK_PATIENTS,
  getDoctorById,
  getPatientById,
} from '@/data/mockData';

/**
 * Checks if two dates represent the same calendar day,
 * ignoring time components and timezone adjustments.
 */
function isSameDay(dateA: Date, dateB: Date): boolean {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

/**
 * Returns the start of a calendar day (midnight)
 * for consistent date range comparisons.
 */
function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Returns a new Date incremented by the specified number of days.
 */
function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export class AppointmentService {
  /**
   * Retrieves all appointments for a specific doctor without filtering on date.
   * @param doctorId - The doctor's unique identifier
   * @returns Array of appointments for the doctor
   */
  getAppointmentsByDoctor(doctorId: string): Appointment[] {
    return MOCK_APPOINTMENTS.filter((apt) => apt.doctorId === doctorId);
  }

  /**
   * Retrieves all appointments for the doctor on a specific date.
   * Implements calendar-day-only matching to handle timezones cleanly.
   * @param doctorId - Doctor's ID
   * @param date - Target calendar date
   */
  getAppointmentsByDoctorAndDate(doctorId: string, date: Date): Appointment[] {
    return MOCK_APPOINTMENTS.filter((apt) =>
      apt.doctorId === doctorId && isSameDay(new Date(apt.startTime), date)
    );
  }

  /**
   * Retrieves appointments in a date range [startDate, endDate),
   * inclusive of start, exclusive of end. Used for weekly views.
   * @param doctorId - Doctor's ID
   * @param startDate - Start date inclusive
   * @param endDate - End date exclusive
   */
  getAppointmentsByDoctorAndDateRange(
    doctorId: string,
    startDate: Date,
    endDate: Date
  ): Appointment[] {
    return MOCK_APPOINTMENTS.filter((apt) => {
      const aptDate = startOfDay(new Date(apt.startTime));
      return (
        apt.doctorId === doctorId &&
        aptDate >= startOfDay(startDate) &&
        aptDate < startOfDay(endDate)
      );
    });
  }

  /**
   * Given a base appointment, returns a populated version where
   * doctor and patient objects are included instead of just IDs.
   * Returns null if doctor or patient not found.
   * @param appointment - Base appointment record
   * @returns PopulatedAppointment or null
   */
  getPopulatedAppointment(appointment: Appointment): PopulatedAppointment | null {
    const doctor = getDoctorById(appointment.doctorId);
    const patient = getPatientById(appointment.patientId);
    if (!doctor || !patient) return null;
    return {
      ...appointment,
      doctor,
      patient,
    };
  }

  /**
   * Returns all doctors.
   */
  getAllDoctors(): Doctor[] {
    return MOCK_DOCTORS;
  }

  /**
   * Retrieve a doctor by ID.
   * @param id - Doctor's ID
   * @returns Doctor object or undefined if not found
   */
  getDoctorById(id: string): Doctor | undefined {
    return MOCK_DOCTORS.find((doc) => doc.id === id);
  }

  /**
   * Filter appointments by type (optional).
   */
  getAppointmentsByType(type: string): Appointment[] {
    return MOCK_APPOINTMENTS.filter((apt) => apt.type === type);
  }

  /**
   * Sort a list of appointments by start time ascending.
   */
  sortAppointmentsByTime(appointments: Appointment[]): Appointment[] {
    return [...appointments].sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  }

  /**
   * Group appointments that overlap in time.
   * Inputs must be sorted by start time.
   * Returns array of overlapping groups.
   */
  getOverlappingAppointments(appointments: Appointment[]): Appointment[][] {
    const sorted = this.sortAppointmentsByTime(appointments);
    const overlaps: Appointment[][] = [];
    let currentGroup: Appointment[] = [];

    sorted.forEach((apt) => {
      if (
        currentGroup.length === 0 ||
        new Date(apt.startTime) < new Date(currentGroup[currentGroup.length - 1].endTime)
      ) {
        currentGroup.push(apt);
      } else {
        overlaps.push(currentGroup);
        currentGroup = [apt];
      }
    });

    if (currentGroup.length > 0) overlaps.push(currentGroup);

    return overlaps;
  }
}

/**
 * Singleton service instance for app-wide use.
 */
export const appointmentService = new AppointmentService();
