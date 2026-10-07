import { PlaybookGearCategory } from '../types/motw';

export const PLAYBOOK_GEAR_CONFIGS: Record<string, PlaybookGearCategory[]> = {
  'the-action-scientist': [
    {
      name: 'Science weapons',
      max: 2,
      options: [
        'Lightning gun (2-harm close stun loud messy)',
        'Portable particle accelerator (3-harm far heavy dangerous)',
        'Laser cannon (3-harm close burn loud)',
        'Scalpel (1-harm intimate hand piercing)',
        'Tranquiliser rifle (2-harm far tranquilizing reload)',
        'Sonic emitter (1-harm close stun area)',
      ],
    },
    {
      name: 'PPE',
      max: 1,
      options: [
        'Hazard suit (1-armor fire/chemical/radiation proof)',
        'Ballistic lab coat (1-armor concealed)',
        'Reinforced field jumpsuit (1-armor heavy)',
      ],
    },
  ],

  'the-celebrity': [
    {
      name: 'Ride',
      max: 1,
      options: [
        'Luxury sports car (sleek, fast, attracts attention)',
        'Armored touring SUV (spacious, 1-armor, tinted glass)',
        'Vintage classic convertible (stylish, distinctive)',
        'Chauffeur-driven limousine (room for the team, bar inside)',
      ],
    },
    {
      name: 'Normal weapons',
      max: 2,
      options: [
        '.38 revolver (2-harm close reload)',
        '9mm automatic (2-harm close loud)',
        'Shotgun (3-harm close reload messy)',
        'Hunting rifle (3-harm far loud)',
        'Big knife (1-harm hand)',
        'Concealed taser (1-harm hand stun)',
      ],
    },
  ],

  'the-changeling': [
    {
      name: 'Transportation',
      max: 1,
      options: [
        'Enchanted vintage bicycle or scooter (never runs out of power/fuel)',
        'Well-worn hiking boots & city transit pass',
        'Skateboard or rollerblades (fast, nimble)',
        'Old station wagon or beater car',
      ],
    },
    {
      name: 'Weapon',
      max: 1,
      options: [
        'Cold iron athame (2-harm hand magic)',
        'Thorn-carved longbow (2-harm close/far silent)',
        'Bone-handled hunting knife (1-harm hand)',
        'Heavy iron wrench or tire iron (2-harm hand stun)',
        'Slingshot with cold iron marbles (1-harm close silent)',
      ],
    },
    {
      name: 'Mementos',
      max: 2,
      options: [
        'Glass flower from the Faerie Queen’s garden',
        'Locket of starlight or dream-dust',
        'Silver chiming bell that warns of unseen spirits',
        'Woven moss bracelet that pulses near portals',
        'Strange foreign coin from an otherworldly market',
      ],
    },
  ],

  'the-chosen': [
    {
      name: 'Destined weapon options & backups',
      max: 2,
      options: [
        'Hunting rifle (3-harm far loud)',
        'Heavy leather jacket (1-armor)',
        'Shotgun (3-harm close reload messy)',
        '9mm pistol (2-harm close loud)',
        'Big knife (1-harm hand)',
      ],
    },
  ],

  'the-covenant': [
    {
      name: 'Communication',
      max: 1,
      options: [
        'Encrypted walkie-talkies (secure, long-range)',
        'Burner phones with peer-to-peer mesh radio app',
        'Dedicated group base-station dispatch transceiver',
      ],
    },
    {
      name: 'Utility',
      max: 1,
      options: [
        'First aid field trauma kit & surgical gear',
        'Tactical surveillance drone with night-vision',
        'Lockpick set & heavy crowbar (2-harm hand stun)',
        'High-intensity UV searchlights & flare gun (2-harm close fire)',
      ],
    },
    {
      name: 'Weapon',
      max: 1,
      options: [
        '9mm semi-automatic pistol (2-harm close loud)',
        '.38 revolver (2-harm close reload)',
        'Heavy baton or crowbar (2-harm hand stun)',
        'Hunting knife (1-harm hand)',
        'Shotgun (3-harm close reload messy)',
      ],
    },
  ],

  'the-crooked': [
    {
      name: 'Effective weapons',
      max: 3,
      options: [
        '.22 revolver (1-harm close reload small)',
        '.38 revolver (2-harm close reload)',
        '9mm semi-automatic (2-harm close loud)',
        'Shotgun (3-harm close reload messy)',
        'Hunting rifle (3-harm far loud)',
        'Big knife (1-harm hand)',
        'Baseball bat (1-harm hand)',
        'Submachine gun (2-harm close/far loud burst)',
      ],
    },
  ],

  'the-curse-eater': [
    {
      name: 'Handy gear',
      max: 3,
      options: [
        'Purifying sea salt pouch & ritual chalk',
        'Blessed incense & portable charcoal burner',
        'Heavy leather binding bandages & tourniquets',
        'First aid trauma pouch & high-lumen flashlight',
        'Audio field recorder & EMF frequency scanner',
        'Lockpicks & pocket steel prybar',
      ],
    },
    {
      name: 'Practical weapons',
      max: 2,
      options: [
        'Enchanted silver dagger (2-harm hand magic)',
        'Heavy tire iron (2-harm hand stun)',
        'Sawed-off shotgun (3-harm close reload messy)',
        '.38 special revolver (2-harm close reload)',
        'Hunting knife (1-harm hand)',
        'Machete (2-harm hand messy)',
      ],
    },
    {
      name: 'Vehicle',
      max: 1,
      options: [
        'Beater station wagon (spacious, dented, reliable)',
        'Rumble-exhaust motorcycle (fast, agile)',
        'Pickup truck with lockable steel bed toolchest',
      ],
    },
  ],

  'the-divine': [
    {
      name: 'Divine weapon',
      max: 1,
      options: [
        'Flaming sword (3-harm hand fire holy)',
        'Thunder hammer (3-harm hand stun holy heavy)',
        'Razor whip (2-harm close holy restraining)',
        'Demon bag (traps banished spirits)',
        'Silver trident (2-harm hand/close piercing holy)',
        'Blessed spear (2-harm hand/close holy)',
      ],
    },
    {
      name: 'Divine armour',
      max: 1,
      options: [
        'Divine armour (1-armour holy)',
        'Divine aura of celestial warding (1-armour holy light)',
      ],
    },
  ],

  'the-envoy': [
    {
      name: 'Resources',
      max: 1,
      options: [
        'Overseer communication chronometer / resonance stone',
        'Formal diplomatic attire & diplomatic immunity credentials',
        'Diplomatic briefcase with emergency gold & first aid kit',
        'Sleek diplomatic transport vehicle',
      ],
    },
    {
      name: 'Weapon',
      max: 1,
      options: [
        'Ceremonial energy sidearm (2-harm close energy silent)',
        'Ancient celestial staff (2-harm hand stun magic)',
        'Concealed harmonic vibro-blade (2-harm hand piercing)',
        '9mm diplomatic security pistol (2-harm close loud)',
      ],
    },
  ],

  'the-expert': [
    {
      name: 'Monster-slaying weapons',
      max: 3,
      options: [
        'Shotgun (3-harm close reload messy)',
        'Hunting rifle (3-harm far loud)',
        'Crossbow (2-harm close reload silent)',
        'Silver hunting dagger (2-harm hand silver)',
        'Machete (2-harm hand messy)',
        'Wooden stakes & heavy mallet (1-harm hand wooden)',
        'Molotov cocktails (3-harm close fire area dangerous)',
        'Brass knuckles (1-harm hand stun)',
      ],
    },
  ],

  'the-flake': [
    {
      name: 'Normal weapons',
      max: 1,
      options: [
        '.38 revolver (2-harm close reload)',
        '9mm automatic (2-harm close loud)',
        'Hunting rifle (3-harm far loud)',
        'Shotgun (3-harm close reload messy)',
        'Big knife (1-harm hand)',
      ],
    },
    {
      name: 'Hidden weapons',
      max: 2,
      options: [
        'Throwing knives (1-harm close quick)',
        'Holdout pistol (1-harm close reload concealed)',
        'Garrote wire (1-harm intimate)',
        'Watch with garrote wire (1-harm intimate concealed)',
        'Concealed taser / stun gun (1-harm hand stun electrical)',
        'Can of pepper spray (0-harm intimate stun)',
      ],
    },
  ],

  'the-forged': [
    {
      name: 'Sentimental objects',
      max: 1,
      options: [
        'Antique pocket watch that belonged to your maker',
        'Faded photograph of your former human life',
        'Small music box playing a haunting lullaby',
        'Carved wooden figurine or runic keepsake',
      ],
    },
    {
      name: 'Self-defence method',
      max: 1,
      options: [
        'Living Weapon Form: Blade (3-harm hand messy)',
        'Living Weapon Form: Scythe (3-harm hand heavy)',
        'Living Weapon Form: Firearm (3-harm close loud reload)',
        'Living Weapon Form: Bow (2-harm close/far silent)',
        'Living Weapon Form: Hammer/Club (2-harm hand stun heavy)',
      ],
    },
  ],

  'the-gumshoe': [
    {
      name: 'Recording devices',
      max: 2,
      options: [
        'Micro-cassette or digital pocket voice recorder',
        '35mm SLR camera with telephoto zoom lens',
        'Hidden lapel button-cam & wire mic',
        'Parabolic directional shotgun microphone',
        'Infrared night-vision binoculars/camcorder',
      ],
    },
    {
      name: 'P.I. weapons',
      max: 1,
      options: [
        'Snubnose .38 special (2-harm close reload concealed)',
        'Heavy .45 automatic (3-harm close loud)',
        'Brass knuckles (1-harm hand stun)',
        'Leather blackjack (1-harm hand stun)',
        'Heavy trench-gun / shotgun (3-harm close reload messy)',
      ],
    },
  ],

  'the-hex': [
    {
      name: 'Wizardly weapons',
      max: 2,
      options: [
        '.38 revolver (2-harm close reload)',
        'Shotgun (3-harm close reload messy)',
        'Athame sacrificial knife (2-harm hand magic)',
        'Shillelagh heavy club (2-harm hand stun)',
        'Crossbow with runed bolts (2-harm close silent)',
        'Silver hunting knife (2-harm hand silver)',
      ],
    },
  ],

  'the-host': [
    {
      name: 'Personal item',
      max: 1,
      options: [
        'Heavy work gloves & padded jacket (1-armor against cold/acids)',
        'Keepsake locket containing sample of the symbiote’s cradle',
        'Field journal filled with biological observations & sketches',
        'Reinforced backpack with containment jars & nutrient paste',
      ],
    },
    {
      name: 'Weapon',
      max: 1,
      options: [
        'Symbiotic bio-whip (2-harm hand/close grapple)',
        'Concealed switchblade (1-harm hand intimate)',
        'Heavy tire iron (2-harm hand stun)',
        '.38 revolver (2-harm close reload)',
        'Stun gun (1-harm hand stun electrical)',
      ],
    },
  ],

  'the-initiate': [
    {
      name: 'Old-fashioned weapons',
      min: 2,
      max: 3,
      options: [
        'Ceremonial broadsword (3-harm hand heavy)',
        'Ritual halberd (3-harm hand/close heavy)',
        'Warded rapier (2-harm hand quick piercing)',
        'Blessed dagger (2-harm hand holy)',
        'Flail (2-harm hand messy)',
        'Crossbow (2-harm close reload silent)',
        'Chainmail tunic or ringmail hauberk (1-armour heavy)',
      ],
    },
    {
      name: 'Modern weapons',
      min: 1,
      max: 2,
      options: [
        '9mm semi-automatic (2-harm close loud)',
        '.38 revolver (2-harm close reload)',
        'Shotgun (3-harm close reload messy)',
        'Hunting rifle (3-harm far loud)',
        'Sniper rifle (4-harm far reload loud)',
      ],
    },
  ],

  'the-interface': [
    {
      name: 'Machines',
      max: 3,
      options: [
        'Combat drone with micro-camera and audio scanner',
        'Universal signal tap & wireless protocol analyzer',
        'EMP burst emitter (1-harm close electrical area reload)',
        'Portable quantum battery pack & overclocked soldering kit',
        'Holographic projection module',
      ],
    },
    {
      name: 'Weapons',
      max: 2,
      options: [
        'Smart-linked suppressed pistol (2-harm close silent reliable)',
        'Overclocked electromagnetic rifle (3-harm far heavy electrical)',
        'High-frequency monofilament knife (2-harm hand piercing)',
        'Shock baton (2-harm hand stun electrical)',
      ],
    },
    {
      name: 'Quality of life',
      max: 2,
      options: [
        'Internal Computer (integrated optical HUD, biometric monitor, cellular uplink)',
        'Tactical Armour: Subdermal ceramic weave or Kevlar mesh jacket (1-armour light concealed)',
        'Thermal regulation dermal layer (immune to extreme heat and cold)',
        'Cybernetic prosthetic limb with hidden tool compartment',
      ],
    },
  ],

  'the-monstrous': [
    {
      name: 'Handy weapon',
      max: 1,
      options: [
        'Crossbow with iron bolts (2-harm close silent)',
        'Heavy trench coat (conceals monstrous features, 1-armor)',
        'Big knife (1-harm hand)',
        '.38 revolver (2-harm close reload)',
      ],
    },
  ],

  'the-mundane': [
    {
      name: 'Mundane weapons',
      max: 2,
      options: [
        'Baseball bat with nails (2-harm hand heavy)',
        'Grandpa’s hunting shotgun (3-harm close reload messy)',
        'Heavy iron crowbar (2-harm hand stun)',
        'Kitchen cleaver or chef’s knife (1-harm hand)',
        'Golf club or hockey stick (1-harm hand)',
        'Can of bear mace (0-harm close stun area)',
      ],
    },
    {
      name: 'Transport',
      max: 1,
      options: [
        'Trusty beat-up station wagon',
        'Classic muscle car or pickup',
        'Vintage moped or bicycle',
        'Compact hatchback with custom sound system',
      ],
    },
  ],

  'the-pararomantic': [
    {
      name: 'Normal items',
      max: 2,
      options: [
        'Practical clothes, smartphone, first aid pouch, pocketknife (1-harm hand)',
        'Dependable coupe, vintage convertible, or sturdy station wagon',
        'Pepper spray (0-harm intimate stun) & personal siren alarm',
        'Sturdy hiking boots & tactical flashlight',
        'Camera or sketchbook filled with romantic rendezvous',
      ],
    },
    {
      name: 'Guide gift',
      max: 1,
      options: [
        'Preserved body part (fang, feather, or rune bone talisman)',
        'Enchanted jewelry (silver ring that hums near danger, 1-armor holy)',
        'Keepsake memento (locket with portrait, dried enchanted flower)',
        'Protective amulet (absorbs 1 harm once per mystery)',
      ],
    },
  ],

  'the-professional': [
    {
      name: 'Serious weapon',
      max: 1,
      options: [
        'Assault rifle (3-harm close/far area burst loud)',
        'Sniper rifle (4-harm far reload loud)',
        'Grenade launcher (4-harm far area messy reload)',
        'Combat shotgun (3-harm close messy area)',
      ],
    },
    {
      name: 'Normal weapons',
      max: 2,
      options: [
        '.38 revolver (2-harm close reload)',
        '9mm automatic (2-harm close loud)',
        'Hunting rifle (3-harm far loud)',
        'Shotgun (3-harm close reload messy)',
        'Big knife (1-harm hand)',
      ],
    },
    {
      name: 'Armor',
      max: 1,
      options: [
        'Flak jacket (1-armor concealed)',
        'Combat armor (2-armor heavy)',
      ],
    },
  ],

  'the-searcher': [
    {
      name: 'Investigation tools',
      max: 2,
      options: [
        'EMF meter & thermal imaging camera',
        'Night vision goggles & UV blacklight kit',
        'Geiger counter & soil/DNA sample collection kit',
        'High-gain parabolic microphone & sound analyzer',
        'High-definition camcorder with tripod & infrared mode',
      ],
    },
    {
      name: 'Self-defence weapon',
      max: 1,
      options: [
        'Taser gun (1-harm hand/close stun electrical)',
        'Can of heavy bear pepper spray (0-harm close stun)',
        'Small pocketknife (1-harm hand)',
        'Heavy metal flashlight / Maglite (1-harm hand stun)',
        '.38 special revolver (2-harm close reload)',
      ],
    },
  ],

  'the-snoop': [
    {
      name: 'Recording devices',
      max: 3,
      options: [
        '4K shoulder cinema camcorder',
        'Hidden body-cam sunglasses & pocket audio recorder',
        'Drone with 4K thermal camera & boom mic',
        'Long-range telephoto DSLR rig',
        'Studio-grade directional shotgun microphone',
      ],
    },
    {
      name: 'Detectors',
      max: 2,
      options: [
        'Ghost box / Spirit radio scanner & ultrasonic detector',
        'High-precision laser thermometer & RF scanner',
        'Full-spectrum camera with infrared illumination',
        'Digital EMF frequency meter',
      ],
    },
    {
      name: 'Subtle weapon',
      max: 1,
      options: [
        'Heavy tripod or boom pole (1-harm hand stun)',
        'Stun gun / taser (1-harm hand stun electrical)',
        'Pepper spray (0-harm intimate stun)',
        'Concealed snubnose .38 (2-harm close reload)',
        'Pocketknife (1-harm hand)',
      ],
    },
  ],

  'the-spell-slinger': [
    {
      name: 'Backup weapon',
      max: 1,
      options: [
        'Old revolver (.38 special: 2-harm close reload)',
        'Ritual knife (2-harm hand magic)',
        'Heirloom sword (3-harm hand heavy)',
        'Stun baton (1-harm hand stun)',
        'Shotgun (3-harm close reload messy)',
      ],
    },
  ],

  'the-spooktacular': [
    {
      name: 'Camp tool',
      max: 1,
      options: [
        'Heavy mallet or iron tent stake (2-harm hand stun heavy)',
        'Razor sharp throwing knives (2-harm close quick)',
        'Weighted leather whip (1-harm hand/close grapple)',
        'Fire-eater’s torch & accelerant (2-harm hand fire)',
        'Acrobat’s weighted staff (1-harm hand stun)',
      ],
    },
    {
      name: 'Vehicle',
      max: 1,
      options: [
        'Beat-up carnival station wagon',
        'Vintage caravan trailer & tow truck',
        'Painted mystery van',
        'Custom motorcycle with sidecar',
      ],
    },
    {
      name: 'Mystical item',
      max: 1,
      options: [
        'Fortune teller’s crystal ball (scrying, visions)',
        'Haunted deck of tarot cards (cryptic omens)',
        'Shrunken head or spirit jar (whispers warnings)',
        'Cursed carnival mirror (reveals invisible)',
      ],
    },
  ],

  'the-spooky': [
    {
      name: 'Normal weapons',
      max: 2,
      options: [
        'Concealed revolver (.38 special: 2-harm close reload)',
        '9mm automatic (2-harm close loud)',
        'Shotgun (3-harm close reload messy)',
        'Athame dagger (2-harm hand magic)',
        'Heavy wooden cane or walking stick (1-harm hand stun)',
        'Hunting knife (1-harm hand)',
      ],
    },
  ],

  'the-visitor': [
    {
      name: 'Alien gear',
      max: 2,
      options: [
        'Universal molecular translator',
        'Holographic camouflage emitter',
        'Neural memory scanner',
        'Anti-grav levitation harness',
        'Sub-space communication beacon',
      ],
    },
    {
      name: 'Alien weapon',
      max: 1,
      options: [
        'Plasma sidearm (3-harm close energy loud)',
        'Sonic stunner (1-harm close stun non-lethal)',
        'Monomolecular light-blade (3-harm hand messy piercing)',
        'Disintegration beam pistol (4-harm close energy reload dangerous)',
      ],
    },
    {
      name: 'Local gear',
      max: 2,
      options: [
        'Oversized sunglasses and duster coat & Earth smartphone',
        'Bicycle or vintage moped & bag of human junk food',
        'Human slang dictionary & pocket radio',
        'Polaroid instant camera & tourist guidebook',
      ],
    },
  ],

  'the-wronged': [
    {
      name: 'Signature weapon',
      max: 1,
      options: [
        'Sawed-off double-barrel shotgun (3-harm close messy reload)',
        'Custom assault rifle (3-harm close/far area burst)',
        'High-caliber hunting rifle (3-harm far loud)',
        'Crossbow with custom silver/explosive heads (3-harm close reload silent)',
        'Huge ancient broadsword (3-harm hand heavy messy)',
      ],
    },
    {
      name: 'Practical weapons',
      max: 2,
      options: [
        'Hunting machete (2-harm hand messy)',
        '.38 special revolver (2-harm close reload)',
        '9mm semi-automatic (2-harm close loud)',
        'Molotov cocktails (3-harm close fire area dangerous)',
        'Weighted baseball bat (2-harm hand stun)',
        'Heavy iron tire iron (2-harm hand stun)',
      ],
    },
  ],
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
