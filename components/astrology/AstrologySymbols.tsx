"use client";

import React from 'react';
import { cn } from "@/lib/utils";

export type AstrologySymbolType = 
  // Zodiac Signs
  | 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' 
  | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'
  // Planets
  | 'sun' | 'moon' | 'mercury' | 'venus' | 'mars' | 'jupiter'
  | 'saturn' | 'uranus' | 'neptune' | 'pluto'
  // Aspects
  | 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile'
  // Houses
  | 'house1' | 'house2' | 'house3' | 'house4' | 'house5' | 'house6'
  | 'house7' | 'house8' | 'house9' | 'house10' | 'house11' | 'house12'
  // Others
  | 'ascendant' | 'midheaven' | 'northnode' | 'southnode'
  | 'newmoon' | 'fullmoon' | 'firstquarter' | 'lastquarter';

interface AstrologySymbolProps {
  symbol: AstrologySymbolType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
}

export const symbolPathsMap: Record<AstrologySymbolType, string> = {
  // Zodiac Signs
  aries: 'M8 4 L16 12 L16 20',
  taurus: 'M5 8 Q8 4 12 8 Q16 12 16 16 M5 16 Q8 20 12 16 Q16 12 16 8',
  gemini: 'M8 4 L8 20 M16 4 L16 20 M6 8 L18 8 M6 16 L18 16',
  cancer: 'M5 12 A6 6 0 0 1 19 12 M9 8 A4 4 0 0 1 15 8 M9 16 A4 4 0 0 0 15 16',
  leo: 'M6 11 A5 5 0 1 1 11 11 A5 5 0 1 1 16 11 Q16 5 11 5 Q6 5 6 11 M11 11 L11 20',
  virgo: 'M9 4 L9 16 Q9 20 13 20 Q17 20 17 16 L17 10 Q17 6 13 6 Q9 6 9 10',
  libra: 'M6 16 L18 16 M6 12 L18 12 M12 12 L12 4',
  scorpio: 'M4 12 L12 12 L12 16 L16 12 L18 14',
  sagittarius: 'M6 18 L18 6 M14 6 L18 6 L18 10',
  capricorn: 'M6 18 Q6 8 12 8 Q18 8 18 14 Q18 18 14 18',
  aquarius: 'M5 12 L7 10 L9 12 L11 10 L13 12 L15 10 L17 12 M5 16 L7 14 L9 16 L11 14 L13 16 L15 14 L17 16',
  pisces: 'M6 8 Q12 4 12 12 Q12 20 18 16 M6 16 Q12 20 12 12 Q12 4 18 8',

  // Planets
  sun: 'M12 4 L12 6 M18 12 L20 12 M12 18 L12 20 M4 12 L6 12 M6 6 L8 8 M16 6 L14 8 M16 18 L14 16 M6 18 L8 16 M12 12 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0',
  moon: 'M12 4 A8 8 0 0 0 12 20 A8 8 0 0 1 12 4',
  mercury: 'M8 6 L16 6 M12 6 L12 16 M7 10 A5 5 0 1 0 17 10',
  venus: 'M12 4 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0 M12 8 L12 18 M8 14 L16 14',
  mars: 'M14 4 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0 M14 8 L8 14 M14 8 L18 12',
  jupiter: 'M10 4 Q4 4 4 10 Q4 16 10 16 M4 10 L16 10 M16 4 L16 16',
  saturn: 'M8 6 L16 6 M12 6 L12 14 Q6 14 6 18',
  uranus: 'M12 4 L12 16 M6 16 L18 16 M6 8 L18 8',
  neptune: 'M12 4 L12 20 M7 7 L17 7 M7 17 L17 17 M12 4 Q6 10 12 16 Q18 10 12 4',
  pluto: 'M8 12 A4 4 0 1 0 16 12 A4 4 0 1 0 8 12 M12 4 L12 20',

  // Aspects
  conjunction: 'M8 16 A4 4 0 1 0 16 16 A4 4 0 1 0 8 16 M12 4 L12 12',
  opposition: 'M8 8 A4 4 0 1 0 16 8 A4 4 0 1 0 8 8 M8 16 A4 4 0 1 0 16 16 A4 4 0 1 0 8 16',
  trine: 'M4 18 L12 6 L20 18 Z',
  square: 'M6 6 L18 6 L18 18 L6 18 Z',
  sextile: 'M4 12 L12 4 L20 12 L12 20 Z',

  // Houses
  house1: 'M5 15 L12 5 L19 15 M8 15 L8 19 M16 15 L16 19',
  house2: 'M5 10 L12 5 L19 10 M5 15 L12 10 L19 15 L12 20 L5 15 Z',
  house3: 'M5 8 L19 8 M5 14 L19 14 M5 20 L19 20',
  house4: 'M5 5 L5 19 L19 19',
  house5: 'M5 5 L19 5 M5 5 L5 19 L19 19',
  house6: 'M12 5 A7 7 0 0 1 12 19 A7 7 0 0 1 12 5 M5 12 L19 12',
  house7: 'M19 5 L5 19',
  house8: 'M12 5 L5 12 L12 19 L19 12 Z',
  house9: 'M5 12 L19 12 M9 5 L9 19 M15 5 L15 19',
  house10: 'M5 19 L19 5',
  house11: 'M5 8 L19 8 M5 16 L19 16',
  house12: 'M9 5 A10 10 0 0 1 19 15 M5 15 A10 10 0 0 1 15 5',

  // Others
  ascendant: 'M6 18 L12 6 L18 18 M8 14 L16 14',
  midheaven: 'M12 4 L12 20 M6 10 L12 4 L18 10',
  northnode: 'M8 6 A6 6 0 0 0 16 12 A6 6 0 0 0 8 18 M16 6 A6 6 0 0 1 8 12 A6 6 0 0 1 16 18',
  southnode: 'M8 6 A6 6 0 0 1 16 12 A6 6 0 0 1 8 18 M16 6 A6 6 0 0 0 8 12 A6 6 0 0 0 16 18',
  newmoon: 'M12 4 A8 8 0 0 0 12 20 A8 8 0 0 0 12 4',
  fullmoon: 'M12 4 A8 8 0 1 1 12 20 A8 8 0 1 1 12 4',
  firstquarter: 'M12 4 A8 8 0 0 1 12 20 A8 8 0 0 0 12 4',
  lastquarter: 'M12 4 A8 8 0 0 0 12 20 A8 8 0 0 1 12 4'
};

export function AstrologySymbol({ symbol, size = 'md', className, style }: AstrologySymbolProps) {
  const sizeClass = {
    'sm': 'w-6 h-6',
    'md': 'w-8 h-8',
    'lg': 'w-12 h-12',
    'xl': 'w-16 h-16',
  }[size];

  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn("stroke-current fill-none", sizeClass, className)}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <path d={symbolPathsMap[symbol]} />
    </svg>
  );
}

export function ZodiacSignSymbol({ sign, size = 'md', className, style }: { sign: string; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string; style?: React.CSSProperties }) {
  const zodiacSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
  
  if (!zodiacSigns.includes(sign)) {
    return null;
  }
  
  return <AstrologySymbol symbol={sign as AstrologySymbolType} size={size} className={className} style={style} />;
}

export function PlanetSymbol({ planet, size = 'md', className, style }: { planet: string; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string; style?: React.CSSProperties }) {
  const planets = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
  
  if (!planets.includes(planet)) {
    return null;
  }
  
  return <AstrologySymbol symbol={planet as AstrologySymbolType} size={size} className={className} style={style} />;
}

export function AspectSymbol({ aspect, size = 'md', className, style }: { aspect: string; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string; style?: React.CSSProperties }) {
  const aspects = ['conjunction', 'opposition', 'trine', 'square', 'sextile'];
  
  if (!aspects.includes(aspect)) {
    return null;
  }
  
  return <AstrologySymbol symbol={aspect as AstrologySymbolType} size={size} className={className} style={style} />;
}

export function HouseSymbol({ house, size = 'md', className, style }: { house: number; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string; style?: React.CSSProperties }) {
  if (house < 1 || house > 12) {
    return null;
  }
  
  return <AstrologySymbol symbol={`house${house}` as AstrologySymbolType} size={size} className={className} style={style} />;
}

export function MoonPhaseSymbol({ phase, size = 'md', className, style }: { phase: 'new' | 'full' | 'first-quarter' | 'last-quarter'; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string; style?: React.CSSProperties }) {
  const phaseMap = {
    'new': 'newmoon',
    'full': 'fullmoon',
    'first-quarter': 'firstquarter',
    'last-quarter': 'lastquarter'
  };
  
  return <AstrologySymbol symbol={phaseMap[phase] as AstrologySymbolType} size={size} className={className} style={style} />;
}