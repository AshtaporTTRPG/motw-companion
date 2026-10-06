import { PlaybookDefinition } from '../types/motw';
import { EXPANSION_PLAYBOOKS } from './expansionPlaybooks';

export const PLAYBOOKS: PlaybookDefinition[] = [
  {
    id: 'the-chosen',
    name: 'The Chosen',
    tagline: 'Your birth was prophesied. You are the designated champion against darkness.',
    description: 'Destined to stand between humanity and the apocalyptic horrors of the dark.',
    luckSpecial: 'When you spend a point of Luck, the Keeper will bring your Fate closer by giving you a prophetic omen or sudden apocalyptic complication.',
    statOptions: [
      { charm: 2, cool: -1, sharp: 1, tough: 2, weird: -1 },
      { charm: -1, cool: 2, sharp: 1, tough: 2, weird: -1 },
      { charm: 1, cool: 2, sharp: 1, tough: 1, weird: -1 },
      { charm: -1, cool: 1, sharp: 2, tough: -1, weird: 2 },
      { charm: 1, cool: 2, sharp: -1, tough: -1, weird: 2 },
    ],
    moves: [
      {
        id: 'chosen-destiny',
        name: 'Destiny’s Plaything',
        description: 'At the beginning of each mystery, roll +Weird. On a 10+, the Keeper will reveal a useful detail about the coming mystery. On a 7-9, you get a vague hint or disturbing omen. On a miss, you get a vision of something terrible happening to you or someone you care about.',
        stat: 'weird',
      },
      {
        id: 'chosen-i-am-the-weapon',
        name: 'I Am The Weapon',
        description: 'You increase the harm of your chosen destiny weapon by +1, and it gains the messy tag.',
      },
      {
        id: 'chosen-here-for-a-reason',
        name: 'I’m Here For A Reason',
        description: 'There’s something you are meant to do. What is it? As long as you are working towards that goal, you cannot die. If you die in play, spend a point of Luck to recover or be returned to life somehow. Once your task is done (or you run out of Luck), this protection ceases.',
      },
      {
        id: 'chosen-the-big-entrance',
        name: 'The Big Entrance',
        description: 'When you make a showy entrance into a dangerous situation, roll +Cool. On a 10+, everyone stops to watch and listen until you finish your opening speech. On a 7-9, one person or monster stops to watch and listen. On a miss, you are marked as the biggest threat by everyone present.',
        stat: 'cool',
      },
      {
        id: 'chosen-devastating',
        name: 'Devastating Attack',
        description: 'When you inflict harm on an enemy, you can choose to inflict +1 harm, but you suffer 1-harm yourself in recoil or exposure.',
      },
      {
        id: 'chosen-dutiful',
        name: 'Dutiful',
        description: 'When your fate rears its ugly head and you act in accordance with any of your fate tags (heroic or doom), mark experience. If it is a heroic tag, take +1 forward as well.',
      },
      {
        id: 'chosen-invincible',
        name: 'Invincible',
        description: 'You always count as having 2-armor. This does not stack with other protection.',
      },
      {
        id: 'chosen-resilience',
        name: 'Resilience',
        description: 'You heal faster than normal people. Any time your harm is healed, heal an extra 1 point. Additionally, your wounds count as 1-harm less for the purpose of the Keeper’s harm moves.',
      },
    ],
    improvements: [
      'Get +1 Tough (max +3)',
      'Get +1 Charm (max +2)',
      'Get +1 Cool (max +2)',
      'Take another Chosen move',
      'Take another Chosen move',
      'Take a move from another playbook',
      'Gain an ally or haven',
    ],
    gearChoices: [
      'Destined Weapon: Ancient relic blade (3-harm hand messy heavy)',
      'Destined Weapon: Blessed silver hammer (3-harm hand heavy holy)',
      'Destined Weapon: Cosmic focus staff (2-harm close magic stun)',
      'Hunting rifle (3-harm far loud)',
      'Heavy leather jacket (1-armor)',
    ],
  },
  {
    id: 'the-expert',
    name: 'The Expert',
    tagline: 'You have studied the dark arts, the forgotten grimoires, and the cryptid lore.',
    description: 'The walking encyclopedia who knows the monster’s name, weaknesses, and anatomy.',
    luckSpecial: 'When you spend a point of Luck, you discover an obscure, terrifying secret in your research that puts you or your allies in unexpected danger.',
    statOptions: [
      { charm: -1, cool: 1, sharp: 2, tough: 1, weird: 0 },
      { charm: 0, cool: 1, sharp: 2, tough: -1, weird: 1 },
      { charm: 1, cool: -1, sharp: 2, tough: 1, weird: 0 },
      { charm: -1, cool: 1, sharp: 2, tough: 0, weird: 1 },
      { charm: -1, cool: 0, sharp: 2, tough: -1, weird: 2 },
    ],
    moves: [
      {
        id: 'expert-i-have-read-about-this',
        name: 'I’ve Read About A Beast Like That',
        description: 'When you first encounter a monster, you may ask the Keeper one question from the Investigate a Mystery list about it: what is it, what can it do, or what is its weakness?',
      },
      {
        id: 'expert-often-right',
        name: 'Often Right',
        description: 'When a hunter comes to you for advice, tell them what you honestly think the best course is. If that hunter follows your advice, they take +1 on any moves they make doing so, and you mark experience that mystery the first time it happens.',
      },
      {
        id: 'expert-preparedness',
        name: 'Preparedness',
        description: 'When you need something unusual or rare, roll +Sharp. On a 10+, you have it right now. On a 7-9, you have it, but it will take a little while to get it out, or it’s not quite what you wanted. On a miss, you know where to find it, but it’s somewhere dangerous.',
        stat: 'sharp',
      },
      {
        id: 'expert-haven',
        name: 'The Haven',
        description: 'You have set up a haven—a safe place to work, research, and recuperate with your chosen tags (lore library, mystical library, armory, etc.).',
      },
      {
        id: 'expert-it-wasnt-as-big',
        name: 'It Wasn’t As Big As That First Time',
        description: 'You gain 1-armor against monster attacks.',
      },
      {
        id: 'expert-dark-past',
        name: 'Dark Past',
        description: 'You used to be in deep with some bad crowd or forbidden occult circle. When you deal with a monster or cultist, roll +Charm. On a 10+, they recognize you and are friendly or intimidated. On a 7-9, they know you, but there’s bad blood or debts to settle. On a miss, your past catches up to you hard.',
        stat: 'charm',
      },
      {
        id: 'expert-beast-breaker',
        name: 'Beast Breaker',
        description: 'When you kick some ass against a monster whose weakness you have discovered, roll +Sharp instead of +Tough. On a 10+, deal harm with +1 bonus harm. On a 7-9, deal harm as normal. On a miss, the monster turns the tables.',
        stat: 'sharp',
      },
    ],
    improvements: [
      'Get +1 Sharp (max +3)',
      'Get +1 Charm (max +2)',
      'Get +1 Cool (max +2)',
      'Expand your Haven with 2 new upgrades',
      'Take another Expert move',
      'Take a move from another playbook',
      'Gain an apprentice or assistant',
    ],
    gearChoices: [
      'Shotgun (3-harm close reload messy)',
      'Hunting rifle (3-harm far loud)',
      'Revolver with silver rounds (2-harm close reload)',
      'Athame sacrificial dagger (2-harm hand magic)',
      'Monster taxonomy field journal',
    ],
  },
  {
    id: 'the-monstrous',
    name: 'The Monstrous',
    tagline: 'You feel the hunger within, but you fight on the side of humanity.',
    description: 'Part monster yourself: vampire, werewolf, fae changeling, ghost, or demon.',
    luckSpecial: 'When you spend a point of Luck, your dark monstrous side comes closer to breaking free, terrifying human onlookers or demanding tribute.',
    statOptions: [
      { charm: -1, cool: -1, sharp: 0, tough: 2, weird: 3 },
      { charm: -1, cool: 1, sharp: 1, tough: 0, weird: 3 },
      { charm: 2, cool: 0, sharp: -1, tough: -1, weird: 3 },
      { charm: -2, cool: 2, sharp: 0, tough: 0, weird: 3 },
      { charm: 0, cool: -1, sharp: 2, tough: -1, weird: 3 },
    ],
    moves: [
      {
        id: 'monstrous-immortal',
        name: 'Immortal',
        description: 'Do not age or sicken, suffer 1-harm less whenever you take harm.',
      },
      {
        id: 'monstrous-unnatural-appeal',
        name: 'Unnatural Appeal',
        description: 'Roll +Weird instead of +Charm when you manipulate someone.',
        stat: 'weird',
      },
      {
        id: 'monstrous-unholy-strength',
        name: 'Unholy Strength',
        description: 'Roll +Weird instead of +Tough when you kick some ass.',
        stat: 'weird',
      },
      {
        id: 'monstrous-incorporeal',
        name: 'Incorporeal',
        description: 'Move freely through solid objects (not people).',
      },
      {
        id: 'monstrous-preternatural-speed',
        name: 'Preternatural Speed',
        description: 'Faster than normal. Take +1 ongoing when chasing, fleeing, or running.',
      },
      {
        id: 'monstrous-claws-of-the-beast',
        name: 'Claws of the Beast',
        description: 'All natural attacks get +1 harm.',
      },
      {
        id: 'monstrous-mental-dominion',
        name: 'Mental Dominion',
        description: 'When you gaze into human eyes to give orders, roll +Charm. On a 10+, hold 3. On a 7-9, hold 1. Spend your hold 1-for-1 to give them orders they must follow. On a miss, they break free and realize you tried to control them.',
        stat: 'charm',
      },
      {
        id: 'monstrous-unquenchable-vitality',
        name: 'Unquenchable Vitality',
        description: 'When you draw upon supernatural resilience to self-heal, roll +Cool. On a 10+, heal 2 harm and stabilize your wounds. On a 7-9, heal 1 harm and stabilize your wounds. On a miss, your body rejects the repair, suffering 1-harm.',
        stat: 'cool',
      },
      {
        id: 'monstrous-dark-negotiator',
        name: 'Dark Negotiator',
        description: 'Manipulate monsters if they can reason and talk.',
      },
      {
        id: 'monstrous-flight',
        name: 'Flight',
        description: 'You can fly.',
      },
      {
        id: 'monstrous-shapeshifter',
        name: 'Shapeshifter',
        description: 'Change forms (animals). Gain +1 to investigate a mystery with animal senses.',
      },
      {
        id: 'monstrous-something-borrowed',
        name: 'Something Borrowed',
        description: 'Take a move from another hunter playbook not in play.',
      },
    ],
    improvements: [
      'Get +1 Weird (max +3)',
      'Get +1 Tough (max +2)',
      'Get +1 Charm (max +2)',
      'Take another Monstrous move',
      'Take another Monstrous move',
      'Take a move from another playbook',
      'Gain a pack or coven of followers',
    ],
    gearChoices: [
      'Natural weapons (Fangs / Talons: 2-harm hand intimate messy)',
      'Heavy trench coat (conceals monstrous features)',
      'Crossbow with iron bolts (2-harm close silent)',
      'Relic medallion to suppress demonic surges',
    ],
  },
  {
    id: 'the-professional',
    name: 'The Professional',
    tagline: 'You have badges, black-budget clearance, and an Agency backing your field ops.',
    description: 'An operative of an organized bureau: FBI occult branch, corporate black-ops, or sacred knightly order.',
    luckSpecial: 'When you spend a point of Luck, your Agency intervenes—demanding an immediate debrief, auditing your conduct, or sending an inspector.',
    statOptions: [
      { charm: 0, cool: 2, sharp: -1, tough: 2, weird: -1 },
      { charm: -1, cool: 2, sharp: 1, tough: 1, weird: -1 },
      { charm: 1, cool: 2, sharp: 1, tough: -1, weird: -1 },
      { charm: -1, cool: 2, sharp: 1, tough: 0, weird: 1 },
      { charm: 0, cool: 2, sharp: 2, tough: -1, weird: -1 },
    ],
    moves: [
      {
        id: 'pro-deal-with-the-agency',
        name: 'Deal With The Agency',
        description: 'When you need something from the Agency (gear, backup, clearance, resources), roll +Sharp. On a 10+, you get it without question. On a 7-9, you get it, but there are strings attached (oversight, delay, or an annoying supervisor). On a miss, your request is denied and the Agency questions your competence.',
        stat: 'sharp',
      },
      {
        id: 'pro-tactical-genius',
        name: 'Tactical Genius',
        description: 'When you Read a Bad Situation, you may roll +Cool instead of +Sharp.',
        stat: 'cool',
      },
      {
        id: 'pro-medic',
        name: 'Medic',
        description: 'When you treat someone with medical gear, roll +Cool. On a 10+, heal 2-harm and stabilize them. On a 7-9, heal 1-harm and stabilize them. On a miss, complications arise (infection, hemorrhaging, or worse).',
        stat: 'cool',
      },
      {
        id: 'pro-leave-no-one-behind',
        name: 'Leave No One Behind',
        description: 'In combat, when you help someone escape or carry a fallen teammate to safety, roll +Cool. On a 10+, you both get away clean. On a 7-9, you get them out, but you take harm or get separated. On a miss, you both end up trapped.',
        stat: 'cool',
      },
      {
        id: 'pro-bottle-it-up',
        name: 'Bottle It Up',
        description: 'When you want to resist a mental influence, horror, or fear, roll +Cool. On a 10+, you steel yourself completely and take +1 forward. On a 7-9, you hold it together for now, but suffer -1 forward on your next move. On a miss, the terror or trauma overwhelms you.',
        stat: 'cool',
      },
      {
        id: 'pro-battlefield-awareness',
        name: 'Battlefield Awareness',
        description: 'You always know the tactical layout of any battlefield you enter. Take +1 armor when fighting in terrain you have had time to scout or prepare.',
      },
      {
        id: 'pro-unfazed',
        name: 'Unfazed',
        description: 'When you act under pressure in extreme life-or-death situations, you cannot roll worse than a 7-9 result.',
      },
      {
        id: 'pro-mob',
        name: 'Mob',
        description: 'When you order your squad into combat or to hold a perimeter, roll +Charm. On a 10+, they perform the mission effectively. On a 7-9, they succeed with casualties or complications. On a miss, the squad is decimated or compromises the mission.',
        stat: 'charm',
      },
    ],
    improvements: [
      'Get +1 Cool (max +3)',
      'Get +1 Tough (max +2)',
      'Get +1 Sharp (max +2)',
      'Add a new resource or division to your Agency',
      'Take another Professional move',
      'Take a move from another playbook',
      'Gain commanding officer authority',
    ],
    gearChoices: [
      'Assault rifle (3-harm close/far burst loud)',
      'Tactical 9mm pistol (2-harm close loud reliable)',
      'Kevlar vest (1-armor concealed)',
      'Agency tactical communicator and forensic kit',
    ],
  },
  {
    id: 'the-spooky',
    name: 'The Spooky',
    tagline: 'You have weird psychic gifts, dark pacts, or voices whispering from the other side.',
    description: 'A conduit of uncanny paranormal phenomena that often exacts an eerie toll.',
    luckSpecial: 'When you spend a point of Luck, your dark patron or subconscious entity demands a sinister favor or manifests around you.',
    statOptions: [
      { charm: 1, cool: 0, sharp: 1, tough: -1, weird: 2 },
      { charm: -1, cool: 1, sharp: 0, tough: 1, weird: 2 },
      { charm: 2, cool: 0, sharp: -1, tough: -1, weird: 2 },
      { charm: 0, cool: -1, sharp: 1, tough: 1, weird: 2 },
      { charm: -1, cool: -1, sharp: 2, tough: 0, weird: 2 },
    ],
    moves: [
      {
        id: 'spooky-the-sight',
        name: 'The Sight',
        description: 'You can see the invisible, spirits, magical auras, and psychic residues. When you open your mind and gaze upon a place or person with the Sight, roll +Weird. On a 10+, ask the Keeper 3 questions: What happened here recently? What supernatural presence is near? What are its intentions? On a 7-9, ask 1 question. On a miss, you catch the eye of something terrifying in the unseen realm.',
        stat: 'weird',
      },
      {
        id: 'spooky-premonitions',
        name: 'Premonitions',
        description: 'At the start of each mystery, roll +Weird. On a 10+, the Keeper gives you a detailed vision of a bad thing that hasn’t happened yet; if you act to prevent it, take +1 forward. On a 7-9, you get cloudy visions and cryptic warnings. On a miss, you have a nightmarish vision of your own doom; take -1 forward.',
        stat: 'weird',
      },
      {
        id: 'spooky-hunches',
        name: 'Hunches',
        description: 'When something bad is about to happen, the Keeper will give you a hunch or warning. You can act immediately or ask "What is about to happen?" to take +1 forward to react.',
      },
      {
        id: 'spooky-telekinesis',
        name: 'Telekinesis',
        description: 'You can move objects with your mind. Roll +Weird. On a 10+, move an object up to the size of a car, or fling an object for 2-harm close/far, or pin someone in place. On a 7-9, you manage it, but take 1-harm (ignore armor) from psychic strain or suffer extreme fatigue. On a miss, your power lashes out uncontrollably.',
        stat: 'weird',
      },
      {
        id: 'spooky-jinx',
        name: 'Jinx',
        description: 'When you jinx a target with bad luck, roll +Weird. On a 10+, hold 2. On a 7-9, hold 1. Spend hold 1-for-1 to cause: a weapon jams or breaks; an enemy trips, slips, or drops something; an environmental accident deals 2-harm to them. On a miss, bad luck strikes you or your nearest friend.',
        stat: 'weird',
      },
      {
        id: 'spooky-tune-in',
        name: 'Tune In',
        description: 'When you attune your mind to a monster or minion, roll +Weird. On a 10+, hold 3. On a 7-9, hold 1. Spend hold to ask the Keeper: Where is it right now? What is it planning? What is its current emotion/need? Who is it targeting? On a miss, the creature senses your probe and knows where you are.',
        stat: 'weird',
      },
      {
        id: 'spooky-darker-sort-of-hunter',
        name: 'The Darker Sort of Hunter',
        description: 'Whenever you use magic or a Spooky move, you may choose to invoke your Dark Side. If you do, gain +1 to the roll, but the Keeper will give you a dark urge or temptation that you must satisfy.',
      },
    ],
    improvements: [
      'Get +1 Weird (max +3)',
      'Get +1 Charm (max +2)',
      'Get +1 Sharp (max +2)',
      'Take another Spooky move',
      'Take a move from another playbook',
      'Purify or renegotiate your dark pact',
      'Gain an arcane familiar',
    ],
    gearChoices: [
      'Concealed revolver (.38 special: 2-harm close reload)',
      'Athame dagger (2-harm hand magic)',
      'Ouija pointer & scrying obsidian mirror',
      'Tarot deck inscribed with warding sigils',
    ],
  },
  {
    id: 'the-wronged',
    name: 'The Wronged',
    tagline: 'They took your family, your lover, or your life. Now vengeance is all you have.',
    description: 'A relentless avenger who survived a tragedy and hunts monsters with fury.',
    luckSpecial: 'When you spend a point of Luck, you discover that someone you trusted was complicit in the monster attack that destroyed your past.',
    statOptions: [
      { charm: 0, cool: 1, sharp: -1, tough: 2, weird: 1 },
      { charm: 0, cool: 0, sharp: 1, tough: 2, weird: 0 },
      { charm: 1, cool: 0, sharp: 1, tough: 2, weird: -1 },
      { charm: -1, cool: -1, sharp: 0, tough: 2, weird: 2 },
      { charm: 1, cool: 1, sharp: 0, tough: 2, weird: -1 },
    ],
    moves: [
      {
        id: 'wronged-i-know-my-prey',
        name: 'I Know My Prey',
        description: 'Choose one breed of monster that destroyed what you loved. You take +1 ongoing whenever you knowingly investigate, pursue, or fight this breed of monster.',
      },
      {
        id: 'wronged-berserk',
        name: 'Berserk',
        description: 'When you Kick Some Ass against a monster, you may choose to go berserk. If you do, deal +1 harm and take +1 harm from any attacks against you until the fight ends. While berserk, you cannot retreat.',
      },
      {
        id: 'wronged-safety-first',
        name: 'Safety First',
        description: 'You have reinforced gear, defensive training, or sheer stubbornness: you gain 1-armor against all attacks.',
      },
      {
        id: 'wronged-never-again',
        name: 'NEVER AGAIN',
        description: 'In combat, when an innocent bystander or a close ally is in imminent danger of being hurt or killed, you may throw yourself in the way to take the blow. If you do, take the harm instead of them, and your armor is doubled for this hit.',
      },
      {
        id: 'wronged-what-does-not-kill-me',
        name: 'What Does Not Kill Me...',
        description: 'When you suffer 4 or more harm from a single attack, take +1 forward on your next move against the attacker.',
      },
      {
        id: 'wronged-fervor',
        name: 'Fervor',
        description: 'When you manipulate someone by appealing to their desire for vengeance, justice, or righteous anger, roll +Tough instead of +Charm.',
        stat: 'tough',
      },
      {
        id: 'wronged-tools-of-the-trade',
        name: 'Tools of the Trade',
        description: 'When you use a weapon specifically tailored or forged to exploit a monster’s weakness, it deals +2 harm instead of +1.',
      },
    ],
    improvements: [
      'Get +1 Tough (max +3)',
      'Get +1 Cool (max +2)',
      'Get +1 Sharp (max +2)',
      'Take another Wronged move',
      'Take a move from another playbook',
      'Find a fellow survivor ally',
      'Gain a heavily fortified muscle car or war van',
    ],
    gearChoices: [
      'Sawed-off double-barrel shotgun (3-harm close messy reload)',
      'Hunting machete (2-harm hand messy)',
      'Molotov cocktails (3-harm close fire area dangerous)',
      'Armored leather duster (1-armor)',
    ],
  },
  {
    id: 'the-flake',
    name: 'The Flake',
    tagline: 'Conspiracy theorist, podcast host, or basement hacker who connected all the red strings.',
    description: 'The paranoid truth-seeker who knew the government and monsters were colluding all along.',
    luckSpecial: 'When you spend a point of Luck, one of your wildest conspiracy theories turns out to be 100% true—and now its enforcers know you know.',
    statOptions: [
      { charm: 1, cool: 1, sharp: 2, tough: -1, weird: 0 },
      { charm: 0, cool: 1, sharp: 2, tough: -1, weird: 1 },
      { charm: 0, cool: -1, sharp: 2, tough: 1, weird: 1 },
      { charm: 1, cool: -1, sharp: 2, tough: 0, weird: 1 },
      { charm: -1, cool: -1, sharp: 2, tough: 0, weird: 2 },
    ],
    moves: [
      {
        id: 'flake-connect-the-dots',
        name: 'Connect the Dots',
        description: 'At the beginning of a mystery, you may look for wider patterns. Roll +Sharp. On a 10+, ask the Keeper 3 questions from: How does this tie to the larger conspiracy? What hidden faction is involved? What is being covered up? On a 7-9, ask 1 question. On a miss, you chase a wildly false rabbit hole and take -1 forward.',
        stat: 'sharp',
      },
      {
        id: 'flake-crazy-eyes',
        name: 'Crazy Eyes',
        description: 'You have seen things that shattered your concept of normalcy. You get +1 Weird (to a maximum of +3).',
      },
      {
        id: 'flake-suspicious-mind',
        name: 'Suspicious Mind',
        description: 'You can always tell when someone is lying to you, hiding something, or trying to manipulate you.',
      },
      {
        id: 'flake-see-it-all-fits',
        name: 'See, It All Fits Together',
        description: 'When you explain your crazy conspiracy theory to another hunter, roll +Sharp. On a 10+, if they act on your theory, they take +1 ongoing while doing so, and you mark experience. On a 7-9, they take +1 forward. On a miss, your convoluted logic confuses everyone (-1 forward to both).',
        stat: 'sharp',
      },
      {
        id: 'flake-often-overlooked',
        name: 'Often Overlooked',
        description: 'When you act under pressure to avoid being noticed, hide in plain sight, or slip away from danger, roll +Sharp instead of +Cool.',
        stat: 'sharp',
      },
      {
        id: 'flake-net-friends',
        name: 'Net Friends',
        description: 'You have an underground network of conspiracy theorists, hackers, and occult hobbyists online. When you reach out to them for information, roll +Sharp. On a 10+, they provide exactly what you need quickly and discreetly. On a 7-9, they provide useful info, but it comes with dangerous attention or takes time. On a miss, you accidentally leak your whereabouts to an enemy.',
        stat: 'sharp',
      },
      {
        id: 'flake-sneaky',
        name: 'Sneaky',
        description: 'When you attack an enemy from stealth, ambush, or surprise, you deal +2 harm on your first strike.',
      },
    ],
    improvements: [
      'Get +1 Sharp (max +3)',
      'Get +1 Cool (max +2)',
      'Get +1 Charm (max +2)',
      'Take another Flake move',
      'Take a move from another playbook',
      'Gain a network of underground informants',
      'Build a mobile signal interceptor rig',
    ],
    gearChoices: [
      'Taser / Stun gun (1-harm hand stun electrical)',
      'Concealed snubnose .38 revolver (2-harm close reload)',
      'Signal jamming drone & EMP scrambler',
      'Night-vision surveillance binoculars & parabolic mic',
    ],
  },
  {
    id: 'the-mundane',
    name: 'The Mundane',
    tagline: 'You don’t have magic, military badges, or prophecies. Just courage, grit, and luck.',
    description: 'An everyday person thrown into an impossible world of horrors, keeping everyone grounded.',
    luckSpecial: 'When you spend a point of Luck, your ordinary life crashes into the mystery—a worried family member, boss, or cop shows up at the worst time.',
    statOptions: [
      { charm: 2, cool: 1, sharp: 0, tough: 1, weird: -1 },
      { charm: 2, cool: 0, sharp: 1, tough: 1, weird: -1 },
      { charm: 2, cool: 1, sharp: 1, tough: 0, weird: -1 },
      { charm: 2, cool: -1, sharp: 1, tough: 1, weird: 0 },
      { charm: 2, cool: 1, sharp: -1, tough: 1, weird: 0 },
    ],
    moves: [
      {
        id: 'mundane-always-the-victim',
        name: 'Always the Victim',
        description: 'Whenever another hunter protects you, or whenever you are captured or cornered by a monster, mark experience.',
      },
      {
        id: 'mundane-oops',
        name: 'Oops!',
        description: 'Whenever you stumble around in danger or fumble blindly, roll +Cool. On a 10+, you accidentally find a vital clue, an exit, or a monster’s weakness. On a 7-9, you find it, but you make a lot of noise or break something. On a miss, you step right into the monster’s lair or trap.',
        stat: 'cool',
      },
      {
        id: 'mundane-let-get-out-of-here',
        name: 'Let’s Get Out of Here!',
        description: 'When you protect someone by leading them away from danger or urging everyone to retreat, roll +Charm instead of +Tough.',
        stat: 'charm',
      },
      {
        id: 'mundane-panic-button',
        name: 'Panic Button',
        description: 'When you need to escape a terrifying or overwhelming situation immediately, roll +Sharp. On a 10+, you escape completely to a safe place. On a 7-9, you escape, but you leave behind something important or get separated from the group. On a miss, you run straight into worse danger.',
        stat: 'sharp',
      },
      {
        id: 'mundane-the-power-of-hope',
        name: 'The Power of Hope',
        description: 'When you give an inspiring pep talk or reassure another hunter who is scared or desperate, roll +Charm. On a 10+, they clear 1 harm or 1 unstable condition, and take +1 forward. On a 7-9, they take +1 forward. On a miss, your optimism feels hollow and demoralizing.',
        stat: 'charm',
      },
      {
        id: 'mundane-trust-me',
        name: 'Trust Me',
        description: 'When you manipulate someone mundane (police, security, bystander) with plain common sense or relatable honesty, take +1 to the roll.',
      },
      {
        id: 'mundane-dont-worry',
        name: 'Don’t Worry, I’ll Check It Out',
        description: 'When you go alone into a creepy or obviously suspicious place to investigate, roll +Cool. On a 10+, you find the clue safely and make it back. On a 7-9, you find what you were looking for, but you are spotted or trapped. On a miss, you are ambushed without warning.',
        stat: 'cool',
      },
    ],
    improvements: [
      'Get +1 Charm (max +3)',
      'Get +1 Cool (max +2)',
      'Get +1 Tough (max +2)',
      'Take another Mundane move',
      'Take a move from another playbook',
      'Get a trusty beat-up station wagon or truck',
      'Become the anchor keeping the team human',
    ],
    gearChoices: [
      'Baseball bat with nails (2-harm hand heavy)',
      'Grandpa’s hunting shotgun (3-harm close reload messy)',
      'First aid kit & flashlight',
      'Smartphone with unlimited high-speed data & livestream',
    ],
  },
  ...EXPANSION_PLAYBOOKS,
  {
    id: 'the-hex',
    name: 'The Hex',
    tagline: 'You were born to take magic to the edge—and damn whatever gets in the way.',
    description: 'A witch or sorcerer whose power is volatile, forbidden, and tempting. You weave rotes, court backlash, and teeter on the edge of dangerous obsessions.',
    luckSpecial: 'When you spend a point of Luck, your spell backlash will be extra nasty until the mystery ends.',
    statOptions: [
      { charm: 2, cool: 0, sharp: 0, tough: -1, weird: 2 },
      { charm: 1, cool: -1, sharp: 1, tough: 0, weird: 2 },
      { charm: -1, cool: 1, sharp: 0, tough: 1, weird: 2 },
      { charm: -1, cool: 0, sharp: 1, tough: 1, weird: 2 },
      { charm: 0, cool: 0, sharp: 2, tough: -1, weird: 2 },
    ],
    subMechanics: {
      title: 'Temptation & Rotes',
      description: 'Temptation (choose 1): Vengeance, Power, Addiction, Callousness, Carnage, Secrets, Glory. Whenever you give in to temptation, mark experience. Rotes: Pre-formulated magical spells with custom requirements (incantation, gestures, components, focus) and defined 10+, 7-9, and miss effects.',
      options: [
        'Temptation: Vengeance',
        'Temptation: Power',
        'Temptation: Addiction',
        'Temptation: Callousness',
        'Temptation: Carnage',
        'Temptation: Secrets',
        'Temptation: Glory',
      ],
      track: ['Rote 1: Active', 'Rote 2: Active', 'Rote 3: Active', 'Rote 4: Reserve'],
    },
    moves: [
      {
        id: 'hex-bad-luck-charm',
        name: 'Bad Luck Charm (Inherent)',
        description: 'You have an innate ward against harmful magics and hexes: take +1 armor against supernatural attacks. Furthermore, whenever you suffer spell backlash, you can choose to direct part of that backlash into a nearby bystander, rival, or the environment instead of absorbing all the harm yourself.',
      },
      {
        id: 'hex-burn-everything',
        name: 'Burn Everything',
        description: 'When you use magic to inflict harm or destroy an obstacle, you can inflict +2 harm and gain the messy and area tags. If you do, you cause catastrophic collateral damage or ignite the surrounding area.',
      },
      {
        id: 'hex-cast-the-bones',
        name: 'Cast the Bones',
        description: 'When you divine fortunes or scry using bone dice, runes, or tarot, roll +Weird. On a 10+, hold 2. On a 7-9, hold 1. Spend hold to ask the Keeper: What is coming to hurt us? Where is the monster hiding? Who is lying to me? What hidden weakness does my target possess? On a miss, you see your impending doom and take -1 forward.',
        stat: 'weird',
      },
      {
        id: 'hex-force-of-will',
        name: 'Force of Will',
        description: 'When you push through physical strain or excruciating agony to complete a spell or magical rote, you ignore all harm penalties and can roll +Tough instead of +Weird to maintain concentration.',
        stat: 'tough',
      },
      {
        id: 'hex-luck-of-the-damned',
        name: 'Luck of the Damned',
        description: 'You skirt danger with dark fortune. Once per mystery, when you roll a 6 or less on any move involving magic or perilous odds, you can treat the roll as a 10+ instead. However, the Keeper immediately makes a hard move against someone close to you.',
      },
      {
        id: 'hex-sympathetic-token',
        name: 'Sympathetic Token',
        description: 'If you possess an intimate belonging, lock of hair, or vial of blood from a person or monster, you can target them with spells and curses from any distance as if they were standing right in front of you.',
      },
      {
        id: 'hex-this-might-sting',
        name: 'This Might Sting',
        description: 'When you channel raw chaotic energy into an ally to heal them or boost their strength, roll +Weird. On a 10+, they heal 2 harm or take +1 forward to their next roll. On a 7-9, they get the benefit, but both of you suffer 1 harm from arcane static shock.',
        stat: 'weird',
      },
      {
        id: 'hex-wise-soul',
        name: 'Wise Soul',
        description: 'When you consult ancient grimoires, forbidden tomes, or forgotten rituals to investigate an arcane mystery, roll +Sharp instead of +Weird. On a 10+, you discover the exact components required to banish or weaken the monster.',
        stat: 'sharp',
      },
    ],
    improvements: [
      'Get +1 Weird (max +3)',
      'Get +1 Charm (max +2)',
      'Get +1 Sharp (max +2)',
      'Take another Hex move',
      'Take another Hex move',
      'Take a move from another playbook',
      'Add an additional Rote to your grimoire',
    ],
    gearChoices: [
      '.38 revolver (2-harm close reload)',
      'Shotgun (3-harm close reload messy)',
      'Athame sacrificial knife (2-harm hand magic)',
      'Shillelagh heavy club (2-harm hand stun)',
      'Crossbow with runed bolts (2-harm close silent)',
      'Staff of arcane focus (2-harm hand magic stun)',
    ],
  },
  {
    id: 'the-host',
    name: 'The Host',
    tagline: 'Two souls, one flesh. An alien entity, demonic passenger, or ancient parasite shares your mind and body.',
    description: 'You share your body with another entity—a parasitic alien, ancient spirit, or biological anomaly. Together you are far deadlier than any lone mortal, but maintaining equilibrium is a never-ending battle.',
    luckSpecial: 'When you spend a point of Luck, something upsets the balance between you and your symbiote (the entity takes control temporarily, hungers intensely, or shuts down at an inopportune moment).',
    statOptions: [
      { charm: 1, cool: 0, sharp: -1, tough: 1, weird: 2 },
      { charm: -1, cool: 1, sharp: 2, tough: 0, weird: 1 },
      { charm: -1, cool: 2, sharp: 1, tough: 1, weird: 0 },
      { charm: -1, cool: -1, sharp: 0, tough: 2, weird: 2 },
      { charm: 1, cool: 1, sharp: 0, tough: -1, weird: 2 },
    ],
    subMechanics: {
      title: 'Symbiosis (Benefits & Downsides)',
      description: 'Benefits (pick 2): Regeneration (heal 1 harm at the start of each scene), Enhanced Senses (+1 to investigate a mystery), Supernatural Physique (deal +1 harm unarmed), Shifting Form (slip through tiny gaps or grow claws), Psychic Resistance (+1 armor against mental attacks). Downsides (pick 1): Ravenous Hunger (craves fresh flesh/emotion), Volatile Moods (frenzy under pressure), Vulnerability (fire/sound/electricity), Unsettling Appearance (-1 Charm with strangers).',
      options: [
        'Benefit: Regeneration (+1 heal/scene)',
        'Benefit: Enhanced Senses (+1 Investigate)',
        'Benefit: Supernatural Physique (+1 harm unarmed)',
        'Benefit: Shifting Form (claws/gaps)',
        'Benefit: Psychic Resistance (+1 mental armor)',
        'Downside: Ravenous Hunger',
        'Downside: Volatile Moods',
        'Downside: Vulnerability (Fire/Sound/Electricity)',
        'Downside: Unsettling Appearance',
      ],
      track: ['Balance: Harmonious', 'Balance: Tense', 'Balance: Symbiote Dominant'],
    },
    moves: [
      {
        id: 'host-defensive-adaptation',
        name: 'Defensive Adaptation (Inherent)',
        description: 'When you come under attack or face mortal peril, your symbiote instinctively manifests an organic defense. Choose your primary adaptation: Silk threads (ensnares attackers and creates ziplines), Acid spray (2-harm close caustic messy), Camouflage (blend completely into backgrounds, roll +Cool to hide in plain sight), Soothe thoughts (suppress fear, pain, and panic for yourself or an ally), Scales (natural 1-armor against blades and projectiles), Whispered advice (take +1 forward when reading a bad situation).',
      },
      {
        id: 'host-mutual-survival',
        name: 'Mutual Survival',
        description: 'When you suffer 4 or more harm from a single attack, your symbiote absorbs the kinetic shock, reducing the harm to 2. Once per mystery, the symbiote can revive you from dying back to 3 harm.',
      },
      {
        id: 'host-balanced-neurochemistry',
        name: 'Balanced Neurochemistry',
        description: 'You and your symbiote have found zen. When you Act Under Pressure to resist supernatural control, charm, or fear, you always take +1 to the roll.',
        stat: 'cool',
      },
      {
        id: 'host-open-your-mind',
        name: 'Open Your Mind',
        description: 'When you let your symbiote telepathically probe an enemy, witness, or environment, roll +Weird. On a 10+, you learn their immediate intentions and greatest vulnerability. On a 7-9, you learn what you need, but the symbiote shares an embarrassing or terrifying memory with them.',
        stat: 'weird',
      },
      {
        id: 'host-predator-and-prey',
        name: 'Predator and Prey',
        description: 'When you hunt or stalk a supernatural quarry, roll +Sharp. On a 10+, hold 2. On a 7-9, hold 1. Spend hold to: track their trail regardless of terrain, corner them with nowhere to run, or surprise them with an ambush for +2 harm forward.',
        stat: 'sharp',
      },
      {
        id: 'host-collaborative-effort',
        name: 'Collaborative Effort',
        description: 'When you and your symbiote coordinate simultaneously in combat, roll +Tough. On a 10+, inflict your unarmed damage (2-harm hand messy) on two targets at once or deal +1 harm and knock your target down. On a 7-9, deal damage as normal, but you leave yourself off-balance.',
        stat: 'tough',
      },
      {
        id: 'host-separation-anxiety',
        name: 'Separation Anxiety',
        description: 'When separated from your symbiote or suppressed by wards, take -1 ongoing to all rolls until reunited. When reunited in the same scene, gain +2 forward and clear 1 harm in a surge of adrenaline.',
      },
    ],
    improvements: [
      'Get +1 Weird (max +3)',
      'Get +1 Tough (max +2)',
      'Get +1 Cool (max +2)',
      'Take another Host move',
      'Take another Host move',
      'Take a move from another playbook',
      'Gain an additional Symbiosis Benefit',
    ],
    gearChoices: [
      'Personal weapon: Concealed switchblade (1-harm hand intimate)',
      'Personal weapon: Heavy tire iron (2-harm hand stun)',
      'Personal weapon: .38 revolver (2-harm close reload)',
      'Personal weapon: Stun gun (1-harm hand stun electrical)',
      'Symbiotic bio-whip (2-harm hand/close grapple)',
      'First aid kit & high-calorie nutrient rations',
    ],
  },
  {
    id: 'the-initiate',
    name: 'The Initiate',
    tagline: 'Sworn to an ancient order, secret society, or esoteric sect that has fought the shadows for centuries.',
    description: 'You are the field agent of an ancient secret society or mystical order. Armed with ancestral traditions, ancient martial disciplines, and cryptic lore, you balance orders from your elders with the brutal realities of hunting in the modern world.',
    luckSpecial: 'When you spend a point of Luck, something goes wrong for your Sect—an ill-advised project, internal schism, or disastrous operation comes back to haunt them.',
    statOptions: [
      { charm: -1, cool: 1, sharp: 0, tough: 1, weird: 2 },
      { charm: 0, cool: 1, sharp: 1, tough: -1, weird: 2 },
      { charm: -1, cool: 0, sharp: -1, tough: 2, weird: 2 },
      { charm: 1, cool: -1, sharp: 1, tough: 0, weird: 2 },
      { charm: 0, cool: 0, sharp: 0, tough: 1, weird: 2 },
    ],
    subMechanics: {
      title: 'Sect Traditions',
      description: 'Good Traditions (pick 2): Ancient Lore (vast occult libraries), Wealthy Patrons (abundant funds/luxury), Hidden Chapterhouses (safe sanctuaries in major cities), Esoteric Relics (vault of artifacts), Martial Training (extensive weapon combat). Bad Traditions (pick 1): Dogmatic Elders (strict hierarchy/punishments), Blood Debts (hostile orders hunting you), Archaic Rituals (elaborate dangerous requests), Closed Minds (refusal of modern tech/allies).',
      options: [
        'Good: Ancient Lore',
        'Good: Wealthy Patrons',
        'Good: Hidden Chapterhouses',
        'Good: Esoteric Relics',
        'Good: Martial Training',
        'Bad: Dogmatic Elders',
        'Bad: Blood Debts',
        'Bad: Archaic Rituals',
        'Bad: Closed Minds',
      ],
      track: ['Standing: Exemplary', 'Standing: Good', 'Standing: Questioned', 'Standing: Censure'],
    },
    moves: [
      {
        id: 'initiate-sect-standing',
        name: 'Sect Standing (Inherent)',
        description: 'When in good standing with your Sect, roll +Charm at the start of each mystery. On a 10+, the Sect provides 2 resources for the hunt (ancient text, specialized weapon, safehouse access, or backup initiate). On a 7-9, they provide 1 resource, but your Elders attach a stringent condition or command you must obey. On a miss, your superiors believe you have strayed and withhold all aid or send an inquisitor.',
        stat: 'charm',
      },
      {
        id: 'initiate-ancient-fighting-arts',
        name: 'Ancient Fighting Arts',
        description: 'When using an archaic or ceremonial melee weapon (sword, spear, mace), you deal +1 harm and can roll +Tough instead of +Cool to Protect Someone.',
        stat: 'tough',
      },
      {
        id: 'initiate-mystic',
        name: 'Mystic',
        description: 'Every time you use magic, you may roll +Weird with a +1 bonus when casting spells taught by your Sect’s secret doctrine.',
        stat: 'weird',
      },
      {
        id: 'initiate-fortunes',
        name: 'Fortunes',
        description: 'When you consult the Sect’s astrolabe, scrying pool, or ancient horoscopes, roll +Sharp. On a 10+, hold 2. On a 7-9, hold 1. Spend hold to ask: Where will the monster strike next? What is the monster’s fatal flaw? Who is about to betray the group?',
        stat: 'sharp',
      },
      {
        id: 'initiate-sacred-oath',
        name: 'Sacred Oath',
        description: 'You have sworn a solemn vow upon the Sect’s altar. Choose one hunter or innocent to protect. While defending them, take +1 armor and +1 forward to Kick Some Ass.',
      },
      {
        id: 'initiate-mentor',
        name: 'Mentor',
        description: 'You have a wise elder or retired master who counsels you. Once per mystery, when you contact your mentor for guidance, they provide a crucial truth about the mystery and grant you +1 forward.',
      },
      {
        id: 'initiate-apprentice',
        name: 'Apprentice',
        description: 'You are assigned a junior initiate to train. The apprentice has 4 harm, provides +1 forward on investigation rolls when assisting you, and can run dangerous errands.',
      },
      {
        id: 'initiate-helping-hand',
        name: 'Helping Hand',
        description: 'When you Help Out another hunter who is acting in alignment with your Sect’s code, they take +2 to their roll on a 10+ instead of +1.',
      },
      {
        id: 'initiate-that-old-black-magic',
        name: 'That Old Black Magic',
        description: 'You have studied the forbidden arts proscribed by your Sect. When you use black magic or blood sorcery, you deal 3-harm area messy to your foes, but suffer 1 harm and risk severe censure from your Elders.',
      },
    ],
    improvements: [
      'Get +1 Weird (max +3)',
      'Get +1 Tough (max +2)',
      'Get +1 Cool (max +2)',
      'Take another Initiate move',
      'Take another Initiate move',
      'Take a move from another playbook',
      'Gain promotion within your Sect hierarchy',
    ],
    gearChoices: [
      'Old-fashioned armour: Chainmail tunic or ringmail hauberk (1-armour heavy)',
      'Old-fashioned weapon: Ceremonial broadsword (3-harm hand heavy)',
      'Old-fashioned weapon: Ritual halberd (3-harm hand/close heavy)',
      'Old-fashioned weapon: Warded rapier (2-harm hand quick piercing)',
      'Old-fashioned weapon: Blessed dagger (2-harm hand holy)',
      'Modern weapon: Concealed 9mm pistol (2-harm close loud)',
      'Modern weapon: Hunting rifle (3-harm far loud)',
      'Modern weapon: Tactical shotgun (3-harm close reload messy)',
    ],
  },
  {
    id: 'the-interface',
    name: 'The Interface',
    tagline: 'Cyborg, augmented operative, or digital consciousness merged with mortal flesh.',
    description: 'You are plugged into the digital and electrical grid, with biometric implants, cyberware, and direct neural interfaces. You battle supernatural entities through cold logic, firewall sorcery, cybernetic precision, and machine code.',
    luckSpecial: 'When you spend a point of Luck, you gain a chance to acquire a significant social connection or high-tech asset (back-alley upgrade, military-grade hardware, or deep-web informant).',
    statOptions: [
      { charm: -1, cool: 1, sharp: 2, tough: 1, weird: 0 },
      { charm: -1, cool: 0, sharp: 2, tough: -1, weird: 2 },
      { charm: -1, cool: 2, sharp: 1, tough: 0, weird: 1 },
      { charm: -1, cool: 1, sharp: 1, tough: 2, weird: 0 },
      { charm: 0, cool: 1, sharp: 2, tough: 1, weird: -1 },
    ],
    subMechanics: {
      title: 'Integration (Upgrades & Faults)',
      description: 'Upgrades (pick 2): Optical Subsystem (thermal/infrared HUD), Biomechanical Reinforcement (natural 1-armor), Subdermal Battery (2-harm stun shock), Overclocked Processor (+1 Sharp calculating/hacking), High-Frequency Comm Link. Faults (pick 2): Glitchy Firmware, EMP Vulnerability (+1 harm from electrical), Constant Broadcast (monsters sense you), Cold Demeanor (-1 Charm comforting), Battery Drain.',
      options: [
        'Upgrade: Optical Subsystem',
        'Upgrade: Biomechanical Reinforcement',
        'Upgrade: Subdermal Battery',
        'Upgrade: Overclocked Processor',
        'Upgrade: High-Frequency Comm Link',
        'Fault: Glitchy Firmware',
        'Fault: EMP Vulnerability',
        'Fault: Constant Broadcast',
        'Fault: Cold Demeanor',
        'Fault: Battery Drain',
      ],
      track: ['System Integrity: 100%', 'System Integrity: 75%', 'System Integrity: 50% (Glitched)', 'System Integrity: 25% (Critical)'],
    },
    moves: [
      {
        id: 'interface-technomancer',
        name: 'Technomancer',
        description: 'When you combine computer code, algorithms, and esoteric occult symbols to hack magical wards or supernatural electronic manifestations, roll +Sharp. On a 10+, you disrupt or take command of the magical phenomenon. On a 7-9, you suppress it temporarily, but suffer an arcane feedback glitch.',
        stat: 'sharp',
      },
      {
        id: 'interface-expert-troll',
        name: 'Expert Troll',
        description: 'When you manipulate, provoke, or taunt someone (or a sentient demon/monster) using digital communication, loudspeakers, or burner lines, roll +Cool. On a 10+, they rush straight into your prepared trap or reveal their plan. On a 7-9, they focus entirely on killing you, ignoring everyone else.',
        stat: 'cool',
      },
      {
        id: 'interface-keep-going-and-going',
        name: 'Keep Going and Going',
        description: 'Your cybernetic chassis powers through injury. You ignore the -1 penalty for unstable or serious harm, and you cannot be stunned or rendered unconscious by mundane pain.',
      },
      {
        id: 'interface-take-the-shot',
        name: 'Take the Shot',
        description: 'When you use target-tracking telemetry to line up a shot with a ranged weapon against an oblivious or stationary target, roll +Sharp instead of +Cool or +Tough. On a 10+, inflict +2 harm and ignore armor. On a 7-9, inflict +1 harm.',
        stat: 'sharp',
      },
      {
        id: 'interface-hack-the-planet',
        name: 'Hack the Planet',
        description: 'When you breach high-security mainframes, traffic grids, satellite surveillance, or secure military databases, roll +Sharp. On a 10+, you gain unrestricted administrative access, camera feeds, or building blueprints. On a 7-9, you get what you need, but leave a digital footprint that alerts corporate or federal security.',
        stat: 'sharp',
      },
      {
        id: 'interface-virus-whisperer',
        name: 'Virus Whisperer',
        description: 'You can inject destructive counter-frequencies or logic bombs into digital entities, tech-demons, or automated defense rigs. Roll +Sharp. On a 10+, you disable or destroy the entity immediately. On a 7-9, you disable it, but your own implants lock up for 1 minute.',
        stat: 'sharp',
      },
    ],
    improvements: [
      'Get +1 Sharp (max +3)',
      'Get +1 Cool (max +2)',
      'Get +1 Tough (max +2)',
      'Take another Interface move',
      'Take another Interface move',
      'Take a move from another playbook',
      'Add an additional cybernetic Upgrade',
    ],
    gearChoices: [
      'Internal Computer (integrated optical HUD, biometric monitor, cellular uplink)',
      'Tactical Armour: Subdermal ceramic weave or Kevlar mesh jacket (1-armour light concealed)',
      'Machine: Combat drone with micro-camera and audio scanner',
      'Weapon: Smart-linked suppressed pistol (2-harm close silent reliable)',
      'Weapon: Overclocked electromagnetic rifle (3-harm far heavy electrical)',
      'Quality of life: Cyber-repair tool kit, portable power pack, neural dampener',
    ],
  },
  {
    id: 'the-pararomantic',
    name: 'The Pararomantic',
    tagline: 'You fell in love with a monster. Now your romance walks the razor’s edge between passion and horror.',
    description: 'You are romantically bonded with an otherworldly entity: a vampire prince, werewolf alpha, demon consort, faerie noble, or benevolent phantom. Your bond is your greatest source of power—and your most dangerous vulnerability.',
    luckSpecial: 'When you spend a point of Luck, mark off a box on your Relationship Status track toward Broken; the Keeper brings the tragic Fate of your Love into immediate play.',
    statOptions: [
      { charm: 2, cool: 1, sharp: 0, tough: -1, weird: 1 },
      { charm: 2, cool: -1, sharp: 1, tough: 1, weird: 0 },
      { charm: 2, cool: 2, sharp: 0, tough: 0, weird: -1 },
      { charm: 2, cool: 1, sharp: 1, tough: -1, weird: 0 },
      { charm: 2, cool: 0, sharp: 2, tough: -1, weird: 0 },
    ],
    subMechanics: {
      title: 'Relationship Status Track',
      description: 'Relationship Status track: [Loving] -> [Strained] -> [Rocky] -> [Bitter] -> [Broken]. When loving, your guide risks everything for you. When broken, your bond turns into bitter tragedy or enmity until redeemed.',
      options: [
        'Guide Archetype: Vampire Prince / Noble',
        'Guide Archetype: Werewolf Alpha / Packmate',
        'Guide Archetype: Demon Consort',
        'Guide Archetype: Faerie Courtier',
        'Guide Archetype: Ancient Phantom',
      ],
      track: ['Loving (Harmonious)', 'Strained (Tension)', 'Rocky (Conflict)', 'Bitter (Rift)', 'Broken (Hostile)'],
    },
    moves: [
      {
        id: 'pararomantic-supernatural-guide',
        name: 'Supernatural Guide (Inherent)',
        description: 'Your lover is a powerful monster or supernatural being who guides and aids you. When you call upon your guide for mystical aid or advice, roll +Charm instead of +Weird. On a 10+, they arrive or intervene decisively. On a 7-9, they intervene, but their monstrous nature causes complications or they demand a steep emotional price. (Bond Abuse: If you exploit your guide’s affection or treat them as a disposable tool, mark a step toward Broken on the Relationship Status track).',
        stat: 'charm',
      },
      {
        id: 'pararomantic-bonding-time',
        name: 'Bonding Time',
        description: 'When you spend quiet, intimate time reconnecting with your supernatural guide during downtime, heal 2 harm each and restore one step on your Relationship Status track toward Loving.',
      },
      {
        id: 'pararomantic-dark-desires',
        name: 'Dark Desires',
        description: 'When you give in to your guide’s monstrous advice or dark impulses, take +1 forward to your next roll and mark 1 experience.',
      },
      {
        id: 'pararomantic-the-power-of-love',
        name: 'The Power of Love',
        description: 'When you protect your guide from danger, or your guide protects you, roll +Charm. On a 10+, both of you take 0 harm and take +1 forward against the attacker. On a 7-9, you reduce incoming harm by 2.',
        stat: 'charm',
      },
      {
        id: 'pararomantic-do-as-the-supernatural-do',
        name: 'Do As The Supernatural Do',
        description: 'You have learned tricks from your monstrous lover. Pick one supernatural ability matching your guide: Fangs & claws (2-harm hand messy), Night vision, Glamour disguise, or Superhuman agility. You can use this ability at will.',
      },
      {
        id: 'pararomantic-i-am-theirs-and-they-are-mine',
        name: 'I Am Theirs And They Are Mine',
        description: 'Other monsters sense your lover’s mark upon your soul. Lesser monsters hesitate to attack you without provocation, and you take +1 to Manipulate Someone when dealing with creatures of your lover’s faction.',
      },
      {
        id: 'pararomantic-monster-empathy',
        name: 'Monster Empathy',
        description: 'When you attempt to understand a monster’s true desires, motives, or grievances, roll +Charm. On a 10+, the Keeper tells you what would appease them or cause them to stand down peacefully. On a 7-9, you discover what they want, but reveal something deeply personal about yourself in the process.',
        stat: 'charm',
      },
      {
        id: 'pararomantic-spirit-touched',
        name: 'Spirit Touched',
        description: 'Your lover’s otherworldly essence protects your mind. You are immune to fear, hypnosis, and supernatural mind control from other creatures.',
      },
    ],
    improvements: [
      'Get +1 Charm (max +3)',
      'Get +1 Cool (max +2)',
      'Get +1 Sharp (max +2)',
      'Take another Pararomantic move',
      'Take another Pararomantic move',
      'Take a move from another playbook',
      'Deepen your bond with your Supernatural Guide',
    ],
    gearChoices: [
      'Normal gear: Practical clothes, smartphone, first aid pouch, pocketknife (1-harm hand)',
      'Vehicle: Dependable coupe, vintage convertible, or sturdy station wagon',
      'Guide gift: Preserved body part (fang, feather, or rune bone talisman)',
      'Guide gift: Enchanted jewelry (silver ring that hums near danger)',
      'Guide gift: Keepsake memento (locket with portrait, dried enchanted flower)',
      'Guide gift: Antique weapon (silver-inlaid rapier or heirloom pistol: 2-harm close magic)',
    ],
  },
  {
    id: 'the-searcher',
    name: 'The Searcher',
    tagline: 'You experienced something impossible that society calls a delusion. Now you won’t rest until you prove the truth.',
    description: 'You saw something that shattered your worldview—an abduction, cryptid encounter, or psychic rupture. Everyone said you were crazy, but you know what you saw. You hunt to gather irrefutable proof and find answers.',
    luckSpecial: 'When you spend a point of Luck, your First Encounter comes up in play—a sudden flashback, an echo of the original phenomenon, or the return of the entity that changed your life.',
    statOptions: [
      { charm: 0, cool: 1, sharp: 1, tough: -1, weird: 2 },
      { charm: 1, cool: -1, sharp: 1, tough: 0, weird: 2 },
      { charm: 0, cool: -1, sharp: 2, tough: 0, weird: 2 },
      { charm: 0, cool: 1, sharp: 2, tough: -1, weird: 1 },
      { charm: 1, cool: 0, sharp: 2, tough: -1, weird: 1 },
    ],
    subMechanics: {
      title: 'First Encounter Category',
      description: 'Choose your First Encounter: Cryptid Sighting, Zone of Strangeness, Psychic Event, Higher power, Strange Dangers, Abduction, Cosmic Insight. Whenever you encounter related phenomena, roll +Weird to gain vital insight.',
      options: [
        'Cryptid Sighting (Bigfoot / Mothman / Leviathan)',
        'Zone of Strangeness (Bermuda triangle / Rift)',
        'Psychic Event (Telekinesis / Mediumship)',
        'Higher power (Angel / Deity / Cosmic Will)',
        'Strange Dangers (Spontaneous anomaly / Poltergeist)',
        'Abduction (Extraterrestrial / Dimensional)',
        'Cosmic Insight (Multiverse revelation)',
      ],
      track: ['Obsession: Grounded', 'Obsession: Fixated', 'Obsession: Consumed by the Truth'],
    },
    moves: [
      {
        id: 'searcher-first-encounter',
        name: 'First Encounter (Inherent)',
        description: 'Choose the nature of the encounter that started your search: Cryptid Sighting, Zone of Strangeness, Psychic Event, Higher power, Strange Dangers, Abduction, Cosmic Insight. Whenever you encounter related phenomena, roll +Weird. On a 10+, ask the Keeper 2 questions about the entity’s origin or purpose; take +1 forward when acting on the answers. On a 7-9, ask 1 question, but you experience an intense sensory flashback.',
        stat: 'weird',
      },
      {
        id: 'searcher-prepared-to-defend',
        name: 'Prepared to Defend',
        description: 'When you fight back against a monster that resembles your First Encounter or is trying to abduct or intimidate you, you inflict +1 harm and gain +1 armor against its attacks.',
      },
      {
        id: 'searcher-fellow-believer',
        name: 'Fellow Believer',
        description: 'When you reach out to amateur researchers, cryptid enthusiasts, UFOlogists, or fringe bloggers, roll +Charm. On a 10+, they provide verified evidence, specialized gear, or local lodging without asking questions. On a 7-9, they help, but their eccentricities create an unwanted scene.',
        stat: 'charm',
      },
      {
        id: 'searcher-guardian',
        name: 'Guardian',
        description: 'When you throw yourself between a terrified civilian and a terrifying monster to prove they aren’t crazy, roll +Cool. On a 10+, you draw the creature’s wrath away and protect the bystander completely. On a 7-9, the bystander escapes, but you take the monster’s hit.',
        stat: 'cool',
      },
      {
        id: 'searcher-just-another-day',
        name: 'Just Another Day',
        description: 'You’ve witnessed impossible horrors before. You are immune to panic and fright effects caused by supernatural apparitions or cosmic dread.',
      },
      {
        id: 'searcher-network',
        name: 'Network',
        description: 'You run an online forum or hotline for supernatural sightings. At the start of a mystery, roll +Sharp. On a 10+, your network delivers 2 reliable tips about where the monster was last spotted. On a 7-9, you get 1 tip, but it includes false or sensationalized details.',
        stat: 'sharp',
      },
      {
        id: 'searcher-ockhams-broadsword',
        name: 'Ockham’s Broadsword',
        description: 'When you analyze clues and deliberately reject mundane explanations in favor of the wildest occult reality, roll +Sharp. On a 10+, you deduce the monster’s weakness or nest location. On a 7-9, you uncover the truth, but draw its attention to your investigation.',
        stat: 'sharp',
      },
      {
        id: 'searcher-the-things-ive-seen',
        name: 'The Things I’ve Seen',
        description: 'When you recount your traumatic encounter to comfort or steady someone else who just saw something unnatural, roll +Charm. On a 10+, they calm down completely, clear all panic, and tell you everything they saw. On a 7-9, they calm down, but demand to stay by your side for protection.',
        stat: 'charm',
      },
    ],
    improvements: [
      'Get +1 Sharp (max +3)',
      'Get +1 Weird (max +2)',
      'Get +1 Cool (max +2)',
      'Take another Searcher move',
      'Take another Searcher move',
      'Take a move from another playbook',
      'Find irrefutable physical proof of your First Encounter',
    ],
    gearChoices: [
      'Laptop with encrypted research files & high-gain field recorder',
      'Investigation tool: EMF meter & thermal imaging camera',
      'Investigation tool: Night vision goggles & UV blacklight kit',
      'Investigation tool: Geiger counter & soil/DNA sample collection kit',
      'Self-defense: Taser gun (1-harm hand/close stun electrical)',
      'Self-defense: .38 snub-nosed revolver (2-harm close reload)',
      'Self-defense: Stun baton (1-harm hand stun)',
      'Self-defense: Bear pepper spray (1-harm close stun area)',
    ],
  },
  {
    id: 'the-snoop',
    name: 'The Snoop',
    tagline: 'Investigative journalist, true-crime documentarian, or viral streaming muckraker hunting the greatest scoop of all time.',
    description: 'You point cameras and boom mics at the shadows. Whether shooting a documentary, running an indie news outlet, or hosting a paranormal podcast, you know how to interview suspects, break stories, and record monsters in 4K.',
    luckSpecial: 'When you spend a point of Luck, technical difficulties, breakdowns, and communication errors disrupt your broadcasts and equipment at the worst time.',
    statOptions: [
      { charm: 2, cool: -1, sharp: 1, tough: 0, weird: 1 },
      { charm: 2, cool: 0, sharp: 1, tough: -1, weird: 1 },
      { charm: 2, cool: 1, sharp: 1, tough: 0, weird: -1 },
      { charm: 2, cool: -1, sharp: 2, tough: -1, weird: 0 },
      { charm: 2, cool: 1, sharp: 0, tough: -1, weird: 1 },
    ],
    subMechanics: {
      title: 'The Crew',
      description: 'You travel with up to 3 crew members or party members (Camera Operator, Sound Tech, Producer, Intern, or Fellow Hunter). When a crew member assists you on an investigation or interview move, take +1 forward.',
      options: [
        'Crew Member 1: Camera Operator (4 Harm)',
        'Crew Member 2: Sound Technician (4 Harm)',
        'Crew Member 3: Field Producer / Intern (4 Harm)',
      ],
      track: ['Media Buzz: Local Scoop', 'Media Buzz: Viral Video', 'Media Buzz: National Headline'],
    },
    moves: [
      {
        id: 'snoop-what-does-that-feel-like',
        name: '“What Does That Feel Like?”',
        description: 'When you interview a victim, witness, or bystander in the middle of a traumatic supernatural aftermath, roll +Charm. On a 10+, they pour their heart out, revealing a hidden truth or clue that they hid from authorities. On a 7-9, they open up, but break down emotionally or demand off-the-record confidentiality.',
        stat: 'charm',
      },
      {
        id: 'snoop-minor-celebrity',
        name: 'Minor Celebrity',
        description: 'You are recognized from your broadcasts, podcast, or reporting. When you use your notoriety to talk your way past security, police cordons, or bouncers, roll +Charm. On a 10+, they let you and your crew right through. On a 7-9, they let you in, but assign an escort to watch you.',
        stat: 'charm',
      },
      {
        id: 'snoop-well-fix-it-in-post',
        name: 'We’ll Fix It In Post',
        description: 'When you or an ally makes a mistake during a tense conversation or confrontation, you can play it off as a planned bit or technical glitch. Roll +Cool. On a 10+, erase the social blunder and take +1 forward. On a 7-9, they buy it, but demand you stop filming immediately.',
        stat: 'cool',
      },
      {
        id: 'snoop-press-accreditation',
        name: 'Press Accreditation',
        description: 'You carry press badges, diplomatic media credentials, or convincing forge passes. You can access government crime scenes, press conferences, and restricted archives without suspicion.',
      },
      {
        id: 'snoop-truthiness',
        name: 'Truthiness',
        description: 'When you Manipulate Someone using edited footage, suggestive headlines, or high-pressure journalistic traps, roll +Sharp instead of +Charm.',
        stat: 'sharp',
      },
      {
        id: 'snoop-the-mojo-wire',
        name: 'The Mojo Wire',
        description: 'You always have live data feeds running to your followers or editorial desk. When you broadcast live footage of a supernatural event, roll +Charm. On a 10+, your audience crowd-sources the answer, immediately identifying a monster’s weakness or history. On a 7-9, they provide the clue, but your broadcast tips off hostile agents or the monster itself.',
        stat: 'charm',
      },
      {
        id: 'snoop-relaxed-producer',
        name: 'Relaxed Producer',
        description: 'You have a cool-headed backer or field producer who keeps supplies flowing. Once per mystery, when your team needs transport, bail money, or specialized equipment, your producer delivers it within the hour.',
      },
    ],
    improvements: [
      'Get +1 Charm (max +3)',
      'Get +1 Sharp (max +2)',
      'Get +1 Cool (max +2)',
      'Take another Snoop move',
      'Take another Snoop move',
      'Take a move from another playbook',
      'Gain high-tier national syndicated broadcasting clearance',
    ],
    gearChoices: [
      'Recording device: 4K shoulder cinema camcorder',
      'Recording device: Hidden body-cam sunglasses & pocket audio recorder',
      'Recording device: Drone with 4K thermal camera & boom mic',
      'Detector: Ghost box / Spirit radio scanner & ultrasonic detector',
      'Detector: High-precision laser thermometer & RF scanner',
      'Subtle weapon: Pepper-spray pen (1-harm hand intimate stun)',
      'Subtle weapon: Heavy aluminum boom pole (2-harm hand/close stun)',
      'Subtle weapon: Compact .32 pocket pistol (2-harm close concealable)',
    ],
  },
  {
    id: 'the-spell-slinger',
    name: 'The Spell-Slinger',
    tagline: 'A wizard whose spells are explosive, kinetic, and built to blow monsters back to hell.',
    description: 'You don’t sit in dust-covered libraries reciting five-hour rituals. You slather raw magical firepower onto the front lines, hurling blasts of fire, lightning bolts, and force barriers with combat wizardry.',
    luckSpecial: 'When you spend a point of Luck, the Council of Wizards pokes their nose into your business, demanding explanations or threatening to revoke your sanction.',
    statOptions: [
      { charm: -1, cool: 1, sharp: 1, tough: 0, weird: 2 },
      { charm: 0, cool: -1, sharp: 1, tough: 1, weird: 2 },
      { charm: -1, cool: 0, sharp: 2, tough: -1, weird: 2 },
      { charm: 1, cool: 0, sharp: 1, tough: -1, weird: 2 },
      { charm: 0, cool: 0, sharp: 1, tough: 0, weird: 2 },
    ],
    subMechanics: {
      title: 'Combat Magic (Bases & Effects)',
      description: 'Pick 3 Combat Magic forms (mix of Bases and Effects). Bases: Blast (2-harm close loud magic), Ball (1-harm close area loud messy magic), Missile (1-harm far magic), Wall (1-harm close 1-armor barrier magic). Effects: Fire (+2 harm fire), Force/Wind (forceful, stunning), Lightning/Entropy (+1 harm, ignores armor, messy), Frost/Ice (frost, restraining), Earth (+1 harm, piercing, crushing), Necromantic (life-draining, unholy).',
      options: [
        'Base: Blast (2-harm close loud)',
        'Base: Ball (1-harm close area messy)',
        'Base: Missile (1-harm far)',
        'Base: Wall (1-harm barrier 1-armor)',
        'Effect: Fire (+2 harm fire)',
        'Effect: Force/Wind (forceful stun)',
        'Effect: Lightning/Entropy (piercing messy)',
        'Effect: Frost/Ice (restraining)',
        'Effect: Earth (+1 harm piercing)',
        'Effect: Necromantic (draining unholy)',
      ],
      track: ['Concentration: Clear', 'Concentration: Strained', 'Concentration: Arcane Burnout'],
    },
    moves: [
      {
        id: 'spell-slinger-tools-and-techniques',
        name: 'Tools and Techniques (Inherent)',
        description: 'To cast your Combat Magic, you normally require: Consumables (powders, herbs, chalk), Foci (wand, staff, rings), Gestures (somatic finger motions), and Incantations (verbal power words). Choose one to CROSS OFF—you do not need that requirement to cast. If you are deprived of any of your remaining requirements, take -1 ongoing to Combat Magic rolls.',
      },
      {
        id: 'spell-slinger-advanced-arcane-training',
        name: 'Advanced Arcane Training',
        description: 'Pick two additional Combat Magic bases or effects to add to your repertoire.',
      },
      {
        id: 'spell-slinger-arcane-reputation',
        name: 'Arcane Reputation',
        description: 'Other practitioners, magical beings, and occult societies recognize your destructive prowess. Take +1 to Manipulate Someone when intimidating supernatural entities.',
      },
      {
        id: 'spell-slinger-couldve-been-worse',
        name: 'Could’ve Been Worse',
        description: 'When you suffer spell backlash or roll a miss on Use Magic, you can choose to take 1 harm yourself rather than letting the magic spin wildly out of control or endanger allies.',
      },
      {
        id: 'spell-slinger-enchanted-clothing',
        name: 'Enchanted Clothing',
        description: 'You wear clothing, robes, or a leather duster woven with protective wards that grant you 1-armor against all magical, elemental, and monster attacks.',
      },
      {
        id: 'spell-slinger-forensic-divination',
        name: 'Forensic Divination',
        description: 'When you examine a crime scene or monster residue with your magical senses, roll +Weird instead of +Sharp to Investigate a Mystery.',
        stat: 'weird',
      },
      {
        id: 'spell-slinger-go-big-or-go-home',
        name: 'Go Big or Go Home',
        description: 'When you push your Combat Magic to maximum power, you may declare it before rolling. On a 10+, your spell inflicts +2 harm and gains the messy tag. On a 7-9, you inflict +2 harm, but also suffer 1 harm from magical feedback.',
      },
      {
        id: 'spell-slinger-not-my-fault',
        name: 'Not My Fault',
        description: 'When your explosive magic destroys civilian property, vehicles, or scenery, take +1 forward when Act Under Pressure to escape the blast or cover your tracks from authorities.',
        stat: 'cool',
      },
      {
        id: 'spell-slinger-practitioner',
        name: 'Practitioner',
        description: 'You have mastered formal ritual magic. When you Use Magic to perform standard ritual effects (communicate with spirits, create wards, scry), you take +1 to the roll.',
        stat: 'weird',
      },
      {
        id: 'spell-slinger-shield-spell',
        name: 'Shield Spell',
        description: 'When you concentrate to cast an invisible shield of kinetic energy to Protect Someone, roll +Weird. On a 10+, the target takes 0 harm and any ranged projectiles are deflected back at the attacker. On a 7-9, reduce incoming harm by 2.',
        stat: 'weird',
      },
      {
        id: 'spell-slinger-third-eye',
        name: 'Third Eye',
        description: 'You can open your inner psychic eye to perceive invisible entities, glamours, emotional auras, and planar breaches. While active, take +1 Sharp, but take -1 to resist psychic shocks.',
        stat: 'sharp',
      },
    ],
    improvements: [
      'Get +1 Weird (max +3)',
      'Get +1 Cool (max +2)',
      'Get +1 Sharp (max +2)',
      'Take another Spell-Slinger move',
      'Take another Spell-Slinger move',
      'Take a move from another playbook',
      'Gain mastery of an ancient elemental grimoire',
    ],
    gearChoices: [
      'Backup weapon: Old revolver (.38 special: 2-harm close reload)',
      'Backup weapon: Ritual knife (2-harm hand magic)',
      'Backup weapon: Heirloom sword (3-harm hand heavy)',
      'Wizardly focus: Carved wand of elder wood & silver ring foci',
      'Wizardly reagents: Runed pouch with chalk, salt, incense, and sulphur',
    ],
  },
  {
    id: 'the-spooktacular',
    name: 'The Spooktacular',
    tagline: 'Carnival barker, sideshow performer, or wandering illusionist whose parlor tricks are a little too real.',
    description: 'You spent your life with the traveling carnival, circus sideshow, or dark carnival freak show. You know how to hustle a crowd, pocket a watch, and invoke ancient spirits under the big top.',
    luckSpecial: 'When you spend a point of Luck, you run into someone you met at the Show—an old carnival performer, an aggrieved customer, or a supernatural creature from the midway.',
    statOptions: [
      { charm: 2, cool: -1, sharp: 1, tough: 0, weird: 1 },
      { charm: 2, cool: 1, sharp: 0, tough: -1, weird: 1 },
      { charm: 2, cool: 0, sharp: -1, tough: -1, weird: 2 },
      { charm: 1, cool: 0, sharp: -1, tough: 1, weird: 2 },
      { charm: 1, cool: 1, sharp: 0, tough: -1, weird: 2 },
    ],
    subMechanics: {
      title: 'The Show Specialty',
      description: 'Choose your carnival specialty: Infernal Power (3-box track; spend 1 box to add +1 to any roll or manifest hellfire), Magic & Illusions (sleight of hand and hypnosis), Making Money (hustling and reading marks), Problem Solvers (strongmen and brawlers), Supernatural Creatures (cryptid tamer).',
      options: [
        'Specialty: Infernal Power',
        'Specialty: Magic & Illusions',
        'Specialty: Making Money',
        'Specialty: Problem Solvers',
        'Specialty: Supernatural Creatures',
      ],
      track: ['Infernal Power Box 1', 'Infernal Power Box 2', 'Infernal Power Box 3'],
    },
    moves: [
      {
        id: 'spooktacular-put-on-a-show',
        name: 'Put On A Show',
        description: 'When you create a loud, dazzling distraction or stage performance to captivate a monster or crowd, roll +Charm. On a 10+, everyone in the area is hypnotized and immobilized for as long as you maintain the performance. On a 7-9, you hold their attention, but someone suspicious circles around your blind spot.',
        stat: 'charm',
      },
      {
        id: 'spooktacular-a-negligible-price',
        name: 'A Negligible Price',
        description: 'When you make a deal or wager with a supernatural creature or mortal NPC, roll +Charm. On a 10+, they agree to terms advantageous to you without realizing the hidden catch. On a 7-9, the deal holds, but they demand a bizarre collateral.',
        stat: 'charm',
      },
      {
        id: 'spooktacular-easygoin',
        name: 'Easygoin’',
        description: 'You’ve lived on the road and seen it all. When you Act Under Pressure to keep your cool amidst total pandemonium, roll +Charm instead of +Cool.',
        stat: 'charm',
      },
      {
        id: 'spooktacular-pay-it-backward',
        name: 'Pay It Backward',
        description: 'When someone helps you or does you a good turn, you can promise them future carnival fortune. When you fulfill that promise later in the mystery, mark 1 experience and take +1 forward.',
      },
      {
        id: 'spooktacular-the-old-crew',
        name: 'The Old Crew',
        description: 'You can call in favors from carnies, grifters, and roadside fortune tellers. Once per mystery, roll +Sharp to summon an old friend from the circuit who brings lockpicks, counterfeit IDs, or escape transport.',
        stat: 'sharp',
      },
      {
        id: 'spooktacular-the-game-is-fixed',
        name: 'The Game Is Fixed',
        description: 'When you enter a contest, fight, or gamble where the rules are supposedly fair, roll +Cool. On a 10+, you secretly rig the outcome in your favor before anyone notices. On a 7-9, you rig it, but a spectator notices your sleight of hand.',
        stat: 'cool',
      },
    ],
    improvements: [
      'Get +1 Charm (max +3)',
      'Get +1 Cool (max +2)',
      'Get +1 Weird (max +2)',
      'Take another Spooktacular move',
      'Take another Spooktacular move',
      'Take a move from another playbook',
      'Gain your own traveling sideshow troupe or mobile carnival truck',
    ],
    gearChoices: [
      'Camp tool: Heavy mallet or iron tent stake (2-harm hand stun heavy)',
      'Camp tool: Razor sharp throwing knives (2-harm close quick)',
      'Camp tool: Weighted leather whip (1-harm hand/close grapple)',
      'Vehicle: Beat-up carnival station wagon, vintage caravan trailer, or pickup',
      'Mystical item: Fortune teller’s crystal ball or haunted deck of tarot cards',
      'Paraphernalia: Flash powder, smoke pellets, trick handcuffs, carnival tokens',
    ],
  },
  {
    id: 'the-visitor',
    name: 'The Visitor',
    tagline: 'You come from beyond the stars, another dimension, or an ancient subterranean world.',
    description: 'You are an alien exile, interdimensional traveler, or lost explorer living on Earth. Human customs baffle you, but your alien physiology, cosmic perspective, and exotic technology make you an incredible ally against terrors that humans cannot fathom.',
    luckSpecial: 'When you spend a point of Luck, a cultural exchange occurs—an Earthling learns a profound or terrifying truth about your home world, or you adopt a strange human habit that creates an unexpected bond.',
    statOptions: [
      { charm: -2, cool: 1, sharp: 1, tough: 0, weird: 3 },
      { charm: 1, cool: 0, sharp: -2, tough: 3, weird: 1 },
      { charm: 0, cool: 1, sharp: 3, tough: 1, weird: -2 },
      { charm: 1, cool: 3, sharp: 1, tough: -2, weird: 0 },
      { charm: 3, cool: -2, sharp: 0, tough: 1, weird: 1 },
    ],
    subMechanics: {
      title: 'Expatriation Details',
      description: 'Home culture traits: Silicon hive mind, hyper-logical utopia, warrior clan, or astral dream-weavers. Why you left: Shipwrecked, exiled, scouting mission, or fleeing cataclysm. Why you stayed: Fascinated by human art/emotion, stranded with no fuel, or sworn to protect Earth.',
      options: [
        'Home: Silicon Hive Mind',
        'Home: Hyper-Logical Utopia',
        'Home: Warrior Clan of Orion',
        'Home: Astral Dream-Weavers',
        'Why Left: Shipwrecked',
        'Why Left: Exiled for research',
        'Why Left: Scouting expedition',
        'Why Stayed: Enamored with Humanity',
        'Why Stayed: Stranded (No fuel)',
        'Why Stayed: Earth Guardian vow',
      ],
      track: ['Assimilation: Alien Outcast', 'Assimilation: Quirky Resident', 'Assimilation: Honorary Human'],
    },
    moves: [
      {
        id: 'visitor-something-strange',
        name: 'Something Strange',
        description: 'Your natural alien presence warps mundane physics. You can telepathically project basic emotions, hover slightly above the floor, or emit biological glow at will.',
      },
      {
        id: 'visitor-always-learning',
        name: 'Always Learning',
        description: 'When you ask a human companion to explain an unfamiliar Earth custom, concept, or emotion, both of you take +1 forward on your next collaborative move.',
      },
      {
        id: 'visitor-being-neighbourly',
        name: 'Being Neighbourly',
        description: 'When you attempt to assimilate or charm humans using overly polite, quirky alien etiquette, roll +Charm. On a 10+, they find you wonderfully eccentric and invite you in, offering hospitality and protection. On a 7-9, they accept you, but ask awkward questions about your origin.',
        stat: 'charm',
      },
      {
        id: 'visitor-different-world-different-rules',
        name: 'Different World Different Rules',
        description: 'When you apply the alien laws of physics or logic from your home dimension to analyze a supernatural anomaly, roll +Weird instead of +Sharp to Investigate a Mystery.',
        stat: 'weird',
      },
      {
        id: 'visitor-taste-of-home',
        name: 'Taste of Home',
        description: 'You have a stash of alien rations, atmospheric vials, or psychotronic crystals. Once per mystery, consuming a taste of home immediately clears 2 harm and stabilizes your condition.',
      },
      {
        id: 'visitor-alien-anatomy',
        name: 'Alien Anatomy',
        description: 'Your internal organs and biology are bizarre. You have natural 1-armor against mundane piercing and poison attacks, and you do not breathe oxygen or suffer from human illnesses.',
      },
      {
        id: 'visitor-otherworldly-techniques',
        name: 'Otherworldly Techniques',
        description: 'In combat, you can activate your personal phase-shifter or gravity manipulation. Roll +Weird. On a 10+, you teleport short distances or pin an enemy to the floor with gravity. On a 7-9, it works, but shorts out until you can recalibrate it.',
        stat: 'weird',
      },
    ],
    improvements: [
      'Get +1 Weird (max +3)',
      'Get +1 Tough (max +2)',
      'Get +1 Cool (max +2)',
      'Take another Visitor move',
      'Take another Visitor move',
      'Take a move from another playbook',
      'Repair or recover a working piece of your spacecraft',
    ],
    gearChoices: [
      'Broken vessel: Crashed scout pod hidden in the woods or cloaked escape capsule',
      'Alien gear: Universal molecular translator',
      'Alien gear: Holographic camouflage emitter',
      'Alien gear: Neural memory scanner',
      'Alien gear: Anti-grav levitation harness',
      'Alien weapon: Plasma sidearm (3-harm close energy loud)',
      'Alien weapon: Sonic stunner (1-harm close stun non-lethal)',
      'Alien weapon: Monomolecular light-blade (3-harm hand messy piercing)',
      'Local gear: Oversized sunglasses and duster coat & Earth smartphone',
      'Local gear: Bicycle or vintage moped & bag of human junk food',
    ],
  },
];

export const PLAYBOOKS_DATA: PlaybookDefinition[] = PLAYBOOKS;

/**
 * Automated Playbook Integrity Validator
 * Runs on module load to guarantee all 28 canonical playbooks meet MotW system standards.
 */
export function validatePlaybookIntegrity(playbooks: PlaybookDefinition[]): boolean {
  const issues: string[] = [];

  if (playbooks.length !== 28) {
    issues.push(`Expected 28 canonical playbooks, but found ${playbooks.length}`);
  }

  playbooks.forEach((p) => {
    // Exactly 5 valid rating lines
    if (!Array.isArray(p.statOptions) || p.statOptions.length !== 5) {
      issues.push(`[${p.name}] Must have exactly 5 stat options lines (found ${p.statOptions?.length || 0})`);
    } else {
      p.statOptions.forEach((s, idx) => {
        if (
          typeof s.charm !== 'number' ||
          typeof s.cool !== 'number' ||
          typeof s.sharp !== 'number' ||
          typeof s.tough !== 'number' ||
          typeof s.weird !== 'number'
        ) {
          issues.push(`[${p.name}] Stat option line ${idx + 1} has invalid ratings`);
        }
      });
    }

    // Non-empty moves array where every move has a name and description
    if (!Array.isArray(p.moves) || p.moves.length === 0) {
      issues.push(`[${p.name}] Must have a non-empty moves array`);
    } else {
      p.moves.forEach((m, idx) => {
        if (!m.name || !m.name.trim()) {
          issues.push(`[${p.name}] Move at index ${idx} is missing a name`);
        }
        if (!m.description || !m.description.trim()) {
          issues.push(`[${p.name}] Move "${m.name || idx}" is missing a description`);
        }
      });
    }

    // Defined luck special text
    if (!p.luckSpecial || typeof p.luckSpecial !== 'string' || !p.luckSpecial.trim()) {
      issues.push(`[${p.name}] Must have defined luck special text`);
    }

    // Starting gear lists
    if (!Array.isArray(p.gearChoices) || p.gearChoices.length === 0) {
      issues.push(`[${p.name}] Must have a non-empty starting gear list`);
    }
  });

  if (issues.length > 0) {
    console.warn('[MOTW Companion] Playbook integrity verification warnings:\n' + issues.join('\n'));
    return false;
  }

  console.log('[MOTW Companion] All 28 playbooks verified successfully.');
  return true;
}

// Execute once on load
validatePlaybookIntegrity(PLAYBOOKS);

