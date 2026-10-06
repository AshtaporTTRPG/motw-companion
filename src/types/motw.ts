export type StatType = 'charm' | 'cool' | 'sharp' | 'tough' | 'weird';

export interface HunterStats {
  charm: number;
  cool: number;
  sharp: number;
  tough: number;
  weird: number;
}

export interface HunterProfile {
  name: string;
  playbook: string;
  look: string;
  harm: number; // 0 to 7
  unstable: boolean;
  luck: number; // 0 to 7 (spent)
  experience: number; // 0 to 5
  stats: HunterStats;
}

export type RollTier = 'miss' | 'mixed' | 'success' | 'advanced';

export interface RollResult {
  id: string;
  moveName: string;
  statUsed?: StatType | 'custom';
  d1: number;
  d2: number;
  modifier: number;
  total: number;
  tier: RollTier;
  timestamp: number;
}

export interface MotWMove {
  id: string;
  name: string;
  category: 'basic' | 'combat' | 'investigative' | 'magic' | 'keeper';
  stat?: StatType;
  trigger: string;
  success10: string;
  mixed79: string;
  miss6: string;
  questions?: string[];
  notes?: string;
}

export interface CountdownStep {
  stage: 'Day' | 'Shadows' | 'Sunset' | 'Dusk' | 'Night' | 'Midnight';
  description: string;
  completed: boolean;
}

export interface CaseNote {
  id: string;
  title: string;
  category: 'lead' | 'monster' | 'bystander' | 'location' | 'general';
  content: string;
  updatedAt: number;
}
