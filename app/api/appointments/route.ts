import { NextResponse } from 'next/server';
import { MOCK_APPOINTMENTS } from '@/data/mockData';

/**
 * GET handler for fetching appointments filtered by doctorId and date.
 * 
 * Query params:
 * - doctorId: optional, filter by specific doctor
 * - date: optional, filter appointments for specific date
 */
export async function GET(req: Request) {
  // Parse URL search parameters
  const { searchParams } = new URL(req.url);
  
  // Extract optional query parameters
  const doctorId = searchParams.get('doctorId');
  const date = searchParams.get('date');

  // Start with all mock appointments
  let filtered = MOCK_APPOINTMENTS;

  // Filter by doctorId if provided
  if (doctorId) {
    filtered = filtered.filter((a) => a.doctorId === doctorId);
  }

  // Filter by date if provided
  if (date) {
    const day = new Date(date); // Parse date string
    filtered = filtered.filter((a) => {
      const aptDay = new Date(a.startTime);
      // Check if appointment falls on the same day
      return (
        aptDay.getFullYear() === day.getFullYear() &&
        aptDay.getMonth() === day.getMonth() &&
        aptDay.getDate() === day.getDate()
      );
    });
  }

  // Return filtered appointments as JSON
  return NextResponse.json(filtered);
}
