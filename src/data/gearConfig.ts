import { PlaybookGearCategory } from '../types/motw';
import { PLAYBOOK_GEAR_CONFIGS_15_TO_28 } from './gearConfig15to28';

export const PLAYBOOK_GEAR_CONFIGS: Record<string, PlaybookGearCategory[]> = {
  'the-action-scientist': [
    {
      name: 'Science weapons',
      max: 2,
      options: [
        'Lightning gun (3-harm close loud area electricity batteries)',
        'Portable particle accelerator (3-harm close/far messy batteries)',
        'Laser cannon (2-harm close/far quiet batteries)',
        'Net launcher (0-harm close entangling)',
        'Scalpel (1-harm intimate/hand)',
        'Force knife (2-harm hand batteries)',
        'Tranquiliser rifle (1-harm close/far sedating)',
        'Stun-ray (0-harm close sedating)',
        'Autonomous drone (2-harm far autonomous)',
        'Atomic pistol (3-harm close radiation)',
      ],
    },
    {
      name: 'PPE',
      max: 1,
      options: [
        'Biohazard suit (air-supply sealed)',
        'Lab coat (chemical-resistant)',
        'Engineering coveralls',
        'Space suit (air-supply sealed climate-control)',
        'Science armour (2-armour batteries heavy)',
      ],
    },
  ],

  'the-celebrity': [
    {
      name: 'Ride',
      max: 1,
      options: [
        'Tour bus with custom paint job',
        'Fancy sports car',
        'Barely street legal "civilian" military vehicle',
        'Limo with driver',
        'Classic old car',
        'Overpowered sports motorcycle',
      ],
    },
    {
      name: 'Normal weapons',
      max: 2,
      options: [
        '.38 revolver (2-harm close reload loud)',
        'Shotgun (3-harm close messy)',
        'Hunting rifle (2-harm far loud)',
        '9mm pistol (2-harm close loud)',
        'Big knife (1-harm hand)',
        'Chainsaw (2-harm hand heavy messy loud)',
      ],
    },
  ],

  'the-changeling': [
    {
      name: 'Transport',
      max: 1,
      options: [
        'Skateboard',
        'Roller skates',
        'Bicycle',
        'Old pickup truck',
        'Van',
        'Motorcycle',
        'Fairly new car in decent condition',
        'Classic car in poor condition',
      ],
    },
    {
      name: 'Weapon',
      max: 1,
      options: [
        'Sport club (2-harm hand innocuous messy)',
        'Pocket knife or multitool (1-harm hand useful small)',
        'Small handgun (2-harm close loud)',
        'Hunting rifle (3-harm far loud reload)',
        'Sledgehammer (2-harm hand messy slow)',
        'Fire axe (2-harm hand messy heavy)',
        'Talisman or artifact (1-harm close magic ignore-armour)',
      ],
    },
    {
      name: 'Mementos',
      max: 2,
      options: [
        'Childhood toy',
        'Laptop',
        'Knapsack/backpack/purse',
        'Smartphone/mobile game/music player',
        'Jewellery',
        'Old photos',
        'Favourite clothing',
        'Journal',
        'Letters/emails from home',
      ],
    },
  ],

  'the-chosen': [
    {
      name: 'Protective gear',
      max: 1,
      options: [
        'Protective gear (1-armour optional)',
      ],
    },
  ],

  'the-covenant': [
    {
      name: 'Comm device',
      max: 1,
      options: [
        'Cell phone',
        'Summoning charm',
        'Walkie-talkie',
        'High-tech communicator',
        'Telepathic link',
        'Messaging relic',
      ],
    },
    {
      name: 'Utility',
      max: 1,
      options: [
        'Wardrobe of clothes',
        'Kevlar vest (1-armour)',
        'Cutting-edge laptop',
        'Ritual gear',
        'Extensive tool collection',
      ],
    },
    {
      name: 'Weapon',
      max: 1,
      options: [
        'Heavy tool (2-harm hand utility innocuous)',
        'Summoned minion (2-harm close autonomous messy)',
        'Handgun (2-harm close reload loud)',
        'Bag of curses (1-harm close magic ignore-armour)',
        'Shotgun (3-harm close messy loud)',
        'Hunting rifle (2-harm far loud)',
        'Sword (2-harm hand magic)',
      ],
    },
  ],

  'the-crooked': [
    {
      name: 'Gear',
      max: 3,
      options: [
        '.22 revolver (1-harm close reload small)',
        '.38 revolver (2-harm close reload loud)',
        '9mm (2-harm close loud)',
        'Shotgun (3-harm close messy)',
        'Hunting rifle (2-harm far loud)',
        'Big knife (1-harm hand)',
        'Baseball bat (1-harm hand)',
        'Submachinegun (2-harm close reload area)',
        'Assault rifle (3-harm close/far area)',
      ],
    },
  ],

  'the-curse-eater': [
    {
      name: 'Handy gear',
      max: 3,
      options: [
        'Mystical focus',
        'Pocket knife/multitool (1-harm hand useful small)',
        'Bag of occult ingredients',
        'Manacles and chains',
        'Rope and zip ties',
        'Medallion of Society of Curse-eaters',
        'Improvised protective gear (1-armour)',
        'Big net',
        'Grimoire of wardings',
        'Dowsing rods and pendulum',
      ],
    },
    {
      name: 'Practical weapons',
      max: 2,
      options: [
        'Baseball/cricket bat (1-harm hand innocuous)',
        'Collapsible baton (1-harm hand small)',
        'Taser (2-harm hand/close stun electric)',
        'Tranquiliser rifle (3-harm close sedating)',
        'Pistol (2-harm close loud)',
      ],
    },
    {
      name: 'Vehicle',
      max: 1,
      options: [
        'None',
        'Van',
        'Old car',
        'Pickup',
        'Truck',
      ],
    },
  ],

  'the-divine': [
    {
      name: 'Divine weapon',
      max: 1,
      options: [
        'Flaming sword (3-harm hand fire holy)',
        'Thunder hammer (3-harm hand stun holy)',
        'Razor whip (3-harm hand area messy holy)',
        'Five demon bag (3-harm close magic holy)',
        'Silver trident (3-harm hand silver holy)',
      ],
    },
    {
      name: 'Divine armour',
      max: 1,
      options: [
        'Divine armour (1-armour holy)',
      ],
    },
  ],

  'the-envoy': [
    {
      name: 'Resources',
      max: 1,
      options: [
        'Mysterious financial assets',
        'Access to exclusive spaces',
        'Communication devices',
        'Diplomatic credentials',
      ],
    },
    {
      name: 'Weapon',
      max: 1,
      options: [
        'Defensive charm (1-harm close magic 1-armour)',
        'Holdout pistol (2-harm close small)',
        'Rebuking touch (1-harm hand holy)',
        'Whispered revelation (0-harm intimate stun)',
      ],
    },
  ],

  'the-expert': [
    {
      name: 'Monster-slaying weapons',
      max: 3,
      options: [
        'Mallet & wooden stakes (3-harm intimate slow wooden)',
        'Silver sword (2-harm hand messy silver)',
        'Cold iron sword (2-harm hand messy iron)',
        'Blessed knife (2-harm hand holy)',
        'Magical dagger (2-harm hand magic)',
        'Juju bag (1-harm far magic)',
        'Flamethrower (3-harm close fire heavy volatile)',
        'Magnum (3-harm close reload loud)',
        'Shotgun (3-harm close messy loud)',
      ],
    },
  ],

  'the-flake': [
    {
      name: 'Normal weapons',
      max: 1,
      options: [
        '.38 revolver (2-harm close reload loud)',
        '9mm (2-harm close loud)',
        'Hunting rifle (2-harm far loud)',
        'Magnum (3-harm close reload loud)',
        'Shotgun (3-harm close messy loud)',
        'Big knife (1-harm hand)',
      ],
    },
    {
      name: 'Hidden weapons',
      max: 2,
      options: [
        'Throwing knives (1-harm close many)',
        'Holdout pistol (2-harm close loud reload)',
        'Garrote (3-harm intimate)',
        "Watchman's flashlight (1-harm hand)",
        'Weighted gloves/brass knuckles (1-harm hand)',
        'Butterfly knife/folding knife (1-harm hand)',
      ],
    },
  ],

  'the-forged': [
    {
      name: 'Sentimental objects',
      max: 1,
      options: [
        'Memento of past partner',
        'Gift from small child',
        'Mysterious brand/mark',
        'Notebook with poetry',
        'Favourite novel',
      ],
    },
    {
      name: 'Self-defence method',
      max: 1,
      options: [
        'Natural warrior (1-harm intimate/hand)',
        'Wrestler (2-harm intimate/hand grab forceful)',
        'Dagger (1-harm intimate/hand)',
        'Holdout pistol (1-harm close small)',
      ],
    },
  ],

  'the-gumshoe': [
    {
      name: 'Recording devices',
      max: 2,
      options: [
        'Night vision camera',
        'Cassette tape recorder',
        'Tiny digital video camera',
        'Remote camera drone',
        'Film camera (8mm/16mm)',
        'Digital sound recorder',
        'Laser microphone',
        'SLR camera',
      ],
    },
    {
      name: 'P.I. weapons',
      max: 1,
      options: [
        '.38 revolver (2-harm close reload loud)',
        '9mm (2-harm close loud)',
        'Brass knuckles (1-harm hand small)',
        'Magnum (3-harm close reload loud)',
        'Shotgun (3-harm close messy loud)',
        'Switchblade (1-harm hand small)',
      ],
    },
    {
      name: 'Gear',
      max: 2,
      options: [
        'Laptop',
        'Flask',
      ],
    },
  ],

  'the-hex': [
    {
      name: 'Magical gear',
      max: 1,
      options: [
        'Magical items/amulets',
      ],
    },
    {
      name: 'Wizardly weapons',
      max: 2,
      options: [
        '.38 revolver (2-harm close reload loud)',
        'Shotgun (3-harm close messy loud)',
        'Athame (2-harm hand magic silver)',
        'Shillelagh (1-harm hand balanced)',
        'Crossbow (2-harm close slow)',
        'Staff (1-harm hand balanced large)',
      ],
    },
  ],

  ...PLAYBOOK_GEAR_CONFIGS_15_TO_28,
};

/**
 * Get gear configuration for any playbook name or id
 */
export function getPlaybookGearConfig(playbookNameOrId: string): PlaybookGearCategory[] {
  const norm = playbookNameOrId.toLowerCase().trim().replace(/_/g, '-').replace(/\s+/g, '-');
  if (PLAYBOOK_GEAR_CONFIGS[norm]) {
    return PLAYBOOK_GEAR_CONFIGS[norm];
  }

  // Fallback match by partial string
  const key = Object.keys(PLAYBOOK_GEAR_CONFIGS).find(
    (k) => norm.includes(k) || k.includes(norm)
  );
  if (key && PLAYBOOK_GEAR_CONFIGS[key]) {
    return PLAYBOOK_GEAR_CONFIGS[key];
  }

  return [];
}

/**
 * Checks if a gear text line represents a weapon
 */
export function isGearWeapon(gearText: string, categoryName?: string): boolean {
  const cat = (categoryName || '').toLowerCase();
  if (cat.includes('weapon') || cat.includes('self-defence') || cat.includes('attack') || cat.includes('tool')) {
    if (/\d+-harm\b/i.test(gearText)) return true;
  }
  return /\b\d+-harm\b/i.test(gearText);
}

/**
 * Extracts a concise weapon name from a descriptive gear line
 * e.g. "Shotgun (3-harm close reload messy)" -> "Shotgun"
 * e.g. "Science Weapon: Lightning gun (2-harm...)" -> "Lightning gun"
 */
export function extractWeaponAttackName(gearText: string): string {
  let cleaned = gearText.trim();
  // Strip category prefixes if present like "Science Weapon: " or "Living Weapon Form: "
  cleaned = cleaned.replace(/^(Science Weapon|Living Weapon Form|Personal weapon|Alien weapon|Old-fashioned weapon|Backup weapon|Camp tool):\s*/i, '');
  // Strip parenthetical stats
  const parenIdx = cleaned.indexOf('(');
  if (parenIdx !== -1) {
    cleaned = cleaned.substring(0, parenIdx).trim();
  }
  return cleaned || 'Weapon';
}
