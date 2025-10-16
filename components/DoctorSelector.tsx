/**
 * DoctorSelector Component
 *
 * Dropdown to select which doctor's schedule to view.
 * For front desk staff (can see all doctors).
 *
 * TODO for candidates:
 * 1. Fetch list of all doctors
 * 2. Display in a dropdown/select
 * 3. Show doctor name and specialty
 * 4. Handle selection change
 * 5. Consider using a custom dropdown or native select
 */
'use client';

import { useState, useEffect } from 'react';
import type { Doctor } from '@/types';
import { appointmentService } from '@/services/appointmentService';

interface DoctorSelectorProps {
  selectedDoctorId: string;
  onDoctorChange: (doctorId: string) => void;
}

/**
 * DoctorSelector Component
 *
 * Renders a dropdown to select a doctor from the available list.
 * Fetches doctors from appointmentService on mount.
 * 
 * Props:
 * - selectedDoctorId: currently selected doctor's ID
 * - onDoctorChange: callback when doctor selection changes
 */
export function DoctorSelector({
  selectedDoctorId,
  onDoctorChange,
}: DoctorSelectorProps) {
  // State to store list of doctors
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Fetch doctors once when component mounts
  useEffect(() => {
    // Fetch all doctors from service layer
    const allDoctors = appointmentService.getAllDoctors();
    setDoctors(allDoctors);
  }, []);

  // Find currently selected doctor object for display (optional)
  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);

  return (
    <div className="doctor-selector w-full max-w-sm">
      {/* Native select dropdown for accessibility and simplicity */}
      <select
        value={selectedDoctorId}
        onChange={(e) => onDoctorChange(e.target.value)}
        className="block w-full px-4 py-2 pr-8 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {/* Default placeholder option */}
        <option value="">Select a doctor...</option>

        {/* Map over doctors and create option elements */}
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {/* Display formatted doctor name and specialty */}
            Dr. {doctor.name} - {doctor.specialty}
          </option>
        ))}
      </select>
    </div>
  );
}
