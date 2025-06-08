"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from 'date-fns';
import { CalendarIcon, Star, CreditCard, Download, Bitcoin, Check, Copy, Clock } from "lucide-react";
import { toPng } from 'html-to-image';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

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
  gender: z.string({
    required_error: "Molimo izaberite pol.",
  }),
  birthDate: z.date({
    required_error: "Datum rođenja je obavezan.",
  }),
  birthTime: z.object({
    hour: z.string({
      required_error: "Sat rođenja je obavezan.",
    }),
    minute: z.string({
      required_error: "Minut rođenja je obavezan.",
    }),
  }, {
    required_error: "Vreme rođenja je obavezno.",
  }),
  birthPlace: z.string().min(2, {
    message: "Mesto rođenja mora imati najmanje 2 karaktera.",
  }),
});

export default function NatalChartPage() {
  const [paymentMethod, setPaymentMethod] = useState<'serbia' | 'international' | 'crypto'>('serbia');
  const paymentSlipRef = useRef<HTMLDivElement>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Cryptocurrency addresses
  const cryptoAddresses = {
    btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    eth: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
    usdt: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"
  };

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      birthTime: {
        hour: "12",
        minute: "00",
      },
      birthPlace: "",
    },
  });

  // Watch form values for the payment slip
  const formValues = form.watch();

  // Remove special characters from phone number
  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/[^\d]/g, '');
  };

  // Format birth time for display
  const formatBirthTime = (timeObj: { hour: string; minute: string }) => {
    return `${timeObj.hour}:${timeObj.minute}`;
  };

  // Function to send form data to email
  async function sendFormData(): Promise<boolean> {
    // Check if form is valid
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Molimo popunite sve obavezne podatke u formi.");
      return false;
    }

    if (formSubmitted) {
      // Form was already submitted, no need to send again
      return true;
    }

    try {
      setIsSubmitting(true);
      
      // Get form values
      const values = form.getValues();
      
      // Prepare the data to send to the API
      const requestData = {
        formData: values,
        toEmail: "info@zvezde365.com",
        whatsappNumber: "+381XX123456" // Optional WhatsApp number
      };
      
      // Call the API
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
      
      const result = await response.json();
      
      // Set form as submitted
      setFormSubmitted(true);
      
      // Show success toast
      toast.success("Podaci su uspešno poslati! Hvala na narudžbini.");
      
      return true;
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(`Došlo je do greške: ${error.message || "Nepoznata greška"}. Molimo pokušajte ponovo kasnije.`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await sendFormData();
  }

  const downloadPaymentSlip = async () => {
    if (paymentSlipRef.current) {
      toPng(paymentSlipRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'uplatnica-zvezde365.jpg';
          link.href = dataUrl;
          link.click();
          toast.success("Uplatnica je uspešno preuzeta!");
        })
        .catch((error) => {
          console.error('Greška prilikom generisanja slike uplatnice', error);
          toast.error("Greška prilikom generisanja uplatnice. Pokušajte ponovo.");
        });
    }
  };

  const handlePayPalPayment = () => {
    // Show success toast and simulate PayPal redirect
    toast.success("Preusmeravanje na PayPal stranicu...");
    
    // In a real app, you would redirect to PayPal here
    // window.location.href = 'https://paypal.com/checkout/...';
  };

  const copyToClipboard = async (text: string, type: 'btc' | 'eth' | 'usdt') => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedAddress(type);
        toast.success("Adresa je kopirana u clipboard!");
        setTimeout(() => setCopiedAddress(null), 2000);
      })
      .catch((err) => {
        console.error('Greška prilikom kopiranja adrese', err);
        toast.error("Greška prilikom kopiranja adrese. Pokušajte ponovo.");
      });
  };
  
  // Format date in Yugoslav style (DD.MM.YYYY)
  const formatYugoslavDate = (date: Date) => {
    return format(date, "dd.MM.yyyy.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Star size={40} className="text-purple-400 sm:w-12 sm:h-12 md:w-12 md:h-12" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Naručite vašu personalizovanu natalnu kartu
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Popunite formular ispod sa vašim tačnim podacima za izradu detaljne natalne karte koja otkriva tajne vaše sudbine i ličnosti.
            </p>
          </div>

          {/* Form Section */}
          <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl mb-6 sm:mb-8">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl md:text-2xl">Lični podaci za natalnu kartu</CardTitle>
              <CardDescription className="text-gray-300 text-sm sm:text-base">
                Unesite vaše tačne podatke za preciznu astrološku analizu
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

                  {/* Email */}
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

                  {/* Phone */}
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

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm sm:text-base">Pol</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11">
                              <SelectValue placeholder="Izaberite pol" className="text-white" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="male" className="text-white text-sm sm:text-base">Muški</SelectItem>
                            <SelectItem value="female" className="text-white text-sm sm:text-base">Ženski</SelectItem>
                            <SelectItem value="other" className="text-white text-sm sm:text-base">Drugo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Birth Date */}
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-white text-sm sm:text-base">Datum rođenja</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11",
                                  !field.value && "text-gray-400"
                                )}
                              >
                                {field.value ? (
                                  formatYugoslavDate(field.value)
                                ) : (
                                  <span>Izaberite datum</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              className="bg-gray-700 text-white"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Birth Time */}
                  <FormField
                    control={form.control}
                    name="birthTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm sm:text-base">Vreme rođenja <span className="text-red-400">*</span></FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className="pl-3 text-left font-normal bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11 w-full flex justify-between"
                              >
                                <span>
                                  {field.value ? 
                                    formatBirthTime(field.value) : 
                                    "Izaberite vreme"}
                                </span>
                                <Clock className="h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-4 bg-gray-700 border-gray-600" align="start">
                            <div className="grid gap-4">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <FormLabel className="text-xs text-gray-400 mb-1">Sat</FormLabel>
                                  <Select
                                    value={form.watch("birthTime.hour")}
                                    onValueChange={(value) => form.setValue("birthTime.hour", value)}
                                  >
                                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-600">
                                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                        <SelectItem 
                                          key={hour} 
                                          value={String(hour).padStart(2, '0')} 
                                          className="text-white"
                                        >
                                          {String(hour).padStart(2, '0')}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col">
                                  <FormLabel className="text-xs text-gray-400 mb-1">Minut</FormLabel>
                                  <Select
                                    value={form.watch("birthTime.minute")}
                                    onValueChange={(value) => form.setValue("birthTime.minute", value)}
                                  >
                                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-600">
                                      {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                                        <SelectItem 
                                          key={minute} 
                                          value={minute.toString().padStart(2, '0')} 
                                          className="text-white"
                                        >
                                          {minute.toString().padStart(2, '0')}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                        <FormDescription className="text-gray-400">
                          Format: 24-časovni (npr. 14:30)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Birth Place */}
                  <FormField
                    control={form.control}
                    name="birthPlace"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm sm:text-base">Mesto rođenja</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Unesite mesto rođenja" 
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Slanje...' : 'Pošalji podatke'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="border-t border-gray-700 pt-6 flex flex-col items-start space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-1">Šta dobijate:</h3>
                <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                  <li>Detaljan vizuelni prikaz vaše natalne karte</li>
                  <li>Personalizovanu interpretaciju svih planeta i kuća</li>
                  <li>Analizu ključnih aspekata i njihov uticaj na vaš život</li>
                  <li>PDF dokument sa vašim personalnim astrološkim profilom</li>
                  <li>Prognozu za narednih 12 meseci</li>
                </ul>
              </div>
              <p className="text-sm text-gray-400">
                Za sva pitanja, molimo kontaktirajte nas na: 
                <Link href="mailto:info@zvezde365.com" className="text-purple-400 hover:text-purple-300 ml-1">
                  info@zvezde365.com
                </Link>
              </p>
            </CardFooter>
          </Card>

          {/* Payment Section */}
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white">Opcije plaćanja</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mt-2">
                Nakon što ste uneli vaše podatke, izaberite jedan od ponuđenih načina plaćanja.
              </p>
            </div>
            
            {/* Payment Methods - Stacked vertically */}
            <div className="space-y-8">
              {/* Serbia Payment */}
              <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Uplatnica (Srbija)</CardTitle>
                  <CardDescription className="text-gray-300">
                    <span className="font-medium text-lg">4,000 RSD</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Serbian Payment Slip - Updated with purple colors */}
                  <div ref={paymentSlipRef} className="rounded-lg overflow-hidden mb-4 bg-purple-900/80 p-6 border border-purple-500/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs text-purple-200 mb-1">uplatilac</div>
                          <div className="h-10 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-900 p-2 rounded">
                            {formValues.fullName || "Vaše ime i prezime"}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-purple-200 mb-1">svrha uplate</div>
                          <div className="h-10 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-900 p-2 rounded">
                            {formValues.email || "Vaša email adresa"}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-purple-200 mb-1">primalac</div>
                          <div className="h-10 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-900 p-2 rounded">
                            Ivan Petković
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-purple-200 mb-1">šifra plaćanja</div>
                            <div className="h-10 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-900 p-2 rounded">
                              289
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-purple-200 mb-1">valuta</div>
                            <div className="h-10 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-900 p-2 rounded">
                              RSD
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-purple-200 mb-1">iznos</div>
                          <div className="h-10 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-900 p-2 rounded font-bold">
                            =4,000.00
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-purple-200 mb-1">račun primaoca</div>
                          <div className="h-10 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-900 p-2 rounded">
                            265-0000006261583-84
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-purple-200 mb-1">broj modela</div>
                            <div className="h-10 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-900 p-2 rounded">
                              97
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-purple-200 mb-1">poziv na broj</div>
                            <div className="h-10 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-900 p-2 rounded">
                              {formValues.phone ? formatPhoneNumber(formValues.phone) : "Vaš broj telefona"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    onClick={downloadPaymentSlip}
                    className="bg-purple-600 hover:bg-purple-700 w-full flex items-center justify-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Preuzmite uplatnicu</span>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* PayPal Payment */}
              <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">PayPal (Međunarodno)</CardTitle>
                  <CardDescription className="text-gray-300">
                    <span className="font-medium text-lg">35 EUR</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Za korisnike izvan Srbije, omogućili smo plaćanje putem PayPal-a za brzu i jednostavnu transakciju.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Bićete preusmereni na PayPal stranicu za sigurno plaćanje. Nakon uspešnog plaćanja, primićete potvrdu putem e-maila.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
                    onClick={handlePayPalPayment}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Plati putem PayPal-a</span>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Crypto Payment */}
              <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Kripto</CardTitle>
                  <CardDescription className="text-gray-300">
                    <span className="font-medium text-lg">35 EUR u kriptovaluti</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Prihvatamo Bitcoin (BTC), Ethereum (ETH) i Tether (USDT) za plaćanje vaše natalne karte.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gray-700 p-4">
                      <h4 className="font-medium mb-2 flex items-center text-white">
                        <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center mr-2">
                          <Bitcoin className="h-4 w-4 text-white" />
                        </div>
                        Bitcoin (BTC)
                      </h4>
                      <div className="bg-gray-800 p-3 rounded mb-2 font-mono text-sm break-all text-white">
                        {cryptoAddresses.btc}
                      </div>
                      <button 
                        className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                        onClick={() => copyToClipboard(cryptoAddresses.btc, 'btc')}
                      >
                        {copiedAddress === 'btc' ? (
                          <>
                            <Check className="h-4 w-4" /> Kopirano
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" /> Kopiraj adresu
                          </>
                        )}
                      </button>
                    </div>
                    
                    <div className="rounded-lg bg-gray-700 p-4">
                      <h4 className="font-medium mb-2 flex items-center text-white">
                        <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                          <span className="text-white font-bold">Ξ</span>
                        </div>
                        Ethereum (ETH)
                      </h4>
                      <div className="bg-gray-800 p-3 rounded mb-2 font-mono text-sm break-all text-white">
                        {cryptoAddresses.eth}
                      </div>
                      <button 
                        className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                        onClick={() => copyToClipboard(cryptoAddresses.eth, 'eth')}
                      >
                        {copiedAddress === 'eth' ? (
                          <>
                            <Check className="h-4 w-4" /> Kopirano
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" /> Kopiraj adresu
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    Nakon izvršenog plaćanja, molimo pošaljite hash transakcije na email <span className="text-purple-400">crypto@zvezde365.com</span> uz vaš email za potvrdu.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Šta kažu naši korisnici</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 bg-opacity-50 border border-purple-500/20 p-6 rounded-lg">
                <p className="text-gray-300 italic mb-4">
                  "Natalna karta koju sam dobila je neverovatno tačna i detaljna. Pomogla mi je da bolje razumem sebe i svoje životne izbore. Toplo preporučujem!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                    <span className="font-bold text-white">JM</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">Jovana Marković</div>
                    <div className="text-sm text-gray-400">Beograd</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 border border-purple-500/20 p-6 rounded-lg">
                <p className="text-gray-300 italic mb-4">
                  "Profesionalno urađena natalna karta sa detaljnim i preciznim tumačenjem. Sve preporuke za zvezde365.com!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                    <span className="font-bold text-white">NP</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">Nikola Petrović</div>
                    <div className="text-sm text-gray-400">Novi Sad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}