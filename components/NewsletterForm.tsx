"use client";

import { useState } from 'react';
import { toast } from "sonner";
import { z } from "zod";

// Email validation schema
const newsletterSchema = z.object({
  email: z.string().email({ message: "Molimo unesite ispravnu email adresu" }),
});

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validationResult = newsletterSchema.safeParse({ email });
    
    if (!validationResult.success) {
      toast.error("Molimo unesite ispravnu email adresu");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Greška prilikom pretplate");
      }
      
      await response.json();
      
      toast.success("Uspešno ste se pretplatili na newsletter!");
      setEmail(''); // Clear the email field
    } catch (error: any) {
      console.error("Error subscribing to newsletter:", error);
      toast.error(error.message || "Došlo je do greške. Molimo pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubscribe} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Vaša email adresa" 
          className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white text-sm sm:text-base h-10 sm:h-11"
          disabled={isSubmitting}
        />
        <button 
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap disabled:opacity-70 text-sm sm:text-base h-10 sm:h-11"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Slanje..." : "Pretplatite se"}
        </button>
      </div>
    </form>
  );
}