/**
 * DoctorSelector Component
 *
 * Dropdown allowing front-desk staff to select a doctor.
 * Fetches doctors from appointmentService asynchronously on mount.
 * Shows doctor name and specialty in dropdown.
 * Calls onDoctorChange when user selects a different doctor.
 */
'use client';

import { useState, useEffect } from 'react';
import type { Doctor } from '@/types';
import { appointmentService } from '@/services/appointmentService';

interface DoctorSelectorProps {
  selectedDoctorId: string;
  onDoctorChange: (doctorId: string) => void;
}

export function DoctorSelector({
  selectedDoctorId,
  onDoctorChange,
}: DoctorSelectorProps) {
  // State to hold list of doctors loaded from service
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Fetch doctors only once on component mount
  useEffect(() => {
    const allDoctors = appointmentService.getAllDoctors();
    setDoctors(allDoctors);
  }, []);

  // Optional: find selected doctor object to display (not used here but could be)
  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);

  return (
    <div className="doctor-selector w-full max-w-sm">
      {/* Native select input for accessibility and simplicity */}
      <select
        value={selectedDoctorId}
        onChange={(e) => onDoctorChange(e.target.value)}
        className="block w-full px-4 py-2 pr-8 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {/* Placeholder option */}
        <option value="">Select a doctor...</option>

        {/* Render each doctor as an option in the dropdown */}
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            Dr. {doctor.name} - {doctor.specialty}
          </option>
        ))}
      </select>
    </div>
  );
}
