import { PlaybookDefinition } from '../types/motw';
import { UNIVERSAL_ADVANCED_IMPROVEMENTS } from './expansionPlaybooks';
import { PLAYBOOKS_15_TO_21 } from './playbooks15to21';
import { PLAYBOOKS_22_TO_28 } from './playbooks22to28';

const PLAYBOOKS_1_TO_14: PlaybookDefinition[] = [
  {
    "id": "the-action-scientist",
    "name": "The Action Scientist",
    "tagline": "You solve supernatural problems with bleeding-edge technology, hypothesis testing, and high-voltage science.",
    "description": "A fearless researcher whose experimental gadgets, analytical mind, and dangerous prototypes level the playing field against monsters.",
    "luckSpecial": "Gadget/machine nearby will malfunction, break down, or explode.",
    "statOptions": [
      {
        "charm": -1,
        "cool": 1,
        "sharp": 2,
        "tough": 1,
        "weird": 0
      },
      {
        "charm": 2,
        "cool": -1,
        "sharp": 2,
        "tough": 0,
        "weird": -1
      },
      {
        "charm": -1,
        "cool": 0,
        "sharp": 2,
        "tough": -1,
        "weird": 2
      },
      {
        "charm": 0,
        "cool": 1,
        "sharp": 2,
        "tough": -1,
        "weird": 1
      },
      {
        "charm": 0,
        "cool": 1,
        "sharp": 2,
        "tough": 1,
        "weird": -1
      }
    ],
    "moves": [
      {
        "id": "action-scientist-test-hypothesis",
        "name": "Test Hypothesis",
        "stat": "sharp",
        "description": "Roll +Sharp when testing an explanation. On a 10+, trust answer completely. On a 7-9, honest answer but wasted time or destroyed evidence. On a miss, unrelated answer."
      },
      {
        "id": "action-scientist-sabotage",
        "name": "Sabotage",
        "stat": "sharp",
        "description": "Roll +Sharp when breaking a complicated gadget. On a 10+, broken cleanly or irreparable. On a 7-9, broken but noisy or repairable. On a miss, worst happens or explosions occur."
      },
      {
        "id": "action-scientist-oblivious-to-danger",
        "name": "Oblivious to Danger",
        "description": "Immune to fear-based moves and powers; never need to act under pressure to resist fear."
      },
      {
        "id": "action-scientist-doors-of-perception",
        "name": "The Doors of Perception",
        "stat": "weird",
        "description": "Roll +Weird to open mind via transcendental techniques. On a 10+, pick 2 effects; on a 7-9, pick 1 effect, mind foggy; on a miss, lost in altered state. Effects: Communicate with unusual entities; See normally invisible; Ask 1 investigate question; Clarity (+1 Cool, Sharp, or Weird for 1 hour)."
      },
      {
        "id": "action-scientist-fieldwork",
        "name": "Fieldwork",
        "description": "When putting yourself in danger to test a hypothesis, get +1 forward. When confirming hypothesis true or false, mark experience."
      }
    ],
    "gearChoices": [
      "Lightning gun (3-harm close loud area electricity batteries)",
      "Portable particle accelerator (3-harm close/far messy batteries)",
      "Laser cannon (2-harm close/far quiet batteries)",
      "Net launcher (0-harm close entangling)",
      "Scalpel (1-harm intimate/hand)",
      "Force knife (2-harm hand batteries)",
      "Tranquiliser rifle (1-harm close/far sedating)",
      "Stun-ray (0-harm close sedating)",
      "Autonomous drone (2-harm far autonomous)",
      "Atomic pistol (3-harm close radiation)",
      "Biohazard suit (air-supply sealed)",
      "Lab coat (chemical-resistant)",
      "Engineering coveralls",
      "Space suit (air-supply sealed climate-control)",
      "Science armour (2-armour batteries heavy)"
    ],
    "improvements": [
      "+1 Sharp (max +3)",
      "+1 Cool (max +2)",
      "+1 Weird (max +2)",
      "+1 Tough (max +2)",
      "Take another Action Scientist move",
      "Take another Action Scientist move",
      "Get a laboratory with staff/facilities",
      "Gain ally team of action scientists",
      "Move from another playbook",
      "Move from another playbook"
    ],
    "advancedImprovements": [
      "+1 Cool (max +3)",
      "+1 any rating (max +3)",
      "Change playbook",
      "Second hunter",
      "Mark 2 basic moves advanced",
      "Mark 2 basic moves advanced",
      "Retire to safety",
      "Erase 1 Luck mark",
      "New interest: add a second area of study"
    ],
    "subMechanics": {
      "title": "Area of Study",
      "description": "Physics & Cosmology, Biology & Chemistry, Neurology & Psychology, Computers & Electronics, Violence, Mechanics & Engineering, Space.",
      "options": [
        "Physics & Cosmology",
        "Biology & Chemistry",
        "Neurology & Psychology",
        "Computers & Electronics",
        "Violence",
        "Mechanics & Engineering",
        "Space"
      ]
    }
  },
  {
    "id": "the-celebrity",
    "name": "The Celebrity",
    "tagline": "You are a famous movie star, rock idol, or media sensation who stumbled into the shadows.",
    "description": "A beloved public icon who leverages charisma, wealth, and fake occult lore against real monsters.",
    "luckSpecial": "Career opportunity or threat emerges.",
    "statOptions": [
      {
        "charm": 2,
        "cool": 1,
        "sharp": -1,
        "tough": 0,
        "weird": 1
      },
      {
        "charm": 2,
        "cool": 0,
        "sharp": 1,
        "tough": 1,
        "weird": -1
      },
      {
        "charm": 2,
        "cool": -1,
        "sharp": 0,
        "tough": 2,
        "weird": -1
      },
      {
        "charm": 1,
        "cool": 2,
        "sharp": 1,
        "tough": -1,
        "weird": 0
      },
      {
        "charm": 2,
        "cool": 0,
        "sharp": 1,
        "tough": -1,
        "weird": 1
      }
    ],
    "moves": [
      {
        "id": "celeb-fakelore",
        "name": "Fakelore (Inherent)",
        "stat": "charm",
        "description": "When you make up fake occult lore on the spot to impress or manipulate someone, roll +Charm. On a 10+, they believe you completely; take +1 forward when dealing with them. On a 7-9, they buy it for now, but a true expert would spot the fraud. On a miss, someone recognizes your claims as bogus or dangerous."
      },
      {
        "id": "celeb-scream-queen",
        "name": "Scream Queen",
        "stat": "charm",
        "description": "When you scream in terror or distress, roll +Charm. On a 10+, choose two: an ally gains +1 forward against the monster; you draw the monster's attention away from an ally; or you slip away unnoticed. On a 7-9, choose one. On a miss, you freeze in terror and become the prime target."
      },
      {
        "id": "celeb-price-of-fame",
        "name": "The Price of Fame",
        "description": "Wherever you go, people know your name and face. You can always get into VIP spaces, clubs, and events without paying, but it is impossible for you to go unnoticed in public unless in disguise."
      },
      {
        "id": "celeb-i-have-people",
        "name": "I Have People",
        "stat": "cool",
        "description": "When you need specialist assistance, luxury transport, or rare supplies on short notice, roll +Cool. On a 10+, your management team delivers it right now. On a 7-9, they deliver it, but there are strings attached, paparazzi leaked, or it costs extra. On a miss, your manager refuses and demands you focus on PR."
      },
      {
        "id": "celeb-do-my-own-stunts",
        "name": "I Do My Own Stunts",
        "description": "You are trained in stage combat, driving, and tumbling. When you act under pressure using athletic stunts, parkour, or driving, you gain 1-armour and +1 forward."
      },
      {
        "id": "celeb-disarming",
        "name": "Disarming",
        "stat": "charm",
        "description": "When you flash a dazzling smile and turn on the charm to de-escalate a tense situation, roll +Charm. On a 10+, hostility immediately halts; they won't attack unless provoked. On a 7-9, they pause long enough for you or an ally to make one move. On a miss, they find your fame offensive and target you first."
      },
      {
        "id": "celeb-play-one-on-tv",
        "name": "But I Play One on TV",
        "stat": "sharp",
        "description": "When you attempt a professional task you once played on screen (doctor, lawyer, forensics, pilot), roll +Sharp. On a 10+, you pull it off surprisingly well; treat it as an expert success. On a 7-9, you manage the basics, but with a messy error or complication. On a miss, TV fiction fails hard in reality."
      },
      {
        "id": "celeb-acting-my-dear-boy",
        "name": "Acting My Dear Boy",
        "stat": "charm",
        "description": "When you convincingly fake an emotion, identity, or physical injury, roll +Charm. On a 10+, everyone present accepts the performance unconditionally. On a 7-9, they believe it, but demand immediate action or attention. On a miss, your performance is laughably transparent."
      }
    ],
    "gearChoices": [
      "Tour bus with custom paint job",
      "Fancy sports car",
      "Barely street legal \"civilian\" military vehicle",
      "Limo with driver",
      "Classic old car",
      "Overpowered sports motorcycle",
      ".38 revolver (2-harm close reload loud)",
      "Shotgun (3-harm close messy)",
      "Hunting rifle (2-harm far loud)",
      "9mm pistol (2-harm close loud)",
      "Big knife (1-harm hand)",
      "Chainsaw (2-harm hand heavy messy loud)"
    ],
    "improvements": [
      "+1 Charm (max +3)",
      "+1 Tough (max +2)",
      "+1 Sharp (max +2)",
      "+1 Cool (max +2)",
      "Take another Celebrity move",
      "Take another Celebrity move",
      "Entourage ally group",
      "+1 ongoing fakelore on two occult topics",
      "Move from another playbook",
      "Move from another playbook"
    ],
    "advancedImprovements": [
      "+1 any rating (max +3)",
      "Change playbook",
      "Second hunter",
      "Mark 2 basic moves advanced",
      "Mark 2 basic moves advanced",
      "Retire to safety",
      "Retire to increased fame",
      "Erase 1 Luck",
      "Fame skyrockets with new benefits/obligations"
    ]
  },
  {
    "id": "the-changeling",
    "name": "The Changeling",
    "tagline": "Stolen into the Faerie realm as a child, you returned with arcane glamour and alien instincts.",
    "description": "Part human, part otherworldly fae, caught between two realms while battling monsters.",
    "luckSpecial": "Heritage or upbringing contact shows up soon.",
    "statOptions": [
      {
        "charm": 1,
        "cool": -1,
        "sharp": 1,
        "tough": 0,
        "weird": 2
      },
      {
        "charm": -1,
        "cool": 1,
        "sharp": 0,
        "tough": 1,
        "weird": 2
      },
      {
        "charm": 1,
        "cool": 0,
        "sharp": -1,
        "tough": 1,
        "weird": 2
      },
      {
        "charm": 0,
        "cool": 2,
        "sharp": 1,
        "tough": -1,
        "weird": 1
      },
      {
        "charm": 2,
        "cool": 1,
        "sharp": 1,
        "tough": -1,
        "weird": 0
      }
    ],
    "moves": [
      {
        "id": "changeling-glamour",
        "name": "Glamour (Inherent)",
        "stat": "weird",
        "description": "When you weave fae illusion to disguise your appearance, roll +Weird. On a 10+, you look like whoever or whatever you wish for as long as you concentrate. On a 7-9, the illusion holds, but someone perceptive notices a telling quirk or tell. On a miss, the illusion flickers out or reveals your faerie nature in an embarrassing way."
      },
      {
        "id": "changeling-inhuman-talent",
        "name": "Inhuman Talent",
        "description": "Choose one supernatural talent: unnatural grace (roll +Cool to dodge attacks), silver tongue (+1 Charm when negotiating contracts), or uncanny vision (see in absolute darkness and through illusions)."
      },
      {
        "id": "changeling-they-are-my-people",
        "name": "They Are My People",
        "stat": "charm",
        "description": "When you seek out other changelings, sidhe, goblins, or faerie outcasts for aid, roll +Charm. On a 10+, they greet you warmly and provide safe shelter or secrets. On a 7-9, they help, but demand a favor or trade in return. On a miss, they consider you a traitor or sell you out."
      },
      {
        "id": "changeling-force-of-nature",
        "name": "Force of Nature",
        "stat": "weird",
        "description": "When you call upon wild nature to entangle or blind a foe, roll +Weird. On a 10+, vines, shadows, or wind hold them fast and inflict 2-harm. On a 7-9, nature hinders them temporarily. On a miss, the wild element lashes out indiscriminately."
      },
      {
        "id": "changeling-lockdown",
        "name": "Lockdown",
        "stat": "weird",
        "description": "When you use faerie wards to seal a room, doorway, or portal, roll +Weird. On a 10+, nothing mortal or supernatural can pass through without your permission for 1 hour. On a 7-9, the seal holds, but requires a key component or weakens after minutes. On a miss, the ward locks you inside with danger."
      },
      {
        "id": "changeling-faerie-gossip",
        "name": "Faerie Gossip",
        "stat": "sharp",
        "description": "When you listen to the whispers of household sprites, winds, and mirrors, roll +Sharp. On a 10+, ask 2 Investigate questions about what occurred here recently. On a 7-9, ask 1 question. On a miss, the fae whispers mislead you or attract attention."
      },
      {
        "id": "changeling-renewal",
        "name": "Renewal",
        "description": "When you rest under moonlight, in a natural forest, or near running water for an hour, heal 2-harm and clear the unstable condition without medical gear."
      },
      {
        "id": "changeling-strange-paths",
        "name": "Strange Paths",
        "stat": "weird",
        "description": "When you step into a shadow, hedge, or doorway to take a shortcut through the Otherworld, roll +Weird. On a 10+, you arrive at your destination in moments with your team. On a 7-9, you arrive, but something followed you through or time passed unexpectedly. On a miss, you are trapped in the fae wilds."
      }
    ],
    "gearChoices": [
      "Skateboard",
      "Roller skates",
      "Bicycle",
      "Old pickup truck",
      "Van",
      "Motorcycle",
      "Fairly new car in decent condition",
      "Classic car in poor condition",
      "Sport club (2-harm hand innocuous messy)",
      "Pocket knife or multitool (1-harm hand useful small)",
      "Small handgun (2-harm close loud)",
      "Hunting rifle (3-harm far loud reload)",
      "Sledgehammer (2-harm hand messy slow)",
      "Fire axe (2-harm hand messy heavy)",
      "Talisman or artifact (1-harm close magic ignore-armour)",
      "Childhood toy",
      "Laptop",
      "Knapsack/backpack/purse",
      "Smartphone/mobile game/music player",
      "Jewellery",
      "Old photos",
      "Favourite clothing",
      "Journal",
      "Letters/emails from home"
    ],
    "improvements": [
      "+1 Weird (max +3)",
      "+1 Cool (max +2)",
      "+1 Sharp (max +2)",
      "+1 Charm (max +2)",
      "Take another Changeling move",
      "Take another Changeling move",
      "Gain ally (mortal or supernatural)",
      "Mark use magic advanced",
      "Move from another playbook",
      "Move from another playbook"
    ],
    "advancedImprovements": [
      "+1 any (max +3)",
      "Change playbook",
      "Second hunter",
      "Mark 2 basic moves advanced",
      "Mark 2 basic moves advanced",
      "Retire to safety",
      "Erase 1 Luck",
      "Remove 1 Unknown Heritage tag",
      "Retire to supernatural responsibility",
      "Find a home (Agency / Sect / Haven)"
    ],
    "subMechanics": {
      "title": "Unknown Heritage",
      "description": "Pick 3 pitfalls from list.",
      "options": [
        "Iron vulnerability",
        "Salt bound",
        "Cannot lie",
        "Fae debt",
        "True name known",
        "Threshold restricted"
      ]
    }
  },
  {
    "id": "the-chosen",
    "name": "The Chosen",
    "tagline": "Your birth was prophesied. You are the designated champion against darkness.",
    "description": "Destined to stand between humanity and the apocalyptic horrors of the dark.",
    "luckSpecial": "Keeper brings fate into play.",
    "statOptions": [
      {
        "charm": 2,
        "cool": -1,
        "sharp": 1,
        "tough": 2,
        "weird": -1
      },
      {
        "charm": -1,
        "cool": 2,
        "sharp": 1,
        "tough": 2,
        "weird": -1
      },
      {
        "charm": 1,
        "cool": 2,
        "sharp": 1,
        "tough": 1,
        "weird": -1
      },
      {
        "charm": -1,
        "cool": 1,
        "sharp": 2,
        "tough": -1,
        "weird": 2
      },
      {
        "charm": 1,
        "cool": 2,
        "sharp": -1,
        "tough": -1,
        "weird": 2
      }
    ],
    "moves": [
      {
        "id": "chosen-destiny",
        "name": "Destiny's Plaything (Inherent)",
        "stat": "weird",
        "description": "At the beginning of each mystery, roll +Weird. On a 10+, the Keeper will reveal a useful detail about the coming mystery. On a 7-9, you get a vague hint or disturbing omen. On a miss, you get a vision of something terrible happening to you or someone you care about."
      },
      {
        "id": "chosen-here-for-a-reason",
        "name": "I'm Here For A Reason (Inherent)",
        "description": "There’s something you are meant to do. What is it? As long as you are working towards that goal, you cannot die. If you die in play, spend a point of Luck to recover or be returned to life somehow. Once your task is done (or you run out of Luck), this protection ceases."
      },
      {
        "id": "chosen-the-big-entrance",
        "name": "The Big Entrance",
        "stat": "cool",
        "description": "When you make a showy entrance into a dangerous situation, roll +Cool. On a 10+, everyone stops to watch and listen until you finish your opening speech. On a 7-9, one person or monster stops to watch and listen. On a miss, you are marked as the biggest threat by everyone present."
      },
      {
        "id": "chosen-devastating",
        "name": "Devastating",
        "description": "When you inflict harm on an enemy, you can choose to inflict +1 harm, but you suffer 1-harm yourself in recoil or exposure."
      },
      {
        "id": "chosen-dutiful",
        "name": "Dutiful",
        "description": "When your fate rears its ugly head and you act in accordance with any of your fate tags (heroic or doom), mark experience. If it is a heroic tag, take +1 forward as well."
      },
      {
        "id": "chosen-invincible",
        "name": "Invincible",
        "description": "You always count as having 2-armour. This does not stack with other protection."
      },
      {
        "id": "chosen-resilience",
        "name": "Resilience",
        "description": "You heal faster than normal people. Any time your harm is healed, heal an extra 1 point. Additionally, your wounds count as 1-harm less for the purpose of the Keeper’s harm moves."
      }
    ],
    "gearChoices": [
      "Special Weapon: Form (staff, haft, handle, chain), 3 business ends, Material",
      "Protective gear (1-armour optional)"
    ],
    "improvements": [
      "+1 Charm (max +3)",
      "+1 Cool (max +3)",
      "+1 Sharp (max +3)",
      "+1 Tough (max +3)",
      "+1 Weird (max +3)",
      "Take another Chosen move",
      "Take another Chosen move",
      "Gain an ally",
      "Move from another playbook",
      "Move from another playbook"
    ],
    "advancedImprovements": [
      "+1 any (max +3)",
      "Erase 1 Luck",
      "Change playbook",
      "Second hunter",
      "Mark 2 basic moves advanced",
      "Mark 2 basic moves advanced",
      "Retire to safety",
      "Delete 1 Doom tag (and optionally 1 Heroic tag)"
    ],
    "subMechanics": {
      "title": "Fate & Special Weapon",
      "description": "How found out, 2 Heroic tags, 2 Doom tags. Special Weapon: Form (staff, haft, handle, chain), 3 business ends, Material. Protective gear (1-armour optional).",
      "options": [
        "Heroic: Sacrifice, A normal life, Destiny, Cleansing, Justice, Divine aid, Victory, Revelation",
        "Doom: Death, Destruction, Despair, Damnation, Hubris, Losing loved ones, Treachery, Corruption"
      ]
    }
  },
  {
    "id": "the-covenant",
    "name": "The Covenant",
    "tagline": "Your strength flows from the supernatural pact bound between you and your trusted allies.",
    "description": "A hunter whose power and survival are intertwined with deep magical camaraderie.",
    "luckSpecial": "Ally needs your help or time.",
    "statOptions": [
      {
        "charm": 2,
        "cool": -1,
        "sharp": 1,
        "tough": 0,
        "weird": 1
      },
      {
        "charm": -1,
        "cool": 1,
        "sharp": 2,
        "tough": 1,
        "weird": 0
      },
      {
        "charm": 1,
        "cool": 2,
        "sharp": 0,
        "tough": 1,
        "weird": -1
      },
      {
        "charm": 0,
        "cool": 1,
        "sharp": -1,
        "tough": 2,
        "weird": 1
      },
      {
        "charm": 1,
        "cool": 0,
        "sharp": 1,
        "tough": -1,
        "weird": 2
      }
    ],
    "moves": [
      {
        "id": "covenant-friendship",
        "name": "Friendship (Inherent)",
        "stat": "charm",
        "description": "When an ally is in danger, you may roll +Charm to protect them from any distance if you can reach them or communicate. On a 10+, they escape harm cleanly. On a 7-9, you take the harm or complication intended for them. On a miss, you are separated and both vulnerable."
      },
      {
        "id": "covenant-starter-ally",
        "name": "Starter Ally (Inherent)",
        "description": "You begin with a devoted partner: Watson (investigator), Rolodex (connected insider), or Unit (muscle)."
      },
      {
        "id": "covenant-get-down",
        "name": "Get Down!",
        "stat": "cool",
        "description": "When you shout a warning to an ally about to be ambushed or struck, roll +Cool. On a 10+, they dive to cover; take +1 forward and avoid all surprise harm. On a 7-9, they avoid harm but drop something or get pinned. On a miss, the monster targets you instead."
      },
      {
        "id": "covenant-fast-friends",
        "name": "Fast Friends",
        "stat": "charm",
        "description": "When you meet an NPC and immediately forge an alliance, roll +Charm. On a 10+, they consider you a trusted confidant and will do favors without suspicion. On a 7-9, they help, but ask for a minor favor first. On a miss, they mistake your warmth for deceit."
      },
      {
        "id": "covenant-smash-cut",
        "name": "Smash Cut",
        "stat": "sharp",
        "description": "When you and your ally coordinate a simultaneous flanking strike or distraction, roll +Sharp. On a 10+, inflict +2 harm and disorient the target. On a 7-9, inflict +1 harm. On a miss, your timing is off and you hit each other or get caught."
      },
      {
        "id": "covenant-geek-in-chair",
        "name": "The Geek in the Chair",
        "stat": "sharp",
        "description": "When your ally provides remote research, hacking, or magical guidance over radio/phone, roll +Sharp. On a 10+, hold 2 to ask questions from Investigate a Mystery with +1 ongoing. On a 7-9, hold 1. On a miss, their comms are hacked or jammed."
      },
      {
        "id": "covenant-acolyte",
        "name": "Acolyte",
        "description": "Your ally can cast simple ritual wardings or heal minor harm (1-harm once per mystery) on your behalf."
      },
      {
        "id": "covenant-who-said-alone",
        "name": "Who Said I Was Alone?",
        "description": "When you are cornered alone, spend 1 Luck or trigger an ally entrance: an ally appears right on cue with the exact tool or weapon needed."
      },
      {
        "id": "covenant-opening-doors",
        "name": "Opening Doors",
        "stat": "charm",
        "description": "When you invoke your ally's status, badges, or occult credentials to gain entry to a restricted site, roll +Charm. On a 10+, you are ushered inside with full courtesy. On a 7-9, you are let in, but escorted closely. On a miss, alarms trigger."
      }
    ],
    "gearChoices": [
      "Cell phone",
      "Summoning charm",
      "Walkie-talkie",
      "High-tech communicator",
      "Telepathic link",
      "Messaging relic",
      "Wardrobe of clothes",
      "Kevlar vest (1-armour)",
      "Cutting-edge laptop",
      "Ritual gear",
      "Extensive tool collection",
      "Heavy tool (2-harm hand utility innocuous)",
      "Summoned minion (2-harm close autonomous messy)",
      "Handgun (2-harm close reload loud)",
      "Bag of curses (1-harm close magic ignore-armour)",
      "Shotgun (3-harm close messy loud)",
      "Hunting rifle (2-harm far loud)",
      "Sword (2-harm hand magic)"
    ],
    "improvements": [
      "+1 Cool (max +2)",
      "+1 Weird (max +2)",
      "+1 Charm (max +3)",
      "+1 Tough (max +2)",
      "+1 Sharp (max +2)",
      "Take another Covenant move",
      "Take another Covenant move",
      "Move from another playbook",
      "Move from another playbook",
      "Gain second ally",
      "Gain 1 contact type from Gumshoe list"
    ],
    "advancedImprovements": [
      "+1 any (max +3)",
      "Change playbook",
      "Second hunter",
      "Retire to safety",
      "Mark 2 basic moves advanced",
      "Mark 2 basic moves advanced",
      "Covenant works twice per session",
      "Create hunter based on ally"
    ]
  },
  {
    "id": "the-crooked",
    "name": "The Crooked",
    "tagline": "Yeah, you’ve been on the wrong side of the law. But monsters don’t obey laws either.",
    "description": "A criminal, grifter, or hustler whose street smarts and shady network make monsters sweat.",
    "luckSpecial": "Someone from your past reappears soon.",
    "statOptions": [
      {
        "charm": 1,
        "cool": 1,
        "sharp": 2,
        "tough": 0,
        "weird": -1
      },
      {
        "charm": -1,
        "cool": 1,
        "sharp": 1,
        "tough": 2,
        "weird": 0
      },
      {
        "charm": -1,
        "cool": 2,
        "sharp": 2,
        "tough": 0,
        "weird": -1
      },
      {
        "charm": 2,
        "cool": 1,
        "sharp": 1,
        "tough": 0,
        "weird": -1
      },
      {
        "charm": 2,
        "cool": 0,
        "sharp": 1,
        "tough": -1,
        "weird": 1
      }
    ],
    "moves": [
      {
        "id": "crooked-artifact",
        "name": "Artifact",
        "description": "You stole a magical item from someone dangerous. Name what it does. The Keeper will tell you who wants it back and what dark curse accompanies using it."
      },
      {
        "id": "crooked-crew",
        "name": "Crew",
        "description": "You have a team of criminal contacts (safecracker, wheelman, fence, or hacker) who will pull jobs with you or fence supernatural oddities."
      },
      {
        "id": "crooked-deal-with-devil",
        "name": "Deal with the Devil",
        "description": "You sold your soul or swore fealty to a powerful supernatural entity. In return, you get +1 to any rating (max +3). The patron can call in debts at any time."
      },
      {
        "id": "crooked-friends-on-force",
        "name": "Friends on the Force",
        "description": "You know cops who owe you favours. You can have evidence disappear, get police dispatches diverted, or get tipped off about federal raids."
      },
      {
        "id": "crooked-made",
        "name": "Made",
        "description": "You are an initiated member of an organized crime syndicate. You can call on them for muscle, weapons, and safe houses, but you must kick up profits and respect orders."
      },
      {
        "id": "crooked-driver",
        "name": "Driver",
        "description": "When you act under pressure behind the wheel of a vehicle, take +1 forward. In a car chase, you always win on a 10+, and you choose whether you disable their ride or escape cleanly."
      },
      {
        "id": "crooked-home-ground",
        "name": "Home Ground",
        "description": "When you operate on your home turf (your old neighborhood, docks, or underworld hideout), you take +1 ongoing to all moves."
      },
      {
        "id": "crooked-notorious",
        "name": "Notorious",
        "stat": "charm",
        "description": "When you intimidate criminals or street-level contacts with your criminal reputation, roll +Charm. On a 10+, they back down immediately and answer your questions. On a 7-9, they back down, but demand a cut or report you to rivals. On a miss, an old grudge turns lethal."
      }
    ],
    "gearChoices": [
      ".22 revolver (1-harm close reload small)",
      ".38 revolver (2-harm close reload loud)",
      "9mm (2-harm close loud)",
      "Shotgun (3-harm close messy)",
      "Hunting rifle (2-harm far loud)",
      "Big knife (1-harm hand)",
      "Baseball bat (1-harm hand)",
      "Submachinegun (2-harm close reload area)",
      "Assault rifle (3-harm close/far area)"
    ],
    "improvements": [
      "+1 Sharp (max +3)",
      "+1 Tough (max +2)",
      "+1 Cool (max +2)",
      "+1 Charm (max +2)",
      "Take another Crooked move",
      "Take another Crooked move",
      "Gain ally (old crew)",
      "Recover money stash",
      "Move from another playbook",
      "Move from another playbook"
    ],
    "advancedImprovements": [
      "+1 any (max +3)",
      "Change playbook",
      "Second hunter",
      "Mark 2 basic moves advanced",
      "Mark 2 basic moves advanced",
      "Erase 1 Luck",
      "Retire to safety"
    ],
    "subMechanics": {
      "title": "Background & Heat",
      "description": "Background (pick 1): Hoodlum, Burglar, Grifter, Fixer, Assassin, Charlatan, Pickpocket. Heat & Underworld tags.",
      "options": [
        "Hoodlum",
        "Burglar",
        "Grifter",
        "Fixer",
        "Assassin",
        "Charlatan",
        "Pickpocket"
      ]
    }
  },
  {
    "id": "the-curse-eater",
    "name": "The Curse-Eater",
    "tagline": "You consume dark magic, curses, and demonic blights to protect others.",
    "description": "A supernatural sponge that devours necrotic energy, at risk of succumbing to corruption.",
    "luckSpecial": "Permanent mark related to consumed magic.",
    "statOptions": [
      {
        "charm": 1,
        "cool": 2,
        "sharp": 1,
        "tough": 0,
        "weird": -1
      },
      {
        "charm": 0,
        "cool": 1,
        "sharp": 2,
        "tough": -1,
        "weird": 1
      },
      {
        "charm": -1,
        "cool": 2,
        "sharp": 2,
        "tough": -1,
        "weird": 0
      },
      {
        "charm": -1,
        "cool": 1,
        "sharp": 2,
        "tough": 1,
        "weird": 0
      },
      {
        "charm": 1,
        "cool": 2,
        "sharp": 0,
        "tough": -1,
        "weird": 1
      }
    ],
    "moves": [
      {
        "id": "curseeater-devour-evil",
        "name": "Devour Evil (Inherent)",
        "stat": "weird",
        "description": "When you absorb a curse, magical trap, or demonic residue, roll +Weird. On a 10+, you consume the effect completely, clear it from the target, and store 1 consumed magic charge. On a 7-9, you devour it, but mark 1 Corruption. On a miss, the magic overwhelms your body: mark 2 Corruption and suffer 2-harm."
      },
      {
        "id": "curseeater-unleash-corruption",
        "name": "Unleash Corruption (Inherent)",
        "stat": "weird",
        "description": "When you vent your stored curses as destructive force, roll +Weird. On a 10+, unleash 3-harm close area magic blast. On a 7-9, unleash 2-harm close magic blast and mark 1 Corruption. On a miss, the corruption detonates uncontrollably: you and allies take 2-harm ignore-armour."
      },
      {
        "id": "curseeater-devour-harm",
        "name": "Devour Harm",
        "description": "When you suffer harm from a supernatural attack or spell, you may choose to take 1 Corruption to reduce the harm suffered by 2."
      },
      {
        "id": "curseeater-reach",
        "name": "Reach",
        "description": "You can absorb curses and magic from up to close range instead of intimate/touch."
      },
      {
        "id": "curseeater-curse-whispers",
        "name": "Curse Whispers",
        "stat": "sharp",
        "description": "When you listen to the malignant entities trapped inside your corruption, roll +Sharp. On a 10+, ask 2 Investigate questions about the mystery. On a 7-9, ask 1 question, but mark 1 Corruption. On a miss, the voices take over your actions temporarily."
      },
      {
        "id": "curseeater-ropes-of-fate",
        "name": "Ropes of Fate",
        "stat": "weird",
        "description": "When you sense metaphysical curses binding people or locations, roll +Weird. On a 10+, you see exactly who cast the curse, their location, and the key to breaking it. On a 7-9, you see the bond, but cannot tell the origin. On a miss, the caster senses your probing gaze."
      },
      {
        "id": "curseeater-feel-the-burn",
        "name": "Feel the Burn",
        "description": "As long as your Corruption track has at least 3 marks, you gain +1 to all Tough and Weird rolls."
      },
      {
        "id": "curseeater-fortunes-fool",
        "name": "Fortune's Fool",
        "stat": "cool",
        "description": "When you tempt bad luck to divert supernatural misfortune from someone else to you, roll +Cool. On a 10+, you negate their danger entirely and turn it into a harmless mishap. On a 7-9, you take their place in peril. On a miss, disaster hits everyone."
      },
      {
        "id": "curseeater-let-it-go",
        "name": "Let It Go",
        "description": "Once per mystery, you can perform a purifying ritual to purge 2 Corruption marks without suffering harm."
      }
    ],
    "gearChoices": [
      "Mystical focus",
      "Pocket knife/multitool (1-harm hand useful small)",
      "Bag of occult ingredients",
      "Manacles and chains",
      "Rope and zip ties",
      "Medallion of Society of Curse-eaters",
      "Improvised protective gear (1-armour)",
      "Big net",
      "Grimoire of wardings",
      "Dowsing rods and pendulum",
      "Baseball/cricket bat (1-harm hand innocuous)",
      "Collapsible baton (1-harm hand small)",
      "Taser (2-harm hand/close stun electric)",
      "Tranquiliser rifle (3-harm close sedating)",
      "Pistol (2-harm close loud)",
      "Van",
      "Old car",
      "Pickup",
      "Truck"
    ],
    "improvements": [
      "+1 Sharp (max +3)",
      "+1 Weird (max +2)",
      "+1 Tough (max +2)",
      "+1 Charm (max +2)",
      "Take another Curse-eater move",
      "Take another Curse-eater move",
      "Make consumed magic into permanent custom move",
      "Clear all corruption without clearing consumed magics",
      "Move from another playbook",
      "Move from another playbook"
    ],
    "advancedImprovements": [
      "+1 any (max +3)",
      "Change playbook",
      "Second hunter",
      "Mark 2 basic moves advanced",
      "Mark 2 basic moves advanced",
      "Retire to safety",
      "Erase 1 Luck",
      "Make consumed magic into custom move",
      "Clear all corruption"
    ],
    "subMechanics": {
      "title": "Corruption Track",
      "description": "Devour Evil, Unleash Corruption. Corruption track (Lost at full).",
      "options": [
        "Devour Evil",
        "Unleash Corruption",
        "Corruption 1",
        "Corruption 2",
        "Corruption 3",
        "Corruption 4",
        "Corruption 5 (Lost to Curse)"
      ]
    }
  },
  {
    "id": "the-divine",
    "name": "The Divine",
    "tagline": "I am the Light, the Sword. I am sent here to cleanse the world of abominations.",
    "description": "An angelic or cosmic envoy clad in mortal flesh, commanded by holy powers.",
    "luckSpecial": "Mission urgently requires something difficult.",
    "statOptions": [
      {
        "charm": 1,
        "cool": 1,
        "sharp": -1,
        "tough": 2,
        "weird": 0
      },
      {
        "charm": -1,
        "cool": 2,
        "sharp": -1,
        "tough": 2,
        "weird": 0
      },
      {
        "charm": -1,
        "cool": 0,
        "sharp": 1,
        "tough": 2,
        "weird": 1
      },
      {
        "charm": 1,
        "cool": 1,
        "sharp": 0,
        "tough": 2,
        "weird": -1
      },
      {
        "charm": -1,
        "cool": 1,
        "sharp": 0,
        "tough": 2,
        "weird": 1
      }
    ],
    "moves": [
      {
        "id": "divine-boss-from-beyond",
        "name": "Boss from Beyond",
        "stat": "weird",
        "description": "At the start of each mystery, roll +Weird to commune with your divine superiors. On a 10+, you get clear instructions and +1 forward. On a 7-9, you get vague or contradictory orders. On a miss, you are given a difficult, costly demand."
      },
      {
        "id": "divine-angel-wings",
        "name": "Angel Wings",
        "stat": "weird",
        "description": "When you sprout holy wings to fly or teleport instantly to a place you have visited before, roll +Weird. On a 10+, you arrive instantly with whoever you are holding. On a 7-9, you arrive, but the divine spectacle draws dangerous attention or expends 1-harm. On a miss, you end up somewhere dangerous."
      },
      {
        "id": "divine-what-i-need",
        "name": "What I Need When I Need It",
        "description": "You can store any small item or weapon in your divine grace, banishing it to celestial space and manifesting it into your hands instantly at will."
      },
      {
        "id": "divine-smite",
        "name": "Smite",
        "description": "Your body and weapons are imbued with holy fire. All your attacks gain the holy tag and deal +1 harm against supernatural evil, demons, and undead."
      },
      {
        "id": "divine-soothe",
        "name": "Soothe",
        "stat": "charm",
        "description": "When you calm someone in hysteria, shock, or fear, roll +Charm. On a 10+, their panic vanishes and they take +1 forward. On a 7-9, they calm down, but become dependent on your presence. On a miss, they perceive your true divine radiance and are terrified."
      },
      {
        "id": "divine-lay-on-hands",
        "name": "Lay On Hands",
        "stat": "cool",
        "description": "When you touch someone to heal their wounds, roll +Cool. On a 10+, heal 2-harm and stabilize unstable wounds. On a 7-9, heal 2-harm, but you suffer 1-harm in empathy. On a miss, you transfer their wounds or affliction into yourself."
      },
      {
        "id": "divine-cast-out-evil",
        "name": "Cast Out Evil",
        "stat": "tough",
        "description": "When you banish or exorcise a possessing spirit or demonic entity, roll +Tough. On a 10+, the entity is expelled immediately. On a 7-9, it is forced out, but attacks you before fleeing. On a miss, it lashes out with full force or possesses someone else."
      }
    ],
    "gearChoices": [
      "Flaming sword (3-harm hand fire holy)",
      "Thunder hammer (3-harm hand stun holy)",
      "Razor whip (3-harm hand area messy holy)",
      "Five demon bag (3-harm close magic holy)",
      "Silver trident (3-harm hand silver holy)",
      "Divine armour (1-armour holy)"
    ],
    "improvements": [
      "+1 Tough (max +3)",
      "+1 Cool (max +2)",
      "+1 Sharp (max +2)",
      "+1 Charm (max +2)",
      "+1 Weird (max +2)",
      "Take another Divine move",
      "Take another Divine move",
      "Gain lesser divine ally",
      "Move from another playbook",
      "Move from another playbook"
    ],
    "advancedImprovements": [
      "+1 any (max +3)",
      "Change playbook",
      "Second hunter",
      "Mark 2 basic moves advanced",
      "Mark 2 basic moves advanced",
      "Retire to safety",
      "Erase 1 Luck",
      "Change your mission"
    ],
    "subMechanics": {
      "title": "Mission",
      "description": "Mission options: Adversary, End of Days (prevent), End of Days (ensure), Exiled, Protect another hunter.",
      "options": [
        "Adversary",
        "End of Days (prevent)",
        "End of Days (ensure)",
        "Exiled",
        "Protect another hunter"
      ]
    }
  },
  {
    "id": "the-envoy",
    "name": "The Envoy",
    "tagline": "Sent by mysterious Overseers to observe, guide, and ensure the cosmic balance survives.",
    "description": "A diplomatic representative of vast, ancient powers, balancing secrets and protocols.",
    "luckSpecial": "Scrutiny or difficult demands from Overseers.",
    "statOptions": [
      {
        "charm": 1,
        "cool": 2,
        "sharp": 0,
        "tough": -1,
        "weird": 1
      },
      {
        "charm": 0,
        "cool": 2,
        "sharp": 1,
        "tough": -1,
        "weird": 1
      },
      {
        "charm": -1,
        "cool": 2,
        "sharp": 1,
        "tough": 1,
        "weird": 0
      },
      {
        "charm": 1,
        "cool": 2,
        "sharp": -1,
        "tough": 1,
        "weird": 0
      },
      {
        "charm": 1,
        "cool": 2,
        "sharp": -1,
        "tough": 0,
        "weird": 1
      }
    ],
    "moves": [
      {
        "id": "envoy-strangely-normal",
        "name": "Strangely Normal",
        "description": "No matter what impossible entity or alien culture you face, you are never taken aback or confused. You always know proper etiquette and customs."
      },
      {
        "id": "envoy-too-much-lost",
        "name": "Too Much Has Been Lost",
        "stat": "sharp",
        "description": "When you examine an ancient ruin, lost artifact, or dying language, roll +Sharp. On a 10+, the Overseers archives provide full historical context and secret weakness. On a 7-9, you learn the basics, but overlook a crucial trap. On a miss, your inquiry alerts rival watchers."
      },
      {
        "id": "envoy-council-decision",
        "name": "The Council Has Made a Decision",
        "stat": "charm",
        "description": "When you invoke the binding authority of your Overseers to mediate a truce or enforce terms, roll +Charm. On a 10+, all parties agree to stand down and honor the terms. On a 7-9, they agree, but demand concessions from you. On a miss, both sides turn against you."
      },
      {
        "id": "envoy-prime-directive",
        "name": "Prime Directive",
        "description": "When you act purely in alignment with your Task without letting personal bias or emotional attachments interfere, take +1 ongoing."
      },
      {
        "id": "envoy-secret-fire",
        "name": "Servant of the Secret Fire",
        "stat": "weird",
        "description": "When you summon celestial luminescence to banish shadows or reveal true forms, roll +Weird. On a 10+, the radiant light reveals all cloaked entities and imposes -1 ongoing on monsters. On a 7-9, the light reveals them, but blinds allies temporarily. On a miss, the flare exposes you to an ambush."
      },
      {
        "id": "envoy-certain-point-of-view",
        "name": "From a Certain Point of View",
        "stat": "charm",
        "description": "When you tell a technically true statement that misleads an adversary, roll +Charm. On a 10+, they buy the deception completely. On a 7-9, they believe it, but verify a detail. On a miss, they catch your deceit immediately."
      },
      {
        "id": "envoy-no-one-listens-zathras",
        "name": "No One Listens to Zathras",
        "description": "When people ignore your direct warnings, you mark experience if their failure leads to a major catastrophe."
      }
    ],
    "gearChoices": [
      "Mysterious financial assets",
      "Access to exclusive spaces",
      "Communication devices",
      "Diplomatic credentials",
      "Defensive charm (1-harm close magic 1-armour)",
      "Holdout pistol (2-harm close small)",
      "Rebuking touch (1-harm hand holy)",
      "Whispered revelation (0-harm intimate stun)"
    ],
    "improvements": [
      "+1 Cool (max +3)",
      "+1 Weird (max +2)",
      "+1 Charm (max +2)",
      "+1 Sharp (max +2)",
      "Take another Envoy move",
      "Take another Envoy move",
      "Move from another playbook",
      "Move from another playbook",
      "Second resource item",
      "Overseers provide bodyguard allies",
      "Change Task"
    ],
    "advancedImprovements": [
      "+1 any (max +3)",
      "Change playbook",
      "Second hunter",
      "Retire to safety",
      "Mark 2 basic moves advanced",
      "Mark 2 basic moves advanced",
      "Pick secondary Task",
      "Erase 1 Luck",
      "Change Overseers Values/Concerns"
    ],
    "subMechanics": {
      "title": "Task & Secret Wisdom",
      "description": "Task: Guide, Herald, Watcher, Witness. Secret Wisdom ability.",
      "options": [
        "Guide",
        "Herald",
        "Watcher",
        "Witness"
      ]
    }
  },
  {
    "id": "the-expert",
    "name": "The Expert",
    "tagline": "You have studied the dark arts, the forgotten grimoires, and the cryptid lore.",
    "description": "The walking encyclopedia who knows the monster’s name, weaknesses, and anatomy.",
    "luckSpecial": "Current event is connected to something you did years ago.",
    "statOptions": [
      {
        "charm": -1,
        "cool": 1,
        "sharp": 2,
        "tough": 1,
        "weird": 0
      },
      {
        "charm": 0,
        "cool": 1,
        "sharp": 2,
        "tough": -1,
        "weird": 1
      },
      {
        "charm": 1,
        "cool": -1,
        "sharp": 2,
        "tough": 1,
        "weird": 0
      },
      {
        "charm": -1,
        "cool": 1,
        "sharp": 2,
        "tough": 0,
        "weird": 1
      },
      {
        "charm": -1,
        "cool": 0,
        "sharp": 2,
        "tough": -1,
        "weird": 2
      }
    ],
    "moves": [
      {
        "id": "expert-read-about-this",
        "name": "I've Read About This Sort Of Thing",
        "description": "When you first encounter a monster, you may ask the Keeper one question from the Investigate a Mystery list about it: what is it, what can it do, or what is its weakness?"
      },
      {
        "id": "expert-often-right",
        "name": "Often Right",
        "description": "When a hunter comes to you for advice, tell them what you honestly think the best course is. If that hunter follows your advice, they take +1 on any moves they make doing so, and you mark experience that mystery the first time it happens."
      },
      {
        "id": "expert-preparedness",
        "name": "Preparedness",
        "stat": "sharp",
        "description": "When you need something unusual or rare, roll +Sharp. On a 10+, you have it right now. On a 7-9, you have it, but it will take a little while to get it out, or it’s not quite what you wanted. On a miss, you know where to find it, but it’s somewhere dangerous."
      },
      {
        "id": "expert-not-as-bad",
        "name": "It Wasn't As Bad As It Looked",
        "description": "You gain 1-armour against monster attacks."
      },
      {
        "id": "expert-precise-strike",
        "name": "Precise Strike",
        "description": "When you attack a monster whose weakness you know, you can roll +Sharp instead of +Tough, or add +1 harm to your weapon."
      },
      {
        "id": "expert-with-the-plan",
        "name": "The Woman/Man With The Plan",
        "stat": "sharp",
        "description": "At the start of a mystery or before entering a monster's lair, roll +Sharp to formulate a detailed strategy. On a 10+, hold 2 Plan tokens. Any hunter can spend 1 token to take +1 to any roll when executing the plan. On a 7-9, hold 1. On a miss, your plan overlooks a catastrophic variable."
      },
      {
        "id": "expert-dark-past",
        "name": "Dark Past",
        "stat": "charm",
        "description": "You used to be in deep with some bad crowd or forbidden occult circle. When you deal with a monster or cultist, roll +Charm. On a 10+, they recognize you and are friendly or intimidated. On a 7-9, they know you, but there’s bad blood or debts to settle. On a miss, your past catches up to you hard."
      }
    ],
    "gearChoices": [
      "Mallet & wooden stakes (3-harm intimate slow wooden)",
      "Silver sword (2-harm hand messy silver)",
      "Cold iron sword (2-harm hand messy iron)",
      "Blessed knife (2-harm hand holy)",
      "Magical dagger (2-harm hand magic)",
      "Juju bag (1-harm far magic)",
      "Flamethrower (3-harm close fire heavy volatile)",
      "Magnum (3-harm close reload loud)",
      "Shotgun (3-harm close messy loud)"
    ],
    "improvements": [
      "+1 Sharp (max +3)",
      "+1 Charm (max +2)",
      "+1 Cool (max +2)",
      "+1 Weird (max +2)",
      "Take another Expert move",
      "Take another Expert move",
      "Add option to haven",
      "Add option to haven",
      "Move from another playbook",
      "Move from another playbook"
    ],
    "advancedImprovements": [
      "+1 any (max +3)",
      "Erase 1 Luck",
      "Change playbook",
      "Second hunter",
      "Retire to safety",
      "Mark 2 basic moves advanced",
      "Mark 2 basic moves advanced"
    ],
    "subMechanics": {
      "title": "Haven Headquarters",
      "description": "Pick 3: Lore Library, Mystical Library, Protection Spells, Armory, Infirmary, Workshop, Oubliette, Panic Room, Magical Laboratory.",
      "options": [
        "Lore Library",
        "Mystical Library",
        "Protection Spells",
        "Armory",
        "Infirmary",
        "Workshop",
        "Oubliette",
        "Panic Room",
        "Magical Laboratory"
      ]
    }
  },
  {
    "id": "the-flake",
    "name": "The Flake",
    "tagline": "Everything is connected. The government, the aliens, the monsters, and the secret cabal.",
    "description": "A paranoid conspiracy theorist whose fringe theories turn out to be terrifyingly accurate.",
    "luckSpecial": "Keeper reveals what conspiracies the current situation connects to.",
    "statOptions": [
      {
        "charm": 1,
        "cool": 1,
        "sharp": 2,
        "tough": -1,
        "weird": 0
      },
      {
        "charm": 0,
        "cool": 1,
        "sharp": 2,
        "tough": -1,
        "weird": 1
      },
      {
        "charm": 1,
        "cool": -1,
        "sharp": 2,
        "tough": 1,
        "weird": 0
      },
      {
        "charm": 1,
        "cool": -1,
        "sharp": 2,
        "tough": 0,
        "weird": 1
      },
      {
        "charm": -1,
        "cool": -1,
        "sharp": 2,
        "tough": 0,
        "weird": 2
      }
    ],
    "moves": [
      {
        "id": "flake-connect-the-dots",
        "name": "Connect the Dots",
        "stat": "sharp",
        "description": "At the start of each mystery, roll +Sharp. On a 10+, ask the Keeper 2 questions about what’s going on from the Investigate a Mystery list. On a 7-9, ask 1 question. On a miss, you latch onto a bizarre red herring."
      },
      {
        "id": "flake-crazy-eyes",
        "name": "Crazy Eyes",
        "description": "You get +1 Weird (max +3)."
      },
      {
        "id": "flake-see-it-all-fits",
        "name": "See It All Fits Together",
        "description": "You can use +Sharp instead of +Charm when you manipulate someone, by convincing them of a bizarre conspiracy or shared danger."
      },
      {
        "id": "flake-suspicious-mind",
        "name": "Suspicious Mind",
        "description": "When someone lies to you, you immediately know it."
      },
      {
        "id": "flake-often-overlooked",
        "name": "Often Overlooked",
        "description": "When you act under pressure to sneak, hide, or slip away from notice, you always succeed as if you rolled a 10-11."
      },
      {
        "id": "flake-contrary",
        "name": "Contrary",
        "description": "When you seek out an alternative explanation or disagree with other hunters’ theories, you take +1 forward when investigating that alternative."
      },
      {
        "id": "flake-net-friends",
        "name": "Net Friends",
        "stat": "sharp",
        "description": "When you contact your online community of fringe theorists and cryptid watchers, roll +Sharp. On a 10+, they provide vital clues or decrypt files immediately. On a 7-9, they provide useful info, but leak your location or spread panic. On a miss, the forum turns on you or federal monitors trace your IP."
      },
      {
        "id": "flake-sneaky",
        "name": "Sneaky",
        "description": "When you attack from ambush or from hiding, inflict +2 bonus harm on your first strike."
      }
    ],
    "gearChoices": [
      ".38 revolver (2-harm close reload loud)",
      "9mm (2-harm close loud)",
      "Hunting rifle (2-harm far loud)",
      "Magnum (3-harm close reload loud)",
      "Shotgun (3-harm close messy loud)",
      "Big knife (1-harm hand)",
      "Throwing knives (1-harm close many)",
      "Holdout pistol (2-harm close loud reload)",
      "Garrote (3-harm intimate)",
      "Watchman's flashlight (1-harm hand)",
      "Weighted gloves/brass knuckles (1-harm hand)",
      "Butterfly knife/folding knife (1-harm hand)"
    ],
    "improvements": [
      "+1 Sharp (max +3)",
      "+1 Charm (max +2)",
      "+1 Cool (max +2)",
      "+1 Weird (max +2)",
      "Take another Flake move",
      "Take another Flake move",
      "Get a haven (2 options)",
      "Add option to haven",
      "Move from another playbook",
      "Move from another playbook"
    ],
    "advancedImprovements": [
      "+1 any (max +3)",
      "Change playbook",
      "Second hunter",
      "Mark 2 basic moves advanced",
      "Mark 2 basic moves advanced",
      "Erase 1 Luck",
      "Retire to safety"
    ]
  },
  {
    "id": "the-forged",
    "name": "The Forged",
    "tagline": "You are a living weapon: human on the outside, forged arcane armament within.",
    "description": "A dual-natured hunter who transforms between mortal form and a lethal weapon wielded by an ally.",
    "luckSpecial": "Flaw or Burden comes up.",
    "statOptions": [
      {
        "charm": 2,
        "cool": 1,
        "sharp": 0,
        "tough": -1,
        "weird": 1
      },
      {
        "charm": 2,
        "cool": -1,
        "sharp": -1,
        "tough": 0,
        "weird": 2
      },
      {
        "charm": 1,
        "cool": 1,
        "sharp": 0,
        "tough": -1,
        "weird": 2
      },
      {
        "charm": 1,
        "cool": -1,
        "sharp": 1,
        "tough": 0,
        "weird": 2
      },
      {
        "charm": 2,
        "cool": 0,
        "sharp": 1,
        "tough": -1,
        "weird": 1
      }
    ],
    "moves": [
      {
        "id": "forged-partner",
        "name": "Partner (Inherent)",
        "description": "You have chosen a partner hunter who can wield you in weapon form. While held by your partner, they add harm equal to your Weird rating to their attacks."
      },
      {
        "id": "forged-tactical-advice",
        "name": "Tactical Advice",
        "stat": "sharp",
        "description": "When you whisper advice to your bearer in the midst of combat, roll +Sharp. On a 10+, your bearer takes +2 forward on their next move. On a 7-9, they take +1 forward. On a miss, your advice causes hesitation."
      },
      {
        "id": "forged-my-outlet",
        "name": "My Outlet",
        "description": "When your partner strikes down a monster while wielding you, you both clear 1-harm."
      },
      {
        "id": "forged-to-my-side",
        "name": "To My Side",
        "stat": "weird",
        "description": "When you are separated from your partner and summon yourself into their grasp (or summon them to you), roll +Weird. On a 10+, you instantly reunite across any distance. On a 7-9, you reunite, but leave behind something valuable or take 1-harm. On a miss, you are trapped halfway."
      },
      {
        "id": "forged-ritual-use",
        "name": "Ritual Use",
        "description": "Your weapon form counts as a sacred altar or ritual focus; Use Magic rolls made while holding you gain +1."
      },
      {
        "id": "forged-dont-worry",
        "name": "Don't Worry About Me",
        "description": "When your bearer suffers harm while wielding you, you can absorb all or part of that harm into yourself instead."
      },
      {
        "id": "forged-pointing-way",
        "name": "Pointing the Way",
        "stat": "weird",
        "description": "When you use your weapon form like a divining rod to sense monsters or cursed relics, roll +Weird. On a 10+, you point straight to the target and learn its nature. On a 7-9, you get general direction. On a miss, the monster senses your presence."
      }
    ],
    "gearChoices": [
      "Memento of past partner",
      "Gift from small child",
      "Mysterious brand/mark",
      "Notebook with poetry",
      "Favourite novel",
      "Natural warrior (1-harm intimate/hand)",
      "Wrestler (2-harm intimate/hand grab forceful)",
      "Dagger (1-harm intimate/hand)",
      "Holdout pistol (1-harm close small)"
    ],
    "improvements": [
      "+1 Charm (max +3)",
      "+1 Weird (max +3)",
      "+1 Tough (max +2)",
      "+1 Sharp (max +2)",
      "+1 Cool (max +2)",
      "Take another Forged move",
      "Take another Forged move",
      "Move from another playbook",
      "Move from another playbook",
      "Pick another benefit for weapon form",
      "Count current wielder as partner"
    ],
    "advancedImprovements": [
      "+1 any (max +3)",
      "Change playbook",
      "Second hunter",
      "Second partner",
      "Wield yourself in weapon form",
      "Mark 2 basic moves advanced",
      "Bearer treats an advanced move as advanced",
      "Bearer treats another advanced move as advanced",
      "Retire to safety",
      "Choose human or weapon permanently"
    ],
    "subMechanics": {
      "title": "Dual Nature",
      "description": "Human/weapon form. Bearer adds harm equal to Weird. Range (Intimate, Hand, Close, Far). Benefits (pick 2). Flaws (pick 1). Origin details.",
      "options": [
        "Range: Intimate, Hand, Close, Far",
        "Benefits: Armor-piercing, Silver-edged, Holy, Flaming, Vampiric, Shockwave",
        "Flaws: Heavy, Bloodthirsty, Demands sacrifice, Vulnerable to rust"
      ]
    }
  },
  {
    "id": "the-gumshoe",
    "name": "The Gumshoe",
    "tagline": "You walk the mean streets where neon meets nightmares. Private investigator of the occult.",
    "description": "A hard-boiled detective who unearths monsters behind city corruption and syndicate crime.",
    "luckSpecial": "Regular case turns into dangerous monster mystery targeting you.",
    "statOptions": [
      {
        "charm": 2,
        "cool": 0,
        "sharp": 1,
        "tough": 0,
        "weird": 0
      },
      {
        "charm": 2,
        "cool": 0,
        "sharp": 1,
        "tough": 1,
        "weird": -1
      },
      {
        "charm": 1,
        "cool": 0,
        "sharp": 2,
        "tough": 1,
        "weird": -1
      },
      {
        "charm": 1,
        "cool": -1,
        "sharp": 2,
        "tough": 0,
        "weird": 1
      },
      {
        "charm": 2,
        "cool": 1,
        "sharp": 1,
        "tough": 0,
        "weird": -1
      }
    ],
    "moves": [
      {
        "id": "gumshoe-occult-confidential",
        "name": "Occult Confidential (Inherent)",
        "stat": "sharp",
        "description": "You recognize when a mundane crime has supernatural footprints. When you investigate a crime scene, roll +Sharp. On a 10+, ask 2 questions from Investigate a Mystery and learn if monsters or magic were involved. On a 7-9, ask 1 question. On a miss, you tip off corrupt authorities."
      },
      {
        "id": "gumshoe-naked-city",
        "name": "The Naked City (Inherent)",
        "description": "You begin with 4 contacts from your Gumshoe list (beat cop, coroner, bartender, mob lieutenant, fence, hacker)."
      },
      {
        "id": "gumshoe-postman",
        "name": "The Postman Always Rings Twice",
        "description": "When you arrive at a scene after someone has died or fled, you can reconstruct what happened as if you witnessed it directly."
      },
      {
        "id": "gumshoe-long-goodbye",
        "name": "The Long Goodbye",
        "description": "You cannot be killed outright while investigating an open mystery; if you take fatal harm, you remain alive and functional until you solve the case or uncover the culprit."
      },
      {
        "id": "gumshoe-jessica-jones",
        "name": "Jessica Jones Entry",
        "stat": "tough",
        "description": "When you kick down a locked door, smash through a window, or force entry, roll +Tough. On a 10+, you breach cleanly and catch everyone inside off guard; take +1 forward. On a 7-9, you breach, but it’s loud and alarms sound. On a miss, the door is fortified and you take 1-harm."
      },
      {
        "id": "gumshoe-out-of-the-past",
        "name": "Out of the Past",
        "stat": "charm",
        "description": "When an old flame, ex-partner, or former client crosses your path, roll +Charm. On a 10+, they provide crucial assistance with no strings attached. On a 7-9, they help, but demand closure or payment. On a miss, old vendettas blow up."
      },
      {
        "id": "gumshoe-asphalt-jungle",
        "name": "Asphalt Jungle",
        "description": "In urban environments, you can never be ambushed or trailed without your knowledge."
      },
      {
        "id": "gumshoe-hacker-dragon",
        "name": "Hacker with a Dragon Tattoo",
        "stat": "sharp",
        "description": "When you dig into digital records, bank logs, or surveillance databases, roll +Sharp. On a 10+, you get the exact documents needed. On a 7-9, you find them, but your digital trace is flagged. On a miss, ICE or cyber-cabal countermeasures lock you out."
      },
      {
        "id": "gumshoe-columbo",
        "name": "Just One More Thing",
        "stat": "charm",
        "description": "When you feign confusion or clumsiness to catch a suspect off guard with a sudden question, roll +Charm. On a 10+, they inadvertently reveal their guilt or secret. On a 7-9, they slip up with a partial confession. On a miss, they realize you are probing them and become hostile."
      }
    ],
    "gearChoices": [
      "Laptop",
      "Flask",
      "Night vision camera",
      "Cassette tape recorder",
      "Tiny digital video camera",
      "Remote camera drone",
      "Film camera (8mm/16mm)",
      "Digital sound recorder",
      "Laser microphone",
      "SLR camera",
      ".38 revolver (2-harm close reload loud)",
      "9mm (2-harm close loud)",
      "Brass knuckles (1-harm hand small)",
      "Magnum (3-harm close reload loud)",
      "Shotgun (3-harm close messy loud)",
      "Switchblade (1-harm hand small)"
    ],
    "improvements": [
      "+1 Charm (max +3)",
      "+1 Cool (max +2)",
      "+1 Tough (max +2)",
      "+1 Sharp (max +3)",
      "Take another Gumshoe move",
      "Take another Gumshoe move",
      "Add 1 harm box before Dying",
      "Haven office (2 options)",
      "Add 4 contacts to Naked City"
    ],
    "advancedImprovements": [
      "+1 any (max +3)",
      "Change playbook",
      "Second hunter",
      "Mark 2 basic moves advanced",
      "Mark 2 basic moves advanced",
      "Turn a contact into an ally",
      "Retire to safety",
      "Erase 1 Luck"
    ],
    "subMechanics": {
      "title": "Gumshoe Code & Contacts",
      "description": "Gumshoe Code. Inherent: Occult Confidential, The Naked City (4 contacts).",
      "options": [
        "Beat cop",
        "Coroner",
        "Bartender",
        "Mob lieutenant",
        "Fence",
        "Hacker"
      ]
    }
  },
  {
    "id": "the-hex",
    "name": "The Hex",
    "tagline": "I went looking for power, and power found me. Magic has a price, and I’m ready to pay.",
    "description": "A practitioner of wild, dangerous magic whose rotes channel immense destructive force.",
    "luckSpecial": "Spell backlash is extra nasty until mystery ends.",
    "statOptions": [
      {
        "charm": 2,
        "cool": 0,
        "sharp": 0,
        "tough": -1,
        "weird": 2
      },
      {
        "charm": 1,
        "cool": -1,
        "sharp": 1,
        "tough": 0,
        "weird": 2
      },
      {
        "charm": -1,
        "cool": 1,
        "sharp": 0,
        "tough": 1,
        "weird": 2
      },
      {
        "charm": -1,
        "cool": 0,
        "sharp": 1,
        "tough": 1,
        "weird": 2
      },
      {
        "charm": 0,
        "cool": 0,
        "sharp": 2,
        "tough": -1,
        "weird": 2
      }
    ],
    "moves": [
      {
        "id": "hex-bad-luck-charm",
        "name": "Bad Luck Charm (Inherent)",
        "description": "Whenever you roll a miss on Use Magic or a Rote, bad luck lashes out. Someone nearby (friend or foe) suffers 1-harm or a catastrophic mishap."
      },
      {
        "id": "hex-burn-everything",
        "name": "Burn Everything",
        "stat": "weird",
        "description": "When you cast destructive elemental fire magic, roll +Weird. On a 10+, inflict 3-harm close fire area messy. On a 7-9, inflict 2-harm, but everything flammable nearby catches fire. On a miss, the fire consumes your own position."
      },
      {
        "id": "hex-cast-the-bones",
        "name": "Cast the Bones",
        "stat": "weird",
        "description": "When you consult runes, bones, or tarot cards, roll +Weird. On a 10+, ask 2 Investigate questions. On a 7-9, ask 1 question. On a miss, a malevolent spirit whispers a lie."
      },
      {
        "id": "hex-force-of-will",
        "name": "Force of Will",
        "description": "When you take harm, you can channel willpower to shrug off pain: mark 1-harm less (minimum 0), but your next magic roll takes -1 forward."
      },
      {
        "id": "hex-luck-of-damned",
        "name": "Luck of the Damned",
        "description": "When you spend a point of Luck, you may choose to take 1-harm ignore-armour instead of marking Luck."
      },
      {
        "id": "hex-sympathetic-token",
        "name": "Sympathetic Token",
        "stat": "weird",
        "description": "When you possess a personal item or body sample from a target and cast a hex on them from afar, roll +Weird. On a 10+, the hex affects them as if you were standing right next to them. On a 7-9, it affects them, but destroys the token. On a miss, the hex rebounds upon you."
      },
      {
        "id": "hex-this-might-sting",
        "name": "This Might Sting",
        "stat": "weird",
        "description": "When you magically heal someone by transferring their injury into inanimate matter or a nearby plant/animal, roll +Weird. On a 10+, heal 2-harm cleanly. On a 7-9, heal 2-harm, but the surrounding area wilts or shatters loudly. On a miss, you take the harm."
      },
      {
        "id": "hex-wise-soul",
        "name": "Wise Soul",
        "description": "You can read and cast spells from ancient grimoires without needing to roll Use Magic first."
      }
    ],
    "gearChoices": [
      "Magical items/amulets",
      ".38 revolver (2-harm close reload loud)",
      "Shotgun (3-harm close messy loud)",
      "Athame (2-harm hand magic silver)",
      "Shillelagh (1-harm hand balanced)",
      "Crossbow (2-harm close slow)",
      "Staff (1-harm hand balanced large)"
    ],
    "improvements": [
      "+1 Weird (max +3)",
      "+1 Cool (max +2)",
      "+1 Charm (max +2)",
      "+1 Sharp (max +2)",
      "Take another Rote",
      "Take another Rote",
      "Take another Rote",
      "Take Hex move or Rote",
      "Take Hex move or Rote",
      "Haven (2 options)",
      "Move from another playbook"
    ],
    "advancedImprovements": [
      "+1 any (max +3)",
      "Change playbook",
      "Second hunter",
      "Mark 2 basic moves advanced",
      "Mark 2 basic moves advanced",
      "Retire to safety",
      "Erase 1 Luck",
      "Gain 2 Rotes",
      "Choose 1 Advanced Hex move: Apotheosis or Synthesis"
    ],
    "subMechanics": {
      "title": "Temptation & Rotes",
      "description": "Temptation: Vengeance, Power, Addiction, Callousness, Carnage, Secrets, Glory. Rotes: Rote manager (starts with 1). Inherent Move: Bad Luck Charm.",
      "options": [
        "Vengeance",
        "Power",
        "Addiction",
        "Callousness",
        "Carnage",
        "Secrets",
        "Glory"
      ]
    }
  }
];

export const PLAYBOOKS: PlaybookDefinition[] = [
  ...PLAYBOOKS_1_TO_14,
  ...PLAYBOOKS_15_TO_21,
  ...PLAYBOOKS_22_TO_28,
];

export const PLAYBOOKS_DATA: PlaybookDefinition[] = PLAYBOOKS;

/**
 * Automated Runtime Playbook Data Audit & Schema Integrity Check
 * Runs when the app mounts to verify all 28 playbooks satisfy Monster of the Week standards:
 * - Exactly 5 valid rating lines with numerical attributes
 * - Moves array populated with full trigger and outcome text
 * - Defined luckSpecial string
 * - Defined starting gear options
 */
export function validatePlaybookIntegrity(playbooks: PlaybookDefinition[]): boolean {
  const issues: string[] = [];

  if (!Array.isArray(playbooks) || playbooks.length !== 28) {
    issues.push(`Expected 28 canonical playbooks, but found ${playbooks?.length ?? 0}`);
  }

  playbooks.forEach((p) => {
    // 1. Exactly 5 valid rating lines
    if (!Array.isArray(p.statOptions) || p.statOptions.length !== 5) {
      issues.push(`[${p.name}] Must have exactly 5 stat options rating lines (found ${p.statOptions?.length || 0})`);
    } else {
      p.statOptions.forEach((s, idx) => {
        if (
          typeof s.charm !== 'number' ||
          typeof s.cool !== 'number' ||
          typeof s.sharp !== 'number' ||
          typeof s.tough !== 'number' ||
          typeof s.weird !== 'number'
        ) {
          issues.push(`[${p.name}] Stat option line ${idx + 1} has invalid or missing rating numbers`);
        }
      });
    }

    // 2. Specific moves array populated with full trigger and outcome text
    if (!Array.isArray(p.moves) || p.moves.length === 0) {
      issues.push(`[${p.name}] Missing moves array or has 0 moves defined`);
    } else {
      p.moves.forEach((m, idx) => {
        if (!m.name || !m.name.trim()) {
          issues.push(`[${p.name}] Move at index ${idx} is missing a name`);
        }
        if (!m.description || !m.description.trim()) {
          issues.push(`[${p.name}] Move "${m.name || idx}" is missing full trigger and outcome text`);
        }
      });
    }

    // 3. Defined luckSpecial string
    if (!p.luckSpecial || typeof p.luckSpecial !== 'string' || !p.luckSpecial.trim()) {
      issues.push(`[${p.name}] Must have a defined luckSpecial string`);
    }

    // 4. Defined gear options
    if (!Array.isArray(p.gearChoices) || p.gearChoices.length === 0) {
      issues.push(`[${p.name}] Must have gear options defined`);
    }
  });

  if (issues.length > 0) {
    console.warn(`[MOTW Companion] Playbook Data Audit warning — ${issues.length} issue(s) detected:\n` + issues.join('\n'));
    return false;
  }

  console.log(`[MOTW Companion] Playbook Data Audit passed: all ${playbooks.length} playbooks verified successfully.`);
  return true;
}

// Module load check
validatePlaybookIntegrity(PLAYBOOKS);
