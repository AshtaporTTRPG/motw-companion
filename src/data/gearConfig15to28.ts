import { PlaybookGearCategory } from '../types/motw';

export const PLAYBOOK_GEAR_CONFIGS_15_TO_28: Record<string, PlaybookGearCategory[]> = {
  'the-host': [
    {
      name: 'Personal item',
      max: 1,
      options: [
        'Journal of bonding symptoms',
        'Journal of notes with symbiote',
        'Tattered novels',
        'Art supplies/sketchbook',
        'Tablet device',
        'E-book reader',
        'Photograph of better times',
        'Audio recorder',
      ],
    },
    {
      name: 'Weapon',
      max: 1,
      options: [
        'Weird martial art (1-harm hand)',
        'Symbiotic blade (2-harm hand integrated retractable)',
        'Symbiotic stunner (0-harm close stun integrated retractable)',
        '.38 revolver (2-harm close reload loud)',
        'Magnum (3-harm close reload loud)',
        'Sword (2-harm hand)',
        'Ray gun (2-harm close messy energy)',
        'Shotgun (3-harm close messy loud)',
      ],
    },
  ],

  'the-initiate': [
    {
      name: 'Old-fashioned armour',
      max: 1,
      options: [
        'Old-fashioned armour (1-armour heavy)',
      ],
    },
    {
      name: 'Old-fashioned weapons',
      min: 2,
      max: 3,
      options: [
        'Axe (2-harm hand messy)',
        'Sword (2-harm hand messy)',
        'Big sword (3-harm hand messy heavy)',
        'Big axe (3-harm hand messy slow heavy)',
        'Silver knife (1-harm hand silver)',
        'Spear (2-harm hand/close)',
        'Fighting sticks (1-harm hand quick)',
        'Mace (2-harm hand messy)',
        'Crossbow (2-harm close slow)',
      ],
    },
    {
      name: 'Modern weapons',
      min: 1,
      max: 2,
      options: [
        '.38 revolver (2-harm close reload loud)',
        '9mm (2-harm close loud)',
        'Sniper rifle (3-harm far)',
        'Magnum (3-harm close reload loud)',
        'Shotgun (3-harm close messy)',
      ],
    },
  ],

  'the-interface': [
    {
      name: 'Machines',
      max: 3,
      options: [
        'Remote camera drone',
        'Mini supercomputer',
        'Recording suite integrated',
        'Enhanced sensor array integrated',
        'Jumping device/boots/jetpack integrated',
        'Forgettable sedan',
        'Plain pickup',
      ],
    },
    {
      name: 'Weapons',
      max: 2,
      options: [
        'Professional weapon with integrated+blatant',
        'Muscle augments (1-harm hand useful integrated)',
        'Energy pistol (2-harm close energy)',
        'Drones (1-harm close autonomous area)',
        'Zapper (0-harm close stun)',
        '9mm (2-harm close loud)',
        'Bladed weapon (2-harm hand)',
        'Tool (1-harm close useful)',
      ],
    },
    {
      name: 'Quality of life',
      max: 2,
      options: [
        'Incessantly replayed voicemail',
        'Nostalgic photo',
        'Project journal',
        'Console',
        'Energy drinks',
      ],
    },
    {
      name: 'Body implants & armour',
      max: 2,
      options: [
        'Tactical armour (1-armour optional)',
        'Internal Computer (integrated)',
      ],
    },
  ],

  'the-monstrous': [
    {
      name: 'Handy weapon',
      max: 1,
      options: [
        '.38 revolver (2-harm close reload loud)',
        '9mm (2-harm close loud)',
        'Magnum (3-harm close reload loud)',
        'Shotgun (3-harm close messy)',
        'Big knife (1-harm hand)',
        'Brass knuckles (1-harm hand quiet small)',
        'Sword (2-harm hand messy)',
        'Huge sword (3-harm hand heavy)',
      ],
    },
  ],

  'the-mundane': [
    {
      name: 'Mundane weapons',
      max: 2,
      options: [
        'Golf club/baseball/cricket/hockey stick (2-harm hand innocuous messy)',
        'Pocket knife/multitool (1-harm hand useful small)',
        'Small handgun (2-harm close loud reload)',
        'Hunting rifle (3-harm far loud reload)',
        'Sledgehammer/fire axe (3-harm hand messy)',
        'Nunchuks (2-harm hand area)',
      ],
    },
    {
      name: 'Transport',
      max: 1,
      options: [
        'Motorcycle',
        'Skateboard',
        'Bicycle',
        'Classic car in terrible condition',
        'Fairly new car in decent condition',
        'Van',
      ],
    },
  ],

  'the-pararomantic': [
    {
      name: 'Normal items',
      max: 2,
      options: [
        'Sports stick (2-harm hand innocuous messy)',
        'Pocket knife/multitool (1-harm hand useful small)',
        'Small handgun (2-harm close loud reload)',
        'Bicycle',
        'Fairly new car in decent condition',
        'Motorcycle',
      ],
    },
    {
      name: 'Guide gift',
      max: 1,
      options: [
        'Part of body (heals or monster weakness)',
        'Jewellery (1-armour magic or protection)',
        'Memento from when human (+1 bond abuse)',
        'Antique weapon (2-harm hand messy + magic/silver/holy/iron)',
      ],
    },
  ],

  'the-professional': [
    {
      name: 'Protective armour',
      max: 1,
      options: [
        'Flak vest (1-armour hidden)',
        'Combat armour (2-armour heavy)',
      ],
    },
    {
      name: 'Serious weapons',
      max: 1,
      options: [
        'Assault rifle (3-harm far area loud reload)',
        'Grenade launcher (4-harm far area messy loud reload)',
        'Sniper rifle (4-harm far)',
        'Grenades (4-harm close area messy loud)',
        'Submachine gun (3-harm close area loud reload)',
      ],
    },
    {
      name: 'Normal weapons',
      max: 2,
      options: [
        '.38 revolver (2-harm close reload loud)',
        '9mm (2-harm close loud)',
        'Hunting rifle (2-harm far loud)',
        'Shotgun (3-harm close messy)',
        'Big knife (1-harm hand)',
      ],
    },
  ],

  'the-searcher': [
    {
      name: 'Investigation tools',
      max: 2,
      options: [
        'Bag of cameras & mics',
        'Forensic tools',
        'Ghost hunting tools',
        'Scientific measuring tools',
        'Cryptid hunting gear',
        'Historical documents & witness reports',
        'Maps/blueprints/building reports',
      ],
    },
    {
      name: 'Self-defence weapon',
      max: 1,
      options: [
        'Walking stick (1-harm hand innocuous)',
        'Small handgun (2-harm close reload loud)',
        'Small knife (1-harm hand messy)',
        'Martial arts training (1-harm hand innocuous)',
        'Incapacitating spray (0-harm hand irritating)',
        'Heavy flashlight (1-harm hand innocuous)',
      ],
    },
  ],

  'the-snoop': [
    {
      name: 'Recording devices',
      max: 3,
      options: [
        'Video camera',
        'Camera drone',
        'Tiny digital camera',
        'Starlight camera',
        'Film camera',
        'Steadicam rig',
        'Digital recorder',
        'Laser microphone',
        'Tape recorder',
        'SLR camera',
        'Infrared camera',
        'Nice smartphone',
        'Pro sound gear',
      ],
    },
    {
      name: 'Detectors',
      max: 2,
      options: [
        'Metal detector',
        'EMF detector',
        'Compass',
        'Temperature detector',
        'GPS receiver',
        'Laser rangefinder',
        'Ouija board',
        'Pendulum',
        'Tarot deck',
        'Humidity meter',
        'Dowsing rods',
        'Chemistry test kit',
      ],
    },
    {
      name: 'Subtle weapons',
      max: 1,
      options: [
        'Baseball/cricket bat (2-harm hand innocuous messy)',
        'Stun gun (1-harm hand stun)',
        'Multitool/knife (1-harm hand hidden useful)',
        'Handgun (2-harm close loud)',
        'Knife (1-harm hand hidden)',
      ],
    },
  ],

  'the-spell-slinger': [
    {
      name: 'Backup weapon',
      max: 1,
      options: [
        'Old revolver (2-harm close reload loud)',
        'Ritual knife (1-harm hand)',
        'Heirloom sword (2-harm hand messy)',
      ],
    },
  ],

  'the-spooktacular': [
    {
      name: 'Camp tools',
      max: 1,
      options: [
        'Pocket knife/multitool (1-harm hand useful small)',
        'Mallet (1-harm hand useful blunt)',
        'Baseball bat (2-harm hand)',
        'Crowbar (2-harm hand useful messy)',
        'Hatchet (2-harm hand messy)',
        'Sock full of coins (1-harm hand stun)',
      ],
    },
    {
      name: 'Vehicles',
      max: 1,
      options: [
        'Pickup',
        'Truck',
        'Van',
        'Motorcycle & sidecar',
      ],
    },
    {
      name: 'Mystical item',
      max: 1,
      options: [
        'Ghost Shades',
        'Really Big Plush Dog Animated',
        'Returning 100',
        'Scamulet',
        'Wizard Tent',
      ],
    },
  ],

  'the-spooky': [
    {
      name: 'Normal weapons',
      max: 2,
      options: [
        '.38 revolver (2-harm close reload loud)',
        '9mm (2-harm close loud)',
        'Hunting rifle (2-harm far loud)',
        'Shotgun (3-harm close messy)',
        'Big knife (1-harm hand)',
      ],
    },
  ],

  'the-visitor': [
    {
      name: 'Alien gear',
      max: 2,
      options: [
        'Information crystal',
        'Pocket medkit',
        'Universal translator',
        'Instant climate bubble',
        'Food replicator',
        'Hoverbike',
        'Holographic disguise',
        'Portable power generator',
      ],
    },
    {
      name: 'Alien weapon',
      max: 1,
      options: [
        'Warp ray (2-harm close disorienting)',
        'Psionic blade (2-harm hand ignore armour magic)',
        'Lightning gun (3-harm close messy)',
        'Freeze gun (0-harm close stun)',
        'Harvester gem (1-harm far energy life-drain)',
        'Destabilising seed (3-harm area messy loud)',
      ],
    },
    {
      name: 'Local gear',
      max: 2,
      options: [
        'Mobile game console',
        'E-book reader full',
        'Old Walkman',
        'Smartphone',
        'Earth camping gear',
        'Collection of photos',
        'Favourite snacks',
        'Good shoes',
        'Pickup truck',
      ],
    },
  ],

  'the-wronged': [
    {
      name: 'Signature weapon',
      max: 1,
      options: [
        'Sawn-off shotgun (3-harm hand/close messy loud reload)',
        'Hand cannon (3-harm close loud)',
        'Fighting knife (2-harm hand quiet)',
        'Huge sword/axe (3-harm hand messy heavy)',
        'Specialist weapon (4-harm against specific creature, 1-harm otherwise)',
        'Enchanted dagger (2-harm hand magic)',
        'Chainsaw (3-harm hand messy unreliable loud heavy)',
      ],
    },
    {
      name: 'Practical weapons',
      max: 2,
      options: [
        '.38 revolver (2-harm close reload loud)',
        '9mm (2-harm close loud)',
        'Hunting rifle (2-harm far loud)',
        'Shotgun (3-harm close messy loud)',
        'Big knife (1-harm hand)',
        'Brass knuckles (1-harm hand stealthy)',
        'Assault rifle (3-harm close area loud reload)',
      ],
    },
    {
      name: 'Transport & Armour',
      max: 2,
      options: [
        'Protective wear (1-armour)',
        'Classic car',
        'Motorcycle',
        'Pickup',
        'Van',
      ],
    },
  ],
};
