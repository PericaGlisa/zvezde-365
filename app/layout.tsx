'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Sparkles, Star, Moon, Heart, FileText, Calendar, Sun, Feather, MessageSquare, ChevronDown, Mail, Phone, MapPin, ChevronRight, Instagram, Youtube, Clock } from 'lucide-react';
import { Toaster } from "@/components/ui/sonner";
import { NewsletterForm } from '@/components/NewsletterForm';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

// Metadata moved to head tags since this is now a Client Component

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <head>
        <title>zvezde365.com - Otkrijte svoju kosmičku sudbinu</title>
        <meta name="description" content="Zavirite u tajne zvezda i otkrijte svoju jedinstvenu astrološku priču kroz personalizovane natalne karte, dubinske horoskope i mistična astrološka uputstva" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zvezde365.com/" />
        <meta property="og:title" content="zvezde365.com - Otkrijte svoju kosmičku sudbinu" />
        <meta property="og:description" content="Zavirite u tajne zvezda i otkrijte svoju jedinstvenu astrološku priču kroz personalizovane natalne karte, dubinske horoskope i mistična astrološka uputstva" />
        <meta property="og:image" content="https://zvezde365.com/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="zvezde365.com" />
        <meta property="og:locale" content="sr_RS" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://zvezde365.com/" />
        <meta property="twitter:title" content="zvezde365.com - Otkrijte svoju kosmičku sudbinu" />
        <meta property="twitter:description" content="Zavirite u tajne zvezda i otkrijte svoju jedinstvenu astrološku priču kroz personalizovane natalne karte, dubinske horoskope i mistična astrološka uputstva" />
        <meta property="twitter:image" content="https://zvezde365.com/og-image.svg" />
        
        {/* Additional SEO */}
        <meta name="keywords" content="astrologija, natalna karta, horoskop, zodijak, planetarni tranziti, kompatibilnost, astrološki izveštaji" />
        <meta name="author" content="zvezde365.com" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://zvezde365.com/" />
      </head>
      <body className={inter.className}>
        {/* Top Promotion Banner */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 py-2 text-white text-center relative">
          <div className="container mx-auto px-4">
            <p className="font-medium text-sm sm:text-base">Otkrijte tajanstveni svet astrologije uz vrhunske stručnjake! <Link href="/reports" className="underline font-bold hover:text-white/90">Saznajte više</Link></p>
          </div>
        </div>

        <header className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
          <div className="container mx-auto px-4">
            {/* Main Navigation */}
            <div className="py-4 border-b border-purple-800/50">
              <div className="flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 text-lg sm:text-xl font-bold">
                  <Sparkles size={24} className="text-purple-300 sm:w-7 sm:h-7" />
                  <span className="hidden xs:inline sm:inline">zvezde365.com</span>
                  <span className="xs:hidden sm:hidden">zvezde365</span>
                </Link>
                
                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-2">
                  {/* Main Navigation Items */}
                  <div className="mega-menu-wrapper">
                    <button className="flex items-center px-3 py-2 rounded-md hover:bg-purple-800 transition-colors">
                      <Star className="mr-1 h-4 w-4 text-purple-300" />
                      <span>Usluge</span>
                      <ChevronDown className="ml-1 h-3 w-3 text-purple-300" />
                    </button>
                    <div className="mega-menu-content fixed left-1/2 -translate-x-1/2 top-24 w-[95vw] max-w-[1000px] rounded-2xl shadow-2xl border border-purple-400/30 z-50 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 p-6 lg:p-10 bg-gradient-to-br from-slate-900/70 via-purple-900/60 to-indigo-950/70 backdrop-blur-2xl">
                      <div className="relative">
                        <h3 className="text-indigo-200 font-bold mb-4 text-lg tracking-wide">Horoskop</h3>
                        <div className="space-y-3">
                              <Link href="/horoscope" className="group block text-sm p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:shadow-lg hover:scale-105">
                                <div className="font-semibold flex items-center text-white group-hover:text-purple-200">
                                  <Sun className="h-5 w-5 mr-3 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                                  Dnevni, nedeljni i mesečni
                                </div>
                                <p className="text-gray-300 text-xs mt-1 group-hover:text-gray-200">Redovno ažurirane prognoze</p>
                              </Link>
                              <Link href="/lunar-phases" className="group block text-sm p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:shadow-lg hover:scale-105">
                                <div className="font-semibold flex items-center text-white group-hover:text-purple-200">
                                  <Moon className="h-5 w-5 mr-3 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                  Mesečeve faze
                                </div>
                                <p className="text-gray-300 text-xs mt-1 group-hover:text-gray-200">Uticaj meseca na vaš život</p>
                              </Link>
                              <Link href="/transit-calculator" className="group block text-sm p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:shadow-lg hover:scale-105">
                                <div className="font-semibold flex items-center text-white group-hover:text-purple-200">
                                  <Calendar className="h-5 w-5 mr-3 text-purple-400 group-hover:text-purple-300 transition-colors" />
                                  Kalkulator tranzita
                                </div>
                                <p className="text-gray-300 text-xs mt-1 group-hover:text-gray-200">Izračunajte planetarne tranzite</p>
                              </Link>
                            </div>
                      </div>
                      
                      <div className="relative">
                        <h3 className="text-indigo-200 font-bold mb-4 text-lg tracking-wide">Izveštaji</h3>
                        <div className="space-y-3">
                              <Link href="/natal-chart" className="group block text-sm p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-600/20 hover:to-red-600/20 hover:shadow-lg hover:scale-105">
                                <div className="font-semibold flex items-center text-white group-hover:text-pink-200">
                                  <Star className="h-5 w-5 mr-3 text-purple-400 group-hover:text-purple-300 transition-colors" />
                                  Natalna karta
                                </div>
                                <p className="text-gray-300 text-xs mt-1 group-hover:text-gray-200">Detaljna analiza vašeg rođenja</p>
                              </Link>
                              <Link href="/compatibility" className="group block text-sm p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-600/20 hover:to-red-600/20 hover:shadow-lg hover:scale-105">
                                <div className="font-semibold flex items-center text-white group-hover:text-pink-200">
                                  <Heart className="h-5 w-5 mr-3 text-pink-400 group-hover:text-pink-300 transition-colors" />
                                  Kompatibilnost
                                </div>
                                <p className="text-gray-300 text-xs mt-1 group-hover:text-gray-200">Astrološko poređenje odnosa</p>
                              </Link>
                              <Link href="/reports" className="group block text-sm p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-600/20 hover:to-red-600/20 hover:shadow-lg hover:scale-105">
                                <div className="font-semibold flex items-center text-white group-hover:text-pink-200">
                                  <FileText className="h-5 w-5 mr-3 text-pink-400 group-hover:text-pink-300 transition-colors" />
                                  Astrološki izveštaji
                                </div>
                                <p className="text-gray-300 text-xs mt-1 group-hover:text-gray-200">Personalizovane analize</p>
                              </Link>
                            </div>
                      </div>
                      
                      <div className="relative">
                        <h3 className="text-indigo-200 font-bold mb-4 text-lg tracking-wide">Alatke</h3>
                        <div className="space-y-3">
                              <Link href="/affirmations" className="group block text-sm p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-600/20 hover:shadow-lg hover:scale-105">
                                <div className="font-semibold flex items-center text-white group-hover:text-blue-200">
                                  <Feather className="h-5 w-5 mr-3 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                                  Astrološke afirmacije
                                </div>
                                <p className="text-gray-300 text-xs mt-1 group-hover:text-gray-200">Pozitivne dnevne afirmacije</p>
                              </Link>
                            </div>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/contact" className="flex items-center px-3 py-2 rounded-md hover:bg-purple-800 transition-colors">
                    <MessageSquare className="mr-1 h-4 w-4 text-purple-300" />
                    <span>Kontakt</span>
                  </Link>
                </nav>
                
                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                  <input 
                    type="checkbox" 
                    id="mobile-menu-toggle" 
                    className="hidden peer"
                  />
                  <label 
                    htmlFor="mobile-menu-toggle" 
                    className="text-white cursor-pointer z-50 relative"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 hidden">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </label>
                  
                  {/* Mobile Menu */}
                  <div className="fixed inset-0 bg-gray-900/95 z-40 -translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto" onClick={(e) => { if (e.target === e.currentTarget) document.getElementById('mobile-menu-toggle')!.checked = false; }}>
                    <div className="container px-4 sm:px-6 py-6 sm:py-8 mx-auto">
                      <div className="flex flex-col space-y-3 sm:space-y-4">
                        <Link href="/" className="flex items-center justify-center mb-6 sm:mb-8" onClick={() => document.getElementById('mobile-menu-toggle')!.checked = false}>
                          <Sparkles size={28} className="text-purple-300 mr-2 sm:w-8 sm:h-8" />
                          <span className="text-xl sm:text-2xl font-bold">zvezde365.com</span>
                        </Link>
                        
                        {/* Mobile Mega Menu */}
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                          <summary className="flex items-center justify-between p-3 rounded-md bg-gray-800 cursor-pointer">
                            <div className="flex items-center">
                              <Star className="mr-2 h-5 w-5 text-purple-400" />
                              <span className="font-medium">Usluge</span>
                            </div>
                            <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                          </summary>
                          <div className="mt-3 sm:mt-4 space-y-4 sm:space-y-6">
                            {/* Horoskop Section */}
                            <div className="pl-3 sm:pl-5">
                              <h3 className="text-purple-300 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Horoskop</h3>
                              <div className="space-y-3 sm:space-y-4">
                                <Link href="/horoscope" className="block text-gray-300 hover:text-purple-300 transition-colors" onClick={() => document.getElementById('mobile-menu-toggle')!.checked = false}>
                                  <div className="font-medium flex items-center">
                                    <Sun className="h-4 w-4 mr-2 text-purple-400" />
                                    Dnevni, nedeljni i mesečni
                                  </div>
                                  <p className="text-gray-400 text-sm">Redovno ažurirane prognoze</p>
                                </Link>
                                <Link href="/lunar-phases" className="block text-gray-300 hover:text-purple-300 transition-colors" onClick={() => document.getElementById('mobile-menu-toggle')!.checked = false}>
                                  <div className="font-medium flex items-center">
                                    <Moon className="h-4 w-4 mr-2 text-purple-400" />
                                    Mesečeve faze
                                  </div>
                                  <p className="text-gray-400 text-sm">Uticaj meseca na vaš život</p>
                                </Link>
                                <Link href="/transit-calculator" className="block text-gray-300 hover:text-purple-300 transition-colors" onClick={() => document.getElementById('mobile-menu-toggle')!.checked = false}>
                                  <div className="font-medium flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                                    Kalkulator tranzita
                                  </div>
                                  <p className="text-gray-400 text-sm">Izračunajte planetarne tranzite</p>
                                </Link>
                              </div>
                            </div>

                            {/* Izveštaji Section */}
                            <div className="pl-3 sm:pl-5">
                              <h3 className="text-purple-300 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Izveštaji</h3>
                              <div className="space-y-3 sm:space-y-4">
                                <Link href="/natal-chart" className="block text-gray-300 hover:text-purple-300 transition-colors" onClick={() => document.getElementById('mobile-menu-toggle')!.checked = false}>
                                  <div className="font-medium flex items-center">
                                    <Star className="h-4 w-4 mr-2 text-purple-400" />
                                    Natalna karta
                                  </div>
                                  <p className="text-gray-400 text-sm">Detaljna analiza vašeg rođenja</p>
                                </Link>
                                <Link href="/compatibility" className="block text-gray-300 hover:text-purple-300 transition-colors" onClick={() => document.getElementById('mobile-menu-toggle')!.checked = false}>
                                  <div className="font-medium flex items-center">
                                    <Heart className="h-4 w-4 mr-2 text-purple-400" />
                                    Kompatibilnost
                                  </div>
                                  <p className="text-gray-400 text-sm">Astrološko poređenje odnosa</p>
                                </Link>
                                <Link href="/reports" className="block text-gray-300 hover:text-purple-300 transition-colors" onClick={() => document.getElementById('mobile-menu-toggle')!.checked = false}>
                                  <div className="font-medium flex items-center">
                                    <FileText className="h-4 w-4 mr-2 text-purple-400" />
                                    Astrološki izveštaji
                                  </div>
                                  <p className="text-gray-400 text-sm">Personalizovane analize</p>
                                </Link>
                              </div>
                            </div>

                            {/* Alatke Section */}
                            <div className="pl-3 sm:pl-5">
                              <h3 className="text-purple-300 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Alatke</h3>
                              <div className="space-y-3 sm:space-y-4">
                                <Link href="/affirmations" className="block text-gray-300 hover:text-purple-300 transition-colors" onClick={() => document.getElementById('mobile-menu-toggle')!.checked = false}>
                                  <div className="font-medium flex items-center">
                                    <Feather className="h-4 w-4 mr-2 text-purple-400" />
                                    Astrološke afirmacije
                                  </div>
                                  <p className="text-gray-400 text-sm">Pozitivne dnevne afirmacije</p>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </details>
                        
                        <Link href="/contact" className="flex items-center p-3 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors" onClick={() => document.getElementById('mobile-menu-toggle')!.checked = false}>
                          <MessageSquare className="mr-2 h-5 w-5 text-purple-400" />
                          <span className="font-medium">Kontakt</span>
                        </Link>
                        
                        {/* Additional Quick Links */}
                        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700">
                          <h3 className="text-xs sm:text-sm uppercase text-gray-400 mb-2 sm:mb-3">Brzi linkovi</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <Link href="/" className="px-2 sm:px-3 py-2 bg-gray-800/50 rounded hover:bg-gray-700 transition-colors flex items-center text-sm" onClick={() => document.getElementById('mobile-menu-toggle')!.checked = false}>
                              <Sparkles className="mr-1 h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                              <span>Početna</span>
                            </Link>
                            <Link href="/natal-chart" className="px-2 sm:px-3 py-2 bg-gray-800/50 rounded hover:bg-gray-700 transition-colors flex items-center text-sm" onClick={() => document.getElementById('mobile-menu-toggle')!.checked = false}>
                              <Star className="mr-1 h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                              <span className="hidden xs:inline">Natalna karta</span>
                              <span className="xs:hidden">Karta</span>
                            </Link>
                            <Link href="/horoscope" className="px-2 sm:px-3 py-2 bg-gray-800/50 rounded hover:bg-gray-700 transition-colors flex items-center text-sm" onClick={() => document.getElementById('mobile-menu-toggle')!.checked = false}>
                              <Sun className="mr-1 h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                              <span>Horoskop</span>
                            </Link>
                            <Link href="/compatibility" className="px-2 sm:px-3 py-2 bg-gray-800/50 rounded hover:bg-gray-700 transition-colors flex items-center text-sm" onClick={() => document.getElementById('mobile-menu-toggle')!.checked = false}>
                              <Heart className="mr-1 h-3 w-3 sm:h-4 sm:w-4 text-pink-400" />
                              <span className="hidden xs:inline">Kompatibilnost</span>
                              <span className="xs:hidden">Ljubav</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main>{children}</main>
        
        <footer className="bg-gray-900 text-white pt-16 pb-8">
          <div className="container mx-auto px-4">
            {/* Newsletter - Now at the top of the footer */}
            <div className="max-w-xl mx-auto text-center mb-8 sm:mb-12 px-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Pretplatite se na naš newsletter</h3>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">
                Primajte najnovije horoskope i astrološke savete direktno u vaš inbox
              </p>
              <NewsletterForm />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
              {/* About Section */}
              <div className="sm:col-span-2 lg:col-span-1">
                <Link href="/" className="flex items-center space-x-2 text-lg sm:text-xl font-bold mb-4 hover:text-purple-300 transition-colors">
                  <Sparkles size={20} className="text-purple-400 sm:w-6 sm:h-6" />
                  <span>zvezde365.com</span>
                </Link>
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                  Vodeći astrološki portal za ceo region koji nudi personalizovane natalne karte, horoskope i astrološka uputstva na maternjem jeziku.
                </p>
                <div className="flex space-x-4 sm:space-x-6">
                  <a href="#" className="bg-gray-800 hover:bg-purple-800 text-gray-300 hover:text-white px-4 py-2 rounded-md font-semibold tracking-wide text-sm transition-all">Instagram</a>
                  <a href="#" className="bg-gray-800 hover:bg-purple-800 text-gray-300 hover:text-white px-4 py-2 rounded-md font-semibold tracking-wide text-sm transition-all">TikTok</a>
                  <a href="#" className="bg-gray-800 hover:bg-purple-800 text-gray-300 hover:text-white px-4 py-2 rounded-md font-semibold tracking-wide text-sm transition-all">YouTube</a>
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star className="mr-2 h-4 w-4 text-purple-400" />
                  Horoskop
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <Link href="/horoscope" className="hover:text-purple-300 transition-colors flex items-center">
                      <ChevronRight className="h-3 w-3 mr-1" />
                      <span>Dnevni, nedeljni i mesečni</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/lunar-phases" className="hover:text-purple-300 transition-colors flex items-center">
                      <ChevronRight className="h-3 w-3 mr-1" />
                      <span>Mesečeve faze</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/transit-calculator" className="hover:text-purple-300 transition-colors flex items-center">
                      <ChevronRight className="h-3 w-3 mr-1" />
                      <span>Kalkulator tranzita</span>
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-purple-400" />
                  Izveštaji
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <Link href="/natal-chart" className="hover:text-purple-300 transition-colors flex items-center">
                      <ChevronRight className="h-3 w-3 mr-1" />
                      <span>Natalna karta</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/compatibility" className="hover:text-purple-300 transition-colors flex items-center">
                      <ChevronRight className="h-3 w-3 mr-1" />
                      <span>Kompatibilnost</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/reports" className="hover:text-purple-300 transition-colors flex items-center">
                      <ChevronRight className="h-3 w-3 mr-1" />
                      <span>Astrološki izveštaji</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Feather className="mr-2 h-4 w-4 text-purple-400" />
                  Alatke
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <Link href="/affirmations" className="hover:text-purple-300 transition-colors flex items-center">
                      <ChevronRight className="h-3 w-3 mr-1" />
                      <span>Astrološke afirmacije</span>
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4 text-purple-400" />
                  Kontakt
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <Mail className="h-5 w-5 mr-2 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>info@zvezde365.com</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Zvezdani put 365, Sazvežđe Oriona</span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Dostupni non-stop, 24/7/365</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Bottom Footer */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-xs sm:text-sm">
              <p className="text-center sm:text-left">© 2025 zvezde365.com. Sva prava zadržana.</p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 mt-3 sm:mt-0">
                <Link href="/privacy-policy" className="hover:text-purple-300 transition-colors text-center sm:text-left">Politika privatnosti</Link>
                <Link href="/terms" className="hover:text-purple-300 transition-colors text-center sm:text-left">Uslovi korišćenja</Link>
                <Link href="/contact" className="hover:text-purple-300 transition-colors text-center sm:text-left">Kontakt</Link>
              </div>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}