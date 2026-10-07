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
export function findMoveDetails(
  moveNameOrId: string,
  hunter?: HunterProfile | null
): {
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

  // Search Hunter Borrowed Moves
  if (hunter?.borrowedMoves) {
    const borrowed = hunter.borrowedMoves.find(
      (m) => m.name.toLowerCase() === query || m.id.toLowerCase() === query
    );
    if (borrowed) {
      const stat = detectStatFromMove(
        typeof borrowed.stat === 'string' && ['charm', 'cool', 'sharp', 'tough', 'weird'].includes(borrowed.stat)
          ? (borrowed.stat as StatType)
          : undefined,
        borrowed.name,
        borrowed.description
      );
      return {
        id: borrowed.id,
        name: borrowed.name,
        stat,
        description: borrowed.description,
        trigger: borrowed.description,
      };
    }
  }

  // Search Hunter Custom Moves
  if (hunter?.customMoves) {
    const custom = hunter.customMoves.find(
      (m) => m.name.toLowerCase() === query || m.id.toLowerCase() === query
    );
    if (custom) {
      const stat = detectStatFromMove(
        typeof custom.stat === 'string' && ['charm', 'cool', 'sharp', 'tough', 'weird'].includes(custom.stat)
          ? (custom.stat as StatType)
          : undefined,
        custom.name,
        custom.description
      );
      return {
        id: custom.id,
        name: custom.name,
        stat,
        description: custom.description,
        trigger: custom.description,
      };
    }
  }

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

  const moveDetails = findMoveDetails(moveName, hunter);
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

/**
 * Dynamic Stat Determination for Attacks (Kick Some Ass):
 * - Check if hunter is The Monstrous with "Unholy Strength" selected -> roll with +Weird.
 * - Check if hunter is The Action Scientist with Area of Study "Violence" -> roll with +Sharp.
 * - Check if hunter is The Spell-Slinger using Combat Magic -> roll with +Weird.
 * - Check if hunter is The Spooky using "The Big Whammy" -> roll with +Weird.
 * - Default for all other attacks -> roll with +Tough.
 */
export function getAttackRollStat(
  hunter: HunterProfile | null,
  context?: { isCombatMagic?: boolean; isBigWhammy?: boolean; attackName?: string }
): StatType {
  if (!hunter) return 'tough';
  const pbLower = (hunter.playbook || '').toLowerCase().trim();

  // 1. The Monstrous with "Unholy Strength" selected -> roll with +Weird
  if (pbLower.includes('monstrous')) {
    const moves = hunter.selectedMoves || [];
    const hasUnholyStrength = moves.some((m) => {
      const lower = m.toLowerCase();
      return lower.includes('unholy-strength') || lower.includes('unholy strength');
    });
    if (hasUnholyStrength) return 'weird';
  }

  // 2. The Action Scientist with Area of Study "Violence" -> roll with +Sharp
  if (pbLower.includes('action scientist')) {
    const study = (
      hunter.actionScientistFocus ||
      hunter.subFeatures?.actionScientistFocus ||
      ''
    ).toLowerCase();
    if (study.includes('violence')) return 'sharp';
  }

  // 3. The Spell-Slinger using Combat Magic -> roll with +Weird
  const isCombatMagic =
    context?.isCombatMagic ||
    (context?.attackName && context.attackName.toLowerCase().includes('combat magic'));
  if (isCombatMagic || pbLower.includes('spell-slinger') || pbLower.includes('spellslinger')) {
    if (isCombatMagic) return 'weird';
  }

  // 4. The Spooky using "The Big Whammy" -> roll with +Weird
  const isBigWhammy =
    context?.isBigWhammy ||
    (context?.attackName && context.attackName.toLowerCase().includes('big whammy'));
  if (isBigWhammy) return 'weird';

  if (pbLower.includes('spooky')) {
    const moves = hunter.selectedMoves || [];
    const hasBigWhammyMove = moves.some((m) => {
      const lower = m.toLowerCase();
      return lower.includes('big-whammy') || lower.includes('big whammy');
    });
    if (hasBigWhammyMove && (isBigWhammy || (context?.attackName && /whammy/i.test(context.attackName)))) {
      return 'weird';
    }
  }

  // Default for all other attacks -> roll with +Tough
  return 'tough';
}

/**
 * Generates an attack button label conforming to the requirement:
 * e.g., ⚔️ Kick Some Ass: Claws (+Tough) or ⚔️ Kick Some Ass: Claws (+Weird) if Unholy Strength is active.
 */
export function getAttackButtonLabel(
  attackName: string,
  hunter: HunterProfile | null,
  context?: { isCombatMagic?: boolean; isBigWhammy?: boolean }
): string {
  const stat = getAttackRollStat(hunter, { ...context, attackName });
  const statFormatted = stat.charAt(0).toUpperCase() + stat.slice(1);
  return `⚔️ Kick Some Ass: ${attackName} (+${statFormatted})`;
}

