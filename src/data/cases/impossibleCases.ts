import type { CaseData } from '../../types/game';
import { generateThemedPortrait, generateThemedEvidence, generateThemedCrimeScene } from '../assetsManifest';

export const IMPOSSIBLE_CASES: CaseData[] = [];

// 30 Unique Mastermind / Impossible Mystery Themes (Levels 71 to 100)
const IMPOSSIBLE_THEMES = [
  { title: 'The Locked Penthouse Hermetic Mystery', loc: 'Skyline Citadel Penthouse Suite', cat: 'Luxury & High Society', weapon: 'Delayed Dry Ice Sublimation & Nitrogen Asphyxiation', vName: 'Lord Douglas Fairbanks-Cole', vRole: 'Billionaire Aero industrialist', culprit: 'Dr. Gregory Finch', cRole: 'Personal Cryo-Physician', motive: 'Altered multi-million tech inheritance trust', critEv: 'ev_vent_residue', critDesc: 'Solid state nitrogen valve cylinder in Finch medical bag' },
  { title: 'The Vanishing Cipher at the Hermitage', loc: 'St. Petersburg Imperial Gallery', cat: 'Art & Antiquities', weapon: 'Hydrocyanic Acid Needle in Mechanical Music Box', vName: 'Baroness Ekaterina Romanova', vRole: 'Imperial Art Restorer', culprit: 'Count Dmitri Volkov', cRole: 'Imperial Court Chamberlain', motive: 'Concealing systematic swap of 40 imperial masterworks', critEv: 'ev_music_pin', critDesc: 'Spring-loaded acoustic trigger needle coated with cyanide' },
  { title: 'The Phantom of the London Underground', loc: 'Abandoned Aldwych Tube Tunnel', cat: 'Urban Noir & Alleys', weapon: 'High-Tension Third Rail Short-Circuit', vName: 'Chief Signalman Timothy Brown', vRole: 'Underground Controller', culprit: 'Gavin Blackwood', cRole: 'Chief Electrical Engineer', motive: 'Using abandoned tunnel for gold bullion heist from Bank station', critEv: 'ev_insulated_jumper', critDesc: 'High-voltage copper jumper cable with Gavin personal initials' },
  { title: 'The Poisoned Renaissance Manuscript', loc: 'Vatican Secret Archives Bay 9', cat: 'Art & Antiquities', weapon: 'Arsenic Tracing on Illuminated Foliage', vName: 'Cardinal Silvio Bellini', vRole: 'Chief Archivist', culprit: 'Fra Roberto Lucani', cRole: 'Scribe & Calligrapher', motive: 'Suppressing heretical medieval gospel translation', critEv: 'ev_quill_tip', critDesc: 'Porcupine quill ink tip testing positive for arsenic sulfide' },
  { title: 'The Ghost of the Trans-Oceanic Dirigible', loc: 'Gondola Control Cabin at 8,000 Feet', cat: 'Transit & Voyages', weapon: 'Barometric Valve Sabotage & Carbon Monoxide', vName: 'Captain Hugo Eckener Jr.', vRole: 'Zeppelin Commander', culprit: 'Helmut Richter', cRole: 'Chief Navigator', motive: 'Forced crash landing in international waters to claim diamond cargo', critEv: 'ev_aneroid_gauge', critDesc: 'Calibrated aneroid barometer with soldered bypass wire' },
  { title: 'The Clockwork Assassin of Prague', loc: 'Old Town Astronomical Clock Mechanism', cat: 'Art & Antiquities', weapon: 'Mechanical Automaton Crossbow Dart', vName: 'Mayor Vaclav Nemec', vRole: 'City Mayor', culprit: 'Jan Horak', cRole: 'Master Clockmaker', motive: 'Revenge for father’s execution under forged sedition charges', critEv: 'ev_cam_gear', critDesc: 'Coded brass clockwork cam timing disk found in Horak drawer' },
  { title: 'The Submerged Submarine Sonar Murder', loc: 'HMS Trident Torpedo Compartment', cat: 'Transit & Voyages', weapon: 'High-Pressure Compressed Air Embolism', vName: 'Lieutenant Commander John Ross', vRole: 'Submarine Captain', culprit: 'Chief Petty Officer Miller', cRole: 'Torpedo Artificer', motive: 'Preventing court-martial for selling naval sonar blueprints', critEv: 'ev_manifold_valve', critDesc: 'Bleeder valve wrench with reverse thread filings' },
  { title: 'The Masquerade of the Thousand Mirrors', loc: 'Palazzo Labia Hall of Mirrors', cat: 'Luxury & High Society', weapon: 'Venetian Stiletto through Acoustic Resonance', vName: 'Prince Alvise Gritti', vRole: 'Venetian Noble', culprit: 'Isabella Morosini', cRole: 'Disguised Opera Singer', motive: 'Avenging her family\'s ruin in the maritime debt scandal', critEv: 'ev_mirror_shard', critDesc: 'Beveled mirror glass fragment with dried blood and perfume' },
  { title: 'The Vanishing Archaeologist of Luxor', loc: 'Tomb of Amenhotep IV Chamber D', cat: 'Art & Antiquities', weapon: 'Sealed Sand Trap Door & Carbon Dioxide Asphyxia', vName: 'Professor Julian Davenport', vRole: 'Expedition Director', culprit: 'Dr. Evelyn Sterling', cRole: 'Lead Epigrapher', motive: 'Sole attribution and sale of intact royal golden chariot', critEv: 'ev_counterweight_pin', critDesc: 'Hydraulic jack pin used to trigger ancient falling portcullis' },
  { title: 'The Cyanide Chalice at the Alpine Summit', loc: 'Mont Blanc Observatory Shelter', cat: 'Mansions & Estates', weapon: 'Potassium Cyanide in Snow-Melt Coffee', vName: 'Dr. Heinrich Vogel', vRole: 'Atmospheric Physicist', culprit: 'Otto Von Braun', cRole: 'Meteorologist', motive: 'Falsifying stratospheric weather weaponization experiments', critEv: 'ev_coffee_tin', critDesc: 'Enamel camp mug with cyanide crust and Otto monogram' },
  { title: 'The Defenestrated Wall Street Baron', loc: 'Empire State Building 68th Floor', cat: 'Urban Noir & Alleys', weapon: 'Hydraulic Piston Push from Sealed Window', vName: 'J.P. Morgan-Wells', vRole: 'Investment Banker', culprit: 'Charles Kingsley', cRole: 'Chief Risk Officer', motive: 'Preventing revelation of $20M phantom railway bond fraud', critEv: 'ev_piston_actuator', critDesc: 'Miniature industrial hydraulic pump found in elevator shaft' },
  { title: 'The Poisoned Grandmaster Gambit', loc: 'Reykjavik Chess Championship Stage', cat: 'Science & Esoteric', weapon: 'Dimethylmercury on Black Queen Chess Piece', vName: 'Grandmaster Boris Korchnoi', vRole: 'World Champion', culprit: 'Dr. Anatoly Vane', cRole: 'Grandmaster Challenger Coach', motive: 'Ensuring state championship victory at all costs', critEv: 'ev_felt_base', critDesc: 'Micro-pipette bulb with organic mercury residue in coat' },
  { title: 'The Silent Monastery Crypt Mystery', loc: 'Mount Athos Byzantine Catacombs', cat: 'Mansions & Estates', weapon: 'Sulfur Dioxide Gas via Crypt Chimney', vName: 'Archimandrite Luke', vRole: 'Monastery Prior', culprit: 'Brother Athanasios', cRole: 'Library Conservator', motive: 'Theft of original 4th-century Codex Sinaiticus leaves', critEv: 'ev_sulfur_crucible', critDesc: 'Brass incense crucible encrusted with elemental sulfur residue' },
  { title: 'The Stolen Enigma Rotor Machine', loc: 'Whitehall Intelligence Bunker Vault', cat: 'Science & Esoteric', weapon: 'Silenced Welrod Pistol through Keyhole', vName: 'Major Arthur Wellesley', vRole: 'Director of Cryptanalysis', culprit: 'Penelope Vance', cRole: 'Senior Decryption Officer', motive: 'Double-agent passing Allied naval codes to foreign handlers', critEv: 'ev_welrod_baffle', critDesc: 'Rubber suppressor baffle with powder burns in vanity compact' },
  { title: 'The Murder in the High-Speed Wind Tunnel', loc: 'Aero Dynamics Research Hangar', cat: 'Transit & Voyages', weapon: 'Supersonic Wind Shear Turbine Decapitation', vName: 'Sir Frank Whittle-Cole', vRole: 'Jet Engine Pioneer', culprit: 'Dr. Raymond Hawke', cRole: 'Compressor Aerodynamicist', motive: 'Selling axial-flow turbojet design patents to foreign cartel', critEv: 'ev_interlock_key', critDesc: 'Safety interlock bypass key carrying Hawke thumbprint' },
  { title: 'The Poisoned Vintage Burgundy 1870', loc: 'Burgundy Grand Cru Underground Cave', cat: 'Mansions & Estates', weapon: 'Strychnine Injected through Cork via Needle', vName: 'Baron Philippe de Rothschild-Vance', vRole: 'Vintner Patriarch', culprit: 'Henri Delacroix', cRole: 'Head Cellar Master', motive: 'Concealing 500 bottles of adulterated industrial plonk', critEv: 'ev_hypodermic_cork', critDesc: 'Microscopic 30-gauge needle puncture in vintage wax seal' },
  { title: 'The Stolen Imperial Jade Dragon', loc: 'Forbidden City Throne Room Annex', cat: 'Art & Antiquities', weapon: 'Crushed Jade Pestle & Aconite Poison', vName: 'Imperial Scholar Li Zicheng', vRole: 'Keeper of Imperial Seals', culprit: 'Eunuch Zhao Kang', cRole: 'Imperial Chamberlain', motive: 'Selling Qianlong dynastic jade imperial dragon seal', critEv: 'ev_jade_chip', critDesc: 'Microscopic nephrite jade flake caught in silk robe hem' },
  { title: 'The Vanishing Polar Expedition Leader', loc: 'Spitsbergen Arctic Research Base', cat: 'Transit & Voyages', weapon: 'Severed Dog Sled Harness & Crevasse Fall', vName: 'Captain Roald Amundsen-Smith', vRole: 'Polar Explorer', culprit: 'Lars Lindqvist', cRole: 'Expedition Navigator', motive: 'Falsifying attainment of magnetic north pole', critEv: 'ev_shorn_trace', critDesc: 'Braided rawhide sled trace cleanly sliced with skinning knife' },
  { title: 'The Defrauded Transatlantic Cable Tycoon', loc: 'Newfoundland Cable Landing Station', cat: 'Urban Noir & Alleys', weapon: 'Galvanic High-Voltage Shock via Morse Key', vName: 'Sir Cyrus Field-West', vRole: 'Cable Consortium Founder', culprit: 'Walter Sterling', cRole: 'Station Chief Telegraphist', motive: 'Front-running market arbitrage on delayed London cable news', critEv: 'ev_short_wire', critDesc: 'Silver contact switch wired to battery bank beneath floorboard' },
  { title: 'The Poisoned Mask of Agamemnon', loc: 'Athens National Museum Bronze Wing', cat: 'Art & Antiquities', weapon: 'Potassium Cyanide Vapor in Sealed Display Case', vName: 'Professor Heinrich Schliemann-Ross', vRole: 'Chief Archaeologist', culprit: 'Dimitrios Papaioannou', cRole: 'Bronze Restorer', motive: 'Replacing original gold funeral mask with electrotyped copper clone', critEv: 'ev_suction_cup', critDesc: 'Industrial glass suction lifter with gold leaf transfer traces' },
  { title: 'The Murder in the Deep-Sea Habitat', loc: 'Conshelf Deepwater Station (200m depth)', cat: 'Science & Esoteric', weapon: 'Helium-Oxygen Gas Mix Poisoning (Pure Nitrogen flush)', vName: 'Dr. Jacques Cousteau-Vance', vRole: 'Chief Aquanaut', culprit: 'Mark Davies', cRole: 'Life Support Engineer', motive: 'Preventing revelation of radioactive nuclear waste seabed dumping', critEv: 'ev_gas_analyzer', critDesc: 'Tampered gas chromatography chart with falsified sensor logs' },
  { title: 'The Poisoned Coronation Chalice', loc: 'Westminster Abbey Chapter House', cat: 'Mansions & Estates', weapon: 'Arsenic Glaze on Holy Anointing Spoon', vName: 'Bishop Archibald Campbell', vRole: 'Dean of the Abbey', culprit: 'Reverend Donald MacGregor', cRole: 'Abbey Sacristan', motive: 'Replacing 1661 coronation gold spoon with gilded brass replica', critEv: 'ev_gilding_solution', critDesc: 'Cyanide gilding bath chemical residue in Donald workshop' },
  { title: 'The Dead Formula 1 Test Driver', loc: 'Nürburgring Karussell Corner', cat: 'Transit & Voyages', weapon: 'Deliberate Magnesium Wheel Rim Failure', vName: 'Wolfgang von Trips-Cole', vRole: 'Grand Prix Champion', culprit: 'Gunther Haas', cRole: 'Chief Metallurgist', motive: 'Rigged championship bet of 500,000 Deutsche Marks', critEv: 'ev_fatigue_saw', critDesc: 'Jeweler saw blade used to score wheel spokes found in Haas locker' },
  { title: 'The Stolen Stradivarius Cello', loc: 'Lugano Private Bank Vault', cat: 'Art & Antiquities', weapon: 'Halon Fire Suppression Gas Suffocation', vName: 'Maestro Antonio Casals', vRole: 'Concert Cellist', culprit: 'Beatrix von Graff', cRole: 'Private Vault Director', motive: 'Selling 1707 "Duport" Stradivarius to private cartel', critEv: 'ev_override_key', critDesc: 'Fire suppression manual override latch with Beatrix fingerprint' },
  { title: 'The Highland Distiller\'s Murder in Mash Tun 1', loc: 'Speyside Glenmorangie Distillery', cat: 'Mansions & Estates', weapon: 'Drowning in 65°C Fermenting Barley Mash', vName: 'Hamish MacLeod', vRole: 'Master Distiller', culprit: 'Rory Campbell', cRole: 'Co-Owner & Cooper', motive: 'Rory secretly adulterating single malt with industrial grain spirits', critEv: 'ev_copper_thermometer', critDesc: 'Copper mashing thermometer bent from blunt defensive struggle' },
  { title: 'The Silent Greenhouse Carnivore Venom', loc: 'Cambridge University Botanical Glasshouse', cat: 'Science & Esoteric', weapon: 'Nepenthes Pitcher Digestive Acid & Curare', vName: 'Professor Charles Darwin-Smith', vRole: 'Carnivorous Plant Authority', culprit: 'Dr. Julian Thorpe', cRole: 'Research Fellow', motive: 'Stealing groundbreaking botanical antibiotic discovery', critEv: 'ev_pipette_bulb', critDesc: 'Micro-pipette with concentrated pitcher enzyme and curare traces' },
  { title: 'The Poisoned Royal Opera Gala', loc: 'Covent Garden Royal Box', cat: 'Luxury & High Society', weapon: 'Prussic Acid in Champagne Flute Rim', vName: 'Princess Alexandra of Hesse', vRole: 'Royal Patroness', culprit: 'Lady Constance Finch', cRole: 'Lady of the Bedchamber', motive: 'Anarchist conspiracy to provoke international diplomatic crisis', critEv: 'ev_velvet_gloves', critDesc: 'Silk evening gloves testing positive for cyanide salts' },
  { title: 'The Murder in the Sealed Bank Safe', loc: 'Manhattan Trust Bank Deep Sub-Vault', cat: 'Urban Noir & Alleys', weapon: 'Time-Lock Oxygen Depletion & Nitrous Oxide', vName: 'Cornelius Vanderbilt-Cole', vRole: 'Bank President', culprit: 'Arthur Pendelton', cRole: 'Time-Lock Master Horologist', motive: 'Looting 2,000 bearer bonds while victim asphyxiated inside safe', critEv: 'ev_escapement_cam', critDesc: 'Custom gear tooth that jammed time-lock for 14 hours' },
  { title: 'The Vanished Renaissance Masterwork', loc: 'Florence Uffizi Secret Corridor', cat: 'Art & Antiquities', weapon: 'Stiletto Dagger through Canvas & Chest', vName: 'Dr. Leonardo Moretti', vRole: 'Uffizi Chief Curator', culprit: 'Giancarlo Rossi', cRole: 'Restorer Guild Master', motive: 'Swapping Botticelli original with meticulous modern forgery', critEv: 'ev_pigment_chip', critDesc: 'Phthalo green synthetic pigment unknown before 1935 on Giancarlo knife' },
  { title: 'The Mastermind of Shadow Case', loc: 'The Black Vault of London', cat: 'Science & Esoteric', weapon: 'Coded Electro-Acoustic Resonator & Cyanide', vName: 'Chief Commissioner Sir Arthur Sterling', vRole: 'Head of Special Branch', culprit: 'Professor Morpheus Black', cRole: 'Criminal Mastermind & Advisor', motive: 'Total destruction of the Shadow Case criminal archives to erase all syndicate records', critEv: 'ev_black_cipher', critDesc: 'The Black Dossier cipher seal matching Morpheus ring' },
];

for (let i = 0; i < IMPOSSIBLE_THEMES.length; i++) {
  const theme = IMPOSSIBLE_THEMES[i];
  const caseId = i + 71; // Cases 71 to 100

  const susp1Id = `susp_${caseId}_1`;
  const susp2Id = `susp_${caseId}_2`;
  const susp3Id = `susp_${caseId}_3`;
  const susp4Id = `susp_${caseId}_4`;
  const ev1Id = `ev_${caseId}_1`;
  const ev2Id = `ev_${caseId}_2`;
  const ev3Id = `ev_${caseId}_3`;
  const ev4Id = `ev_${caseId}_4`;

  IMPOSSIBLE_CASES.push({
    id: caseId,
    title: theme.title,
    difficulty: 'Impossible',
    category: theme.cat,
    locationName: theme.loc,
    atmosphere: `An impenetrable labyrinth of deceit cloaks ${theme.loc}. High-tech locks, deceptive timelines, and forensic enigmas conceal the mastermind's hand.`,
    victim: {
      name: theme.vName,
      role: theme.vRole,
      causeOfDeath: `${theme.weapon}`,
      timeOfDeath: '11:59 PM',
    },
    synopsis: `${theme.vName} was executed inside ${theme.loc} under seemingly impossible conditions. Every suspect has an airtight alibi, and no entry was apparently made. Only the keenest deductive reasoning will pierce the illusion.`,
    crimeSceneImage: generateThemedCrimeScene(theme.loc, theme.cat, caseId),
    hotspots: [
      { id: `hs_${caseId}_1`, x: 28, y: 52, label: 'Hermetic Seal / Lock Mechanism', clueId: ev1Id, description: 'Inspection of the locked entrance reveals microscopic tampering.' },
      { id: `hs_${caseId}_2`, x: 72, y: 58, label: 'Lethal Mechanism / Trap', clueId: ev2Id, description: `The subtle method used: ${theme.critDesc}.` },
      { id: `hs_${caseId}_3`, x: 45, y: 80, label: 'Counter-Forensic Residue', clueId: ev3Id, description: 'Traces left behind when the mechanism was staged.' },
      { id: `hs_${caseId}_4`, x: 60, y: 72, label: 'Coded Timepiece / Record', clueId: ev4Id, description: 'Log revealing the fatal temporal contradiction in the alibis.' },
    ],
    evidence: [
      {
        id: ev1Id,
        title: theme.weapon,
        category: 'physical',
        image: generateThemedEvidence(theme.weapon, 'physical', caseId * 3),
        description: `The intricate instrument: ${theme.weapon}.`,
        forensicNote: `Pathological reconstruction confirms victim died precisely from this mechanism.`,
      },
      {
        id: ev2Id,
        title: theme.critDesc,
        category: 'document',
        image: generateThemedEvidence(theme.critDesc, 'document', caseId * 5),
        description: `Smoking-gun proof: ${theme.critDesc}.`,
        forensicNote: `Undeniably links ${theme.culprit} to the sealed room execution and punctures their alibi.`,
      },
      {
        id: ev3Id,
        title: 'Microscopic Residue & Chemical Traces',
        category: 'forensic',
        image: generateThemedEvidence('Chemical Swab', 'forensic', caseId * 7),
        description: 'Spectrometric analysis confirming chemical markers from the suspect’s personal workshop.',
        forensicNote: 'Matches the suspect’s tools with 99.98% certainty.',
      },
      {
        id: ev4Id,
        title: 'Tampered Chronometer / Cipher Log',
        category: 'document',
        image: generateThemedEvidence('Cipher Log', 'document', caseId * 9),
        description: 'Electronic or mechanical recording proving the event was delayed by a timer.',
        forensicNote: 'Exposes how the suspect appeared to be elsewhere when death actually occurred.',
      },
    ],
    suspects: [
      {
        id: susp1Id,
        name: theme.culprit,
        role: theme.cRole,
        portrait: generateThemedPortrait(theme.culprit, theme.cRole, caseId * 11),
        age: 40 + (caseId % 25),
        personality: 'Genius-level intellect, icy composure, sneering confidence.',
        motive: theme.motive,
        alibi: 'Had an airtight alibi in another wing witnessed by multiple public figures during the estimated time of death.',
        relationship: `Mastermind counterpart to ${theme.vName}.`,
        questions: [
          { q: 'How could anyone enter the room while you were at the banquet?', a: 'They couldn’t. It was physically impossible—unless the killer wasn’t in the room at all when the trap triggered!' },
          { q: `What is your response to ${theme.critDesc}?`, a: 'A brilliant fabrication, detective... but you cannot prove it was me who set the timer.' }
        ],
      },
      {
        id: susp2Id,
        name: 'Lord Sebastian Vance',
        role: 'Chief Security Director',
        portrait: generateThemedPortrait('Lord Sebastian Vance', 'Security Director', caseId * 13),
        age: 54,
        personality: 'Stern, authoritarian, shaken by the security breach.',
        motive: 'Threatened with ruin for gross negligence.',
        alibi: 'Monitoring the main gate cameras and biometric logs.',
        relationship: 'Security chief.',
        questions: [
          { q: 'Was the security system bypassed?', a: 'Only an inside technician with engineering credentials could have altered the relay timer.' }
        ],
      },
      {
        id: susp3Id,
        name: 'Dr. Cassandra Cross',
        role: 'Chief Research Scientist',
        portrait: generateThemedPortrait('Dr. Cassandra Cross', 'Research Scientist', caseId * 17),
        age: 38,
        personality: 'Analytical, fastidious, deeply knowledgeable in forensics.',
        motive: 'Disputed intellectual property.',
        alibi: 'Conducting spectrographic calibration tests with lab technicians.',
        relationship: 'Colleague of the victim.',
        questions: [
          { q: 'Could this mechanism have been prepared in advance?', a: 'Precisely! The chemical reaction or mechanical delay was pre-set hours before.' }
        ],
      },
      {
        id: susp4Id,
        name: 'Victor Kroll',
        role: 'Master Locksmith & Technician',
        portrait: generateThemedPortrait('Victor Kroll', 'Technician', caseId * 19),
        age: 49,
        personality: 'Quiet, observant, working with mechanical tools.',
        motive: 'Financial debt to the victim.',
        alibi: 'Repairing the elevator mechanism in the sub-basement.',
        relationship: 'Estate technician.',
        questions: [
          { q: 'Did anyone request custom parts recently?', a: `Yes, ${theme.culprit} requisitioned specialized high-tolerance alloy fittings last Tuesday.` }
        ],
      },
    ],
    timeline: [
      { time: '08:00 PM', event: `${theme.culprit} secretly plants the timed mechanism inside ${theme.loc}.` },
      { time: '10:00 PM', event: `${theme.culprit} joins high-profile witnesses in public hall to establish airtight alibi.` },
      { time: '11:59 PM', event: `Timed trigger activates. ${theme.vName} collapses behind sealed doors.` },
      { time: '12:30 AM', event: 'Alarm triggers; body discovered in completely locked chamber.' },
    ],
    redHerring: {
      description: 'Victor Kroll had forged master keys and heavy gambling debts.',
      misledElement: 'Police believed Kroll unlocked the door in secret.',
      debunkExplanation: 'The room was sealed with a deadbolt from the INSIDE; no physical key could turn it. The murder was executed via a delayed remote mechanism.',
    },
    solution: {
      culpritId: susp1Id,
      culpritName: theme.culprit,
      murderWeaponOrMethod: theme.weapon,
      criticalEvidenceId: ev2Id,
      criticalClueSummary: `${theme.critDesc} exposed the delayed trigger mechanism, demonstrating how ${theme.culprit} executed the murder from afar while establishing a fake alibi.`,
      motivesSummary: theme.motive,
      fullDeduction: `This locked-room mystery appeared unsolvable because investigators looked for someone who entered the room at midnight. In reality, ${theme.culprit} pre-staged ${theme.weapon} hours in advance. Physical recovery of ${theme.critDesc} and chemical matching established the mastermind\'s undeniable culpability.`,
      endingStory: `Faced with the forensic reconstruction of the timed trigger, ${theme.culprit} bowed their head. "An admirable intellect, detective," they whispered before being escorted to maximum-security confinement.`,
    },
    hints: [
      'Look for the evidence demonstrating a delayed or remote trigger rather than an immediate face-to-face attack.',
      'Check which suspect had the engineering or medical expertise to prepare the mechanism in advance.',
      'The locked door is a distraction: the killer did not need to be present at the moment of death.',
    ],
  });
}
