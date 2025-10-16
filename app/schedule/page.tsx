/**
 * Schedule Page
 *
 * Main page for the appointment scheduler.
 * This is where the calendar views are rendered.
 *
 * 1. Imports and uses the ScheduleView component
 * 2. Sets up state for selected doctor and date
 * 3. Handles view switching (day/week)
 */

'use client';

import { useState } from 'react';
import { MOCK_DOCTORS } from '@/data/mockData';
import type { CalendarView } from '@/types';
import { format } from 'date-fns';

// Import your ScheduleView component here
import { ScheduleView } from '@/components/ScheduleView';

export default function SchedulePage() {
  // State for currently selected doctor, date, and calendar view
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(MOCK_DOCTORS[0].id);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>('day');

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Appointment Schedule
          </h1>
          <p className="text-gray-600">
            View and manage doctor appointments
          </p>
        </header>

        {/* Render the ScheduleView component (remove the placeholder) */}
        <ScheduleView
          selectedDoctorId={selectedDoctorId}
          selectedDate={selectedDate}
          view={view}
          onDoctorChange={setSelectedDoctorId}
          onDateChange={setSelectedDate}
          onViewChange={setView}
        />

        {/* Developer/debug output: Current State */}
        <div className="mt-8 text-left max-w-md mx-auto space-y-2">
          <p className="font-semibold text-gray-700">Current State:</p>
          <p className="text-sm">Doctor: {selectedDoctorId}</p>
          {/* Use a fixed date format to avoid hydration errors */}
          <p className="text-sm">Date: {format(selectedDate, 'dd/MM/yyyy')}</p>
          <p className="text-sm">View: {view}</p>
        </div>
      </div>
    </main>
  );
}
