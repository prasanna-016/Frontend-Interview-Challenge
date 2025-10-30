/**
 * Mock Data for Hospital Appointment Scheduler
 *
 * This file contains realistic mock data for testing and development:
 * - 3 Doctors with different specialties and working hours
 * - 50 Patients
 * - Appointments spread across the current week
 *
 * ✅ PROVIDED - You don't need to modify this file
 */

import type {
  Doctor,
  Patient,
  Appointment,
  AppointmentType,
} from '../types';

/**
 * 3 Doctors with different specialties and schedules
 */
export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Chen',
    specialty: 'cardiology',
    email: 'sarah.chen@hospital.com',
    phone: '(555) 123-4567',
    workingHours: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '15:00' },
    },
  },
  {
    id: 'doc-2',
    name: 'Dr. Michael Rodriguez',
    specialty: 'pediatrics',
    email: 'michael.rodriguez@hospital.com',
    phone: '(555) 234-5678',
    workingHours: {
      monday: { start: '08:00', end: '16:00' },
      tuesday: { start: '08:00', end: '16:00' },
      wednesday: { start: '08:00', end: '16:00' },
      thursday: { start: '08:00', end: '16:00' },
      friday: { start: '08:00', end: '14:00' },
    },
  },
  {
    id: 'doc-3',
    name: 'Dr. Emily Johnson',
    specialty: 'general-practice',
    email: 'emily.johnson@hospital.com',
    phone: '(555) 345-6789',
    workingHours: {
      monday: { start: '10:00', end: '18:00' },
      tuesday: { start: '10:00', end: '18:00' },
      thursday: { start: '10:00', end: '18:00' },
      friday: { start: '10:00', end: '18:00' },
      saturday: { start: '09:00', end: '13:00' },
    },
  },
];

/**
 * 50 Patients with varied demographics
 */
export const MOCK_PATIENTS: Patient[] = [
  { id: 'pat-1', name: 'John Smith', email: 'john.smith@email.com', phone: '(555) 111-0001', dateOfBirth: '1985-03-15' },
  { id: 'pat-2', name: 'Emma Johnson', email: 'emma.j@email.com', phone: '(555) 111-0002', dateOfBirth: '1990-07-22' },
  { id: 'pat-3', name: 'Michael Brown', email: 'michael.b@email.com', phone: '(555) 111-0003', dateOfBirth: '1978-11-30' },
  { id: 'pat-4', name: 'Sophia Davis', email: 'sophia.d@email.com', phone: '(555) 111-0004', dateOfBirth: '1995-01-08' },
  { id: 'pat-5', name: 'William Garcia', email: 'william.g@email.com', phone: '(555) 111-0005', dateOfBirth: '1982-05-19' },
  { id: 'pat-6', name: 'Olivia Martinez', email: 'olivia.m@email.com', phone: '(555) 111-0006', dateOfBirth: '1988-09-25' },
  { id: 'pat-7', name: 'James Wilson', email: 'james.w@email.com', phone: '(555) 111-0007', dateOfBirth: '1975-12-03' },
  { id: 'pat-8', name: 'Ava Anderson', email: 'ava.a@email.com', phone: '(555) 111-0008', dateOfBirth: '1992-04-17' },
  { id: 'pat-9', name: 'Robert Taylor', email: 'robert.t@email.com', phone: '(555) 111-0009', dateOfBirth: '1980-08-11' },
  { id: 'pat-10', name: 'Isabella Thomas', email: 'isabella.t@email.com', phone: '(555) 111-0010', dateOfBirth: '1987-02-28' },
  { id: 'pat-11', name: 'David Moore', email: 'david.m@email.com', phone: '(555) 111-0011', dateOfBirth: '1973-06-14' },
  { id: 'pat-12', name: 'Mia Jackson', email: 'mia.j@email.com', phone: '(555) 111-0012', dateOfBirth: '1991-10-20' },
  { id: 'pat-13', name: 'Joseph Martin', email: 'joseph.m@email.com', phone: '(555) 111-0013', dateOfBirth: '1984-03-07' },
  { id: 'pat-14', name: 'Charlotte Lee', email: 'charlotte.l@email.com', phone: '(555) 111-0014', dateOfBirth: '1989-07-15' },
  { id: 'pat-15', name: 'Daniel White', email: 'daniel.w@email.com', phone: '(555) 111-0015', dateOfBirth: '1977-11-22' },
  { id: 'pat-16', name: 'Amelia Harris', email: 'amelia.h@email.com', phone: '(555) 111-0016', dateOfBirth: '1993-05-30' },
  { id: 'pat-17', name: 'Matthew Clark', email: 'matthew.c@email.com', phone: '(555) 111-0017', dateOfBirth: '1981-09-08' },
  { id: 'pat-18', name: 'Harper Lewis', email: 'harper.l@email.com', phone: '(555) 111-0018', dateOfBirth: '1986-01-25' },
  { id: 'pat-19', name: 'Christopher Walker', email: 'christopher.w@email.com', phone: '(555) 111-0019', dateOfBirth: '1974-04-12' },
  { id: 'pat-20', name: 'Evelyn Hall', email: 'evelyn.h@email.com', phone: '(555) 111-0020', dateOfBirth: '1994-08-19' },
  { id: 'pat-21', name: 'Andrew Allen', email: 'andrew.a@email.com', phone: '(555) 111-0021', dateOfBirth: '1983-12-06' },
  { id: 'pat-22', name: 'Abigail Young', email: 'abigail.y@email.com', phone: '(555) 111-0022', dateOfBirth: '1990-03-23' },
  { id: 'pat-23', name: 'Joshua King', email: 'joshua.k@email.com', phone: '(555) 111-0023', dateOfBirth: '1976-07-31' },
  { id: 'pat-24', name: 'Emily Wright', email: 'emily.w@email.com', phone: '(555) 111-0024', dateOfBirth: '1992-11-09' },
  { id: 'pat-25', name: 'Ryan Scott', email: 'ryan.s@email.com', phone: '(555) 111-0025', dateOfBirth: '1985-02-14' },
  { id: 'pat-26', name: 'Elizabeth Green', email: 'elizabeth.g@email.com', phone: '(555) 111-0026', dateOfBirth: '1979-06-21' },
  { id: 'pat-27', name: 'Alexander Adams', email: 'alexander.a@email.com', phone: '(555) 111-0027', dateOfBirth: '1988-10-28' },
  { id: 'pat-28', name: 'Sofia Baker', email: 'sofia.b@email.com', phone: '(555) 111-0028', dateOfBirth: '1995-01-05' },
  { id: 'pat-29', name: 'Benjamin Nelson', email: 'benjamin.n@email.com', phone: '(555) 111-0029', dateOfBirth: '1982-05-13' },
  { id: 'pat-30', name: 'Aria Carter', email: 'aria.c@email.com', phone: '(555) 111-0030', dateOfBirth: '1991-09-20' },
  { id: 'pat-31', name: 'Samuel Mitchell', email: 'samuel.m@email.com', phone: '(555) 111-0031', dateOfBirth: '1974-12-27' },
  { id: 'pat-32', name: 'Chloe Perez', email: 'chloe.p@email.com', phone: '(555) 111-0032', dateOfBirth: '1987-04-04' },
  { id: 'pat-33', name: 'Henry Roberts', email: 'henry.r@email.com', phone: '(555) 111-0033', dateOfBirth: '1993-08-11' },
  { id: 'pat-34', name: 'Grace Turner', email: 'grace.t@email.com', phone: '(555) 111-0034', dateOfBirth: '1980-12-18' },
  { id: 'pat-35', name: 'Sebastian Phillips', email: 'sebastian.p@email.com', phone: '(555) 111-0035', dateOfBirth: '1986-03-26' },
  { id: 'pat-36', name: 'Victoria Campbell', email: 'victoria.c@email.com', phone: '(555) 111-0036', dateOfBirth: '1989-07-02' },
  { id: 'pat-37', name: 'Jack Parker', email: 'jack.p@email.com', phone: '(555) 111-0037', dateOfBirth: '1975-11-09' },
  { id: 'pat-38', name: 'Penelope Evans', email: 'penelope.e@email.com', phone: '(555) 111-0038', dateOfBirth: '1994-02-16' },
  { id: 'pat-39', name: 'Owen Edwards', email: 'owen.e@email.com', phone: '(555) 111-0039', dateOfBirth: '1981-06-23' },
  { id: 'pat-40', name: 'Lily Collins', email: 'lily.c@email.com', phone: '(555) 111-0040', dateOfBirth: '1988-10-30' },
  { id: 'pat-41', name: 'Luke Stewart', email: 'luke.s@email.com', phone: '(555) 111-0041', dateOfBirth: '1977-01-06' },
  { id: 'pat-42', name: 'Zoe Morris', email: 'zoe.m@email.com', phone: '(555) 111-0042', dateOfBirth: '1992-05-14' },
  { id: 'pat-43', name: 'Nathan Rogers', email: 'nathan.r@email.com', phone: '(555) 111-0043', dateOfBirth: '1984-09-21' },
  { id: 'pat-44', name: 'Hannah Reed', email: 'hannah.r@email.com', phone: '(555) 111-0044', dateOfBirth: '1990-12-28' },
  { id: 'pat-45', name: 'Caleb Cook', email: 'caleb.c@email.com', phone: '(555) 111-0045', dateOfBirth: '1976-04-05' },
  { id: 'pat-46', name: 'Layla Morgan', email: 'layla.m@email.com', phone: '(555) 111-0046', dateOfBirth: '1993-08-12' },
  { id: 'pat-47', name: 'Isaac Bell', email: 'isaac.b@email.com', phone: '(555) 111-0047', dateOfBirth: '1983-11-19' },
  { id: 'pat-48', name: 'Scarlett Murphy', email: 'scarlett.m@email.com', phone: '(555) 111-0048', dateOfBirth: '1989-03-27' },
  { id: 'pat-49', name: 'Gabriel Bailey', email: 'gabriel.b@email.com', phone: '(555) 111-0049', dateOfBirth: '1978-07-03' },
  { id: 'pat-50', name: 'Luna Rivera', email: 'luna.r@email.com', phone: '(555) 111-0050', dateOfBirth: '1995-11-10' },
];

/**
 * Helper to get current week's date at specific time
 */
function getWeekDate(dayOffset: number, hour: number, minute: number): string {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - now.getDay() + 1); // Get Monday of current week

  const date = new Date(monday);
  date.setDate(monday.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);

  return date.toISOString();
}

/**
 * Helper to create appointment end time
 */
function getEndTime(startTime: string, durationMinutes: number): string {
  const start = new Date(startTime);
  start.setMinutes(start.getMinutes() + durationMinutes);
  return start.toISOString();
}

/**
 * Appointments spread across the week for all doctors
 *
 * Distribution:
 * - Dr. Sarah Chen (Cardiology): ~20 appointments
 * - Dr. Michael Rodriguez (Pediatrics): ~15 appointments
 * - Dr. Emily Johnson (General Practice): ~20 appointments
 */
export const MOCK_APPOINTMENTS: Appointment[] = [
  // Monday - Dr. Sarah Chen
  { id: 'apt-1', patientId: 'pat-1', doctorId: 'doc-1', type: 'checkup', startTime: getWeekDate(0, 9, 0), endTime: getEndTime(getWeekDate(0, 9, 0), 30), status: 'scheduled' },
  { id: 'apt-2', patientId: 'pat-2', doctorId: 'doc-1', type: 'consultation', startTime: getWeekDate(0, 10, 0), endTime: getEndTime(getWeekDate(0, 10, 0), 60), status: 'scheduled' },
  { id: 'apt-3', patientId: 'pat-3', doctorId: 'doc-1', type: 'follow-up', startTime: getWeekDate(0, 11, 30), endTime: getEndTime(getWeekDate(0, 11, 30), 30), status: 'scheduled' },
  { id: 'apt-4', patientId: 'pat-4', doctorId: 'doc-1', type: 'procedure', startTime: getWeekDate(0, 13, 0), endTime: getEndTime(getWeekDate(0, 13, 0), 90), status: 'scheduled' },
  { id: 'apt-5', patientId: 'pat-5', doctorId: 'doc-1', type: 'checkup', startTime: getWeekDate(0, 15, 0), endTime: getEndTime(getWeekDate(0, 15, 0), 30), status: 'scheduled' },

  // Monday - Dr. Michael Rodriguez
  { id: 'apt-6', patientId: 'pat-6', doctorId: 'doc-2', type: 'checkup', startTime: getWeekDate(0, 8, 0), endTime: getEndTime(getWeekDate(0, 8, 0), 30), status: 'scheduled' },
  { id: 'apt-7', patientId: 'pat-7', doctorId: 'doc-2', type: 'consultation', startTime: getWeekDate(0, 9, 0), endTime: getEndTime(getWeekDate(0, 9, 0), 60), status: 'scheduled' },
  { id: 'apt-8', patientId: 'pat-8', doctorId: 'doc-2', type: 'follow-up', startTime: getWeekDate(0, 11, 0), endTime: getEndTime(getWeekDate(0, 11, 0), 30), status: 'scheduled' },
  { id: 'apt-9', patientId: 'pat-9', doctorId: 'doc-2', type: 'checkup', startTime: getWeekDate(0, 14, 0), endTime: getEndTime(getWeekDate(0, 14, 0), 30), status: 'scheduled' },

  // Monday - Dr. Emily Johnson
  { id: 'apt-10', patientId: 'pat-10', doctorId: 'doc-3', type: 'checkup', startTime: getWeekDate(0, 10, 0), endTime: getEndTime(getWeekDate(0, 10, 0), 30), status: 'scheduled' },
  { id: 'apt-11', patientId: 'pat-11', doctorId: 'doc-3', type: 'consultation', startTime: getWeekDate(0, 11, 0), endTime: getEndTime(getWeekDate(0, 11, 0), 60), status: 'scheduled' },
  { id: 'apt-12', patientId: 'pat-12', doctorId: 'doc-3', type: 'follow-up', startTime: getWeekDate(0, 13, 0), endTime: getEndTime(getWeekDate(0, 13, 0), 30), status: 'scheduled' },
  { id: 'apt-13', patientId: 'pat-13', doctorId: 'doc-3', type: 'checkup', startTime: getWeekDate(0, 15, 0), endTime: getEndTime(getWeekDate(0, 15, 0), 30), status: 'scheduled' },

  // Tuesday - Dr. Sarah Chen
  { id: 'apt-14', patientId: 'pat-14', doctorId: 'doc-1', type: 'consultation', startTime: getWeekDate(1, 9, 30), endTime: getEndTime(getWeekDate(1, 9, 30), 60), status: 'scheduled' },
  { id: 'apt-15', patientId: 'pat-15', doctorId: 'doc-1', type: 'checkup', startTime: getWeekDate(1, 11, 0), endTime: getEndTime(getWeekDate(1, 11, 0), 30), status: 'scheduled' },
  { id: 'apt-16', patientId: 'pat-16', doctorId: 'doc-1', type: 'follow-up', startTime: getWeekDate(1, 14, 0), endTime: getEndTime(getWeekDate(1, 14, 0), 30), status: 'scheduled' },
  { id: 'apt-17', patientId: 'pat-17', doctorId: 'doc-1', type: 'checkup', startTime: getWeekDate(1, 16, 0), endTime: getEndTime(getWeekDate(1, 16, 0), 30), status: 'scheduled' },

  // Tuesday - Dr. Michael Rodriguez
  { id: 'apt-18', patientId: 'pat-18', doctorId: 'doc-2', type: 'checkup', startTime: getWeekDate(1, 8, 30), endTime: getEndTime(getWeekDate(1, 8, 30), 30), status: 'scheduled' },
  { id: 'apt-19', patientId: 'pat-19', doctorId: 'doc-2', type: 'consultation', startTime: getWeekDate(1, 10, 0), endTime: getEndTime(getWeekDate(1, 10, 0), 60), status: 'scheduled' },
  { id: 'apt-20', patientId: 'pat-20', doctorId: 'doc-2', type: 'follow-up', startTime: getWeekDate(1, 13, 0), endTime: getEndTime(getWeekDate(1, 13, 0), 30), status: 'scheduled' },

  // Tuesday - Dr. Emily Johnson
  { id: 'apt-21', patientId: 'pat-21', doctorId: 'doc-3', type: 'checkup', startTime: getWeekDate(1, 10, 30), endTime: getEndTime(getWeekDate(1, 10, 30), 30), status: 'scheduled' },
  { id: 'apt-22', patientId: 'pat-22', doctorId: 'doc-3', type: 'consultation', startTime: getWeekDate(1, 12, 0), endTime: getEndTime(getWeekDate(1, 12, 0), 60), status: 'scheduled' },
  { id: 'apt-23', patientId: 'pat-23', doctorId: 'doc-3', type: 'follow-up', startTime: getWeekDate(1, 14, 30), endTime: getEndTime(getWeekDate(1, 14, 30), 30), status: 'scheduled' },
  { id: 'apt-24', patientId: 'pat-24', doctorId: 'doc-3', type: 'checkup', startTime: getWeekDate(1, 16, 30), endTime: getEndTime(getWeekDate(1, 16, 30), 30), status: 'scheduled' },

  // Wednesday - Dr. Sarah Chen
  { id: 'apt-25', patientId: 'pat-25', doctorId: 'doc-1', type: 'procedure', startTime: getWeekDate(2, 9, 0), endTime: getEndTime(getWeekDate(2, 9, 0), 90), status: 'scheduled' },
  { id: 'apt-26', patientId: 'pat-26', doctorId: 'doc-1', type: 'consultation', startTime: getWeekDate(2, 11, 0), endTime: getEndTime(getWeekDate(2, 11, 0), 60), status: 'scheduled' },
  { id: 'apt-27', patientId: 'pat-27', doctorId: 'doc-1', type: 'checkup', startTime: getWeekDate(2, 13, 30), endTime: getEndTime(getWeekDate(2, 13, 30), 30), status: 'scheduled' },
  { id: 'apt-28', patientId: 'pat-28', doctorId: 'doc-1', type: 'follow-up', startTime: getWeekDate(2, 15, 30), endTime: getEndTime(getWeekDate(2, 15, 30), 30), status: 'scheduled' },

  // Wednesday - Dr. Michael Rodriguez
  { id: 'apt-29', patientId: 'pat-29', doctorId: 'doc-2', type: 'checkup', startTime: getWeekDate(2, 8, 0), endTime: getEndTime(getWeekDate(2, 8, 0), 30), status: 'scheduled' },
  { id: 'apt-30', patientId: 'pat-30', doctorId: 'doc-2', type: 'consultation', startTime: getWeekDate(2, 9, 30), endTime: getEndTime(getWeekDate(2, 9, 30), 60), status: 'scheduled' },
  { id: 'apt-31', patientId: 'pat-31', doctorId: 'doc-2', type: 'follow-up', startTime: getWeekDate(2, 12, 0), endTime: getEndTime(getWeekDate(2, 12, 0), 30), status: 'scheduled' },
  { id: 'apt-32', patientId: 'pat-32', doctorId: 'doc-2', type: 'checkup', startTime: getWeekDate(2, 14, 30), endTime: getEndTime(getWeekDate(2, 14, 30), 30), status: 'scheduled' },

  // Thursday - Dr. Sarah Chen
  { id: 'apt-33', patientId: 'pat-33', doctorId: 'doc-1', type: 'checkup', startTime: getWeekDate(3, 9, 0), endTime: getEndTime(getWeekDate(3, 9, 0), 30), status: 'scheduled' },
  { id: 'apt-34', patientId: 'pat-34', doctorId: 'doc-1', type: 'consultation', startTime: getWeekDate(3, 10, 30), endTime: getEndTime(getWeekDate(3, 10, 30), 60), status: 'scheduled' },
  { id: 'apt-35', patientId: 'pat-35', doctorId: 'doc-1', type: 'procedure', startTime: getWeekDate(3, 13, 0), endTime: getEndTime(getWeekDate(3, 13, 0), 90), status: 'scheduled' },
  { id: 'apt-36', patientId: 'pat-36', doctorId: 'doc-1', type: 'follow-up', startTime: getWeekDate(3, 15, 30), endTime: getEndTime(getWeekDate(3, 15, 30), 30), status: 'scheduled' },

  // Thursday - Dr. Michael Rodriguez
  { id: 'apt-37', patientId: 'pat-37', doctorId: 'doc-2', type: 'checkup', startTime: getWeekDate(3, 8, 30), endTime: getEndTime(getWeekDate(3, 8, 30), 30), status: 'scheduled' },
  { id: 'apt-38', patientId: 'pat-38', doctorId: 'doc-2', type: 'consultation', startTime: getWeekDate(3, 10, 0), endTime: getEndTime(getWeekDate(3, 10, 0), 60), status: 'scheduled' },
  { id: 'apt-39', patientId: 'pat-39', doctorId: 'doc-2', type: 'follow-up', startTime: getWeekDate(3, 13, 30), endTime: getEndTime(getWeekDate(3, 13, 30), 30), status: 'scheduled' },

  // Thursday - Dr. Emily Johnson
  { id: 'apt-40', patientId: 'pat-40', doctorId: 'doc-3', type: 'checkup', startTime: getWeekDate(3, 10, 0), endTime: getEndTime(getWeekDate(3, 10, 0), 30), status: 'scheduled' },
  { id: 'apt-41', patientId: 'pat-41', doctorId: 'doc-3', type: 'consultation', startTime: getWeekDate(3, 11, 30), endTime: getEndTime(getWeekDate(3, 11, 30), 60), status: 'scheduled' },
  { id: 'apt-42', patientId: 'pat-42', doctorId: 'doc-3', type: 'follow-up', startTime: getWeekDate(3, 14, 0), endTime: getEndTime(getWeekDate(3, 14, 0), 30), status: 'scheduled' },
  { id: 'apt-43', patientId: 'pat-43', doctorId: 'doc-3', type: 'checkup', startTime: getWeekDate(3, 16, 0), endTime: getEndTime(getWeekDate(3, 16, 0), 30), status: 'scheduled' },

  // Friday - Dr. Sarah Chen
  { id: 'apt-44', patientId: 'pat-44', doctorId: 'doc-1', type: 'checkup', startTime: getWeekDate(4, 9, 0), endTime: getEndTime(getWeekDate(4, 9, 0), 30), status: 'scheduled' },
  { id: 'apt-45', patientId: 'pat-45', doctorId: 'doc-1', type: 'consultation', startTime: getWeekDate(4, 10, 30), endTime: getEndTime(getWeekDate(4, 10, 30), 60), status: 'scheduled' },
  { id: 'apt-46', patientId: 'pat-46', doctorId: 'doc-1', type: 'follow-up', startTime: getWeekDate(4, 13, 0), endTime: getEndTime(getWeekDate(4, 13, 0), 30), status: 'scheduled' },

  // Friday - Dr. Michael Rodriguez
  { id: 'apt-47', patientId: 'pat-47', doctorId: 'doc-2', type: 'checkup', startTime: getWeekDate(4, 8, 0), endTime: getEndTime(getWeekDate(4, 8, 0), 30), status: 'scheduled' },
  { id: 'apt-48', patientId: 'pat-48', doctorId: 'doc-2', type: 'consultation', startTime: getWeekDate(4, 9, 30), endTime: getEndTime(getWeekDate(4, 9, 30), 60), status: 'scheduled' },
  { id: 'apt-49', patientId: 'pat-49', doctorId: 'doc-2', type: 'follow-up', startTime: getWeekDate(4, 12, 0), endTime: getEndTime(getWeekDate(4, 12, 0), 30), status: 'scheduled' },

  // Friday - Dr. Emily Johnson
  { id: 'apt-50', patientId: 'pat-50', doctorId: 'doc-3', type: 'checkup', startTime: getWeekDate(4, 10, 0), endTime: getEndTime(getWeekDate(4, 10, 0), 30), status: 'scheduled' },
  { id: 'apt-51', patientId: 'pat-1', doctorId: 'doc-3', type: 'consultation', startTime: getWeekDate(4, 12, 0), endTime: getEndTime(getWeekDate(4, 12, 0), 60), status: 'scheduled' },
  { id: 'apt-52', patientId: 'pat-2', doctorId: 'doc-3', type: 'follow-up', startTime: getWeekDate(4, 15, 0), endTime: getEndTime(getWeekDate(4, 15, 0), 30), status: 'scheduled' },

  // Saturday - Dr. Emily Johnson (only works Saturday)
  { id: 'apt-53', patientId: 'pat-3', doctorId: 'doc-3', type: 'checkup', startTime: getWeekDate(5, 9, 0), endTime: getEndTime(getWeekDate(5, 9, 0), 30), status: 'scheduled' },
  { id: 'apt-54', patientId: 'pat-4', doctorId: 'doc-3', type: 'consultation', startTime: getWeekDate(5, 10, 0), endTime: getEndTime(getWeekDate(5, 10, 0), 60), status: 'scheduled' },
  { id: 'apt-55', patientId: 'pat-5', doctorId: 'doc-3', type: 'checkup', startTime: getWeekDate(5, 12, 0), endTime: getEndTime(getWeekDate(5, 12, 0), 30), status: 'scheduled' },
];

/**
 * Helper function to get a doctor by ID
 */
export function getDoctorById(id: string): Doctor | undefined {
  return MOCK_DOCTORS.find((doctor) => doctor.id === id);
}

/**
 * Helper function to get a patient by ID
 */
export function getPatientById(id: string): Patient | undefined {
  return MOCK_PATIENTS.find((patient) => patient.id === id);
}

/**
 * Helper function to get appointments for a specific doctor
 */
export function getAppointmentsByDoctor(doctorId: string): Appointment[] {
  return MOCK_APPOINTMENTS.filter((apt) => apt.doctorId === doctorId);
}

/**
 * Helper function to get appointments for a specific doctor and date
 */
export function getAppointmentsByDoctorAndDate(
  doctorId: string,
  date: Date
): Appointment[] {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return MOCK_APPOINTMENTS.filter((apt) => {
    if (apt.doctorId !== doctorId) return false;

    const aptStart = new Date(apt.startTime);
    return aptStart >= startOfDay && aptStart <= endOfDay;
  });
}

/**
 * Helper function to get appointments for a date range (for week view)
 */
export function getAppointmentsByDoctorAndDateRange(
  doctorId: string,
  startDate: Date,
  endDate: Date
): Appointment[] {
  return MOCK_APPOINTMENTS.filter((apt) => {
    if (apt.doctorId !== doctorId) return false;

    const aptStart = new Date(apt.startTime);
    return aptStart >= startDate && aptStart <= endDate;
  });
}
