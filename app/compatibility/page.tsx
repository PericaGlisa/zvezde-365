"use client";

import { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from 'date-fns';
import { CalendarIcon, Star, Heart, ArrowRight, Clock } from "lucide-react";

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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Form schema for validation
const formSchema = z.object({
  person1: z.object({
    fullName: z.string().min(2, {
      message: "Ime i prezime mora imati najmanje 2 karaktera.",
    }),
    gender: z.string({
      required_error: "Molimo izaberite pol.",
    }),
    birthDate: z.date({
      required_error: "Datum rođenja je obavezan.",
    }),
    birthTime: z.object({
      hour: z.string({
        required_error: "Sat rođenja je obavezan."
      }),
      minute: z.string({
        required_error: "Minut rođenja je obavezan."
      }),
    }, {
      required_error: "Vreme rođenja je obavezno."
    }),
    birthPlace: z.string().min(2, {
      message: "Mesto rođenja mora imati najmanje 2 karaktera.",
    }),
  }),
  person2: z.object({
    fullName: z.string().min(2, {
      message: "Ime i prezime mora imati najmanje 2 karaktera.",
    }),
    gender: z.string({
      required_error: "Molimo izaberite pol.",
    }),
    birthDate: z.date({
      required_error: "Datum rođenja je obavezan.",
    }),
    birthTime: z.object({
      hour: z.string({
        required_error: "Sat rođenja je obavezan."
      }),
      minute: z.string({
        required_error: "Minut rođenja je obavezan."
      }),
    }, {
      required_error: "Vreme rođenja je obavezno."
    }),
    birthPlace: z.string().min(2, {
      message: "Mesto rođenja mora imati najmanje 2 karaktera.",
    }),
  }),
  relationshipType: z.string({
    required_error: "Molimo izaberite vrstu odnosa.",
  }),
});

export default function CompatibilityPage() {
  const [showResults, setShowResults] = useState(false);
  const [compatibilityScore, setCompatibilityScore] = useState(0);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      person1: {
        fullName: "",
        gender: "",
        birthTime: {
          hour: "12",
          minute: "00",
        },
        birthPlace: "",
      },
      person2: {
        fullName: "",
        gender: "",
        birthTime: {
          hour: "12",
          minute: "00",
        },
        birthPlace: "",
      },
      relationshipType: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    // Simulate compatibility calculation
    // In a real app, this would use astrological algorithms based on birth data
    const randomScore = Math.floor(Math.random() * 41) + 60; // Score between 60-100
    setCompatibilityScore(randomScore);
    setShowResults(true);
  }

  const getCompatibilityText = (score: number) => {
    if (score >= 90) {
      return "Izvanredna kompatibilnost! Vaša astrološka energija se izuzetno dobro slaže, stvarajući harmoničnu i obogaćujuću vezu.";
    } else if (score >= 80) {
      return "Veoma jaka kompatibilnost. Vaši astrološki profili pokazuju snažnu povezanost i međusobno razumevanje.";
    } else if (score >= 70) {
      return "Dobra kompatibilnost. Postoje snažne tačke povezanosti, ali i oblasti koje zahtevaju razumevanje i kompromis.";
    } else {
      return "Umerena kompatibilnost. Vaši astrološki profili imaju značajne razlike, ali uz rad i razumevanje možete izgraditi skladnu vezu.";
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "from-pink-500 to-red-500";
    if (score >= 80) return "from-orange-500 to-amber-500";
    if (score >= 70) return "from-yellow-500 to-green-500";
    return "from-blue-500 to-purple-500";
  };
  
  // Format date in Yugoslav style (DD.MM.YYYY)
  const formatYugoslavDate = (date: Date) => {
    return format(date, "dd.MM.yyyy.");
  };

  // Format birth time for display
  const formatBirthTime = (timeObj: { hour: string; minute: string }) => {
    return `${timeObj.hour}:${timeObj.minute}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Heart size={40} className="text-pink-400 sm:w-12 sm:h-12 md:w-12 md:h-12" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Astrološka kompatibilnost
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Otkrijte astrološku kompatibilnost između vas i vašeg partnera, prijatelja ili kolege. Saznajte kako se vaše zvezde slažu.
            </p>
          </div>

          {/* Main Content - Forms or Results */}
          {!showResults ? (
            <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Analizirajte kompatibilnost</CardTitle>
                <CardDescription className="text-gray-300 text-sm sm:text-base">
                  Unesite podatke obe osobe za detaljnu analizu astrološke kompatibilnosti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Tabs defaultValue="person1" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 bg-gray-900">
                        <TabsTrigger 
                          value="person1" 
                          className="text-gray-300 data-[state=active]:text-pink-400 data-[state=active]:bg-gray-800"
                        >
                          Osoba 1
                        </TabsTrigger>
                        <TabsTrigger 
                          value="person2" 
                          className="text-gray-300 data-[state=active]:text-pink-400 data-[state=active]:bg-gray-800"
                        >
                          Osoba 2
                        </TabsTrigger>
                        <TabsTrigger 
                          value="relationship" 
                          className="text-gray-300 data-[state=active]:text-pink-400 data-[state=active]:bg-gray-800"
                        >
                          Veza
                        </TabsTrigger>
                      </TabsList>
                      
                      {/* Person 1 Tab */}
                      <TabsContent value="person1" className="pt-4 space-y-6">
                        <h3 className="text-lg font-medium text-white">Podaci za prvu osobu</h3>
                        
                        {/* Full Name */}
                        <FormField
                          control={form.control}
                          name="person1.fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white text-sm sm:text-base">Ime i prezime</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Unesite ime i prezime" 
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
                          name="person1.gender"
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
                          name="person1.birthDate"
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
                          name="person1.birthTime"
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
                                        {form.watch("person1.birthTime") ? 
                                          formatBirthTime(form.watch("person1.birthTime")) : 
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
                                          value={form.watch("person1.birthTime.hour")}
                                          onValueChange={(value) => form.setValue("person1.birthTime.hour", value)}
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
                                          value={form.watch("person1.birthTime.minute")}
                                          onValueChange={(value) => form.setValue("person1.birthTime.minute", value)}
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
                          name="person1.birthPlace"
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
                      </TabsContent>
                      
                      {/* Person 2 Tab */}
                      <TabsContent value="person2" className="pt-4 space-y-6">
                        <h3 className="text-lg font-medium text-white">Podaci za drugu osobu</h3>
                        
                        {/* Full Name */}
                        <FormField
                          control={form.control}
                          name="person2.fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white text-sm sm:text-base">Ime i prezime</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Unesite ime i prezime" 
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
                          name="person2.gender"
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
                          name="person2.birthDate"
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
                          name="person2.birthTime"
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
                                        {form.watch("person2.birthTime") ? 
                                          formatBirthTime(form.watch("person2.birthTime")) : 
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
                                          value={form.watch("person2.birthTime.hour")}
                                          onValueChange={(value) => form.setValue("person2.birthTime.hour", value)}
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
                                          value={form.watch("person2.birthTime.minute")}
                                          onValueChange={(value) => form.setValue("person2.birthTime.minute", value)}
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
                          name="person2.birthPlace"
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
                      </TabsContent>
                      
                      {/* Relationship Tab */}
                      <TabsContent value="relationship" className="pt-4 space-y-6">
                        <h3 className="text-lg font-medium text-white">Informacije o odnosu</h3>
                        
                        {/* Relationship Type */}
                        <FormField
                          control={form.control}
                          name="relationshipType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white text-sm sm:text-base">Vrsta odnosa</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11">
                                    <SelectValue placeholder="Izaberite vrstu odnosa" className="text-white" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-700 border-gray-600">
                                  <SelectItem value="romantic" className="text-white">Ljubavni odnos</SelectItem>
                                  <SelectItem value="friendship" className="text-white">Prijateljstvo</SelectItem>
                                  <SelectItem value="business" className="text-white">Poslovni odnos</SelectItem>
                                  <SelectItem value="family" className="text-white">Porodični odnos</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-6">
                          <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-sm sm:text-base h-10 sm:h-11">
                            Izračunaj kompatibilnost
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="border-t border-gray-700 pt-6 flex flex-col items-start space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-1">Šta dobijate:</h3>
                  <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                    <li>Detaljnu analizu kompatibilnosti između dve osobe</li>
                    <li>Procenu usklađenosti horoskopskih znakova</li>
                    <li>Analizu planetarnih aspekata i njihovog uticaja na odnos</li>
                    <li>Savete za poboljšanje komunikacije i razumevanja</li>
                    <li>Predviđanje potencijalnih izazova i snaga vašeg odnosa</li>
                  </ul>
                </div>
              </CardFooter>
            </Card>
          ) : (
            // Results Card
            <div className="space-y-8">
              <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl overflow-hidden">
                <div className={`bg-gradient-to-r ${getCompatibilityColor(compatibilityScore)} h-2`}></div>
                <CardHeader>
                  <CardTitle>Rezultati astrološke kompatibilnosti</CardTitle>
                  <CardDescription className="text-gray-300">
                    Detaljna analiza astrološke kompatibilnosti između dve osobe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6">
                      <div className="h-48 w-48 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                        <div className="h-40 w-40 rounded-full bg-gray-800 flex items-center justify-center text-4xl font-bold text-white">
                          {compatibilityScore}%
                        </div>
                      </div>
                      <div className="absolute -top-2 left-0 h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute -top-2 right-0 h-12 w-12 rounded-full bg-pink-600 flex items-center justify-center">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {form.getValues().person1.fullName} & {form.getValues().person2.fullName}
                    </h3>
                    <p className="text-gray-300 text-center">
                      {getCompatibilityText(compatibilityScore)}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-4">
                      <h4 className="font-semibold border-b border-gray-700 pb-2 text-white">Snage odnosa</h4>
                      <ul className="text-sm text-gray-300 list-disc pl-5 space-y-2">
                        <li>Jaka emocionalna povezanost kroz Veneru i Mesec</li>
                        <li>Komplementarna priroda vaših Sunčevih znakova</li>
                        <li>Povoljan Mars aspekt koji donosi strast i energiju</li>
                        <li>Međusobno razumevanje i intelektualna stimulacija</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold border-b border-gray-700 pb-2 text-white">Potencijalni izazovi</h4>
                      <ul className="text-sm text-gray-300 list-disc pl-5 space-y-2">
                        <li>Napetost između Saturna i Meseca može stvarati emocionalne blokade</li>
                        <li>Različiti komunikacijski stilovi zahtevaju prilagođavanje</li>
                        <li>Potrebno je raditi na usklađivanju životnih ciljeva</li>
                        <li>Poštovanje međusobnih različitosti i granica</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
                  <Button onClick={() => setShowResults(false)} variant="outline" className="bg-gray-700 border-gray-600 mb-4 md:mb-0 w-full md:w-auto text-white">
                    Nazad na kalkulator
                  </Button>
                  <Button className="bg-pink-600 hover:bg-pink-700 w-full md:w-auto">
                    Naručite detaljnu analizu
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="text-center">
                <p className="text-gray-300 mb-4">
                  Želite detaljniju analizu kompatibilnosti? Poručite naš premium izveštaj koji uključuje:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-400 mb-2">Potpuna analiza svih aspekata</h4>
                    <p className="text-sm text-gray-300">Detaljna analiza svih planetarnih aspekata između vaših natalnih karti</p>
                  </div>
                  <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-400 mb-2">Preporuke za harmoniju</h4>
                    <p className="text-sm text-gray-300">Praktični saveti za unapređenje komunikacije i razumevanja</p>
                  </div>
                  <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-400 mb-2">Dugoročna prognoza</h4>
                    <p className="text-sm text-gray-300">Pregled kako će se vaš odnos razvijati tokom vremena pod uticajem tranzita</p>
                  </div>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Poručite premium izveštaj
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}