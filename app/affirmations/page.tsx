"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from 'date-fns';
import { CalendarIcon, Copy, Download, Feather, Star, ArrowRight, Check, Share2, Moon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

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
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { zodiacSigns, calculateMoonPhase, generateAffirmation } from '@/lib/astrology-utils';

// Map zodiac sign IDs to their SVG image paths
const zodiacSvgMap: Record<string, string> = {
  'aries': '/images/zodiac-symbols/Ovan.svg',
  'taurus': '/images/zodiac-symbols/Bik.svg',
  'gemini': '/images/zodiac-symbols/Blizanac.svg',
  'cancer': '/images/zodiac-symbols/Rak.svg',
  'leo': '/images/zodiac-symbols/Lav.svg',
  'virgo': '/images/zodiac-symbols/Devica.svg',
  'libra': '/images/zodiac-symbols/Vaga.svg',
  'scorpio': '/images/zodiac-symbols/Škorpija.svg',
  'sagittarius': '/images/zodiac-symbols/Strelac.svg',
  'capricorn': '/images/zodiac-symbols/Jarac.svg',
  'aquarius': '/images/zodiac-symbols/Vodolija.svg',
  'pisces': '/images/zodiac-symbols/Riba.svg',
};

// Schema for the form
const formSchema = z.object({
  zodiacSign: z.string({
    required_error: "Molimo izaberite vaš zodijački znak",
  }),
  birthDate: z.date().optional(),
  birthPlace: z.string().optional(),
  customFocus: z.string().optional(),
  category: z.enum(['general', 'love', 'career', 'health', 'spiritual'])
});

export default function AffirmationsPage() {
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAffirmations, setGeneratedAffirmations] = useState<string[]>([]);
  const [moonPhase, setMoonPhase] = useState<string>("new_moon");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("daily");
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zodiacSign: "",
      category: "general",
      customFocus: ""
    },
  });
  
  // Effect to load the current moon phase
  useEffect(() => {
    const currentMoonPhase = calculateMoonPhase();
    setMoonPhase(currentMoonPhase.phase);
  }, []);

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Start generating animations
    setIsGenerating(true);
    
    try {
      // Short delay to simulate processing
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      // Generate 5 affirmations based on the zodiac sign and moon phase
      const affirmations = Array(5).fill(null).map(() => 
        generateAffirmation(values.zodiacSign, moonPhase)
      );
      
      setGeneratedAffirmations(affirmations);
      setShowResults(true);
    } catch (error) {
      console.error('Error generating affirmations:', error);
      toast.error("Došlo je do greške prilikom generisanja afirmacija. Molimo pokušajte ponovo.");
    } finally {
      setIsGenerating(false);
    }
  }
  
  // Get the details of the current zodiac sign
  const currentSign = form.watch('zodiacSign') 
    ? zodiacSigns.find(sign => sign.id === form.watch('zodiacSign')) 
    : null;

  // Function to copy affirmation to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        toast.success("Afirmacija je kopirana!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Nije moguće kopirati tekst.");
      });
  };

  // Function to download affirmations as PDF
  const downloadAsPDF = () => {
    toast.success("Afirmacije su preuzete kao PDF!");
  };

  // Function to share affirmations
  const shareAffirmations = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Moje astrološke afirmacije',
        text: generatedAffirmations.join('\n\n'),
      })
      .then(() => toast.success("Uspešno podeljeno!"))
      .catch(error => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(generatedAffirmations.join('\n\n'))
        .then(() => toast.success("Afirmacije kopirane za deljenje!"))
        .catch(() => toast.error("Greška pri kopiranju."));
    }
  };

  // Format date
  const formatYugoslavDate = (date: Date | null | undefined) => {
    // Check if date is valid before formatting
    if (!date || isNaN(date.getTime())) {
      return "Nije izabrano";
    }
    return format(date, "dd.MM.yyyy.");
  };

  // Function to get text for the current tab
  const getTabText = () => {
    switch(activeTab) {
      case "daily":
        return "Dnevne afirmacije pomažu vam da postavite pozitivan ton za dan i fokusirate se na željene rezultate.";
      case "weekly":
        return "Nedeljne afirmacije su odlične za postavljanje namera i fokusiranje na ciljeve za predstojeću nedelju.";
      case "monthly":
        return "Mesečne afirmacije su moćne za postavljanje dugoročnijih ciljeva i usklađivanje sa mesečnim ciklusima.";
      default:
        return "Izaberite period za vaše afirmacije.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Feather size={40} className="text-yellow-400 sm:w-12 sm:h-12 md:w-12 md:h-12" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Personalizovane astrološke afirmacije
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Otkrijte moćne personalizovane afirmacije zasnovane na vašem zodijačkom znaku i trenutnoj fazi Meseca.
            </p>
          </div>

          {/* Main Content */}
          {!showResults ? (
            <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Generišite vaše afirmacije</CardTitle>
                <CardDescription className="text-gray-300 text-sm sm:text-base">
                  Unesite vaše astrološke podatke za personalizovane afirmacije
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                    {/* Zodiac Sign */}
                    <FormField
                      control={form.control}
                      name="zodiacSign"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm sm:text-base">Vaš zodijački znak</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11">
                                <SelectValue placeholder="Izaberite svoj znak" className="text-white" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              {zodiacSigns.map(sign => (
                                <SelectItem key={sign.id} value={sign.id} className="text-white">
                                  <div className="flex items-center justify-start w-full">
                                    <div className={`w-5 h-5 mr-3 relative flex items-center justify-center ${sign.id === 'aquarius' ? 'pt-0.5' : ''}`}>
                                      <Image 
                                        src={zodiacSvgMap[sign.id]} 
                                        alt={sign.name}
                                        width={20}
                                        height={20}
                                        className="object-contain"
                                      />
                                    </div>
                                    <span className="flex-1 text-left">{sign.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Birth Date - Optional */}
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-white text-sm sm:text-base">Datum rođenja (opcionalno)</FormLabel>
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
                          <FormDescription className="text-gray-400">
                            Za precizniju personalizaciju, ali nije neophodno.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Birth Place - Optional */}
                    <FormField
                      control={form.control}
                      name="birthPlace"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm sm:text-base">Mesto rođenja (opcionalno)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Unesite mesto rođenja"
                              {...field}
                              className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400 text-xs sm:text-sm">
                            Ovo pomaže u preciznijoj kalibraciji afirmacija.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Category */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm sm:text-base">Kategorija afirmacija</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11">
                                <SelectValue placeholder="Izaberite kategoriju" className="text-white" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="general" className="text-white">Opšte afirmacije</SelectItem>
                              <SelectItem value="love" className="text-white">Ljubav i odnosi</SelectItem>
                              <SelectItem value="career" className="text-white">Karijera i uspeh</SelectItem>
                              <SelectItem value="health" className="text-white">Zdravlje i vitalnost</SelectItem>
                              <SelectItem value="spiritual" className="text-white">Duhovno buđenje</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-gray-400 text-xs sm:text-sm">
                            Izaberite fokus vaših personalizovanih afirmacija.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Custom Focus - Optional */}
                    <FormField
                      control={form.control}
                      name="customFocus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm sm:text-base">Poseban fokus (opcionalno)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Npr. 'Želim afirmacije za samoprihvatanje' ili 'Fokus na finansijski prosperitet'"
                              className="bg-gray-700 border-gray-600 text-white resize-none h-16 sm:h-20 text-sm sm:text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400 text-xs sm:text-sm">
                            Opišite specifične situacije ili ciljeve za koje želite afirmacije.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-2">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className="flex-1 h-px bg-gray-700"></div>
                        <div className="px-3 sm:px-4 text-xs sm:text-sm text-gray-400 flex items-center">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-yellow-500" />
                          Trenutna Mesečeva faza
                        </div>
                        <div className="flex-1 h-px bg-gray-700"></div>
                      </div>
                      
                      <div className="bg-gray-700/50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3 sm:mr-4 overflow-hidden">
                            {moonPhase === 'new_moon' ? (
                              <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-700"></div>
                            ) : moonPhase === 'full_moon' ? (
                              <div className="w-8 h-8 rounded-full bg-blue-100"></div>
                            ) : moonPhase.includes('waxing') ? (
                              <div className="w-full h-full relative">
                                <div className="absolute inset-0 bg-gray-900"></div>
                                <div 
                                  className="absolute inset-0 bg-blue-100" 
                                  style={{ 
                                    clipPath: moonPhase === 'waxing_crescent' 
                                      ? 'polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)' 
                                      : 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' 
                                  }}
                                ></div>
                              </div>
                            ) : (
                              <div className="w-full h-full relative">
                                <div className="absolute inset-0 bg-gray-900"></div>
                                <div 
                                  className="absolute inset-0 bg-blue-100" 
                                  style={{ 
                                    clipPath: moonPhase === 'waning_crescent' 
                                      ? 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' 
                                      : 'polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)' 
                                  }}
                                ></div>
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-white text-sm sm:text-base">
                              {moonPhase === 'new_moon' && 'Mlad Mesec'}
                              {moonPhase === 'waxing_crescent' && 'Rastući polumesec'}
                              {moonPhase === 'first_quarter' && 'Prva četvrt'}
                              {moonPhase === 'waxing_gibbous' && 'Rastuća ispupčenost'}
                              {moonPhase === 'full_moon' && 'Pun Mesec'}
                              {moonPhase === 'waning_gibbous' && 'Opadajuća ispupčenost'}
                              {moonPhase === 'last_quarter' && 'Poslednja četvrt'}
                              {moonPhase === 'waning_crescent' && 'Opadajući polumesec'}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-400">Vaše afirmacije će biti optimizovane za ovu fazu Meseca</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-sm sm:text-base h-10 sm:h-11"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Feather className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                          <span className="hidden sm:inline">Generisanje afirmacija...</span>
                          <span className="sm:hidden">Generisanje...</span>
                        </>
                      ) : (
                        <>
                          <Feather className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Generišite vaše afirmacije</span>
                          <span className="sm:hidden">Generiši afirmacije</span>
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="border-t border-gray-700 pt-3 sm:pt-4 flex flex-col items-start space-y-3 sm:space-y-4 p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-gray-400">
                  Afirmacije su zasnovane na astrološkim faktorima uključujući vaš zodijački znak i trenutnu fazu Meseca.
                  Za najpreciznije rezultate, preporučujemo da uključite i datum rođenja.
                </p>
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-8">
              <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="flex items-center">
                      <Feather className="mr-2 h-6 w-6 text-purple-400" />
                      Vaše personalizovane afirmacije
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Za zodijački znak {currentSign?.name} u trenutnoj fazi Meseca
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    className="bg-gray-700 border-gray-600 text-white"
                    onClick={() => setShowResults(false)}
                  >
                    Resetujte
                  </Button>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-900">
                      <TabsTrigger 
                        value="daily" 
                        className="text-gray-300 data-[state=active]:text-purple-400 data-[state=active]:bg-gray-800"
                      >
                        Dnevne
                      </TabsTrigger>
                      <TabsTrigger 
                        value="weekly" 
                        className="text-gray-300 data-[state=active]:text-purple-400 data-[state=active]:bg-gray-800"
                      >
                        Nedeljne
                      </TabsTrigger>
                      <TabsTrigger 
                        value="monthly" 
                        className="text-gray-300 data-[state=active]:text-purple-400 data-[state=active]:bg-gray-800"
                      >
                        Mesečne
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="mt-4 mb-6 p-4 bg-gray-700/50 rounded text-sm text-gray-300">
                      {getTabText()}
                    </div>
                    
                    <div className="space-y-4">
                      {generatedAffirmations.map((affirmation, index) => (
                        <div 
                          key={index}
                          className="bg-gray-700/50 border border-gray-600/50 p-4 rounded-lg relative"
                        >
                          <div className="absolute top-3 right-3">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white" 
                              onClick={() => copyToClipboard(affirmation)}
                            >
                              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                          <div className="pr-10">
                            <p className="text-white italic">"{affirmation}"</p>
                          </div>
                          <div className="mt-2 flex items-center text-xs text-gray-400">
                            <div className={`w-4 h-4 mr-1 relative ${form.getValues().zodiacSign === 'aquarius' ? 'pt-0.5' : ''}`}>
                              <Image 
                                src={zodiacSvgMap[form.getValues().zodiacSign]} 
                                alt={currentSign?.name || 'Zodiac sign'}
                                width={16}
                                height={16}
                              />
                            </div>
                            <span>{currentSign?.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tabs>
                </CardContent>
                
                <CardFooter className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex gap-2 w-full md:w-auto">
                    <Button 
                      variant="outline" 
                      className="bg-gray-700 border-gray-600 text-white flex-1 md:flex-none"
                      onClick={downloadAsPDF}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      <span>Sačuvaj kao PDF</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="bg-gray-700 border-gray-600 text-white flex-1 md:flex-none"
                      onClick={shareAffirmations}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      <span>Podeli</span>
                    </Button>
                  </div>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto" 
                    onClick={() => {
                      setIsGenerating(true);
                      setTimeout(() => {
                        const newAffirmations = Array(5).fill(null).map(() => 
                          generateAffirmation(form.getValues().zodiacSign, moonPhase)
                        );
                        setGeneratedAffirmations(newAffirmations);
                        setIsGenerating(false);
                      }, 1000);
                    }}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Feather className="mr-2 h-4 w-4 animate-spin" />
                        Regenerisanje...
                      </>
                    ) : (
                      <>
                        <Feather className="mr-2 h-4 w-4" />
                        Generiši nove afirmacije
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="text-center bg-gradient-to-r from-blue-900/70 to-purple-900/70 p-6 rounded-lg backdrop-blur-sm border border-blue-500/20">
                <h2 className="text-xl text-white font-semibold mb-4">Praktikovanje afirmacija</h2>
                <div className="grid md:grid-cols-3 gap-4 text-left mb-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-purple-400 font-medium mb-2">Jutarnja rutina</h3>
                    <p className="text-sm text-gray-300">Ponavljajte svoje dnevne afirmacije ujutru kako biste postavili pozitivnu nameru za dan.</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-purple-400 font-medium mb-2">Meditacija</h3>
                    <p className="text-sm text-gray-300">Inkorporirajte afirmacije u vašu meditativnu praksu za dublji efekat.</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-purple-400 font-medium mb-2">Pisanje</h3>
                    <p className="text-sm text-gray-300">Zapisujte afirmacije više puta da biste ih dublje utisnuli u podsvest.</p>
                  </div>
                </div>
                <Link href="/lunar-phases">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Moon className="mr-2 h-4 w-4" />
                    Istražite Mesečeve faze
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}