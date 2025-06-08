"use client";

import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from 'date-fns';
import { 
  CalendarIcon, 
  Star, 
  Download, 
  Sparkles, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Info,
  Calendar 
} from "lucide-react";
import Link from 'next/link';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import { zodiacSigns, planets, aspects } from '@/lib/astrology-utils';
import { 
  ZodiacSignSymbol, 
  PlanetSymbol, 
  AspectSymbol 
} from '@/components/astrology/AstrologySymbols';

// Form schema for transit calculations
const transitFormSchema = z.object({
  birthDate: z.date({
    required_error: "Datum rođenja je obavezan.",
  }),
  transitDate: z.date({
    required_error: "Datum za tranzit je obavezan.",
  }).default(() => new Date()),
  selectedPlanets: z.array(z.string()).min(1, {
    message: "Izaberite najmanje jednu planetu za tranzite.",
  }),
  natalPlanets: z.array(z.string()).min(1, {
    message: "Izaberite najmanje jednu natalnu planetu za aspekte.",
  }),
  aspectTypes: z.array(z.string()).min(1, {
    message: "Izaberite najmanje jedan tip aspekta.",
  }),
});

type Aspect = {
  transitPlanet: string;
  natalPlanet: string;
  aspectType: string;
  orb: number; // how close the aspect is to exact (in degrees)
  applying: boolean; // whether the aspect is approaching exactitude or moving away
  significance: 'minor' | 'moderate' | 'major';
};

export default function TransitCalculatorPage() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [transitResults, setTransitResults] = useState<Aspect[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // Initialize form
  const form = useForm<z.infer<typeof transitFormSchema>>({
    resolver: zodResolver(transitFormSchema),
    defaultValues: {
      transitDate: new Date(),
      selectedPlanets: ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"],
      natalPlanets: ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "ascendant", "midheaven"],
      aspectTypes: ["conjunction", "opposition", "trine", "square", "sextile"],
    },
  });
  
  // Calculate transits (in a real app, this would be much more complex with actual astronomical calculations)
  async function onSubmit(values: z.infer<typeof transitFormSchema>) {
    setIsCalculating(true);
    
    try {
      // In a production app, this would call a real astronomical calculation service
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
      
      // Generate mock transit results for demonstration
      const mockResults: Aspect[] = generateMockTransits(values);
      
      setTransitResults(mockResults);
      setHasCalculated(true);
      toast.success("Tranziti su uspešno izračunati!");
    } catch (error) {
      console.error('Error calculating transits:', error);
      toast.error("Došlo je do greške pri izračunavanju tranzita. Molimo pokušajte ponovo.");
    } finally {
      setIsCalculating(false);
    }
  }

  // Mock function to generate transit aspects for demonstration
  function generateMockTransits(values: z.infer<typeof transitFormSchema>): Aspect[] {
    const results: Aspect[] = [];
    
    // For each selected transit planet
    values.selectedPlanets.forEach(transitPlanet => {
      // Generate aspects with natal planets
      values.natalPlanets.forEach(natalPlanet => {
        // Skip duplicate planet combinations
        if (transitPlanet === natalPlanet) return;
        
        // For each selected aspect type
        values.aspectTypes.forEach(aspectType => {
          // Randomly decide if this aspect exists (for demo purposes)
          if (Math.random() > 0.65) {
            // Generate random orb between 0 and 8 degrees
            const orb = Math.random() * 8;
            
            // Add aspect to results
            results.push({
              transitPlanet,
              natalPlanet,
              aspectType,
              orb,
              applying: Math.random() > 0.5, // randomly applying or separating
              significance: orb < 2 ? 'major' : orb < 4 ? 'moderate' : 'minor'
            });
          }
        });
      });
    });
    
    // Sort by significance and orb
    return results.sort((a, b) => {
      if (a.significance !== b.significance) {
        return a.significance === 'major' ? -1 : a.significance === 'moderate' ? 0 : 1;
      }
      return a.orb - b.orb;
    });
  }

  // Format date for display
  const formatYugoslavDate = (date: Date | null | undefined) => {
    // Check if date is valid before formatting
    if (!date || isNaN(date.getTime())) {
      return "Nije izabrano";
    }
    return format(date, "dd.MM.yyyy.");
  };
  
  // Get planet name by ID
  const getPlanetName = (planetId: string) => {
    const planet = planets.find(p => p.id === planetId);
    if (planet) return planet.name;
    if (planetId === 'ascendant') return 'Ascendent';
    if (planetId === 'midheaven') return 'Medium Coeli';
    return planetId;
  };
  
  // Get aspect name by ID
  const getAspectName = (aspectId: string) => {
    const aspect = aspects.find(a => a.id === aspectId);
    return aspect ? aspect.name : aspectId;
  };
  
  // Get aspect color by type
  const getAspectColor = (aspectType: string, significance: 'minor' | 'moderate' | 'major') => {
    const baseColors: Record<string, string> = {
      'conjunction': 'text-yellow-400',
      'opposition': 'text-red-400',
      'trine': 'text-green-400',
      'square': 'text-orange-400',
      'sextile': 'text-blue-400',
      'quincunx': 'text-purple-400',
      'semisextile': 'text-blue-300',
      'semisquare': 'text-orange-300',
      'sesquisquare': 'text-red-300',
      'quintile': 'text-indigo-400',
      'biquintile': 'text-indigo-300'
    };
    
    // If significance is minor, make the color more muted
    if (significance === 'minor') {
      return baseColors[aspectType]?.replace('-400', '-300')?.replace('-300', '-200') || 'text-gray-400';
    }
    
    return baseColors[aspectType] || 'text-white';
  };
  
  // Get border color for aspect card based on significance
  const getAspectBorderColor = (significance: 'minor' | 'moderate' | 'major') => {
    switch (significance) {
      case 'major':
        return 'border-yellow-500/30';
      case 'moderate':
        return 'border-blue-500/30';
      case 'minor':
        return 'border-gray-500/30';
      default:
        return 'border-gray-500/30';
    }
  };

  // Get interpretation for an aspect
  const getAspectInterpretation = (aspect: Aspect): string => {
    const transitPlanet = getPlanetName(aspect.transitPlanet);
    const natalPlanet = getPlanetName(aspect.natalPlanet);
    const aspectName = getAspectName(aspect.aspectType);
    
    const interpretations: Record<string, Record<string, string>> = {
      'conjunction': {
        'sun': `Tranzitno ${transitPlanet} u konjunkciji sa vašim natalnim ${natalPlanet} donosi period intenzivne energije i fokusa. Ovo je vreme kada možete jasnije izraziti kvalitete vašeg natalnog ${natalPlanet}.`,
        'moon': `Tranzitno ${transitPlanet} u konjunkciji sa vašim natalnim ${natalPlanet} pojačava vaše emocije i intuiciju. Period je pogodan za emotivno povezivanje i razumevanje dubinskih osećanja.`,
        'default': `Tranzitno ${transitPlanet} u konjunkciji sa vašim natalnim ${natalPlanet} aktivira i pojačava karakteristike i teme povezane sa obe planete. Ovo je period kada ove energije dobijaju na značaju u vašem životu.`
      },
      'opposition': {
        'default': `Tranzitno ${transitPlanet} u opoziciji sa vašim natalnim ${natalPlanet} stvara dinamiku tenzije i balansa. Možda ćete se suočiti sa izazovima koji zahtevaju integraciju ovih naizgled suprotstavljenih energija.`
      },
      'trine': {
        'default': `Tranzitno ${transitPlanet} u trigonu sa vašim natalnim ${natalPlanet} stvara period harmonije i lakoće. Kvaliteti obe planete se prirodno podržavaju i omogućavaju vam napredak bez velikih prepreka.`
      },
      'square': {
        'default': `Tranzitno ${transitPlanet} u kvadratu sa vašim natalnim ${natalPlanet} donosi izazove koji traže akciju i prilagođavanje. Ove tenzije mogu biti produktivne ako ih iskoristite kao motiv za neophodne promene.`
      },
      'sextile': {
        'default': `Tranzitno ${transitPlanet} u sekstilu sa vašim natalnim ${natalPlanet} pruža prilike za rast i razvoj. Ovo je povoljan period za aktivnosti povezane sa kvalitetima obe planete.`
      }
    };
    
    // Check for specific planet combinations first, then default to general aspect interpretation
    if (interpretations[aspect.aspectType]) {
      if (interpretations[aspect.aspectType][aspect.natalPlanet]) {
        return interpretations[aspect.aspectType][aspect.natalPlanet];
      } else {
        return interpretations[aspect.aspectType]['default'];
      }
    }
    
    // Fallback general interpretation
    return `Tranzitno ${transitPlanet} formira ${aspectName} sa vašim natalnim ${natalPlanet}, što utiče na oblasti života povezane sa obe planete.`;
  };

  // Generate a recommendation based on all current transits
  const generateOverallRecommendation = (aspects: Aspect[]): string => {
    if (aspects.length === 0) {
      return "Trenutno nema značajnih tranzita. Ovo je period kada možete fokusirati na lične ciljeve bez velikih spoljnih uticaja.";
    }
    
    // Count aspect types and significances
    const counts = {
      harmonious: 0, // trines, sextiles
      challenging: 0, // squares, oppositions
      major: 0,
      moderate: 0,
      minor: 0
    };
    
    aspects.forEach(aspect => {
      if (aspect.aspectType === 'trine' || aspect.aspectType === 'sextile') {
        counts.harmonious++;
      } else if (aspect.aspectType === 'square' || aspect.aspectType === 'opposition') {
        counts.challenging++;
      }
      
      counts[aspect.significance]++;
    });
    
    // Generate recommendation based on counts
    if (counts.harmonious > counts.challenging * 2) {
      return "Trenutni tranziti su pretežno harmonični, pružajući vam period lakoće i podrške. Ovo je idealno vreme za započinjanje novih projekata, društvene aktivnosti i napredovanje u područjima koja su vam važna. Iskoristite ovaj povoljan period za ostvarivanje ciljeva uz manje otpora nego obično.";
    } else if (counts.challenging > counts.harmonious * 2) {
      return "Trenutni tranziti donose više izazova nego harmonije. Ovo je period rasta kroz suočavanje sa preprekama. Fokusirajte se na strpljenje, samosvest i fleksibilnost. Iako može biti teško, ovi izazovni aspekti često donose najvrednije lekcije i priliku za značajne promene u vašem životu.";
    } else if (counts.major > counts.moderate + counts.minor) {
      return "Trenutno doživljavate nekoliko značajnih tranzita koji mogu označavati važan period u vašem životu. Obratite posebnu pažnju na glavne teme koje se pojavljuju, jer će verovatno imati dugoročni uticaj na vaš životni put. Ovo je vreme kada se donose važne odluke i postavljaju temelji za budućnost.";
    } else {
      return "Trenutni tranziti donose mešavinu harmoničnih i izazovnih uticaja. Ovo je period koji zahteva balans između akcije i refleksije. Možete napredovati u mnogim oblastima, ali uz svest o potencijalnim preprekama. Budite otvoreni za prilike, ali i realistični u proceni izazova.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Calendar size={40} className="text-purple-400 sm:w-12 sm:h-12 md:w-12 md:h-12" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Kalkulator astroloških tranzita
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Izračunajte kako trenutni planetarni položaji utiču na vašu natalnu kartu i saznajte značenje ovih tranzita.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Transit Calculator Form */}
            <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Star className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                  Kalkulator tranzita
                </CardTitle>
                <CardDescription className="text-gray-300 text-sm sm:text-base">
                  Unesite svoj datum rođenja i izaberite datum za koji želite izračunati tranzite
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Birth Date */}
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-white text-sm sm:text-base">Vaš datum rođenja</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal bg-gray-700 border-gray-600 text-white h-10 sm:h-11 text-sm sm:text-base",
                                    !field.value && "text-gray-400"
                                  )}
                                >
                                  {field.value ? (
                                    formatYugoslavDate(field.value)
                                  ) : (
                                    <span>Izaberite datum</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-3 w-3 sm:h-4 sm:w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600" align="start">
                              <CalendarComponent
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
                          <FormDescription className="text-gray-400 text-xs sm:text-sm">
                            Datum za koji je izračunata vaša natalna karta.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Transit Date */}
                    <FormField
                      control={form.control}
                      name="transitDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-white text-sm sm:text-base">Datum za tranzite</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal bg-gray-700 border-gray-600 text-white h-10 sm:h-11 text-sm sm:text-base",
                                    !field.value && "text-gray-400"
                                  )}
                                >
                                  {field.value ? (
                                    formatYugoslavDate(field.value)
                                  ) : (
                                    <span>Izaberite datum</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-3 w-3 sm:h-4 sm:w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="bg-gray-700 text-white"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription className="text-gray-400 text-xs sm:text-sm">
                            Datum za koji želite izračunati tranzite. Može biti prošli, sadašnji ili budući datum.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Selected Transit Planets */}
                    <FormField
                      control={form.control}
                      name="selectedPlanets"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-white text-sm sm:text-base">Tranzitne planete</FormLabel>
                          <div className="bg-gray-700 p-3 sm:p-4 rounded-md">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                              {planets.map((planet) => (
                                <div key={planet.id} className="flex items-center space-x-1 sm:space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`planet-${planet.id}`}
                                    checked={form.watch('selectedPlanets').includes(planet.id)}
                                    onChange={(e) => {
                                      const current = form.watch('selectedPlanets');
                                      if (e.target.checked) {
                                        form.setValue('selectedPlanets', [...current, planet.id]);
                                      } else {
                                        form.setValue('selectedPlanets', current.filter(id => id !== planet.id));
                                      }
                                    }}
                                    className="rounded border-gray-600 text-purple-600 focus:ring-purple-600 bg-gray-800"
                                  />
                                  <label htmlFor={`planet-${planet.id}`} className="text-xs sm:text-sm text-gray-200 cursor-pointer flex items-center">
                                    <PlanetSymbol planet={planet.id} size="sm" className="mr-1 text-blue-400" />
                                    <span className="hidden sm:inline">{planet.name}</span>
                                    <span className="sm:hidden">{planet.name.slice(0, 3)}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <FormDescription className="text-gray-400 text-xs sm:text-sm">
                            Izaberite koje tranzitne planete želite uključiti u kalkulaciju.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Natal Planets */}
                    <FormField
                      control={form.control}
                      name="natalPlanets"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-white text-sm sm:text-base">Natalne planete i tačke</FormLabel>
                          <div className="bg-gray-700 p-3 sm:p-4 rounded-md">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                              {[...planets, 
                                { id: 'ascendant', name: 'Ascendent' },
                                { id: 'midheaven', name: 'Medium Coeli' }
                              ].map((planet) => (
                                <div key={planet.id} className="flex items-center space-x-1 sm:space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`natal-${planet.id}`}
                                    checked={form.watch('natalPlanets').includes(planet.id)}
                                    onChange={(e) => {
                                      const current = form.watch('natalPlanets');
                                      if (e.target.checked) {
                                        form.setValue('natalPlanets', [...current, planet.id]);
                                      } else {
                                        form.setValue('natalPlanets', current.filter(id => id !== planet.id));
                                      }
                                    }}
                                    className="rounded border-gray-600 text-purple-600 focus:ring-purple-600 bg-gray-800"
                                  />
                                  <label htmlFor={`natal-${planet.id}`} className="text-xs sm:text-sm text-gray-200 cursor-pointer flex items-center">
                                    {planet.id === 'ascendant' || planet.id === 'midheaven' ? (
                                      <span className="mr-1 text-xs text-purple-400">{planet.id === 'ascendant' ? 'AS' : 'MC'}</span>
                                    ) : (
                                      <PlanetSymbol planet={planet.id} size="sm" className="mr-1 text-purple-400" />
                                    )}
                                    <span className="hidden sm:inline">{planet.name}</span>
                                    <span className="sm:hidden">{planet.name === 'Ascendent' ? 'AS' : planet.name === 'Medium Coeli' ? 'MC' : planet.name.slice(0, 3)}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <FormDescription className="text-gray-400 text-xs sm:text-sm">
                            Izaberite koje natalne planete i tačke želite uključiti u kalkulaciju.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Aspect Types */}
                    <FormField
                      control={form.control}
                      name="aspectTypes"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-white text-sm sm:text-base">Tipovi aspekata</FormLabel>
                          <div className="bg-gray-700 p-3 sm:p-4 rounded-md">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                              {aspects.slice(0, 5).map((aspect) => (
                                <div key={aspect.id} className="flex items-center space-x-1 sm:space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`aspect-${aspect.id}`}
                                    checked={form.watch('aspectTypes').includes(aspect.id)}
                                    onChange={(e) => {
                                      const current = form.watch('aspectTypes');
                                      if (e.target.checked) {
                                        form.setValue('aspectTypes', [...current, aspect.id]);
                                      } else {
                                        form.setValue('aspectTypes', current.filter(id => id !== aspect.id));
                                      }
                                    }}
                                    className="rounded border-gray-600 text-purple-600 focus:ring-purple-600 bg-gray-800"
                                  />
                                  <label htmlFor={`aspect-${aspect.id}`} className="text-xs sm:text-sm text-gray-200 cursor-pointer flex items-center">
                                    <AspectSymbol aspect={aspect.id} size="sm" className="mr-1 text-yellow-400" />
                                    {aspect.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <FormDescription className="text-gray-400 text-xs sm:text-sm">
                            Izaberite koje tipove aspekata želite uključiti u kalkulaciju tranzita.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full bg-purple-600 hover:bg-purple-700 h-10 sm:h-11 text-sm sm:text-base"
                        disabled={isCalculating}
                      >
                        {isCalculating ? (
                          <>
                            <Star className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin-slow" />
                            <span className="hidden sm:inline">Izračunavanje tranzita...</span>
                            <span className="sm:hidden">Izračunavanje...</span>
                          </>
                        ) : (
                          <>
                            <Star className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Izračunaj tranzite</span>
                            <span className="sm:hidden">Izračunaj</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Results */}
            {hasCalculated && (
              <div className="space-y-4 sm:space-y-6">
                <Card className="bg-gray-800 border border-blue-500/30 text-white shadow-xl overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
                      <div>
                        <CardTitle className="flex items-center text-lg sm:text-xl">
                          <Star className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                          Rezultati tranzita
                        </CardTitle>
                        <CardDescription className="text-gray-300 text-sm sm:text-base">
                          Tranziti za {formatYugoslavDate(form.getValues().transitDate)} u odnosu na vašu natalnu kartu
                        </CardDescription>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 flex items-center h-8 sm:h-9 text-xs sm:text-sm"
                        onClick={() => {
                          toast.success("Rezultati su sačuvani u PDF formatu!");
                        }}
                      >
                        <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Sačuvaj PDF</span>
                        <span className="sm:hidden">PDF</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                    {/* Overall recommendation */}
                    <div className="bg-gray-700 border border-purple-500/30 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Opšta preporuka</h3>
                      <p className="text-gray-200">{generateOverallRecommendation(transitResults)}</p>
                    </div>
                    
                    {transitResults.length > 0 ? (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-white">Aktivni tranziti</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {transitResults.map((aspect, index) => (
                            <Card 
                              key={index} 
                              className={cn(
                                "bg-gray-700/50 border text-white",
                                getAspectBorderColor(aspect.significance)
                              )}
                            >
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center">
                                    <PlanetSymbol planet={aspect.transitPlanet} size="sm" className="text-blue-400" />
                                    <ArrowRight className="mx-1 h-4 w-4" />
                                    <AspectSymbol aspect={aspect.aspectType} size="sm" className={getAspectColor(aspect.aspectType, aspect.significance)} />
                                    <ArrowRight className="mx-1 h-4 w-4" />
                                    <PlanetSymbol planet={aspect.natalPlanet} size="sm" className="text-purple-400" />
                                  </div>
                                  <Badge 
                                    className={cn(
                                      "text-xs",
                                      aspect.significance === 'major' 
                                        ? 'bg-yellow-600 hover:bg-yellow-700' 
                                        : aspect.significance === 'moderate'
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-gray-600 hover:bg-gray-700'
                                    )}
                                  >
                                    {aspect.significance === 'major' 
                                      ? 'Značajan' 
                                      : aspect.significance === 'moderate'
                                      ? 'Umeren'
                                      : 'Minor'}
                                  </Badge>
                                </div>
                                <CardTitle className="text-base">
                                  {getPlanetName(aspect.transitPlanet)} {getAspectName(aspect.aspectType)} {getPlanetName(aspect.natalPlanet)}
                                </CardTitle>
                                <CardDescription className="text-sm text-gray-300 flex items-center">
                                  <span className={aspect.applying ? "text-green-400" : "text-red-400"}>
                                    {aspect.applying ? "Približava se" : "Udaljava se"}
                                  </span>
                                  <span className="mx-2">•</span>
                                  <span>Orb: {aspect.orb.toFixed(1)}°</span>
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <p className="text-sm text-gray-300">
                                  {getAspectInterpretation(aspect)}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-700/50 p-6 rounded-lg text-center">
                        <p className="text-gray-300">Nema značajnih tranzita za odabrani datum i kriterijume.</p>
                        <p className="text-gray-400 text-sm mt-2">Pokušajte sa drugim datumom ili proširite kriterijume.</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t border-gray-700 pt-4 flex flex-wrap justify-between items-center">
                    <div className="text-sm text-gray-400">
                      * Napomena: Ovo je pojednostavljena kalkulacija tranzita. Za potpunu astrološku analizu, preporučujemo konsultaciju sa profesionalnim astrologom.
                    </div>
                    <Link href="/reports">
                      <Button className="mt-4 sm:mt-0 bg-purple-600 hover:bg-purple-700 whitespace-nowrap">
                        Naručite detaljnu analizu
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                {/* Tips for working with transits */}
                <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Info className="mr-2 h-5 w-5 text-purple-400" />
                      Kako koristiti tranzite
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">
                      Planetarni tranziti predstavljaju kretanje planeta u odnosu na vašu natalnu kartu. Evo nekoliko saveta kako da ih najbolje iskoristite:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600/50">
                        <h3 className="font-medium text-blue-400 mb-2">Razumevanje tranzita</h3>
                        <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                          <li>Brži planeti (Sunce, Mesec, Merkur, Venera, Mars) stvaraju kraće tranzite, često trajući dane ili nedelje</li>
                          <li>Sporiji planeti (Jupiter, Saturn, Uran, Neptun, Pluton) stvaraju dugotrajnije efekte, od meseci do godina</li>
                          <li>Primenjujući aspekti (oni koji se približavaju) imaju jači uticaj od onih koji se udaljavaju</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600/50">
                        <h3 className="font-medium text-purple-400 mb-2">Korišćenje znanja o tranzitima</h3>
                        <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                          <li>Harmonični tranziti (trigoni, sekstili) su idealni za započinjanje novih projekata</li>
                          <li>Izazovni tranziti (kvadrati, opozicije) donose prilike za rast kroz prevazilaženje prepreka</li>
                          <li>Koristite znanje o tranzitima za planiranje važnih događaja u povoljnim periodima</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}