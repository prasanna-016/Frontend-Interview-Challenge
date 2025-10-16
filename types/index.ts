/**
 * Type Definitions for Hospital Appointment Scheduler
 * 
 * Only extend these as needed for your UI/data cases. For UI display, 
 * use `PopulatedAppointment` to access patient/doctor info directly.
 */

/**
 * Appointment types/categories.
 */
export type AppointmentType = 'checkup' | 'consultation' | 'follow-up' | 'procedure';

/**
 * Supported medical specialties for doctors.
 */
export type Specialty =
  | 'cardiology'
  | 'pediatrics'
  | 'general-practice'
  | 'orthopedics'
  | 'dermatology';

/**
 * Days of the week for scheduling/working hours.
 */
export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

/**
 * Working hours for a single weekday, in 24-hour time (e.g. "09:00").
 */
export interface WorkingHours {
  start: string;
  end: string;
}

/**
 * Doctor's weekly working schedule. Can omit days for part-time/variable schedules.
 */
export type WeeklySchedule = Partial<Record<DayOfWeek, WorkingHours>>;

/**
 * Doctor entity definition.
 */
export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  email: string;
  phone: string;
  workingHours: WeeklySchedule;
}

/**
 * Patient entity definition.
 */
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string; // ISO date string, e.g. "1999-12-25"
}

/**
 * Basic appointment entity.
 * For display requiring patient/doctor info, use PopulatedAppointment instead.
 */
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  type: AppointmentType;
  startTime: string; // ISO datetime string
  endTime: string;   // ISO datetime string
  notes?: string;
  status: AppointmentStatus;
}

/**
 * Appointment status (current/finished/cancel/no show).
 */
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

/**
 * Calendar view mode (day or week).
 */
export type CalendarView = 'day' | 'week';

/**
 * Single time slot (for calendar display).
 */
export interface TimeSlot {
  start: Date;
  end: Date;
  label: string;
}

/**
 * For calendar display: Appointment with full patient and doctor info.
 * Use this in UI components for direct display of names and details.
 */
export interface PopulatedAppointment extends Appointment {
  patient: Patient;
  doctor: Doctor;
}

/**
 * Appointment query filter interface for hooks/services.
 */
export interface AppointmentFilters {
  doctorId?: string;
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  type?: AppointmentType;
  status?: AppointmentStatus;
}

/**
 * Calendar configuration interface.
 */
export interface CalendarConfig {
  startHour: number;      // e.g., 8 for 8AM
  endHour: number;        // e.g., 18 for 6PM
  slotDuration: number;   // Duration in minutes
}

/**
 * Default calendar settings.
 */
export const DEFAULT_CALENDAR_CONFIG: CalendarConfig = {
  startHour: 8,
  endHour: 18,
  slotDuration: 30,
};

/**
 * Info about each appointment type for display/metainfo.
 */
export interface AppointmentTypeInfo {
  type: AppointmentType;
  label: string;
  color: string;            // Hex color for color-coding in UI
  defaultDuration: number;  // Default time in minutes
}

/**
 * Lookup table for type metadata.
 */
export const APPOINTMENT_TYPE_CONFIG: Record<AppointmentType, AppointmentTypeInfo> = {
  checkup: {
    type: 'checkup',
    label: 'General Checkup',
    color: '#3b82f6',
    defaultDuration: 30,
  },
  consultation: {
    type: 'consultation',
    label: 'Consultation',
    color: '#10b981',
    defaultDuration: 60,
  },
  'follow-up': {
    type: 'follow-up',
    label: 'Follow-up',
    color: '#f59e0b',
    defaultDuration: 30,
  },
  procedure: {
    type: 'procedure',
    label: 'Procedure',
    color: '#8b5cf6',
    defaultDuration: 90,
  },
};
