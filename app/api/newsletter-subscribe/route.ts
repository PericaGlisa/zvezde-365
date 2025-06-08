import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse request body
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    // Call the Netlify function for newsletter subscription
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        formData: {
          email,
          formType: 'newsletter'
        },
        toEmail: 'info@zvezde365.com'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Failed to subscribe to newsletter' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      message: 'Successfully subscribed to newsletter',
      subscribed: true,
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