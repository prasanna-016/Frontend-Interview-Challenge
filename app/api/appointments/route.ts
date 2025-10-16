
import { NextResponse } from 'next/server';
import { MOCK_APPOINTMENTS } from '@/data/mockData';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get('doctorId');
  const date = searchParams.get('date');

  let filtered = MOCK_APPOINTMENTS;

  if (doctorId) filtered = filtered.filter(a => a.doctorId === doctorId);

  if (date) {
    const day = new Date(date);
    filtered = filtered.filter(a => {
      const aptDay = new Date(a.startTime);
      return (
        aptDay.getFullYear() === day.getFullYear() &&
        aptDay.getMonth() === day.getMonth() &&
        aptDay.getDate() === day.getDate()
      );
    });
  }

  return NextResponse.json(filtered);
}