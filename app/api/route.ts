// Route handler for API index route - useful for static exports
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Zvezde365 API is operational',
    endpoints: [
      { path: '/api/send-email', method: 'POST', description: 'Send email with natal chart order details' }
    ]
  });
}