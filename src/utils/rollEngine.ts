import { StatType, RollTier, RollResult, RollScope, HunterProfile, MotWMove } from '../types/motw';
import { BASIC_MOVES, WEIRD_MOVES } from '../data/moves';
import { PLAYBOOKS } from '../data/playbooks';

/**
 * Detect stat from explicit field, move name, or trigger/description text
 */
export function detectStatFromMove(
  moveStat?: StatType,
  name?: string,
  text?: string
): StatType | undefined {
  if (moveStat) return moveStat;

  const combined = `${name || ''} ${text || ''}`.toLowerCase();

  if (/\+sharp\b|roll \+sharp|roll sharp/i.test(combined)) return 'sharp';
  if (/\+tough\b|roll \+tough|roll tough/i.test(combined)) return 'tough';
  if (/\+cool\b|roll \+cool|roll cool/i.test(combined)) return 'cool';
  if (/\+weird\b|roll \+weird|roll weird/i.test(combined)) return 'weird';
  if (/\+charm\b|roll \+charm|roll charm/i.test(combined)) return 'charm';

  return undefined;
}

/**
 * Lookup move details from Basic moves, Weird moves, and Playbook moves
 */
export function findMoveDetails(moveNameOrId: string): {
  id?: string;
  name: string;
  stat?: StatType;
  trigger?: string;
  success10?: string;
  mixed79?: string;
  miss6?: string;
  advanced12?: string;
  questions?: string[];
  description?: string;
} | undefined {
  const query = moveNameOrId.toLowerCase().trim();

  // Search Basic Moves
  const basic = BASIC_MOVES.find(
    (m) => m.name.toLowerCase() === query || m.id.toLowerCase() === query
  );
  if (basic) return basic;

  // Search Weird Moves
  const weird = WEIRD_MOVES.find(
    (m) => m.name.toLowerCase() === query || m.id.toLowerCase() === query
  );
  if (weird) return weird;

  // Search across playbooks
  for (const playbook of PLAYBOOKS) {
    const pbMove = playbook.moves.find(
      (m) => m.name.toLowerCase() === query || m.id.toLowerCase() === query
    );
    if (pbMove) {
      // Parse description for 10+, 7-9, miss if present
      const stat = detectStatFromMove(pbMove.stat, pbMove.name, pbMove.description);
      return {
        id: pbMove.id,
        name: pbMove.name,
        stat,
        description: pbMove.description,
        trigger: pbMove.description,
      };
    }
  }

  // Loose partial match for basic / weird moves
  const looseBasic = BASIC_MOVES.find((m) =>
    query.includes(m.name.toLowerCase()) || m.name.toLowerCase().includes(query)
  );
  if (looseBasic) return looseBasic;

  const looseWeird = WEIRD_MOVES.find((m) =>
    query.includes(m.name.toLowerCase()) || m.name.toLowerCase().includes(query)
  );
  if (looseWeird) return looseWeird;

  return undefined;
}

/**
 * Determine the PbtA tier from sum total
 */
export function calculateTier(total: number): RollTier {
  if (total <= 6) return 'miss';
  if (total <= 9) return 'weak';
  if (total <= 11) return 'strong';
  return 'advanced';
}

/**
 * Generate human-readable PbtA tier label
 */
export function getTierLabel(tier: RollTier): string {
  switch (tier) {
    case 'miss':
      return 'Miss (6 or less)';
    case 'weak':
      return 'Mixed Success / Weak Hit (7–9)';
    case 'strong':
      return 'Strong Hit (10–11)';
    case 'advanced':
      return 'Advanced Hit (12+)';
  }
}

/**
 * Evaluate the exact narrative outcome rule text for a given move and tier
 */
export function getOutcomeTextForMove(
  tier: RollTier,
  moveDetails?: {
    name?: string;
    success10?: string;
    mixed79?: string;
    miss6?: string;
    advanced12?: string;
    description?: string;
  }
): string {
  if (moveDetails) {
    if (tier === 'advanced') {
      if (moveDetails.advanced12) return moveDetails.advanced12;
      if (moveDetails.success10) {
        return `${moveDetails.success10}\n(12+ Advanced: Exceptional success! Choose an additional benefit or transcend the danger.)`;
      }
    }

    if (tier === 'strong' && moveDetails.success10) {
      return moveDetails.success10;
    }

    if (tier === 'weak' && moveDetails.mixed79) {
      return moveDetails.mixed79;
    }

    if (tier === 'miss') {
      if (moveDetails.miss6) return moveDetails.miss6;
      return 'On a miss, the Keeper makes as hard a move as they like. Mark 1 experience box!';
    }

    // If it's a playbook move with only a description:
    if (moveDetails.description) {
      if (tier === 'advanced' || tier === 'strong') {
        return `Full success (10+): ${moveDetails.description}`;
      }
      if (tier === 'weak') {
        return `Mixed outcome (7–9): You achieve the effect, but with a complication, compromise, or cost chosen by the Keeper.\n${moveDetails.description}`;
      }
      if (tier === 'miss') {
        return `Miss (6 or less): The Keeper makes a hard move against you or your allies. Mark 1 experience on your sheet!`;
      }
    }
  }

  // Fallbacks for general rolls
  switch (tier) {
    case 'advanced':
      return '12+ Advanced Hit: Total triumph! You succeed brilliantly, transcend normal limits, and gain an overwhelming advantage.';
    case 'strong':
      return '10+ Strong Hit: Full success! You achieve what you set out to do without complication or hesitation.';
    case 'weak':
      return '7–9 Mixed Hit: Partial success! You get what you want, but the Keeper introduces a complication, cost, or hard choice.';
    case 'miss':
      return 'Miss (6 or less): Things go wrong. The Keeper makes as hard a move as they like. Mark 1 experience box!';
  }
}

/**
 * Build a complete RollResult object
 */
export function executePbtaRoll({
  moveName,
  stat,
  hunter,
  rollerId,
  rollerName,
  scope = 'public',
  modifier = 0,
  forwardMod = 0,
}: {
  moveName: string;
  stat?: StatType;
  hunter: HunterProfile | null;
  rollerId: string;
  rollerName: string;
  scope?: RollScope;
  modifier?: number;
  forwardMod?: number;
}): RollResult {
  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;

  const statMod = stat && hunter ? hunter.stats[stat] ?? 0 : 0;
  const totalMod = statMod + modifier + forwardMod;
  const total = d1 + d2 + totalMod;
  const tier = calculateTier(total);

  const moveDetails = findMoveDetails(moveName);
  const outcomeText = getOutcomeTextForMove(tier, moveDetails);

  const statTag = stat ? ` (+${stat.charAt(0).toUpperCase() + stat.slice(1)})` : '';
  const formattedMoveName = moveName.includes('(') ? moveName : `${moveName}${statTag}`;

  return {
    id: 'roll-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    rollerId,
    rollerName,
    hunterName: hunter ? hunter.name : 'Unknown Hunter',
    moveName: formattedMoveName,
    statUsed: stat || 'none',
    d1,
    d2,
    modifier: statMod + modifier,
    forwardOngoingMod: forwardMod,
    total,
    tier,
    scope,
    timestamp: Date.now(),
    outcomeText,
    ruleDetails: moveDetails
      ? {
          success10: moveDetails.success10,
          mixed79: moveDetails.mixed79,
          miss6: moveDetails.miss6,
          advanced12: moveDetails.advanced12,
        }
      : undefined,
  };
}
