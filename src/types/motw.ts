export type StatType = 'charm' | 'cool' | 'sharp' | 'tough' | 'weird';

export interface HunterStats {
  charm: number;
  cool: number;
  sharp: number;
  tough: number;
  weird: number;
}

export type RollTier = 'miss' | 'weak' | 'strong' | 'advanced';
export type RollScope = 'public' | 'keeper' | 'self';

export interface RollResult {
  id: string;
  rollerId: string;
  rollerName: string;
  hunterName: string;
  moveName: string;
  statUsed?: StatType | 'custom' | 'none';
  d1: number;
  d2: number;
  modifier: number;
  forwardOngoingMod: number;
  total: number;
  tier: RollTier;
  scope: RollScope;
  timestamp: number;
  luckSpent?: boolean;
}

export interface HunterProfile {
  id: string;
  ownerId: string;
  ownerName: string;
  name: string;
  playbook: string;
  look: string;
  harm: number; // 0 to 7 (0-3 Minor, 4-7 Serious/Unstable, 8+ Dying)
  unstable: boolean;
  luck: number; // 0 to 7 (boxes marked / spent)
  experience: number; // 0 to 5
  stats: HunterStats;
  selectedMoves: string[];
  gear: string;
  luckSpecial: string;
  improvementsTaken: string[];
  createdAt: number;
}

export interface MotWMove {
  id: string;
  name: string;
  category: 'basic' | 'weird' | 'phenomenon' | 'quickrule';
  stat?: StatType;
  trigger: string;
  success10: string;
  mixed79: string;
  miss6: string;
  advanced12?: string;
  questions?: string[];
  notes?: string;
}

export interface PlaybookMove {
  id: string;
  name: string;
  stat?: StatType;
  description: string;
}

export interface PlaybookSubMechanic {
  title: string;
  description: string;
  options?: string[];
  track?: string[];
}

export interface PlaybookDefinition {
  id: string;
  name: string;
  tagline: string;
  description: string;
  luckSpecial: string;
  statOptions: HunterStats[];
  moves: PlaybookMove[];
  improvements: string[];
  gearChoices: string[];
  subMechanics?: PlaybookSubMechanic;
}

export interface HunterScopedNotes {
  general: string;
  gear: string;
  contacts: string;
  clues: string;
}

export interface TableNotesData {
  content: string;
  updatedAt: number;
  updatedBy: string;
}

export interface KeeperNoteCard {
  id: string;
  title: string;
  content: string;
  category: 'monster' | 'countdown' | 'bystander' | 'location' | 'clue' | 'general';
  isExpanded?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface BroadcastPayload {
  id: string;
  title: string;
  content: string;
  authorName: string;
  timestamp: number;
  active: boolean;
}
