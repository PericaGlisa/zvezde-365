"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Send, MapPin, Phone, Mail, MessageSquare, Clock, Calendar } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Form schema for validation
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Ime i prezime mora imati najmanje 2 karaktera.",
  }),
  email: z.string().email({
    message: "Unesite ispravnu email adresu.",
  }),
  phone: z.string().min(9, {
    message: "Broj telefona mora imati najmanje 9 cifara.",
  }),
  subject: z.string().min(2, {
    message: "Tema mora imati najmanje 2 karaktera.",
  }),
  message: z.string().min(10, {
    message: "Poruka mora imati najmanje 10 karaktera.",
  }),
  consultationType: z.string().optional(),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      consultationType: "general",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Determine if this is a contact or consultation form submission
      const isConsultation = activeTab === "consultation";
      
      // Create enhanced form data with form type
      const enhancedFormData = {
        ...values,
        formType: isConsultation ? 'consultation' : 'contact',
        // If it's a consultation, add the consultation type name
        consultationTypeName: isConsultation 
          ? getConsultationTypeName(values.consultationType || 'general') 
          : undefined
      };
      
      // Prepare data to send to API
      const requestData = {
        formData: enhancedFormData,
        toEmail: "info@zvezde365.com",
        whatsappNumber: "+381XX123456" // Optional WhatsApp number
      };
      
      // Send data to API
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        let errorData;
        try {
          // Try to parse as JSON if possible
          if (errorText) {
            errorData = JSON.parse(errorText);
          }
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
        }
        
        throw new Error(
          errorData?.error || 
          `Server responded with status: ${response.status}. ${errorText || ''}`
        );
      }
      
      await response.json();
      
      // Set form as submitted
      setFormSubmitted(true);
      
      // Different success messages based on form type
      if (isConsultation) {
        toast.success("Vaš zahtev za konsultaciju je uspešno poslat! Očekujte odgovor u narednih 24 časa.");
      } else {
        toast.success("Vaša poruka je uspešno poslata! Očekujte odgovor u narednih 24 časa.");
      }
      
      // Reset the form
      form.reset();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(`Došlo je do greške: ${error.message || "Nepoznata greška"}. Molimo pokušajte ponovo kasnije.`);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Helper function to get consultation type name from ID
  const getConsultationTypeName = (typeId: string): string => {
    const consultation = consultationTypes.find(type => type.id === typeId);
    return consultation ? consultation.name : 'Opšta konsultacija';
  };

  const consultationTypes = [
    { id: "general", name: "Opšta konsultacija", duration: "45 min", price: "3500 RSD" },
    { id: "detailed", name: "Detaljna astrološka analiza", duration: "90 min", price: "6000 RSD" },
    { id: "career", name: "Karijerno savetovanje", duration: "60 min", price: "4500 RSD" },
    { id: "relationship", name: "Analiza odnosa", duration: "60 min", price: "4500 RSD" },
    { id: "transit", name: "Analiza tranzita i progresija", duration: "75 min", price: "5500 RSD" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <MessageSquare size={40} className="text-purple-400 sm:w-12 sm:h-12 md:w-12 md:h-12" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Kontaktirajte nas
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Pošaljite nam poruku ili zakažite konsultaciju sa našim profesionalnim astrolozima
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8">
            <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-900 h-10 sm:h-11">
                <TabsTrigger 
                  value="contact" 
                  className="text-gray-300 data-[state=active]:text-purple-400 data-[state=active]:bg-gray-800 text-sm sm:text-base"
                >
                  Kontakt forma
                </TabsTrigger>
                <TabsTrigger 
                  value="consultation" 
                  className="text-gray-300 data-[state=active]:text-purple-400 data-[state=active]:bg-gray-800 text-sm sm:text-base"
                >
                  Zakazivanje konsultacije
                </TabsTrigger>
              </TabsList>
              
              {/* Contact Form */}
              <TabsContent value="contact" className="mt-4 sm:mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl lg:col-span-2">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-lg sm:text-xl">Pošaljite nam poruku</CardTitle>
                      <CardDescription className="text-gray-300 text-sm sm:text-base">
                        Popunite formular ispod i odgovorićemo vam u najkraćem mogućem roku
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                          {/* Full Name */}
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white text-sm sm:text-base">Ime i prezime</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Unesite vaše ime i prezime" 
                                    {...field} 
                                    className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Email and Phone in a grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white text-sm sm:text-base">E-pošta</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="email"
                                      placeholder="Unesite vašu email adresu" 
                                      {...field} 
                                      className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white text-sm sm:text-base">Telefon</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="tel"
                                      placeholder="Unesite vaš broj telefona" 
                                      {...field} 
                                      className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Subject */}
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white text-sm sm:text-base">Naslov</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Unesite naslov vaše poruke" 
                                    {...field} 
                                    className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Message */}
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white text-sm sm:text-base">Poruka</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Unesite vašu poruku..." 
                                    {...field} 
                                    className="bg-gray-700 border-gray-600 text-white min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base h-10 sm:h-11"
                          >
                            {isSubmitting ? (
                              <>
                                <Send className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                Šalje se...
                              </>
                            ) : (
                              'Pošaljite poruku'
                            )}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-lg sm:text-xl">Kontakt informacije</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                        <div className="flex items-start">
                          <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
                          <div>
                            <h3 className="text-xs sm:text-sm font-semibold text-white">E-pošta</h3>
                            <p className="text-gray-300 text-xs sm:text-sm">info@zvezde365.com</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
                          <div>
                            <h3 className="text-xs sm:text-sm font-semibold text-white">Adresa</h3>
                            <p className="text-gray-300 text-xs sm:text-sm">Zvezdani put 365<br />Sazvežđe Oriona</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
                          <div>
                            <h3 className="text-xs sm:text-sm font-semibold text-white">Radno vreme</h3>
                            <p className="text-gray-300 text-xs sm:text-sm">Dostupni non-stop, 24/7/365</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Brzi odgovori</h3>
                      <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
                        Obično odgovaramo na upite u roku od 24 časa tokom radnih dana.
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20 text-sm sm:text-base h-10 sm:h-11"
                        onClick={() => setActiveTab("consultation")}
                      >
                        <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Zakažite konsultaciju
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Consultation Booking */}
              <TabsContent value="consultation" className="mt-4 sm:mt-6">
                <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl">Zakazivanje astrološke konsultacije</CardTitle>
                    <CardDescription className="text-gray-300 text-sm sm:text-base">
                      Izaberite tip konsultacije i pošaljite zahtev za zakazivanje
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                        {/* Full Name */}
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white text-sm sm:text-base">Ime i prezime</FormLabel>
                              <FormControl>
                                <Input 
                                    placeholder="Unesite vaše ime i prezime" 
                                    {...field} 
                                    className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11"
                                  />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Email and Phone in a grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white text-sm sm:text-base">E-pošta</FormLabel>
                                <FormControl>
                                  <Input 
                                      type="email"
                                      placeholder="Unesite vašu email adresu" 
                                      {...field} 
                                      className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11"
                                    />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white text-sm sm:text-base">Broj telefona</FormLabel>
                                <FormControl>
                                  <Input 
                                      type="tel"
                                      placeholder="Unesite vaš broj telefona" 
                                      {...field} 
                                      className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11"
                                    />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Consultation Type */}
                        <FormField
                          control={form.control}
                          name="consultationType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white text-sm sm:text-base">Tip konsultacije</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11">
                                    <SelectValue placeholder="Izaberite tip konsultacije" className="text-white" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-700 border-gray-600">
                                  {consultationTypes.map(type => (
                                    <SelectItem 
                                      key={type.id} 
                                      value={type.id} 
                                      className="text-white text-sm sm:text-base"
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Message / Additional info */}
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white text-sm sm:text-base">Dodatne informacije</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Unesite dodatne informacije, željeni termin ili specifične teme koje vas zanimaju" 
                                  {...field} 
                                  className="bg-gray-700 border-gray-600 text-white resize-none min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                                />
                              </FormControl>
                              <FormDescription className="text-gray-400 text-xs sm:text-sm">
                                Navedite željeni datum i vreme konsultacije, kao i da li preferirate online ili uživo konsultaciju.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="pt-1 sm:pt-2">
                          <Button 
                            type="submit" 
                            className="w-full bg-purple-600 hover:bg-purple-700 text-sm sm:text-base h-10 sm:h-11"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                Slanje zahteva...
                              </>
                            ) : (
                              <>
                                <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                Pošaljite zahtev za konsultaciju
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="border-t border-gray-700 pt-6 flex flex-col items-start space-y-4">
                    <div className="w-full">
                      <h3 className="font-semibold text-white mb-4 text-xl">Tipovi konsultacija:</h3>
                      <div className="space-y-4 w-full">
                        {consultationTypes.map(type => (
                          <div key={type.id} className="bg-gray-700/50 p-4 rounded-lg w-full border border-gray-600/50">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-white">{type.name}</h4>
                              <span className="text-purple-400 font-semibold">{type.price}</span>
                            </div>
                            <div className="text-sm text-gray-400 mt-1">Trajanje: {type.duration}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mt-4 w-full">
                      Nakon slanja zahteva, kontaktiraćemo vas u roku od 24 časa kako bismo potvrdili termin konsultacije.
                      Za hitne konsultacije, možete nas direktno kontaktirati telefonom.
                    </p>
                  </CardFooter>
                </Card>
                
                <div className="mt-8 bg-gray-800 bg-opacity-50 border border-purple-500/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-4">Kako se pripremiti za konsultaciju</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-400 mb-2">Pre konsultacije</h4>
                      <ul className="text-sm text-gray-300 list-disc pl-5 space-y-2">
                        <li>Zapišite specifična pitanja koja imate</li>
                        <li>Razmislite o oblastima života koje vas najviše zanimaju</li>
                        <li>Proverite da li su vaši podaci o rođenju tačni</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-400 mb-2">Tokom konsultacije</h4>
                      <ul className="text-sm text-gray-300 list-disc pl-5 space-y-2">
                        <li>Budite otvoreni i iskreni u razgovoru</li>
                        <li>Zapisujte važne informacije i uvide</li>
                        <li>Slobodno postavite dodatna pitanja za pojašnjenje</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-400 mb-2">Nakon konsultacije</h4>
                      <ul className="text-sm text-gray-300 list-disc pl-5 space-y-2">
                        <li>Reflektirajte na dobijene uvide i savete</li>
                        <li>Primenite preporuke koje su vam date</li>
                        <li>Pratite kako se situacije razvijaju tokom vremena</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}