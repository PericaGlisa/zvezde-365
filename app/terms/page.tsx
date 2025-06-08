"use client";

import Link from 'next/link';
import { ScrollText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <ScrollText size={40} className="text-purple-400 sm:w-12 sm:h-12 md:w-12 md:h-12" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Uslovi korišćenja
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Molimo vas da pažljivo pročitate uslove korišćenja pre upotrebe naših usluga.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8 shadow-xl text-gray-300 space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">1. Opšte odredbe</h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Korišćenjem zvezde365.com prihvatate ove uslove korišćenja u celosti. Zadržavamo pravo da izmenimo ove uslove u bilo kom trenutku, uz obaveštenje korisnika o izmenama.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">2. Usluge</h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Naše usluge uključuju:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Izradu natalnih karti</li>
                <li>Astrološke prognoze i tumačenja</li>
                <li>Personalizovane astrološke izveštaje</li>
                <li>Online konsultacije</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">3. Odricanje od odgovornosti</h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Naše usluge su informativnog karaktera i ne predstavljaju zamenu za:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Medicinske savete ili tretmane</li>
                <li>Finansijske ili pravne savete</li>
                <li>Profesionalno savetovanje</li>
                <li>Psihološko savetovanje</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">4. Intelektualna svojina</h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Sav sadržaj na zvezde365.com je zaštićen autorskim pravima i uključuje:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Tekstove i članke</li>
                <li>Grafičke elemente i dizajn</li>
                <li>Astrološke kalkulacije i tumačenja</li>
                <li>Softverska rešenja i alate</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">5. Plaćanje i refundacija</h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Naša politika plaćanja i refundacije:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Sve cene su jasno istaknute pre kupovine</li>
                <li>Plaćanje se vrši unapred za sve usluge</li>
                <li>Refundacija je moguća u roku od 24 sata od kupovine</li>
                <li>Za otkazane konsultacije važi posebna politika refundacije</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">6. Pravila ponašanja</h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Od korisnika očekujemo:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Poštovanje prema drugim korisnicima i astrolozima</li>
                <li>Tačno navođenje ličnih podataka</li>
                <li>Odgovorno korišćenje usluga</li>
                <li>Poštovanje privatnosti drugih korisnika</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">7. Rešavanje sporova</h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                U slučaju spora, obavezujemo se da:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Prvo pokušamo mirno rešavanje</li>
                <li>Koristimo medijaciju ako je potrebno</li>
                <li>Primenimo važeće zakone Republike Srbije</li>
              </ul>
            </section>

            <div className="border-t border-gray-700 pt-6 sm:pt-8 mt-6 sm:mt-8">
              <p className="text-xs sm:text-sm text-gray-400">
                Poslednje ažuriranje: 1. april 2025.
              </p>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Za sva pitanja vezana za uslove korišćenja, kontaktirajte nas na{' '}
                <a href="mailto:terms@zvezde365.com" className="text-purple-400 hover:text-purple-300">
                  terms@zvezde365.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}