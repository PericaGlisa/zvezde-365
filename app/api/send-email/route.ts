import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse request body
    const requestBody = await req.json();
    const { formData, toEmail, whatsappNumber } = requestBody;

    if (!formData) {
      return NextResponse.json(
        { error: 'Missing form data' },
        { status: 400 }
      );
    }

    // Call the Netlify function instead of using Resend directly
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        formData,
        toEmail,
        whatsappNumber
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Failed to send email' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      message: 'Form submitted successfully',
      emailSent: true,
      emailId: data.emailId,
      ...data
    });
  } catch (error: any) {
    console.error('Function error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}