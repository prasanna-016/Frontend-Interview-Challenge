/**
 * Type Definitions for Hospital Appointment Scheduler
 * 
 * DO NOT modify these types except for extending in your UI/data-use cases.
 * If you want direct access to `patient.name` or `doctor.name` while rendering,
 * use the PopulatedAppointment interface for display purposes.
 */

/**
 * Appointment types/categories.
 */
export type AppointmentType = 'checkup' | 'consultation' | 'follow-up' | 'procedure';

/**
 * Medical specialties.
 */
export type Specialty =
  | 'cardiology'
  | 'pediatrics'
  | 'general-practice'
  | 'orthopedics'
  | 'dermatology';

/**
 * Days of the week.
 */
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

/**
 * Doctor working hours for a single day.
 * start/end in "HH:MM" 24h format (e.g. "09:00")
 */
export interface WorkingHours {
  start: string;
  end: string;
}

/**
 * Weekly doctor schedule: maps days to working hours (can be partial).
 */
export type WeeklySchedule = Partial<Record<DayOfWeek, WorkingHours>>;

/**
 * Doctor entity.
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
 * Patient entity.
 */
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string; // ISO date string, e.g. "1999-12-25"
}

/**
 * Appointment entity.
 * (You cannot access patientName here; for display use PopulatedAppointment)
 */
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  type: AppointmentType;
  startTime: string;   // ISO datetime string
  endTime: string;     // ISO datetime string
  notes?: string;
  status: AppointmentStatus;
}

/**
 * Appointment status.
 */
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

/**
 * View mode for the calendar.
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
 * Full appointment entity for display:
 * Use this interface (PopulatedAppointment) where the UI code requires direct
 * access to patient/doctor name or other entity info.
 */
export interface PopulatedAppointment extends Appointment {
  patient: Patient;
  doctor: Doctor;
}

/**
 * Filter options for appointment queries.
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
 * Calendar configuration (for setup).
 */
export interface CalendarConfig {
  startHour: number;      // e.g., 8 for 8AM
  endHour: number;        // e.g., 18 for 6PM
  slotDuration: number;   // Slot size in minutes
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
 * Information about each appointment type, for labeling and color-coding.
 */
export interface AppointmentTypeInfo {
  type: AppointmentType;
  label: string;
  color: string;           // Hex color code for UI
  defaultDuration: number; // Duration in minutes
}

/**
 * Lookup map from appointment type to metadata for that type.
 */
export const APPOINTMENT_TYPE_CONFIG: Record<AppointmentType, AppointmentTypeInfo> = {
  'checkup': {
    type: 'checkup',
    label: 'General Checkup',
    color: '#3b82f6',
    defaultDuration: 30,
  },
  'consultation': {
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
  'procedure': {
    type: 'procedure',
    label: 'Procedure',
    color: '#8b5cf6',
    defaultDuration: 90,
  },
};
