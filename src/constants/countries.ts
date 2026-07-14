export interface Country {
  code: string;
  name: string;
  flag: string;
  region: 'Asia' | 'Europe' | 'Americas' | 'Africa' | 'Oceania';
}

export const REGIONS = ['All', 'Asia', 'Europe', 'Americas', 'Africa'] as const;

export const COUNTRIES: Country[] = [
  // --- ASIA / OCEANIA ---
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', region: 'Asia' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', region: 'Asia' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', region: 'Asia' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', region: 'Asia' },
  { code: 'CN', name: 'China', flag: '🇨🇳', region: 'Asia' },
  { code: 'IN', name: 'India', flag: '🇮🇳', region: 'Asia' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', region: 'Asia' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', region: 'Asia' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', region: 'Asia' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', region: 'Asia' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', region: 'Asia' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'Asia' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', region: 'Asia' },

  // --- AMERICAS ---
  { code: 'US', name: 'United States', flag: '🇺🇸', region: 'Americas' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'Americas' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', region: 'Americas' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', region: 'Americas' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', region: 'Americas' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', region: 'Americas' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', region: 'Americas' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', region: 'Americas' },

  // --- EUROPE ---
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', region: 'Europe' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱', region: 'Europe' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', region: 'Europe' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾', region: 'Europe' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', region: 'Europe' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', region: 'Europe' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', region: 'Europe' },
  { code: 'CZ', name: 'Czechia', flag: '🇨🇿', region: 'Europe' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', region: 'Europe' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', region: 'Europe' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', region: 'Europe' },
  { code: 'FR', name: 'France', flag: '🇫🇷', region: 'Europe' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'Europe' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', region: 'Europe' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', region: 'Europe' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', region: 'Europe' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', region: 'Europe' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', region: 'Europe' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', region: 'Europe' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', region: 'Europe' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', region: 'Europe' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', region: 'Europe' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', region: 'Europe' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨', region: 'Europe' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪', region: 'Europe' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', region: 'Europe' },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', region: 'Europe' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', region: 'Europe' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', region: 'Europe' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', region: 'Europe' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', region: 'Europe' },
  { code: 'SM', name: 'San Marino', flag: '🇸🇲', region: 'Europe' },
  { code: 'RS', name: 'Serbia', flag: '🇸🇸', region: 'Europe' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', region: 'Europe' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', region: 'Europe' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', region: 'Europe' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', region: 'Europe' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', region: 'Europe' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', region: 'Europe' },
  { code: 'VA', name: 'Vatican City', flag: '🇻🇦', region: 'Europe' },

  // --- AFRICA ---
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', region: 'Africa' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', region: 'Africa' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', region: 'Africa' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', region: 'Africa' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', region: 'Africa' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', region: 'Africa' },
];