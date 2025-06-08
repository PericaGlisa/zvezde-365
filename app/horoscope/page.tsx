"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format, differenceInDays } from 'date-fns';
import { Star, Sun, Moon, Calendar, ArrowRight, CalendarDays, Sparkles, Heart, RefreshCw, Flame, Mountain, Users, Fish, Crown, Droplet, Scale, Scissors, ArrowUpRight, MountainSnow, Waves, Activity } from 'lucide-react';

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

// Import the horoscopes data
import horoscopesData from '@/lib/horoscopes.json';

// Type for category to help TypeScript understand valid categories
type HoroscopeCategory = 'general' | 'love' | 'health' | 'career';

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

export default function HoroscopePage() {
  const [selectedSign, setSelectedSign] = useState('aries');
  const [period, setPeriod] = useState('daily');
  const [category, setCategory] = useState<HoroscopeCategory>('general');
  const [zodiacSigns, setZodiacSigns] = useState(horoscopesData.horoscopes);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(horoscopesData.lastUpdated);
  
  useEffect(() => {
    // Simulate loading the data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const currentSign = zodiacSigns.find(sign => sign.id === selectedSign) || zodiacSigns[0];
  
  const getHoroscopeText = () => {
    if (isLoading) return '';
    
    if (category === 'general') {
      switch (period) {
        case 'daily':
          return currentSign.daily.text;
        case 'weekly':
          return currentSign.weekly.text;
        case 'monthly':
          return currentSign.monthly.text;
        default:
          return currentSign.daily.text;
      }
    } else {
      // Return specific category (love, health, career)
      // Use type assertion to tell TypeScript that category is a valid key
      switch (period) {
        case 'daily':
          return currentSign.daily[category as keyof typeof currentSign.daily] || 'Horoskop za ovu kategoriju trenutno nije dostupan.';
        case 'weekly':
          return currentSign.weekly[category as keyof typeof currentSign.weekly] || 'Horoskop za ovu kategoriju trenutno nije dostupan.';
        case 'monthly':
          return currentSign.monthly[category as keyof typeof currentSign.monthly] || 'Horoskop za ovu kategoriju trenutno nije dostupan.';
        default:
          return currentSign.daily[category as keyof typeof currentSign.daily] || 'Horoskop za ovu kategoriju trenutno nije dostupan.';
      }
    }
  };
  
  const getLastUpdatedText = () => {
    if (isLoading) return 'Učitavanje...';
    
    let updateDate;
    switch (period) {
      case 'daily':
        updateDate = new Date(currentSign.daily.lastUpdated);
        break;
      case 'weekly':
        updateDate = new Date(currentSign.weekly.lastUpdated);
        break;
      case 'monthly':
        updateDate = new Date(currentSign.monthly.lastUpdated);
        break;
      default:
        updateDate = new Date(currentSign.daily.lastUpdated);
    }
    
    // Format the date for display
    return format(updateDate, "dd.MM.yyyy.");
  };
  
  const getUpdateFreshness = () => {
    if (isLoading) return '';
    
    let updateDate;
    switch (period) {
      case 'daily':
        updateDate = new Date(currentSign.daily.lastUpdated);
        break;
      case 'weekly':
        updateDate = new Date(currentSign.weekly.lastUpdated);
        break;
      case 'monthly':
        updateDate = new Date(currentSign.monthly.lastUpdated);
        break;
      default:
        updateDate = new Date(currentSign.daily.lastUpdated);
    }
    
    const daysSinceUpdate = differenceInDays(new Date(), updateDate);
    
    if (daysSinceUpdate === 0) {
      return 'text-green-400';
    } else if ((period === 'daily' && daysSinceUpdate <= 1) || 
               (period === 'weekly' && daysSinceUpdate <= 7) || 
               (period === 'monthly' && daysSinceUpdate <= 30)) {
      return 'text-yellow-400';
    } else {
      return 'text-red-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Sun size={40} className="text-yellow-400 sm:w-12 sm:h-12 md:w-12 md:h-12" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Horoskop
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Otkrijte šta vam zvezde poručuju danas. Izaberite vaš znak i period za personalizovane astrološke uvide.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 sm:p-6 md:p-8 backdrop-blur-sm border border-purple-500/20 mb-8 sm:mb-12">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="w-full lg:w-1/3">
                <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">Izaberite vaš znak</label>
                <Select value={selectedSign} onValueChange={setSelectedSign} disabled={isLoading}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white text-sm sm:text-base h-10 sm:h-11">
                    <SelectValue placeholder="Izaberite znak" className="text-white" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {zodiacSigns.map(sign => (
                      <SelectItem key={sign.id} value={sign.id} className="text-white">
                        <div className="flex items-center justify-start w-full">
                          <div className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 relative flex items-center justify-center ${sign.id === 'aquarius' ? 'pt-0.5' : ''}`}>
                            <Image 
                              src={zodiacSvgMap[sign.id]} 
                              alt={sign.name}
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                          </div>
                          <span className="flex-1 text-left text-sm sm:text-base">{sign.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full lg:w-2/3">
                <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">Vremenski period</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Button 
                    variant={period === 'daily' ? 'default' : 'outline'} 
                    onClick={() => setPeriod('daily')}
                    className={period === 'daily' 
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-500 h-10 sm:h-11' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 h-10 sm:h-11'}
                    disabled={isLoading}
                  >
                    <Sun className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-sm sm:text-base">Dnevni</span>
                  </Button>
                  <Button 
                    variant={period === 'weekly' ? 'default' : 'outline'} 
                    onClick={() => setPeriod('weekly')}
                    className={period === 'weekly' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500 h-10 sm:h-11' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 h-10 sm:h-11'}
                    disabled={isLoading}
                  >
                    <Calendar className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-sm sm:text-base">Nedeljni</span>
                  </Button>
                  <Button 
                    variant={period === 'monthly' ? 'default' : 'outline'} 
                    onClick={() => setPeriod('monthly')}
                    className={period === 'monthly' 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-500 h-10 sm:h-11' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 h-10 sm:h-11'}
                    disabled={isLoading}
                  >
                    <Moon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-sm sm:text-base">Mesečni</span>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Category Selection */}
            <div className="mb-8">
              <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">Kategorija</label>
              <div className="grid grid-cols-4 gap-2">
                <Button 
                  variant={category === 'general' ? 'default' : 'outline'} 
                  onClick={() => setCategory('general')}
                  className={category === 'general' 
                    ? 'bg-white hover:bg-gray-200 text-gray-900 border-white h-10 sm:h-11' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 h-10 sm:h-11'}
                  disabled={isLoading}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Opšti
                </Button>
                <Button 
                  variant={category === 'love' ? 'default' : 'outline'} 
                  onClick={() => setCategory('love')}
                  className={category === 'love' 
                    ? 'bg-pink-600 hover:bg-pink-700 text-white border-pink-500 h-10 sm:h-11' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 h-10 sm:h-11'}
                  disabled={isLoading}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Ljubav
                </Button>
                <Button 
                  variant={category === 'health' ? 'default' : 'outline'} 
                  onClick={() => setCategory('health')}
                  className={category === 'health' 
                    ? 'bg-green-600 hover:bg-green-700 text-white border-green-500 h-10 sm:h-11' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 h-10 sm:h-11'}
                  disabled={isLoading}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Zdravlje
                </Button>
                <Button 
                  variant={category === 'career' ? 'default' : 'outline'} 
                  onClick={() => setCategory('career')}
                  className={category === 'career' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500 h-10 sm:h-11' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 h-10 sm:h-11'}
                  disabled={isLoading}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Karijera
                </Button>
              </div>
            </div>
            
            <Card className="bg-gray-900 border border-purple-500/30 text-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center">
                  {isLoading ? (
                    <Skeleton className="h-8 w-8 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 relative">
                      <Image 
                        src={zodiacSvgMap[currentSign.id]} 
                        alt={currentSign.name}
                        width={32}
                        height={32}
                      />
                    </div>
                  )}
                  <div className="ml-2">
                    {isLoading ? (
                      <Skeleton className="h-6 w-32" />
                    ) : (
                      <CardTitle>{currentSign.name}</CardTitle>
                    )}
                    {isLoading ? (
                      <Skeleton className="h-4 w-48 mt-1" />
                    ) : (
                      <CardDescription className="text-gray-400">{currentSign.dates}</CardDescription>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  {isLoading ? (
                    <Skeleton className="h-6 w-24" />
                  ) : (
                    <>
                      {getPeriodIcon()}
                      <span className="ml-2 text-sm text-gray-300 capitalize">
                        {period === 'daily' ? 'Dnevni' : period === 'weekly' ? 'Nedeljni' : 'Mesečni'} horoskop
                      </span>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-1 h-px bg-gray-700"></div>
                    <div className="px-4 text-sm text-gray-400 flex items-center">
                      {getCategoryIcon()}
                      <span className="ml-2">
                        {category === 'general' ? 'Opšti horoskop' : 
                         category === 'love' ? 'Ljubavni horoskop' : 
                         category === 'health' ? 'Zdravstveni horoskop' : 
                         'Poslovni horoskop'}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-gray-700"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Element</div>
                      {isLoading ? (
                        <Skeleton className="h-6 w-20 mt-1" />
                      ) : (
                        <div className="font-medium text-white">{currentSign.element}</div>
                      )}
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Vladajuća planeta</div>
                      {isLoading ? (
                        <Skeleton className="h-6 w-28 mt-1" />
                      ) : (
                        <div className="font-medium text-white">{currentSign.ruling}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-1 h-px bg-gray-700"></div>
                    <div className="px-4 text-sm text-gray-400">Horoskop</div>
                    <div className="flex-1 h-px bg-gray-700"></div>
                  </div>
                  {isLoading ? (
                    <>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-5/6 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      {period !== 'daily' && (
                        <>
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-4/5 mb-2" />
                          <Skeleton className="h-4 w-full mb-2" />
                        </>
                      )}
                      {period === 'monthly' && (
                        <>
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-5/6 mb-2" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-4/5 mb-2" />
                        </>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-300 leading-relaxed">{getHoroscopeText()}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
                <div className="text-sm flex items-center">
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'text-gray-400' : getUpdateFreshness()}`} />
                  <span className="text-gray-400">
                    Ažurirano: {getLastUpdatedText()}
                  </span>
                </div>
                <Link href="/natal-chart" className="text-purple-400 hover:text-purple-300 text-sm flex items-center">
                  <span>Naručite natalnu kartu</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          {/* Zodiac Signs Grid */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8">Svi znakovi zodijaka</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {zodiacSigns.map(sign => (
                <button
                  key={sign.id}
                  onClick={() => setSelectedSign(sign.id)}
                  className={`p-3 sm:p-4 rounded-lg text-center transition-all ${
                    selectedSign === sign.id 
                      ? 'bg-purple-700 border-2 border-purple-500 transform scale-105' 
                      : 'bg-gray-800 bg-opacity-50 border border-gray-700 hover:bg-gray-700'
                  }`}
                  disabled={isLoading}
                >
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 relative ${sign.id === 'aquarius' ? 'pt-0.5' : ''}`}>
                      <Image 
                        src={zodiacSvgMap[sign.id]} 
                        alt={sign.name}
                        width={24}
                        height={24}
                        className={selectedSign === sign.id ? "brightness-0 invert filter" : ""}
                      />
                    </div>
                  </div>
                  <h3 className="font-medium text-white text-sm sm:text-base">{sign.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{sign.dates}</p>
                </button>
              ))}
            </div>
          </div>
          
          {/* Features */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-8 backdrop-blur-sm border border-purple-500/20 mb-12">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Više od horoskopa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg flex flex-col h-full">
                <div className="flex justify-center mb-4">
                  <CalendarDays className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white text-center mb-2">Dnevni horoskop sa podsetnikom</h3>
                <p className="text-gray-300 text-center text-sm flex-grow">
                  Primajte dnevni horoskop direktno u vaš inbox svako jutro. Personalizovane poruke za vaš znak.
                </p>
                <div className="mt-4 flex justify-center">
                  <Link href="/reports">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-sm">
                      Pretplatite se
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg flex flex-col h-full">
                <div className="flex justify-center mb-4">
                  <Sparkles className="h-10 w-10 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white text-center mb-2">Natalna karta</h3>
                <p className="text-gray-300 text-center text-sm flex-grow">
                  Otkrijte detaljan uvid u vaš astrološki profil kroz personalizovanu natalnu kartu.
                </p>
                <div className="mt-4 flex justify-center">
                  <Link href="/natal-chart">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-sm">
                      Saznaj više
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg flex flex-col h-full">
                <div className="flex justify-center mb-4">
                  <Heart className="h-10 w-10 text-pink-400" />
                </div>
                <h3 className="text-lg font-bold text-white text-center mb-2">Ljubavna kompatibilnost</h3>
                <p className="text-gray-300 text-center text-sm flex-grow">
                  Proverite koliko ste astrološki kompatibilni sa vašim partnerom ili potencijalnom ljubavi.
                </p>
                <div className="mt-4 flex justify-center">
                  <Link href="/compatibility">
                    <Button className="bg-pink-600 hover:bg-pink-700 text-sm">
                      Proveri kompatibilnost
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Personalizovana astrološka konsultacija</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Želite li detaljnija tumačenja i personalizovane savete? Zakažite konsultaciju sa našim astrologom za dublje uvide.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-purple-900 hover:bg-gray-200">
                Zakaži konsultaciju
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper function to get the period icon
  function getPeriodIcon() {
    switch (period) {
      case 'daily': return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'weekly': return <Calendar className="h-6 w-6 text-blue-500" />;
      case 'monthly': return <Moon className="h-6 w-6 text-purple-500" />;
      default: return <Sun className="h-6 w-6" />;
    }
  }
  
  // Helper function to get the category icon
  function getCategoryIcon() {
    switch (category) {
      case 'general': return <Star className="h-6 w-6 text-white" />;
      case 'love': return <Heart className="h-6 w-6 text-pink-500" />;
      case 'health': return <RefreshCw className="h-6 w-6 text-green-500" />;
      case 'career': return <CalendarDays className="h-6 w-6 text-blue-500" />;
      default: return <Star className="h-6 w-6" />;
    }
  }
}