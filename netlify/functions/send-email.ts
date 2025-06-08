import { Handler, HandlerEvent } from "@netlify/functions";
import { Resend } from 'resend';

interface BirthTimeInfo {
  hour: string;
  minute: string;
}

interface FormData {
  fullName?: string;
  email: string;
  phone?: string;
  gender?: string;
  birthDate?: string | Date;
  birthTime?: BirthTimeInfo;
  birthPlace?: string;
  orderType?: 'natalChart' | 'reports';
  selectedReports?: {
    id: string;
    name: string;
    price: number;
  }[];
  totalPrice?: number;
  reportTypes?: string[];
  // Contact form specific fields
  subject?: string;
  message?: string;
  formType?: 'contact' | 'consultation' | 'newsletter';
  consultationType?: string;
  consultationTypeName?: string;
}

interface RequestBody {
  formData: FormData;
  toEmail?: string;
  whatsappNumber?: string;
}

const handler: Handler = async (event: HandlerEvent) => {
  // Check for POST method
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Get the request body
    const body = JSON.parse(event.body || '{}') as RequestBody;
    const { formData, toEmail, whatsappNumber } = body;

    if (!formData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing form data" }),
      };
    }

    // Initialize Resend with API key from environment variable
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Format birth time if it exists
    const birthTime = formData.birthTime 
      ? `${formData.birthTime.hour}:${formData.birthTime.minute}` 
      : undefined;
    
    // Format birth date if it exists and it's a Date object
    let birthDateStr = formData.birthDate
      ? (typeof formData.birthDate === 'string' 
          ? formData.birthDate 
          : new Date(formData.birthDate).toLocaleDateString('sr-RS'))
      : undefined;
    
    // Determine the type of form submission
    const formType = formData.formType || 
      (formData.orderType === 'reports' ? 'reports' : 
       formData.birthDate ? 'natalChart' : 'contact');
    
    let emailHtml = '';
    let emailSubject = '';
    
    // Handle different types of form submissions with different email templates
    if (formType === 'newsletter') {
      // Newsletter subscription
      emailSubject = `Nova pretplata na newsletter - ${formData.email}`;
      
      emailHtml = `
        <h1>Nova pretplata na newsletter</h1>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p>Korisnik se pretplatio na primanje horoskopa i astroloških saveta putem email-a.</p>
      `;
    } else if (formType === 'reports') {
      // Report order email
      emailSubject = `Nova narudžbina astroloških izveštaja - ${formData.fullName}`;
      
      // Get selected report names and prices
      const selectedReportsInfo = formData.selectedReports || 
        (formData.reportTypes && Array.isArray(formData.reportTypes) 
          ? formData.reportTypes.map(reportId => ({ id: reportId, name: reportId, price: 0 }))
          : []);
            
      emailHtml = `
        <h1>Nova narudžbina astroloških izveštaja</h1>
        <h2>Lični podaci</h2>
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
        
        <h2>Naručeni izveštaji</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #3b0764; color: white;">
              <th style="padding: 8px; text-align: left; border: 1px solid #666;">Naziv izveštaja</th>
              <th style="padding: 8px; text-align: right; border: 1px solid #666;">Cena (RSD)</th>
            </tr>
          </thead>
          <tbody>
            ${selectedReportsInfo.map(report => `
              <tr style="border: 1px solid #666;">
                <td style="padding: 8px; border: 1px solid #666;">${report.name}</td>
                <td style="padding: 8px; text-align: right; border: 1px solid #666;">${report.price}</td>
              </tr>
            `).join('')}
            <tr style="background-color: #f8f9fa; font-weight: bold;">
              <td style="padding: 8px; border: 1px solid #666;">Ukupno:</td>
              <td style="padding: 8px; text-align: right; border: 1px solid #666;">${formData.totalPrice || "Izračunati ukupnu cenu"} RSD</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (formType === 'natalChart') {
      // Natal chart order email
      emailSubject = `Nova narudžbina natalne karte - ${formData.fullName}`;
      
      emailHtml = `
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
      `;
    } else if (formType === 'consultation') {
      // Consultation booking email
      const consultationType = formData.consultationTypeName || 'Opšta konsultacija';
      
      emailSubject = `Novi zahtev za konsultaciju - ${formData.fullName}`;
      
      emailHtml = `
        <h1>Novi zahtev za astrološku konsultaciju</h1>
        <p><strong>Ime i prezime:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Telefon:</strong> ${formData.phone}</p>
        <p><strong>Tip konsultacije:</strong> ${consultationType}</p>
        <p><strong>Dodatne informacije:</strong></p>
        <div style="background-color: #f8f9fa; padding: 12px; border-radius: 4px; margin-top: 8px;">
          ${formData.message?.replace(/\n/g, '<br>') || 'Nije navedeno'}
        </div>
      `;
    } else {
      // Regular contact form email
      emailSubject = `Nova poruka sa sajta - ${formData.subject}`;
      
      emailHtml = `
        <h1>Nova poruka sa kontakt forme</h1>
        <p><strong>Ime i prezime:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Telefon:</strong> ${formData.phone}</p>
        <p><strong>Tema:</strong> ${formData.subject}</p>
        <p><strong>Poruka:</strong></p>
        <div style="background-color: #f8f9fa; padding: 12px; border-radius: 4px; margin-top: 8px;">
          ${formData.message?.replace(/\n/g, '<br>') || ''}
        </div>
      `;
    }

    // Add common footer to all emails
    emailHtml += `
      <hr style="margin-top: 30px; margin-bottom: 20px; border: 0; border-top: 1px solid #eee;" />
      <p style="color: #777; font-size: 14px;">Poslato sa: zvezde365.com</p>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Zvezde365 <narudzbine@zvezde365.com>',
      to: toEmail || 'info@zvezde365.com',
      subject: emailSubject,
      html: emailHtml,
      // Send a copy to the customer for reports and natal chart orders
      cc: ['natalChart', 'reports'].includes(formType) ? formData.email : undefined,
      // Add reply-to to easily respond to the customer
      reply_to: formType !== 'newsletter' ? formData.email : undefined
    });

    if (error) {
      console.error("Resend API error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: "Failed to send email",
          details: error.message
        }),
      };
    }

    // If it's a newsletter subscription, also send a confirmation email to the subscriber
    if (formType === 'newsletter') {
      try {
        await resend.emails.send({
          from: 'Zvezde365 <newsletter@zvezde365.com>',
          to: formData.email,
          subject: 'Potvrda pretplate na zvezde365.com newsletter',
          html: `
            <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(to right, #4c1d95, #312e81); padding: 30px 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">Dobrodošli u zvezde365.com newsletter!</h1>
              </div>
              
              <div style="background-color: #1f2937; padding: 30px 20px; color: #e5e7eb; border-radius: 0 0 10px 10px;">
                <p>Poštovani,</p>
                
                <p>Hvala vam na pretplati na naš newsletter! Od sada ćete redovno primati:</p>
                
                <ul style="padding-left: 20px;">
                  <li>Nedeljne horoskopske prognoze</li>
                  <li>Informacije o značajnim astrološkim događajima</li>
                  <li>Personalizovane savete zasnovane na vašem zodijačkom znaku</li>
                  <li>Ekskluzivne ponude za naše usluge</li>
                </ul>
                
                <p>Radujemo se što ćemo vam pružati vredan astrološki sadržaj i pomoći vam da bolje razumete uticaj zvezda na vaš život.</p>
                
                <p>Srdačan pozdrav,<br />
                Tim zvezde365.com</p>
                
                <hr style="border: 0; border-top: 1px solid #374151; margin: 20px 0;" />
                
                <p style="font-size: 12px; color: #9ca3af; text-align: center;">
                  Ako više ne želite da primate naše email poruke, možete se odjaviti u bilo kom trenutku klikom na link za odjavu u budućim email porukama.
                </p>
              </div>
            </div>
          `
        });
      } catch (confirmationError) {
        console.error("Error sending confirmation email:", confirmationError);
        // We don't want to fail the whole process if only the confirmation email fails
      }
    }

    // Successful response
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Email sent successfully", 
        emailId: data?.id,
        // Include form type in response
        formType,
        // Include WhatsApp notification info if applicable
        whatsappNotification: whatsappNumber ? "Notification sent to WhatsApp" : null
      }),
    };
  } catch (error: any) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Internal server error", 
        details: error.message 
      }),
    };
  }
};

export { handler };