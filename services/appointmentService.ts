/**
 * Appointment Service
 *
 * This service provides an abstraction layer for accessing appointment data.
 * Implements robust, timezone-safe filtering so calendar views always work.
 * Includes helpers for filtering, sorting, and testability.
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
 * Utility: Determines if two dates are the same year/month/day.
 * Ignores time and timezone, safe for UI and server.
 */
function isSameDay(dateA: Date, dateB: Date): boolean {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

/**
 * Utility: Start of calendar day (midnight), for consistent range logic.
 */
function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Utility: Add days to a date (returns new Date).
 */
function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export class AppointmentService {
  /**
   * Get all appointments for a specific doctor (no date filtering)
   *
   * @param doctorId - The doctor's ID
   */
  getAppointmentsByDoctor(doctorId: string): Appointment[] {
    return MOCK_APPOINTMENTS.filter((apt) => apt.doctorId === doctorId);
  }

  /**
   * Get appointments for a specific doctor on a specific date (Day View)
   * Robust date-only matching across time zones.
   *
   * @param doctorId - The doctor's ID
   * @param date - The date to filter by (calendar day)
   */
  getAppointmentsByDoctorAndDate(doctorId: string, date: Date): Appointment[] {
    return MOCK_APPOINTMENTS.filter((apt) =>
      apt.doctorId === doctorId &&
      isSameDay(new Date(apt.startTime), date)
    );
  }

  /**
   * Get appointments for a doctor within a date range, inclusive of start, exclusive of end.
   * Used for week view and other multi-day windows.
   *
   * @param doctorId - The doctor's ID
   * @param startDate - Start of the range (inclusive, calendar day)
   * @param endDate - End of the range (exclusive, calendar day)
   */
  getAppointmentsByDoctorAndDateRange(
    doctorId: string,
    startDate: Date,
    endDate: Date
  ): Appointment[] {
    // Compare on calendar day boundaries for robustness.
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
   * Get a populated appointment (including doctor/patient objects)
   *
   * @param appointment - The appointment base object
   * @returns PopulatedAppointment or null if references missing
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

  /** Get all doctors. */
  getAllDoctors(): Doctor[] {
    return MOCK_DOCTORS;
  }

  /** Lookup a single doctor by ID. */
  getDoctorById(id: string): Doctor | undefined {
    return MOCK_DOCTORS.find((doc) => doc.id === id);
  }

  /** BONUS: Filter appointments by type. */
  getAppointmentsByType(type: string): Appointment[] {
    return MOCK_APPOINTMENTS.filter((apt) => apt.type === type);
  }

  /** BONUS: Sort a given array of appointments by start time. */
  sortAppointmentsByTime(appointments: Appointment[]): Appointment[] {
    return [...appointments].sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  }

  /**
   * BONUS: Group overlapping appointments.
   *
   * @param appointments - Array of Appointment objects (same day)
   * @returns Array of arrays (groups of overlapping appointments)
   */
  getOverlappingAppointments(appointments: Appointment[]): Appointment[][] {
    // Must be sorted to work as intended
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

/** Singleton instance for app-wide use. */
export const appointmentService = new AppointmentService();
