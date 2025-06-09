"use client";

import { useState, useEffect } from 'react';
import { CalendarIcon, Clock, Moon, Star, Sun, ArrowRight, X, Info } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { sr } from 'date-fns/locale';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { calculateMoonPhase, moonPhases, generateAffirmation } from '@/lib/astrology-utils';
import { cn } from "@/lib/utils";

export default function LunarPhasesPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [moonPhaseData, setMoonPhaseData] = useState<{ 
    phase: string; 
    illumination: number; 
    degrees: number 
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [affirmation, setAffirmation] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    setTimeout(() => {
      // Calculate moon phase for the selected date
      const phaseData = calculateMoonPhase(selectedDate);
      setMoonPhaseData(phaseData);
      
      // Generate a random affirmation based on the moon phase
      const newAffirmation = generateAffirmation('aries', phaseData.phase); // Default to Aries for now
      setAffirmation(newAffirmation);
      
      setIsLoading(false);
    }, 800);
  }, [selectedDate]);
  
  // Get phase info from the phase ID
  const getPhaseInfo = (phaseId: string) => {
    return moonPhases.find(phase => phase.id === phaseId) || moonPhases[0];
  };
  
  // Render moon visualization based on illumination percentage
  const renderMoonVisualization = (illumination: number, phaseName: string) => {
    // Determine the appropriate SVG based on the phase
    if (phaseName === 'new_moon') {
      return (
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
          <div className="absolute inset-0 rounded-full bg-gray-900"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-lg">Mlad mesec</div>
        </div>
      );
    } else if (phaseName === 'full_moon') {
      return (
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
          <div className="absolute inset-0 rounded-full bg-blue-100"></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-800 text-lg">Pun mesec</div>
        </div>
      );
    } else if (phaseName === 'first_quarter') {
      return (
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
          <div className="absolute inset-0 rounded-full">
            <div className="w-full h-full bg-blue-100 rounded-r-full rounded-l-none"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-800 text-lg">Prva četvrt</div>
        </div>
      );
    } else if (phaseName === 'last_quarter') {
      return (
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
          <div className="absolute inset-0 rounded-full">
            <div className="w-full h-full bg-blue-100 rounded-l-full rounded-r-none"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-800 text-lg">Poslednja četvrt</div>
        </div>
      );
    } else if (phaseName.includes('waxing')) {
      // Waxing phases (increasing illumination)
      return (
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
          <div className="absolute inset-0 rounded-full bg-gray-900"></div>
          <div 
            className="absolute inset-0 rounded-full bg-blue-100"
            style={{ clipPath: phaseName === 'waxing_crescent' 
              ? 'polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)' 
              : 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' 
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-800 text-lg">{
            phaseName === 'waxing_crescent' ? 'Rastući polumesec' : 'Rastuća ispupčenost'
          }</div>
        </div>
      );
    } else {
      // Waning phases (decreasing illumination)
      return (
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
          <div className="absolute inset-0 rounded-full bg-gray-900"></div>
          <div 
            className="absolute inset-0 rounded-full bg-blue-100" 
            style={{ clipPath: phaseName === 'waning_crescent' 
              ? 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' 
              : 'polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)' 
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-800 text-lg">{
            phaseName === 'waning_crescent' ? 'Opadajući polumesec' : 'Opadajuća ispupčenost'
          }</div>
        </div>
      );
    }
  };
  
  // Format date for display
  const formatYugoslavDate = (date: Date | null | undefined) => {
    // Check if date is valid before formatting
    if (!date || isNaN(date.getTime())) {
      return "Nije izabrano";
    }
    return format(date, 'dd.MM.yyyy.', { locale: sr });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Moon size={40} className="text-blue-400 sm:w-12 sm:h-12 md:w-12 md:h-12" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Mesečeve faze i njihov astrološki uticaj
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Otkrijte kako trenutna faza Meseca utiče na vas, kao i šta određena faza znači za vaše planove, emocije i energiju.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Date Selector */}
            <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl overflow-hidden">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Izaberite datum</CardTitle>
                <CardDescription className="text-gray-300 text-sm sm:text-base">
                  Pogledajte fazu Meseca za određeni datum i saznajte njen astrološki značaj.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full md:w-auto justify-start text-left font-normal bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        {selectedDate ? formatYugoslavDate(selectedDate) : "Izaberite datum"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        initialFocus
                        className="bg-gray-700 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                  <div className="text-xs sm:text-sm text-gray-400 flex items-center">
                    <Clock className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span>
                      {isLoading 
                        ? "Izračunavanje lunarne faze..." 
                        : "Mesečeva faza izračunata za izabrani datum"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Moon Phase Display */}
            <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl md:text-2xl">
                  <Moon className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                  <span className="hidden sm:inline">Mesečeva faza {isLoading ? "" : `za ${formatYugoslavDate(selectedDate)}`}</span>
                  <span className="sm:hidden">Mesečeva faza</span>
                </CardTitle>
                <CardDescription className="text-gray-300 text-sm sm:text-base">
                  {isLoading 
                    ? "Izračunavanje podataka o Mesečevoj fazi..." 
                    : "Detaljni podaci o trenutnoj fazi Meseca i njenom značaju"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    {isLoading ? (
                      <Skeleton className="w-48 h-48 rounded-full" />
                    ) : (
                      moonPhaseData && renderMoonVisualization(
                        moonPhaseData.illumination, 
                        moonPhaseData.phase
                      )
                    )}
                  </div>
                  
                  <div className="flex-grow space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {isLoading ? (
                          <Skeleton className="h-7 w-48" />
                        ) : (
                          moonPhaseData && getPhaseInfo(moonPhaseData.phase).name
                        )}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-700 rounded-lg p-3">
                          <div className="text-sm text-gray-400">Osvetljenost</div>
                          {isLoading ? (
                            <Skeleton className="h-6 w-20 mt-1" />
                          ) : (
                            <div className="font-medium text-white">
                              {moonPhaseData ? `${Math.round(moonPhaseData.illumination * 100)}%` : "N/A"}
                            </div>
                          )}
                        </div>
                        <div className="bg-gray-700 rounded-lg p-3">
                          <div className="text-sm text-gray-400">Položaj (stepeni)</div>
                          {isLoading ? (
                            <Skeleton className="h-6 w-20 mt-1" />
                          ) : (
                            <div className="font-medium text-white">
                              {moonPhaseData ? `${moonPhaseData.degrees}°` : "N/A"}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-blue-400 mb-2">Astrološko značenje:</h4>
                      {isLoading ? (
                        <>
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4 mb-2" />
                        </>
                      ) : (
                        <p className="text-gray-300">
                          {moonPhaseData && getPhaseInfo(moonPhaseData.phase).meaning}
                        </p>
                      )}
                    </div>
                    
                    <div className="pt-4 border-t border-gray-700">
                      <h4 className="font-medium text-purple-400 mb-2">
                        <Star className="inline-block mr-1 h-4 w-4" /> Astrološki savet:
                      </h4>
                      {isLoading ? (
                        <>
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4 mb-2" />
                        </>
                      ) : (
                        <p className="text-gray-300 italic">
                          "{affirmation}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-700 pt-4">
                <Link href="/affirmations" className="text-purple-400 hover:text-purple-300 text-sm flex items-center ml-auto">
                  <span>Personalizovane afirmacije</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            {/* Moon Phase Calendar for Current Month */}
            <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl md:text-2xl">
                  <CalendarIcon className="mr-2 h-6 w-6 text-blue-400" />
                  Kalendar Mesečevih mena
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Pregled važnih Mesečevih faza za tekući mesec
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="bg-gray-700 rounded-lg p-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-900 mr-4 flex items-center justify-center">
                      <Moon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Mlad mesec</h4>
                      <p className="text-sm text-gray-300">12. jun 2025. u 15:43</p>
                    </div>
                    <div className="ml-auto text-sm text-gray-400">
                      Novi počeci
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-800 mr-4 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-blue-100 rounded-r-full rounded-l-none"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Prva četvrt</h4>
                      <p className="text-sm text-gray-300">20. jun 2025. u 08:12</p>
                    </div>
                    <div className="ml-auto text-sm text-gray-400">
                      Akcija i odluke
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 mr-4 flex items-center justify-center">
                      <Moon className="h-6 w-6 text-gray-800" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Pun mesec</h4>
                      <p className="text-sm text-gray-300">28. jun 2025. u 02:39</p>
                    </div>
                    <div className="ml-auto text-sm text-gray-400">
                      Kulminacija, jasnoća
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-800 mr-4 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-blue-100 rounded-l-full rounded-r-none"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Poslednja četvrt</h4>
                      <p className="text-sm text-gray-300">6. jul 2025. u 19:24</p>
                    </div>
                    <div className="ml-auto text-sm text-gray-400">
                      Otpuštanje, refleksija
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-700 pt-4 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
                <Button 
                  variant="outline" 
                  className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11 w-full sm:w-auto"
                  onClick={() => setIsModalOpen(true)}
                >
                  Više o Mesečevim fazama
                </Button>
                <Link href="/transit-calculator" className="w-full sm:w-auto">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-11 w-full sm:w-auto">
                    Izračunajte tranzite
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* How Moon Phases Affect You */}
            <Card className="bg-gray-800 border border-purple-500/30 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Kako Mesečeve faze utiču na vas</CardTitle>
                <CardDescription className="text-gray-300">
                  Razumevanje uticaja Mesečevih faza na različite aspekte života
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-blue-400 mb-2">Mlad Mesec (0% osvetljenosti)</h3>
                  <p className="text-gray-300 mb-2">
                    Mlad Mesec označava početak novog lunarnog ciklusa. Ovo je idealno vreme za:
                  </p>
                  <ul className="text-gray-300 list-disc pl-5 space-y-1">
                    <li>Postavljanje novih ciljeva i namera</li>
                    <li>Započinjanje novih projekata</li>
                    <li>Pravljenje planova za budućnost</li>
                    <li>Rad na sebi i samorazvoj</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-semibold text-indigo-400 mb-2">Prva četvrt (50% osvetljenosti)</h3>
                  <p className="text-gray-300 mb-2">
                    Prva četvrt donosi energiju odlučnosti i akcije. Fokusirajte se na:
                  </p>
                  <ul className="text-gray-300 list-disc pl-5 space-y-1">
                    <li>Prevazilaženje prepreka</li>
                    <li>Donošenje važnih odluka</li>
                    <li>Implementaciju planova započetih tokom mladog Meseca</li>
                    <li>Izgradnju momentum i energiju</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-purple-400 mb-2">Pun Mesec (100% osvetljenosti)</h3>
                  <p className="text-gray-300 mb-2">
                    Pun Mesec simbolizuje kulminaciju i ostvarenje. Ovo je vreme za:
                  </p>
                  <ul className="text-gray-300 list-disc pl-5 space-y-1">
                    <li>Slavljenje uspeha i postignuća</li>
                    <li>Ostvarivanje rezultata</li>
                    <li>Jasnu viziju i uvide</li>
                    <li>Isceljenje i energetsko pročišćenje</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-pink-500 pl-4">
                  <h3 className="font-semibold text-pink-400 mb-2">Poslednja četvrt (50% osvetljenosti)</h3>
                  <p className="text-gray-300 mb-2">
                    Poslednja četvrt donosi energiju otpuštanja i refleksije. Vreme je za:
                  </p>
                  <ul className="text-gray-300 list-disc pl-5 space-y-1">
                    <li>Puštanje stvari koje ne funkcionišu</li>
                    <li>Refleksiju na prošle događaje</li>
                    <li>Opraštanje (sebi i drugima)</li>
                    <li>Pripremu za novi ciklus</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-700 pt-4 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
                <Button 
                  variant="outline" 
                  className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11 w-full sm:w-auto"
                  onClick={() => setIsModalOpen(true)}
                >
                  Više o Mesečevim fazama
                </Button>
                <Link href="/transit-calculator" className="w-full sm:w-auto">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-11 w-full sm:w-auto">
                    Izračunajte tranzite
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* CTA Section */}
            <div className="text-center bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Napredne astrološke analize</h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Želite li dublje razumevanje kako Mesečeve faze i planetarni tranziti utiču na vaš život? Isprobajte naše napredne astrološke alate.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/transit-calculator">
                  <Button className="bg-white text-purple-900 hover:bg-gray-200 w-full sm:w-auto text-sm sm:text-base h-10 sm:h-11">
                    Kalkulator tranzita
                  </Button>
                </Link>
                <Link href="/natal-chart">
                  <Button className="bg-transparent hover:bg-white/10 border border-white text-white hover:bg-purple-900/40 w-full sm:w-auto text-sm sm:text-base h-10 sm:h-11">
                    Naručite natalnu kartu
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Modal About Moon Phases */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-800 text-white border border-purple-500/30 max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2 text-white">
              <Moon className="h-6 w-6 text-blue-400" />
              <span>Sve o Mesečevim fazama i njihovom astrološkom značaju</span>
            </DialogTitle>
            <DialogDescription className="text-gray-300 mt-2">
              Detaljno objašnjenje Mesečevih faza, njihovog uticaja i kako ih možete koristiti u svom životu
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 my-6">
            <div className="bg-gray-700/50 p-6 rounded-xl">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-blue-400">Zašto su Mesečeve faze važne?</h3>
              <p className="text-gray-300 mb-4">
                Mesec je najbliže nebesko telo Zemlji, i njegova gravitaciona sila direktno utiče na okeane, 
                vodena tela, pa čak i na ljudsko ponašanje i emocije. U astrologiji, Mesec predstavlja našu 
                emocionalnu prirodu, instinkte, navike i nesvesne reakcije.
              </p>
              <p className="text-gray-300">
                Dok Mesec prolazi kroz svoje faze (koje traju približno 29.5 dana), njegov uticaj na nas se menja. 
                Razumevanje ovih faza može vam pomoći da uskladite svoje aktivnosti sa prirodnim ritmovima, 
                povećavajući šanse za uspeh i ispunjenost.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-white">Detaljno objašnjenje svake faze</h3>
              <div className="space-y-8">
                {/* New Moon */}
                <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-gray-500">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gray-900 mr-4 flex items-center justify-center">
                      <Moon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-medium text-white">Mlad Mesec</h4>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Mlad Mesec se javlja kada je Mesec poravnan sa Suncem, i Zemlja vidi njegovu neosvetljenu stranu. 
                    Ovo predstavlja početak novog ciklusa.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Astrološki značaj:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Vreme za postavljanje novih namera i ciljeva</li>
                        <li>Idealno za započinjanje novih projekata</li>
                        <li>Fokus na lični rast i samorazvoj</li>
                        <li>Seme koje sadite u ovoj fazi će rasti kroz ceo lunaran ciklus</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Preporučene aktivnosti:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Pisanje ciljeva i namera</li>
                        <li>Započinjanje novih projekata</li>
                        <li>Vizualizacija i meditacija</li>
                        <li>Planiranje i priprema</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Waxing Crescent */}
                <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-blue-400">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gray-900 mr-4 relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-blue-100" 
                        style={{ clipPath: 'polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)' }}
                      ></div>
                    </div>
                    <h4 className="text-lg font-medium text-white">Rastući polumesec</h4>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Ova faza se javlja kada je Mesec između Mladog Meseca i Prve četvrti, vidljiv kao polumesec koji raste s desne strane.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Astrološki značaj:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Period izgradnje i priprema</li>
                        <li>Vreme za početni rast vaših projekata</li>
                        <li>Energija je u porastu ali još nije na vrhuncu</li>
                        <li>Fokus na savezništva i podrška</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Preporučene aktivnosti:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Izgradnja temelja za veće projekte</li>
                        <li>Umrežavanje i stvaranje savezništava</li>
                        <li>Prikupljanje informacija i resursa</li>
                        <li>Početak novih zdravih navika</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* First Quarter */}
                <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-indigo-500">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gray-900 mr-4 relative overflow-hidden">
                      <div className="absolute inset-0">
                        <div className="w-full h-full bg-blue-100 rounded-r-full rounded-l-none"></div>
                      </div>
                    </div>
                    <h4 className="text-lg font-medium text-white">Prva četvrt</h4>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Prva četvrt se javlja kada je pola Meseca osvetljeno iz naše perspektive. Mesec je u kvadratu sa Suncem, stvarajući tenziju i energiju.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Astrološki značaj:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Vreme akcije i donošenja odluka</li>
                        <li>Pojavljuju se prvi izazovi i prepreke</li>
                        <li>Energija koja vas podstiče da prevazilazite poteškoće</li>
                        <li>Proces preispitivanja i prilagođavanja prvobitnih planova</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Preporučene aktivnosti:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Rešavanje problema i prepreka</li>
                        <li>Donošenje važnih odluka</li>
                        <li>Preduzimanje konkretnih akcija</li>
                        <li>Prilagođavanje strategija na osnovu prvih rezultata</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Waxing Gibbous */}
                <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-violet-500">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gray-900 mr-4 relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-blue-100" 
                        style={{ clipPath: 'polygon(0% 0%, 75% 0%, 75% 100%, 0% 100%)' }}
                      ></div>
                    </div>
                    <h4 className="text-lg font-medium text-white">Rastuća ispupčenost</h4>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Rastuća ispupčenost je faza između Prve četvrti i Punog Meseca, kada je više od polovine Meseca osvetljeno.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Astrološki značaj:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Period usavršavanja i prilagođavanja</li>
                        <li>Rast svesti o detaljima projekta</li>
                        <li>Vreme za finalne pripreme pre kulminacije</li>
                        <li>Sazrevanje ideja i procesa</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Preporučene aktivnosti:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Usavršavanje veština</li>
                        <li>Dorada i usavršavanje projekata</li>
                        <li>Analiza i prilagođavanje detalja</li>
                        <li>Pripreme za završnu fazu ili prezentaciju</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Full Moon */}
                <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-purple-500">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-blue-100 mr-4 flex items-center justify-center">
                      <Moon className="h-6 w-6 text-gray-800" />
                    </div>
                    <h4 className="text-lg font-medium text-white">Pun Mesec</h4>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Pun Mesec se javlja kada je ceo Mesec osvetljen iz naše perspektive, u opoziciji sa Suncem.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Astrološki značaj:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Vrhunac energije i kulminacija</li>
                        <li>Vreme za žetvu rezultata prethodnog rada</li>
                        <li>Period pojačanih emocija i intuicije</li>
                        <li>Jasnoća i uvidi u situacije</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Preporučene aktivnosti:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Proslave i prepoznavanje dostignuća</li>
                        <li>Ceremonije i rituali zahvalnosti</li>
                        <li>Rad sa intuicijom i podsvešću</li>
                        <li>Puštanje energije i manifestacija</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Waning Gibbous */}
                <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-pink-500">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-blue-100 mr-4 relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-gray-900" 
                        style={{ clipPath: 'polygon(0% 0%, 25% 0%, 25% 100%, 0% 100%)' }}
                      ></div>
                    </div>
                    <h4 className="text-lg font-medium text-white">Opadajuća ispupčenost</h4>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Opadajuća ispupčenost je faza između Punog Meseca i Poslednje četvrti, kada osvetljenost počinje da opada.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Astrološki značaj:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Period raspodele i deljenja</li>
                        <li>Vreme za zahvalnost i prepoznavanje zasluga</li>
                        <li>Rekapitulacija dosadašnjih rezultata</li>
                        <li>Integracija naučenih lekcija</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Preporučene aktivnosti:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Deljenje informacija, znanja i resursa</li>
                        <li>Mentorstvo i podučavanje drugih</li>
                        <li>Pokazivanje zahvalnosti</li>
                        <li>Refleksija i procena dosadašnjeg progresa</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Last Quarter */}
                <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gray-900 mr-4 relative overflow-hidden">
                      <div className="absolute inset-0">
                        <div className="w-full h-full bg-blue-100 rounded-l-full rounded-r-none"></div>
                      </div>
                    </div>
                    <h4 className="text-lg font-medium text-white">Poslednja četvrt</h4>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Poslednja četvrt se javlja kada je pola Meseca osvetljeno (suprotna strana od Prve četvrti). Mesec je ponovo u kvadratu sa Suncem.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Astrološki značaj:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Vreme za otpuštanje i eliminaciju</li>
                        <li>Period preispitivanja i refleksije</li>
                        <li>Oproštaj (sebi i drugima)</li>
                        <li>Donošenje odluka o stvarima koje vas više ne služe</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Preporučene aktivnosti:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Čišćenje (fizičko i energetsko)</li>
                        <li>Rituali otpuštanja</li>
                        <li>Davanje zaključaka i završavanje procesa</li>
                        <li>Evaluacija rezultata i priprema za novi ciklus</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Waning Crescent */}
                <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-orange-500">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gray-900 mr-4 relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-blue-100" 
                        style={{ clipPath: 'polygon(0% 0%, 25% 0%, 25% 100%, 0% 100%)' }}
                      ></div>
                    </div>
                    <h4 className="text-lg font-medium text-white">Opadajući polumesec</h4>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Opadajući polumesec je finalna faza pre Mladog Meseca, kada je vidljiv samo mali deo Meseca.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Astrološki značaj:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Vreme za odmor i regeneraciju</li>
                        <li>Finalno otpuštanje starog ciklusa</li>
                        <li>Priprema za novi ciklus</li>
                        <li>Introspekcija i rad sa podsvešću</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Preporučene aktivnosti:</h5>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        <li>Meditacija i refleksija</li>
                        <li>Odmor i obnavljanje energije</li>
                        <li>Finalno čišćenje i pripreme</li>
                        <li>Sanjanje i postavljanje vizije za budućnost</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700/50 p-6 rounded-lg border border-blue-500/30">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-blue-400">Praktično korišćenje Mesečevih faza u svakodnevnom životu</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Planiranje aktivnosti prema fazama</h4>
                  <p className="text-gray-300">
                    Usklađivanje važnih aktivnosti sa odgovarajućim fazama Meseca može povećati vaše šanse za uspeh. Na primer, pokretanje novog posla tokom Mladog Meseca, potpisivanje ugovora tokom rasta Meseca, proslavljanje postignuća tokom Punog Meseca, i čišćenje prostora tokom opadajućeg Meseca.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Usklađivanje sa prirodnim ritmovima</h4>
                  <p className="text-gray-300">
                    Praćenje Mesečevih faza vas povezuje sa prirodnim ciklusima života. Ovo može dovesti do veće harmonije u vašem životu i smanjiti nepotreban stres koji dolazi od borbe protiv prirodnih ritmova.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Mesečeve faze i zdravlje</h4>
                  <p className="text-gray-300">
                    Mnoge studije pokazuju da Mesečeve faze mogu uticati na naš san, hormone i emocije. Razumevanje ovih ciklusa može vam pomoći da bolje upravljate svojim zdravljem i energijom. Na primer, neki ljudi primećuju više energije tokom Punog Meseca ili promene u kvalitetu sna.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="pt-4 border-t border-gray-700">
            <a href="https://en.wikipedia.org/wiki/Lunar_phase" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center">
              <Info className="h-4 w-4 mr-1" />
              <span>Više o astronomiji Mesečevih faza</span>
            </a>
            <DialogClose asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Razumem
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}