// Constants for astrological calculations

// Zodiac Signs with dates
export const zodiacSigns = [
  { id: 'aries', name: 'Ovan', startDate: '03-21', endDate: '04-19', element: 'Vatra', quality: 'Kardinal', ruling: 'Mars' },
  { id: 'taurus', name: 'Bik', startDate: '04-20', endDate: '05-20', element: 'Zemlja', quality: 'Fiksni', ruling: 'Venera' },
  { id: 'gemini', name: 'Blizanci', startDate: '05-21', endDate: '06-20', element: 'Vazduh', quality: 'Promenjiv', ruling: 'Merkur' },
  { id: 'cancer', name: 'Rak', startDate: '06-21', endDate: '07-22', element: 'Voda', quality: 'Kardinal', ruling: 'Mesec' },
  { id: 'leo', name: 'Lav', startDate: '07-23', endDate: '08-22', element: 'Vatra', quality: 'Fiksni', ruling: 'Sunce' },
  { id: 'virgo', name: 'Devica', startDate: '08-23', endDate: '09-22', element: 'Zemlja', quality: 'Promenjiv', ruling: 'Merkur' },
  { id: 'libra', name: 'Vaga', startDate: '09-23', endDate: '10-22', element: 'Vazduh', quality: 'Kardinal', ruling: 'Venera' },
  { id: 'scorpio', name: 'Škorpija', startDate: '10-23', endDate: '11-21', element: 'Voda', quality: 'Fiksni', ruling: 'Pluton, Mars' },
  { id: 'sagittarius', name: 'Strelac', startDate: '11-22', endDate: '12-21', element: 'Vatra', quality: 'Promenjiv', ruling: 'Jupiter' },
  { id: 'capricorn', name: 'Jarac', startDate: '12-22', endDate: '01-19', element: 'Zemlja', quality: 'Kardinal', ruling: 'Saturn' },
  { id: 'aquarius', name: 'Vodolija', startDate: '01-20', endDate: '02-18', element: 'Vazduh', quality: 'Fiksni', ruling: 'Uran, Saturn' },
  { id: 'pisces', name: 'Ribe', startDate: '02-19', endDate: '03-20', element: 'Voda', quality: 'Promenjiv', ruling: 'Neptun, Jupiter' }
];

// Planets with properties
export const planets = [
  { id: 'sun', name: 'Sunce', type: 'Luminary', element: 'Vatra', importance: 1 },
  { id: 'moon', name: 'Mesec', type: 'Luminary', element: 'Voda', importance: 2 },
  { id: 'mercury', name: 'Merkur', type: 'Personal', element: 'Vazduh', importance: 3 },
  { id: 'venus', name: 'Venera', type: 'Personal', element: 'Zemlja', importance: 4 },
  { id: 'mars', name: 'Mars', type: 'Personal', element: 'Vatra', importance: 5 },
  { id: 'jupiter', name: 'Jupiter', type: 'Social', element: 'Vatra', importance: 6 },
  { id: 'saturn', name: 'Saturn', type: 'Social', element: 'Zemlja', importance: 7 },
  { id: 'uranus', name: 'Uran', type: 'Transpersonal', element: 'Vazduh', importance: 8 },
  { id: 'neptune', name: 'Neptun', type: 'Transpersonal', element: 'Voda', importance: 9 },
  { id: 'pluto', name: 'Pluton', type: 'Transpersonal', element: 'Voda', importance: 10 }
];

// Aspects with properties
export const aspects = [
  { id: 'conjunction', name: 'Konjunkcija', angle: 0, orb: 8, harmonic: 'Neutral', power: 10 },
  { id: 'opposition', name: 'Opozicija', angle: 180, orb: 8, harmonic: 'Hard', power: 9 },
  { id: 'trine', name: 'Trigon', angle: 120, orb: 7, harmonic: 'Soft', power: 8 },
  { id: 'square', name: 'Kvadrat', angle: 90, orb: 7, harmonic: 'Hard', power: 7 },
  { id: 'sextile', name: 'Sekstil', angle: 60, orb: 6, harmonic: 'Soft', power: 6 },
  { id: 'quincunx', name: 'Kvinkunks', angle: 150, orb: 5, harmonic: 'Neutral', power: 5 },
  { id: 'semisextile', name: 'Polusekstil', angle: 30, orb: 3, harmonic: 'Neutral', power: 4 },
  { id: 'semisquare', name: 'Polukvadratura', angle: 45, orb: 3, harmonic: 'Hard', power: 3 },
  { id: 'sesquisquare', name: 'Seskvikvadratura', angle: 135, orb: 3, harmonic: 'Hard', power: 3 },
  { id: 'quintile', name: 'Kvintil', angle: 72, orb: 2, harmonic: 'Soft', power: 2 },
  { id: 'biquintile', name: 'Bikvintil', angle: 144, orb: 2, harmonic: 'Soft', power: 2 }
];

// Houses with descriptions
export const houses = [
  { id: 1, name: 'Prva kuća', keywords: 'Identitet, fizički izgled, lični izraz', ruler: 'Aries/Mars' },
  { id: 2, name: 'Druga kuća', keywords: 'Materijalne vrednosti, prihodi, resursi', ruler: 'Taurus/Venus' },
  { id: 3, name: 'Treća kuća', keywords: 'Komunikacija, učenje, braća i sestre', ruler: 'Gemini/Mercury' },
  { id: 4, name: 'Četvrta kuća', keywords: 'Dom, porodica, koreni, privatnost', ruler: 'Cancer/Moon' },
  { id: 5, name: 'Peta kuća', keywords: 'Kreativnost, ljubav, deca, zabava', ruler: 'Leo/Sun' },
  { id: 6, name: 'Šesta kuća', keywords: 'Zdravlje, svakodnevne rutine, posao', ruler: 'Virgo/Mercury' },
  { id: 7, name: 'Sedma kuća', keywords: 'Partnerstva, brak, odnosi', ruler: 'Libra/Venus' },
  { id: 8, name: 'Osma kuća', keywords: 'Transformacija, zajedničke finansije, intimnost', ruler: 'Scorpio/Pluto' },
  { id: 9, name: 'Deveta kuća', keywords: 'Filozofija, putovanja, visoko obrazovanje', ruler: 'Sagittarius/Jupiter' },
  { id: 10, name: 'Deseta kuća', keywords: 'Karijera, status, javni imidž', ruler: 'Capricorn/Saturn' },
  { id: 11, name: 'Jedanaesta kuća', keywords: 'Prijatelji, grupe, nade i želje', ruler: 'Aquarius/Uranus' },
  { id: 12, name: 'Dvanaesta kuća', keywords: 'Podsvest, duhovno, samoća, tajne', ruler: 'Pisces/Neptune' }
];

// Elements with qualities
export const elements = [
  { id: 'fire', name: 'Vatra', quality: 'Topla i suva', expression: 'Energija, strast, inicijativa', signs: ['aries', 'leo', 'sagittarius'] },
  { id: 'earth', name: 'Zemlja', quality: 'Hladna i suva', expression: 'Praktičnost, stabilnost, materijalnost', signs: ['taurus', 'virgo', 'capricorn'] },
  { id: 'air', name: 'Vazduh', quality: 'Topli i vlažni', expression: 'Intelekt, komunikacija, društvenost', signs: ['gemini', 'libra', 'aquarius'] },
  { id: 'water', name: 'Voda', quality: 'Hladna i vlažna', expression: 'Emocije, intuicija, dubina', signs: ['cancer', 'scorpio', 'pisces'] }
];

// Basic compatibility scores between elements (scale 1-10)
export const elementCompatibility = {
  fire: { fire: 8, earth: 4, air: 9, water: 5 },
  earth: { fire: 4, earth: 7, air: 5, water: 9 },
  air: { fire: 9, earth: 5, air: 8, water: 4 },
  water: { fire: 5, earth: 9, air: 4, water: 8 }
};

// Moon phases
export const moonPhases = [
  { id: 'new_moon', name: 'Mlad mesec', degrees: 0, orb: 15, meaning: 'Nov početak, postavljanje namera, početak ciklusa' },
  { id: 'waxing_crescent', name: 'Rastući polumesec', degrees: 45, orb: 15, meaning: 'Izgradnja momentum, rast, početni napori' },
  { id: 'first_quarter', name: 'Prva četvrt', degrees: 90, orb: 15, meaning: 'Akcija, odluke, suočavanje sa prvim izazovima' },
  { id: 'waxing_gibbous', name: 'Rastuća ispupčenost', degrees: 135, orb: 15, meaning: 'Refining, usavršavanje, prilagođavanje' },
  { id: 'full_moon', name: 'Pun mesec', degrees: 180, orb: 15, meaning: 'Kulminacija, realizacija, jasnoća, vrhunac' },
  { id: 'waning_gibbous', name: 'Opadajuća ispupčenost', degrees: 225, orb: 15, meaning: 'Zahvalnost, deljenje, integracija' },
  { id: 'last_quarter', name: 'Poslednja četvrt', degrees: 270, orb: 15, meaning: 'Preispitivanje, puštanje, odluke o budućem smeru' },
  { id: 'waning_crescent', name: 'Opadajući polumesec', degrees: 315, orb: 15, meaning: 'Otpuštanje, završavanje, regeneracija, priprema za novi ciklus' }
];

// ********** CALCULATION FUNCTIONS **********

// Get zodiac sign for a date
export function getZodiacSign(month: number, day: number): string {
  // Adjust month for array indexing (0-11)
  const normalizedMonth = month - 1;
  
  // Check if the date is within the current month's sign or the previous month's sign
  for (const sign of zodiacSigns) {
    const [startMonth, startDay] = sign.startDate.split('-').map(Number);
    const [endMonth, endDay] = sign.endDate.split('-').map(Number);
    
    // Handle the special case for Capricorn (December to January)
    if (startMonth > endMonth) {
      if ((normalizedMonth === startMonth - 1 && day >= startDay) || 
          (normalizedMonth === endMonth - 1 && day <= endDay)) {
        return sign.id;
      }
    } else {
      if ((normalizedMonth === startMonth - 1 && day >= startDay) && 
          (normalizedMonth === endMonth - 1 && day <= endDay)) {
        return sign.id;
      }
    }
  }
  
  // Fallback
  return 'aries';
}

// Calculate element compatibility percentage (simplified)
export function calculateElementCompatibility(element1: string, element2: string): number {
  const normalizedElem1 = element1.toLowerCase();
  const normalizedElem2 = element2.toLowerCase();
  
  // Safe access to compatibility data
  const entry1 = elementCompatibility[normalizedElem1 as keyof typeof elementCompatibility];
  if (!entry1) return 50;
  
  const score = entry1[normalizedElem2 as keyof typeof entry1];
  if (!score) return 50;
  
  // Convert score to percentage
  return score * 10;
}

// Calculate moon phase for a given date
export function calculateMoonPhase(date: Date = new Date()): { phase: string; illumination: number; degrees: number } {
  // Constants for moon phase calculation
  const MOON_CYCLE_DAYS = 29.53059;
  
  // Reference date - known new moon (January 6, 2000)
  const REF_NEW_MOON = new Date('2000-01-06T12:24:00Z');
  
  // Calculate days since reference new moon
  const daysSinceRef = (date.getTime() - REF_NEW_MOON.getTime()) / (1000 * 60 * 60 * 24);
  
  // Calculate position in lunar cycle (0 to 1)
  const position = (daysSinceRef % MOON_CYCLE_DAYS) / MOON_CYCLE_DAYS;
  
  // Convert to degrees (0 to 360)
  const degrees = position * 360;
  
  // Calculate illumination percentage (0 to 1)
  const illumination = (1 - Math.cos(position * 2 * Math.PI)) / 2;
  
  // Determine moon phase
  let phase;
  if (degrees < 22.5) phase = 'new_moon';
  else if (degrees < 67.5) phase = 'waxing_crescent';
  else if (degrees < 112.5) phase = 'first_quarter';
  else if (degrees < 157.5) phase = 'waxing_gibbous';
  else if (degrees < 202.5) phase = 'full_moon';
  else if (degrees < 247.5) phase = 'waning_gibbous';
  else if (degrees < 292.5) phase = 'last_quarter';
  else if (degrees < 337.5) phase = 'waning_crescent';
  else phase = 'new_moon';
  
  return {
    phase,
    illumination: Math.round(illumination * 100) / 100,
    degrees: Math.round(degrees)
  };
}

// Generate compatibility insights based on sign combinations
export function getCompatibilityInsights(sign1: string, sign2: string): { 
  score: number; 
  chemistry: number; 
  communication: number; 
  stability: number; 
  overview: string; 
  strengths: string[]; 
  challenges: string[];
} {
  const sign1Data = zodiacSigns.find(s => s.id === sign1);
  const sign2Data = zodiacSigns.find(s => s.id === sign2);

  if (!sign1Data || !sign2Data) {
    throw new Error('Invalid zodiac signs provided');
  }

  // Calculate element compatibility
  const elementScore = calculateElementCompatibility(sign1Data.element.toLowerCase(), sign2Data.element.toLowerCase());
  
  // Calculate compatibility by quality
  const qualityScore = (sign1Data.quality === sign2Data.quality) ? 70 : 
                       ((sign1Data.quality === 'Kardinal' && sign2Data.quality === 'Fiksni') || 
                        (sign1Data.quality === 'Fiksni' && sign2Data.quality === 'Promenjiv') || 
                        (sign1Data.quality === 'Promenjiv' && sign2Data.quality === 'Kardinal')) ? 85 : 65;
  
  // Calculate compatibility by planetary rulers
  const rulerScore = sign1Data.ruling === sign2Data.ruling ? 90 : 70;
  
  // Calculate overall compatibility score
  const score = Math.round((elementScore * 0.5) + (qualityScore * 0.3) + (rulerScore * 0.2));
  
  // Generate sub-scores
  const chemistry = Math.min(100, Math.round(elementScore * 1.1));
  const communication = Math.min(100, Math.round((elementScore * 0.4) + (qualityScore * 0.6)));
  const stability = Math.min(100, Math.round((qualityScore * 0.5) + (rulerScore * 0.5)));
  
  // Generate overview
  let overview = '';
  if (score >= 85) {
    overview = `Odnos između ${sign1Data.name} i ${sign2Data.name} ima izuzetan potencijal za harmoniju i dugoročni uspeh. Vaša prirodna kompatibilnost stvara odnos u kojem se osećate sigurno, shvaćeno i podržano.`;
  } else if (score >= 70) {
    overview = `${sign1Data.name} i ${sign2Data.name} imaju dobru kompatibilnost koja uz međusobno razumevanje i poštovanje može stvoriti dugotrajnu i ispunjavajuću vezu. Vaše razlike mogu biti izvor rasta i učenja.`;
  } else if (score >= 50) {
    overview = `Odnos između ${sign1Data.name} i ${sign2Data.name} zahteva rad i prilagođavanje. Iako postoje izazovi, razumevanje međusobnih razlika može voditi ka produktivnoj vezi koja podstiče obostrani rast.`;
  } else {
    overview = `${sign1Data.name} i ${sign2Data.name} imaju fundamentalne razlike u pristupu životu. Veza može biti izazovna, ali ako ste spremni da učite jedno od drugog, možete razviti duboko poštovanje za različite perspektive koje svako od vas donosi.`;
  }
  
  // Generate strengths and challenges
  const strengths = generateStrengths(sign1Data, sign2Data, score);
  const challenges = generateChallenges(sign1Data, sign2Data, score);
  
  return {
    score,
    chemistry,
    communication,
    stability,
    overview,
    strengths,
    challenges
  };
}

// Helper function to generate strengths
function generateStrengths(sign1: any, sign2: any, score: number): string[] {
  const strengths: string[] = [];
  
  // Element-based strengths
  if (sign1.element === sign2.element) {
    strengths.push(`Prirodno razumevanje zbog zajedničkog elementa ${sign1.element}`);
  } else if (
    (sign1.element === 'Vatra' && sign2.element === 'Vazduh') ||
    (sign1.element === 'Vazduh' && sign2.element === 'Vatra') ||
    (sign1.element === 'Zemlja' && sign2.element === 'Voda') ||
    (sign1.element === 'Voda' && sign2.element === 'Zemlja')
  ) {
    strengths.push(`Komplementarni elementi ${sign1.element} i ${sign2.element} koji se međusobno podržavaju`);
  }
  
  // Quality-based strengths
  if (sign1.quality === sign2.quality) {
    strengths.push(`Sličan pristup životnim situacijama (${sign1.quality} kvalitet)`);
  } else {
    strengths.push(`Raznovrsni pogledi na svet obogaćuju vaš odnos`);
  }
  
  // Ruler-based strengths
  if (sign1.ruling.includes(sign2.ruling) || sign2.ruling.includes(sign1.ruling)) {
    strengths.push(`Planetarna povezanost kroz vladare znakova stvara dublje razumevanje`);
  }
  
  // Add more general strengths based on score
  if (score >= 80) {
    strengths.push(`Izuzetna emocionalna povezanost i razumevanje`);
    strengths.push(`Prirodna hemija koja olakšava komunikaciju`);
  } else if (score >= 65) {
    strengths.push(`Dobra ravnoteža između sličnosti i razlika`);
    strengths.push(`Potencijal za dugoročni rast i razvoj odnosa`);
  } else {
    strengths.push(`Mogućnost učenja i proširivanja perspektive kroz različitosti`);
    strengths.push(`Kreativni pristup rešavanju problema zajedno`);
  }
  
  return strengths;
}

// Helper function to generate challenges
function generateChallenges(sign1: any, sign2: any, score: number): string[] {
  const challenges: string[] = [];
  
  // Element-based challenges
  if (
    (sign1.element === 'Vatra' && sign2.element === 'Voda') ||
    (sign1.element === 'Voda' && sign2.element === 'Vatra') ||
    (sign1.element === 'Zemlja' && sign2.element === 'Vazduh') ||
    (sign1.element === 'Vazduh' && sign2.element === 'Zemlja')
  ) {
    challenges.push(`Elementi ${sign1.element} i ${sign2.element} mogu biti u konfliktu`);
  }
  
  // Quality-based challenges
  if (
    (sign1.quality === 'Kardinal' && sign2.quality === 'Kardinal') ||
    (sign1.quality === 'Fiksni' && sign2.quality === 'Fiksni')
  ) {
    challenges.push(`Moguća borba za dominaciju i kontrolu (oba ${sign1.quality === 'Kardinal' ? 'kardinalna' : 'fiksna'} znaka)`);
  }
  
  // Add more general challenges based on score
  if (score < 50) {
    challenges.push(`Fundamentalno različiti pristupi životnim situacijama`);
    challenges.push(`Komunikacijski izazovi zbog različitih stilova izražavanja`);
    challenges.push(`Potreba za kompromisima u mnogim aspektima odnosa`);
  } else if (score < 65) {
    challenges.push(`Povremeni nesporazumi zbog različitih perspektiva`);
    challenges.push(`Potreba za aktivnim radom na komunikaciji`);
  } else {
    challenges.push(`Izbegavanje rutine može biti važno za održavanje odnosa svežim`);
    challenges.push(`Prevelika sličnost može dovesti do nedostatka izazova i rasta`);
  }
  
  return challenges;
}

// Generate personalized affirmations based on zodiac sign and moon phase
export function generateAffirmation(zodiacSign: string, moonPhase?: string): string {
  const signData = zodiacSigns.find(sign => sign.id === zodiacSign);
  if (!signData) return "Danas je dan za pozitivne misli i konstruktivne akcije.";
  
  const affirmations = {
    // For each sign
    aries: [
      "Moja hrabrost mi otvara nova vrata uspeha.",
      "Moja energija i entuzijazam inspirišu druge.",
      "Svaki dan koristim svoju strast za stvaranje života koji želim.",
      "Moja direktnost i iskrenost su moje snage.",
      "Prihvatam nove izazove sa samopouzdanjem i odlučnošću."
    ],
    taurus: [
      "Privlačim stabilnost i obilje u svoj život.",
      "Moja istrajnost mi donosi dugotrajne rezultate.",
      "Cenim svoj komfor i stvaram harmoniju oko sebe.",
      "Moja praktičnost i strpljenje su moji najveći saveznici.",
      "Zaslužujem lepotu i obilje u svom životu."
    ],
    gemini: [
      "Moja prilagodljivost mi omogućava da cvetam u svim situacijama.",
      "Moja znatiželja me vodi do fascinantnih otkrića.",
      "Moja komunikacija je jasna, efektivna i inspirativna.",
      "Otvoren/a sam za nove ideje i perspektive.",
      "Moja mentalna fleksibilnost je moj najveći dar."
    ],
    cancer: [
      "Moje emocije su izvor moje snage i intuicije.",
      "Stvaram sigurno utočište gde god da idem.",
      "Moja briga za druge se vraća meni umnogostručeno.",
      "Intuitivno znam šta je najbolje za mene.",
      "Prihvatam i cenim svoju osetljivost."
    ],
    leo: [
      "Moje samopouzdanje zrači iz mene i inspiriše druge.",
      "Zaslužujem da budem u centru pažnje i primljen/a sa ljubavlju.",
      "Moja kreativnost se izražava u svemu što radim.",
      "Lider sam u svom životu i sledim svoje srce.",
      "Moja velikodušnost privlači obilje u moj život."
    ],
    virgo: [
      "Moja preciznost i pažnja za detalje donose savršenstvo.",
      "Moja analitičnost mi pomaže da rešim svaki problem.",
      "Cenim napredak, bez obzira koliko je mali.",
      "Moja praktičnost mi pomaže da ostvarim svoje ciljeve.",
      "Dobro sam organizovan/a i uspešno upravljam svim aspektima svog života."
    ],
    libra: [
      "Privlačim harmonične odnose u svoj život.",
      "Balans i lepota me okružuju gde god da idem.",
      "Moja diplomatija rešava konflikte sa lakoćom.",
      "Donosim pravične i mudre odluke.",
      "Cenim partnerstva zasnovana na jednakosti i poštovanju."
    ],
    scorpio: [
      "Moja intenzivnost i strast su moje najveće snage.",
      "Konstantno se transformišem i iznova rađam.",
      "Moja intuicija me vodi do duboke istine.",
      "Hrabro se suočavam sa svojim najdubljim osećanjima.",
      "Moja moć regeneracije je neograničena."
    ],
    sagittarius: [
      "Moj optimizam me vodi ka novim avanturama.",
      "Konstantno širim svoje horizonte i učim.",
      "Moja iskrenost i entuzijazam inspirišu druge.",
      "Slobodan/na sam da istražim sve mogućnosti.",
      "Moja životna filozofija me vodi ka mudrosti."
    ],
    capricorn: [
      "Moja disciplina i istrajnost garantuju moj uspeh.",
      "Strpljivo gradim temelje za dugoročni uspeh.",
      "Zaslužujem priznanje za svoj naporan rad.",
      "Moja ambicija me vodi ka vrhovima mojih sposobnosti.",
      "Preuzimam odgovornost za kreiranje života koji želim."
    ],
    aquarius: [
      "Moja jedinstvenost je moja najveća snaga.",
      "Slobodan/na sam da budem svoj/a i da doprinesem čovečanstvu.",
      "Moje inovativne ideje menjaju svet na bolje.",
      "Povezujem se sa drugima na dubokom intelektualnom nivou.",
      "Prihvatam promene i radim na stvaranju bolje budućnosti."
    ],
    pisces: [
      "Moja intuicija me vodi ka mojoj najvišoj svrsi.",
      "Moja osetljivost je moj dar i moja snaga.",
      "Povezan/a sam sa duhovnom mudrošću koja me vodi.",
      "Privlačim ljubav i razumevanje u svoj život.",
      "Moja mašta stvara moju realnost."
    ]
  };

  // Moon phase specific affirmations
  const moonPhaseAffirmations = {
    new_moon: [
      `Kao ${signData.name}, započinjem nove projekte sa svežom energijom i jasnom vizijom.`,
      `Sada je savršeno vreme da posadim seme novih početaka u mom životu.`,
      `Otvoren/a sam za nove mogućnosti koje se pojavljuju u mom životu.`
    ],
    waxing_crescent: [
      `Svaki dan gradim momentum ka svojim ciljevima sa strpljenjem i istrajnošću.`,
      `Moj rast je konstantan i vidljiv, baš kao i rastući mesec.`,
      `Napredovanje ka mojim ciljevima postaje sve jasnije i sigurnije.`
    ],
    first_quarter: [
      `Spreman/na sam da prevazilazim prepreke na putu ka ostvarenju svojih ciljeva.`,
      `Imam odlučnost i hrabrost da nastavim uprkos izazovima koji se pojavljuju.`,
      `Svaki izazov je prilika da demonstriram svoju snagu i posvećenost.`
    ],
    waxing_gibbous: [
      `Usavršavam svoje veštine i prilagođavam svoje planove da bi postigao/la maksimum.`,
      `Blizu sam ostvarenja svojih ciljeva i nastavljam sa posvećenošću.`,
      `Jasno vidim rezultate svog truda i fokusiram se na finalne detalje.`
    ],
    full_moon: [
      `Prepoznajem i slavim svoje uspehe sa ponosom i zahvalnošću.`,
      `Moji napori dolaze do punog izražaja, baš kao i pun mesec na nebu.`,
      `Stojim u punoj svetlosti svojih dostignuća i svoje istinske prirode.`
    ],
    waning_gibbous: [
      `Delim svoje darove i znanje sa drugima sa velikodušnošću i zahvalnošću.`,
      `Vreme je da integršem naučene lekcije i iskustva u svoju mudrost.`,
      `S zahvalnošću prihvatam sve što sam postigao/la i naučio/la.`
    ],
    last_quarter: [
      `Otpuštam ono što mi više ne služi sa zahvalnošću za lekcije koje sam naučio/la.`,
      `Spreman/na sam da se odvojim od starih navika i verovanja koja me ograničavaju.`,
      `Pravim prostor za nove mogućnosti otpuštajući ono što je završeno.`
    ],
    waning_crescent: [
      `Odmaram se i regenerišem, znajući da je odmor deo procesa kreacije.`,
      `Pripremam se za novi ciklus rasta sa jasnom vizijom i obnovljenom energijom.`,
      `U tišini i odmoru pronalazim mudrost za svoje sledeće korake.`
    ]
  };

  // Pick a random affirmation from sign-specific list
  const signAffirmation = affirmations[zodiacSign as keyof typeof affirmations];
  const randomSignAffirmation = signAffirmation[Math.floor(Math.random() * signAffirmation.length)];
  
  // If moon phase is provided, also add a moon phase specific affirmation
  if (moonPhase && moonPhaseAffirmations[moonPhase as keyof typeof moonPhaseAffirmations]) {
    const phaseAffirmations = moonPhaseAffirmations[moonPhase as keyof typeof moonPhaseAffirmations];
    const randomPhaseAffirmation = phaseAffirmations[Math.floor(Math.random() * phaseAffirmations.length)];
    
    return `${randomSignAffirmation} ${randomPhaseAffirmation}`;
  }
  
  return randomSignAffirmation;
}