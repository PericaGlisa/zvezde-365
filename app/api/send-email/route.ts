import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    // Initialize Resend with API key from environment variable
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Use the already formatted birth time string
    const birthTime = formData.birthTime || undefined;
    
    // Use the already formatted birth date string
    const birthDateStr = formData.birthDate || undefined;
    
    // Create email content for natal chart order
    const emailSubject = `Nova narudžbina natalne karte - ${formData.fullName}`;
    
    const emailHtml = `
      <h1>Nova narudžbina natalne karte</h1>
      <p><strong>Ime i prezime:</strong> ${formData.fullName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Telefon:</strong> ${formData.phone}</p>
      <p><strong>Pol:</strong> ${
        formData.gender === 'male' ? 'Muški' : 
        formData.gender === 'female' ? 'Ženski' : 'Drugo'
      }</p>
      <p><strong>Datum rođenja:</strong> ${birthDateStr}</p>
      <p><strong>Vreme rođenja:</strong> ${birthTime}</p>
      <p><strong>Mesto rođenja:</strong> ${formData.birthPlace}</p>
      ${formData.notes ? `<p><strong>Napomena:</strong> ${formData.notes}</p>` : ''}
      <hr style="margin-top: 30px; margin-bottom: 20px; border: 0; border-top: 1px solid #eee;" />
      <p style="color: #777; font-size: 14px;">Poslato sa: zvezde365.com</p>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Zvezde365 <info@zvezde365.com>',
      to: toEmail || 'info@zvezde365.com',
      subject: emailSubject,
      html: emailHtml,
      cc: formData.email, // Send a copy to the customer
      reply_to: formData.email // Add reply-to for easy response
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      message: 'Form submitted successfully',
      emailSent: true,
      emailId: data?.id
    });
  } catch (error: any) {
    console.error('Function error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}