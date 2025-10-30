/**
 * Home Page
 *
 * This is the landing page. Navigate users to the schedule page.
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Hospital Appointment Scheduler
        </h1>

        <p className="text-gray-600 mb-6">
          Welcome to the appointment scheduling system. View and manage doctor schedules
          for our hospital.
        </p>

        <div className="space-y-4">
          <Link
            href="/schedule"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Go to Schedule
          </Link>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Available Doctors:</h2>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Dr. Sarah Chen - Cardiology</li>
              <li>• Dr. Michael Rodriguez - Pediatrics</li>
              <li>• Dr. Emily Johnson - General Practice</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
