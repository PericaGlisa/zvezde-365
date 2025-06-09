"use client";

import { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from 'date-fns';
import { CalendarIcon, FileText, Star, Download, Check, Clock, Bell } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

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
  reportTypes: z.array(z.string()).min(1, {
    message: "Izaberite bar jedan tip izveštaja.",
  }),
});

export default function ReportsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTab, setSelectedTab] = useState("personal");
  const [formSubmitted, setFormSubmitted] = useState(false);
  
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
      reportTypes: ["yearly"],
    },
  });

  // Format date in Yugoslav style (DD.MM.YYYY)
  const formatYugoslavDate = (date: Date) => {
    return format(date, "dd.MM.yyyy.");
  };

  // Format birth time for display
  const formatBirthTime = (timeObj: { hour: string; minute: string }) => {
    return `${timeObj.hour}:${timeObj.minute}`;
  };

  const reportTypes = [
    {
      id: "yearly",
      name: "Godišnji izveštaj",
      description: "Detaljna prognoza za narednih 12 meseci sa fokusom na ključne tranzite",
      price: 3000
    },
    {
      id: "career",
      name: "Karijerni izveštaj",
      description: "Analiza karijere, talenata i profesionalnog razvoja",
      price: 2500
    },
    {
      id: "relationship",
      name: "Izveštaj o odnosima",
      description: "Analiza ljubavnih i ličnih odnosa, kompatibilnost i izazovi",
      price: 2500
    },
    {
      id: "spiritual",
      name: "Duhovni izveštaj",
      description: "Uvid u duhovni put, svrhu i lični razvoj",
      price: 2800
    },
    {
      id: "children",
      name: "Izveštaj za decu",
      description: "Analiza potencijala, talenata i najboljih pristupa vaspitanju",
      price: 2200
    }
  ];

  // Calculate total price based on selected reports
  const calculateTotal = () => {
    const selectedReports = form.watch("reportTypes");
    return reportTypes
      .filter(report => selectedReports.includes(report.id))
      .reduce((total, report) => total + report.price, 0);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Get selected report information
      const selectedReports = reportTypes.filter(report => 
        values.reportTypes.includes(report.id)
      );
      
      // Calculate total price
      const totalPrice = selectedReports.reduce((total, report) => 
        total + report.price, 0
      );
      
      // Create enhanced form data with report information
      const enhancedFormData = {
        ...values,
        orderType: 'reports',
        selectedReports: selectedReports.map(report => ({
          id: report.id,
          name: report.name,
          price: report.price
        })),
        totalPrice
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
      
      toast.success("Vaša narudžbina je uspešno primljena! Očekujte odgovor u narednih 24 časa.");
      
      // Reset form
      form.reset();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(`Došlo je do greške: ${error.message || "Nepoznata greška"}. Molimo pokušajte ponovo kasnije.`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <FileText size={40} className="text-pink-400 sm:w-12 sm:h-12 md:w-12 md:h-12" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Astrološki izveštaji i analize
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Naručite personalizovane astrološke izveštaje koji pružaju dubinske uvide u različite aspekte vašeg života.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8">
            <Tabs defaultValue="personal" value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-900 h-10 sm:h-11">
                <TabsTrigger 
                  value="personal" 
                  className="text-gray-300 data-[state=active]:text-pink-400 data-[state=active]:bg-gray-800 text-sm sm:text-base"
                >
                  Lični podaci
                </TabsTrigger>
                <TabsTrigger 
                  value="reports" 
                  className="text-gray-300 data-[state=active]:text-pink-400 data-[state=active]:bg-gray-800 text-sm sm:text-base"
                >
                  Izaberite izveštaje
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="mt-4 sm:mt-6">
                <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl">Lični podaci za astrološki izveštaj</CardTitle>
                    <CardDescription className="text-gray-300 text-sm sm:text-base">
                      Unesite tačne podatke za vaš personalizovani astrološki izveštaj
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <Form {...form}>
                      <form className="space-y-6">
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
                                  <SelectItem value="male" className="text-white">Muški</SelectItem>
                                  <SelectItem value="female" className="text-white">Ženski</SelectItem>
                                  <SelectItem value="other" className="text-white">Drugo</SelectItem>
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
                              <div className="flex gap-2">
                                <Input
                                  type="text"
                                  placeholder="DD.MM.YYYY"
                                  value={field.value ? formatYugoslavDate(field.value) : ""}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Parse DD.MM.YYYY format
                                    const dateRegex = /^(\d{1,2})\.(\d{1,2})\.(\d{4})\.?$/;
                                    const match = value.match(dateRegex);
                                    if (match) {
                                      const [, day, month, year] = match;
                                      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                                      if (!isNaN(date.getTime()) && date >= new Date("1900-01-01") && date <= new Date()) {
                                        field.onChange(date);
                                      }
                                    }
                                  }}
                                  className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11 flex-1"
                                />
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      type="button"
                                      variant={"outline"}
                                      className="bg-gray-700 border-gray-600 text-white h-10 sm:h-11 px-3"
                                    >
                                      <CalendarIcon className="h-4 w-4" />
                                    </Button>
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
                              </div>
                              <FormDescription className="text-gray-400 text-xs sm:text-sm">
                                Unesite datum u formatu DD.MM.YYYY ili koristite kalendar
                              </FormDescription>
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
                                      className="pl-3 text-left font-normal bg-gray-700 border-gray-600 text-white w-full flex justify-between text-sm sm:text-base h-10 sm:h-11"
                                    >
                                      <span>
                                        {field.value ? 
                                          formatBirthTime(field.value) : 
                                          "Izaberite vreme"}
                                      </span>
                                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 opacity-50" />
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
                              <FormDescription className="text-gray-400 text-xs sm:text-sm">
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
                            type="button" 
                            onClick={() => setSelectedTab("reports")}
                            className="w-full bg-pink-600 hover:bg-pink-700 text-sm sm:text-base h-10 sm:h-11"
                          >
                            Nastavite na sledeći korak
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="border-t border-gray-700 pt-4 sm:pt-6 flex flex-col items-start space-y-3 sm:space-y-4 p-4 sm:p-6">
                    <div>
                      <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Napomena o poverljivosti:</h3>
                      <p className="text-xs sm:text-sm text-gray-300">
                        Svi podaci koje unesete su strogo poverljivi i koriste se isključivo za kreiranje vašeg personalizovanog astrološkog izveštaja.
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports" className="mt-4 sm:mt-6">
                <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl">Izaberite astrološke izveštaje</CardTitle>
                    <CardDescription className="text-gray-300 text-sm sm:text-base">
                      Označite izveštaje koje želite da naručite
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="reportTypes"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel className="text-white">Dostupni izveštaji</FormLabel>
                                <FormDescription className="text-gray-400">
                                  Izaberite jedan ili više izveštaja koje želite da naručite
                                </FormDescription>
                              </div>
                              
                              <div className="space-y-4">
                                {reportTypes.map((report) => (
                                  <div
                                    key={report.id}
                                    className={cn(
                                      "flex items-start space-x-3 rounded-lg p-4 transition-colors",
                                      form.watch("reportTypes").includes(report.id)
                                        ? "bg-gray-700/50 border-2 border-pink-500/80"
                                        : "bg-gray-800/50 border border-gray-600/50 hover:border-gray-500/50"
                                    )}
                                  >
                                    <Checkbox
                                      id={`report-${report.id}`}
                                      checked={form.watch("reportTypes").includes(report.id)}
                                      onCheckedChange={(checked) => {
                                        const current = form.watch("reportTypes");
                                        if (checked) {
                                          form.setValue("reportTypes", [...current, report.id]);
                                        } else {
                                          form.setValue(
                                            "reportTypes",
                                            current.filter((id) => id !== report.id)
                                          );
                                        }
                                      }}
                                      className="border-gray-500 data-[state=checked]:bg-pink-600 data-[state=checked]:border-pink-600"
                                    />
                                    <div className="flex-1">
                                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-1">
                                        <label
                                          htmlFor={`report-${report.id}`}
                                          className="text-base font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                          {report.name}
                                        </label>
                                        <span className="font-bold text-pink-400 sm:ml-4">{report.price} RSD</span>
                                      </div>
                                      <p className="text-sm text-gray-400">
                                        {report.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="mt-6 bg-gray-700/50 rounded-lg p-4 flex justify-between items-center">
                                <div className="text-white">
                                  <span className="text-sm text-gray-300">Ukupno za plaćanje:</span>
                                  <div className="text-xl font-bold">{calculateTotal()} RSD</div>
                                </div>
                              </div>
                              
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setSelectedTab("personal")}
                            className="bg-gray-700 border-gray-600 text-white sm:flex-1"
                          >
                            Nazad na lične podatke
                          </Button>
                          
                          <Button 
                            type="submit" 
                            className="bg-pink-600 hover:bg-pink-700 sm:flex-1"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <FileText className="mr-2 h-4 w-4 animate-spin" />
                                Slanje narudžbine...
                              </>
                            ) : (
                              <>
                                <FileText className="mr-2 h-4 w-4" />
                                Poručite izveštaje
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="border-t border-gray-700 pt-6 flex flex-col items-start space-y-4">
                    <div>
                      <h3 className="font-semibold text-white mb-1">Šta dobijate:</h3>
                      <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                        <li>Detaljan personalizovani izveštaj u PDF formatu</li>
                        <li>Profesionalnu astrološku analizu sa tumačenjima</li>
                        <li>Savete i preporuke specifične za vaš astrološki profil</li>
                        <li>Doživotni pristup vašem izveštaju</li>
                        <li>Mogućnost za dodatna pitanja i objašnjenja</li>
                      </ul>
                    </div>
                    
                    <div className="w-full">
                      <p className="text-sm text-gray-400">
                        Izveštaj će biti poslat na vašu email adresu u roku od 48 sati od potvrde uplate.
                        Za sva pitanja, molimo kontaktirajte nas na: 
                        <Link href="mailto:info@zvezde365.com" className="text-pink-400 hover:text-pink-300 ml-1">
                          info@zvezde365.com
                        </Link>
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  text: "Godišnji izveštaj mi je pomogao da se pripremim za izazove i prilike koje su dolazile. Neverovatno koliko je bio precizan!",
                  author: "Marija J.",
                  location: "Beograd"
                },
                {
                  text: "Karijerni izveštaj je bio ključan za moje profesionalno usmerenje. Pomogao mi je da razumem svoje talente i gde mogu najbolje da ih iskoristim.",
                  author: "Nikola P.",
                  location: "Novi Sad"
                },
                {
                  text: "Izveštaj o odnosima mi je otvorio oči za dinamiku u mojoj vezi. Preporuke su bile praktične i zaista su poboljšale našu komunikaciju.",
                  author: "Ana D.",
                  location: "Niš"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-50 border border-purple-500/20 p-6 rounded-lg">
                  <p className="text-gray-300 italic mb-4">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                      <span className="font-bold text-white">{testimonial.author.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <div className="font-medium text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* FAQ Section */}
            <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
              <CardHeader>
                <CardTitle>Često postavljana pitanja</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    question: "Koliko brzo ću dobiti svoj izveštaj?",
                    answer: "Izveštaji se obično isporučuju u roku od 48 sati od potvrde uplate. U periodima povećanog obima posla, može potrajati do 72 sata."
                  },
                  {
                    question: "Šta ako ne znam tačno vreme svog rođenja?",
                    answer: "Vreme rođenja je važno za preciznu analizu, posebno za pozicije kuća i Ascendenta. Ako ne znate tačno vreme, unesite približno i naznačite u napomeni, a naš astrolog će prilagoditi analizu."
                  },
                  {
                    question: "Da li mogu naručiti izveštaj za drugu osobu?",
                    answer: "Da, možete naručiti izveštaj za drugu osobu ukoliko imate njihove tačne podatke o rođenju i saglasnost. U polju za ime unesite njihove podatke, a u napomeni naznačite da je izveštaj za drugu osobu."
                  },
                  {
                    question: "Koliko je detaljan izveštaj koji ću dobiti?",
                    answer: "Svi naši izveštaji su izuzetno detaljni i personalizovani, obično između 15-30 strana, zavisno od tipa izveštaja. Svaki izveštaj sadrži tumačenja, grafikone, i praktične savete."
                  },
                  {
                    question: "Mogu li dobiti pojašnjenje ako mi nešto u izveštaju nije jasno?",
                    answer: "Apsolutno! Nakon što primite izveštaj, imate pravo na jednu rundu pitanja za pojašnjenje. Za detaljnije konsultacije, možete zakazati dodatni razgovor sa našim astrologom."
                  }
                ].map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium text-white">{faq.question}</h3>
                    <p className="text-gray-300 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* CTA Section */}
            <div className="text-center bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Otkrijte šta zvezde kažu o vašoj budućnosti</h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Naši profesionalni astrolozi pripremaju personalizovane izveštaje koji će vam pomoći da razumete sebe, svoje odnose i životni put.
              </p>
              <Button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setSelectedTab("reports");
                }}
                className="bg-white text-purple-900 hover:bg-gray-200"
              >
                <Star className="mr-2 h-4 w-4 text-purple-900" />
                Naručite vaš izveštaj danas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}