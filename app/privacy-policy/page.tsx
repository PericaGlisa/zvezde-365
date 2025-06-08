"use client";

import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Shield size={40} className="text-purple-400 sm:w-12 sm:h-12 md:w-12 md:h-12" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Politika privatnosti
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Vaša privatnost nam je važna. Saznajte kako štitimo i koristimo vaše podatke.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8 shadow-xl text-gray-300 space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">1. Prikupljanje podataka</h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Prikupljamo samo one podatke koji su neophodni za pružanje naših usluga:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Osnovni podaci za izradu natalne karte (datum, vreme i mesto rođenja)</li>
                <li>Kontakt informacije (email adresa)</li>
                <li>Podaci o plaćanju (obrađuju se preko sigurnih platnih sistema)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">2. Korišćenje podataka</h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Vaše podatke koristimo isključivo za:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Izradu personalizovanih astroloških izveštaja</li>
                <li>Komunikaciju vezanu za vaše narudžbine</li>
                <li>Slanje newsletter-a (samo uz vašu izričitu saglasnost)</li>
                <li>Poboljšanje kvaliteta naših usluga</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">3. Zaštita podataka</h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Primenjujemo najsavremenije mere zaštite vaših podataka:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>SSL enkripcija za siguran prenos podataka</li>
                <li>Sigurno skladištenje podataka na zaštićenim serverima</li>
                <li>Redovno ažuriranje sigurnosnih protokola</li>
                <li>Ograničen pristup podacima samo ovlašćenim osobama</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">4. Kolačići (Cookies)</h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Koristimo kolačiće za:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Poboljšanje funkcionalnosti sajta</li>
                <li>Analizu korišćenja sajta</li>
                <li>Personalizaciju sadržaja</li>
                <li>Pamćenje vaših preferenci</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">5. Vaša prava</h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Imate pravo da:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Zatražite uvid u vaše podatke</li>
                <li>Zatražite izmenu ili brisanje vaših podataka</li>
                <li>Povučete saglasnost za obradu podataka</li>
                <li>Budete zaboravljeni (brisanje svih podataka)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">6. Kontakt</h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Za sva pitanja vezana za vašu privatnost, možete nas kontaktirati na:
              </p>
              <p className="text-sm sm:text-base">Email: <a href="mailto:privacy@zvezde365.com" className="text-purple-400 hover:text-purple-300">privacy@zvezde365.com</a></p>
            </section>

            <div className="border-t border-gray-700 pt-8 mt-8">
              <p className="text-sm text-gray-400">
                Poslednje ažuriranje: 1. april 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}