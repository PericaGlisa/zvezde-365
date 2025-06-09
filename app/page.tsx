import Link from 'next/link';
import { Star, Sparkles, Sun, CalendarDays, Heart, ArrowRight, Moon, Calendar, Feather, FileText } from 'lucide-react';

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

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen lg:min-h-[80vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
          {/* Stars effect overlay */}
          <div className="absolute inset-0 bg-black opacity-60"></div>
          
          {/* Floating Zodiac Symbols */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Aries - Ram symbol */}
            <div className="absolute top-[15%] left-[10%] lg:top-[20%] lg:left-[8%] animate-float opacity-30">
              <img src={zodiacSvgMap['aries']} alt="Aries symbol" width={40} height={40} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-8 lg:h-8 animate-shimmer" />
            </div>
            
            {/* Taurus - Bull symbol */}
            <div className="absolute top-[45%] left-[5%] lg:top-[50%] lg:left-[3%] animate-float-delayed opacity-30">
              <img src={zodiacSvgMap['taurus']} alt="Taurus symbol" width={40} height={40} className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-7 lg:h-7 animate-shimmer-delayed" />
            </div>
            
            {/* Gemini - Twins symbol */}
            <div className="absolute top-[25%] left-[85%] lg:top-[30%] lg:left-[88%] animate-float-reverse opacity-30">
              <img src={zodiacSvgMap['gemini']} alt="Gemini symbol" width={40} height={40} className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-9 lg:h-9 animate-shimmer-slow" />
            </div>
            
            {/* Cancer - Crab symbol */}
            <div className="absolute top-[65%] left-[80%] lg:top-[70%] lg:left-[85%] animate-float-slow opacity-30">
              <img src={zodiacSvgMap['cancer']} alt="Cancer symbol" width={40} height={40} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-8 lg:h-8 animate-shimmer-delayed-slow" />
            </div>
            
            {/* Leo - Lion symbol */}
            <div className="absolute top-[8%] left-[40%] lg:top-[12%] lg:left-[45%] animate-float-delayed-slow opacity-30">
              <img src={zodiacSvgMap['leo']} alt="Leo symbol" width={40} height={40} className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-8 lg:h-8 animate-shimmer" />
            </div>
            
            {/* Virgo - Virgin symbol */}
            <div className="absolute top-[75%] left-[15%] lg:top-[80%] lg:left-[12%] animate-float-reverse-slow opacity-30">
              <img src={zodiacSvgMap['virgo']} alt="Virgo symbol" width={40} height={40} className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-7 lg:h-7 animate-shimmer-delayed" />
            </div>
            
            {/* Libra - Scales symbol */}
            <div className="absolute top-[18%] left-[65%] lg:top-[22%] lg:left-[70%] animate-float opacity-30">
              <img src={zodiacSvgMap['libra']} alt="Libra symbol" width={40} height={40} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-8 lg:h-8 animate-shimmer-slow" />
            </div>
            
            {/* Scorpio - Scorpion symbol */}
            <div className="absolute top-[55%] left-[92%] lg:top-[60%] lg:left-[95%] animate-float-delayed opacity-30">
              <img src={zodiacSvgMap['scorpio']} alt="Scorpio symbol" width={40} height={40} className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-9 lg:h-9 animate-shimmer-delayed-slow" />
            </div>
            
            {/* Sagittarius - Archer symbol */}
            <div className="absolute top-[80%] left-[60%] lg:top-[85%] lg:left-[65%] animate-float-reverse opacity-30">
              <img src={zodiacSvgMap['sagittarius']} alt="Sagittarius symbol" width={40} height={40} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-8 lg:h-8 animate-shimmer" />
            </div>
            
            {/* Capricorn - Goat symbol */}
            <div className="absolute top-[35%] left-[25%] lg:top-[40%] lg:left-[20%] animate-float-slow opacity-30">
              <img src={zodiacSvgMap['capricorn']} alt="Capricorn symbol" width={40} height={40} className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-7 lg:h-7 animate-shimmer-delayed" />
            </div>
            
            {/* Aquarius - Water Bearer symbol */}
            <div className="absolute top-[30%] left-[75%] lg:top-[35%] lg:left-[78%] animate-float-delayed-slow opacity-30">
              <img src={zodiacSvgMap['aquarius']} alt="Aquarius symbol" width={40} height={40} className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-8 lg:h-8 animate-shimmer-slow" />
            </div>
            
            {/* Pisces - Fish symbol */}
            <div className="absolute top-[65%] left-[40%] lg:top-[70%] lg:left-[45%] animate-float-reverse-slow opacity-30">
              <img src={zodiacSvgMap['pisces']} alt="Pisces symbol" width={40} height={40} className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-9 lg:h-9 animate-shimmer-delayed-slow" />
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-6 z-10">
          <div className="max-w-3xl lg:max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
              <Sparkles size={60} className="text-purple-400 sm:w-20 sm:h-20 lg:w-16 lg:h-16" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight px-2">
              Otkrijte tajne zvezda na <span className="text-purple-400">zvezde365.com</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl mb-6 sm:mb-8 lg:mb-10 text-gray-300 px-2 max-w-2xl lg:max-w-3xl mx-auto">
              Personalizovane natalne karte, horoskopi i astrološka uputstva za ceo region na maternjem jeziku, zasnovana na drevnom znanju i modernoj tehnologiji.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-row justify-center gap-3 sm:gap-4 lg:gap-6 px-2">
              <Link href="/natal-chart" className="w-full sm:w-auto lg:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 sm:px-8 lg:px-10 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5" />
                <span className="text-sm sm:text-base lg:text-base">Naručite natalnu kartu</span>
              </Link>
              <Link href="#services" className="w-full sm:w-auto lg:w-auto bg-transparent hover:bg-white/10 border border-white text-white font-bold py-3 px-6 sm:px-8 lg:px-10 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5" />
                <span className="text-sm sm:text-base lg:text-base">Istražite usluge</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-10 lg:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-indigo-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Naše usluge</h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-2">
              Ponudite sebi putovanje samootkrivanja kroz moćne astrološke uvide i alate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Service Card 1 - Natalna karta */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 sm:p-8 transform transition duration-300 hover:scale-105 backdrop-blur-sm border border-purple-500/20">
              <div className="bg-purple-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Star className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Natalna karta</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Detaljna personalizovana natalna karta sa tumačenjem planeta, kuća, i aspekata, otkrivajući vaše jedinstvene snage i izazove.
              </p>
              <Link href="/natal-chart" className="text-purple-400 hover:text-purple-300 inline-flex items-center text-sm sm:text-base">
                <span>Naruči sada</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
            
            {/* Service Card 2 - Dnevni horoskop */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 sm:p-8 transform transition duration-300 hover:scale-105 backdrop-blur-sm border border-purple-500/20">
              <div className="bg-purple-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Sun className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Dnevni horoskop</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Dobijte dnevne, nedeljne i mesečne horoskope sa preciznim predviđanjima na osnovu trenutnih nebeskih kretanja.
              </p>
              <Link href="/horoscope" className="text-purple-400 hover:text-purple-300 inline-flex items-center text-sm sm:text-base">
                <span>Saznajte više</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
            
            {/* Service Card 3 - Kompatibilnost */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 sm:p-8 transform transition duration-300 hover:scale-105 backdrop-blur-sm border border-purple-500/20">
              <div className="bg-purple-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Kompatibilnost</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Istražite dubinu vaše veze sa analizom kompatibilnosti koja otkriva snage i potencijalne izazove vašeg odnosa.
              </p>
              <Link href="/compatibility" className="text-purple-400 hover:text-purple-300 inline-flex items-center text-sm sm:text-base">
                <span>Proveri kompatibilnost</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
            
            {/* Service Card 4 - Mesečeve faze */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 sm:p-8 transform transition duration-300 hover:scale-105 backdrop-blur-sm border border-purple-500/20">
              <div className="bg-purple-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Moon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Mesečeve faze</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Otkrijte kako trenutna faza Meseca utiče na vas i vaše planove, kao i najbolje vreme za različite aktivnosti.
              </p>
              <Link href="/lunar-phases" className="text-purple-400 hover:text-purple-300 inline-flex items-center text-sm sm:text-base">
                <span>Istražite faze</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
            
            {/* Service Card 5 - Tranzit kalkulator */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 sm:p-8 transform transition duration-300 hover:scale-105 backdrop-blur-sm border border-purple-500/20">
              <div className="bg-purple-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Tranzit kalkulator</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Izračunajte kako planetarni tranziti utiču na vašu natalnu kartu i dobijte uvid u trenutne astrološke uticaje.
              </p>
              <Link href="/transit-calculator" className="text-purple-400 hover:text-purple-300 inline-flex items-center text-sm sm:text-base">
                <span>Izračunaj tranzite</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
            
            {/* Service Card 6 - Afirmacije */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 sm:p-8 transform transition duration-300 hover:scale-105 backdrop-blur-sm border border-purple-500/20">
              <div className="bg-purple-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Feather className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Astrološke afirmacije</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Personalizovane astrološke afirmacije zasnovane na vašem zodijačkom znaku i trenutnoj fazi Meseca.
              </p>
              <Link href="/affirmations" className="text-purple-400 hover:text-purple-300 inline-flex items-center text-sm sm:text-base">
                <span>Generiši afirmacije</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
            
            {/* Service Card 7 - Izveštaji */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 sm:p-8 transform transition duration-300 hover:scale-105 backdrop-blur-sm border border-purple-500/20">
              <div className="bg-purple-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Astrološki izveštaji</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Detaljni personalizovani astrološki izveštaji koji pokrivaju različite aspekte vašeg života, karijere i odnosa.
              </p>
              <Link href="/reports" className="text-purple-400 hover:text-purple-300 inline-flex items-center text-sm sm:text-base">
                <span>Naručite izveštaj</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Zašto izabrati nas?</h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-2">
                Sa zvezde365.com, dobijate više od jednostavnog horoskopa—dobijate sveobuhvatno astrološko iskustvo.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="flex items-start">
                <div className="bg-purple-600 rounded-full p-3 mr-4">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Stručnost i preciznost</h3>
                  <p className="text-gray-300">
                    Naši astrološki izveštaji kombinuju drevnu mudrost sa savremenim algoritmima za precizne i tačne uvide.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="flex items-start">
                <div className="bg-purple-600 rounded-full p-3 mr-4">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Personalizovani izveštaji</h3>
                  <p className="text-gray-300">
                    Svaki izveštaj je specifično prilagođen vašim jedinstvenim astrološkim podacima, pružajući personalizovane uvide.
                  </p>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="flex items-start">
                <div className="bg-purple-600 rounded-full p-3 mr-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Napredni vizuelni prikazi</h3>
                  <p className="text-gray-300">
                    Naše natalne karte i astrološki prikazi su intuitivni, interaktivni i vizuelno očaravajući.
                  </p>
                </div>
              </div>
              
              {/* Feature 4 */}
              <div className="flex items-start">
                <div className="bg-purple-600 rounded-full p-3 mr-4">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Pristupačnost</h3>
                  <p className="text-gray-300">
                    Sadržaj prilagođen potrebama korisnika iz celog regiona, uz jednostavan i razumljiv pristup astrologiji.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Spremni da otkrijete šta zvezde kažu o vama?</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-2 mb-8">
            Vaša astrološka putovanja počinje danas. Naručite svoju personalizovanu natalnu kartu i otkrijte čuda svog kosmičkog otiska.
          </p>
          <Link href="/natal-chart" className="bg-white text-purple-900 hover:bg-gray-200 font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center">
            <Star className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Naručite vašu natalnu kartu</span>
          </Link>
        </div>
      </section>
    </div>
  );
}