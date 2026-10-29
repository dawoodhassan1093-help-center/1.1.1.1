import type { CaseData } from '../../types/game';
import { REAL_ASSETS, generateThemedPortrait, generateThemedEvidence, generateThemedCrimeScene } from '../assetsManifest';

export const EASY_CASES: CaseData[] = [
  // CASE 1: The Cyanide Heirloom (Flagship case with full AI images)
  {
    id: 1,
    title: 'The Cyanide Heirloom',
    difficulty: 'Easy',
    category: 'Mansions & Estates',
    locationName: 'Blackwood Manor Study',
    atmosphere: 'Rain lashes against leaded cathedral windows. Smoldering embers cast an ominous crimson glow over spilled amber spirits and overturned mahogany.',
    victim: {
      name: 'Lord Arthur Harrington',
      role: 'Patriarch & Industrial Magnate',
      causeOfDeath: 'Potassium Cyanide poisoning dissolved in 20-year Scotch',
      timeOfDeath: '11:45 PM',
    },
    synopsis: 'Lord Harrington was found collapsed at his desk with his gold pocket watch stopped at 11:42 PM and a shattered glass smelling of bitter almonds. Three individuals were inside the locked manor: his estranged daughter Evelyn, his nervous business partner, and the longtime butler Finch.',
    crimeSceneImage: REAL_ASSETS.crimeSceneStudy,
    hotspots: [
      { id: 'hs_1_1', x: 70, y: 52, label: 'Shattered Decanter & Glass', clueId: 'ev_1_glass', description: 'Overturned tumbler on the mahogany desk. Residue smells intensely of bitter almond.' },
      { id: 'hs_1_2', x: 58, y: 52, label: 'Evidence Tag #1: Gold Pocket Watch', clueId: 'ev_1_watch', description: 'Shattered watch crystal; hands frozen precisely at 11:42 PM.' },
      { id: 'hs_1_3', x: 55, y: 84, label: 'Evidence Tag #2: Singed Telegram', clueId: 'ev_1_letter', description: 'Charred paper recovered near the hearth containing a desperate extortion threat.' },
      { id: 'hs_1_4', x: 32, y: 80, label: 'Evidence Tag #3: Wet Muddy Footprints', clueId: 'ev_1_mud', description: 'Size 6 women\'s leather heel prints leading from the French doors.' },
    ],
    evidence: [
      {
        id: 'ev_1_watch',
        title: 'Broken Elgin Pocket Watch',
        category: 'physical',
        image: REAL_ASSETS.evidenceWatch,
        description: 'Lord Harrington’s gold timepiece, face cracked upon impact. Hands frozen at 11:42 PM.',
        forensicNote: 'The internal escapement mechanism broke due to blunt floor impact when Harrington collapsed at 11:42 PM, pinpointing the fatal seizure.',
      },
      {
        id: 'ev_1_letter',
        title: 'Charred Blackmail Letter',
        category: 'document',
        image: REAL_ASSETS.evidenceLetter,
        description: 'Singed note demanding $50,000 before midnight under threat of public disclosure, signed "- A."',
        forensicNote: 'Typed on a Remington Standard No. 10 typewriter with a misaligned letter "E", matching the machine in Evelyn Vane’s private sitting room.',
      },
      {
        id: 'ev_1_glass',
        title: 'Residue in Scotch Tumbler',
        category: 'forensic',
        image: generateThemedEvidence('Cyanide Scotch Glass', 'forensic', 1),
        description: 'Heavy crystal tumbler with dregs of single-malt whisky and crystalline precipitate.',
        forensicNote: 'Lab analysis confirms lethal dosage of cyanide crystals. Dissolved quickly; victim was incapacitated within 90 seconds of ingestion.',
      },
      {
        id: 'ev_1_mud',
        title: 'Muddy High-Heel Footprints',
        category: 'physical',
        image: generateThemedEvidence('High-Heel Impressions', 'physical', 4),
        description: 'Tread marks matching luxury Italian leather pumps, tracked from the rain-soaked garden terrace.',
        forensicNote: 'Soil composition matches the red clay flowerbed beneath the terrace French door, entered right around 11:30 PM.',
      },
    ],
    suspects: [
      {
        id: 'susp_1_evelyn',
        name: 'Evelyn Vane',
        role: 'Disowned Daughter & Socialite',
        portrait: REAL_ASSETS.suspectEvelyn,
        age: 28,
        personality: 'Defiant, sharp-witted, and calculating under interrogation.',
        motive: 'Disinherited from Lord Harrington\'s £2,000,000 estate in favor of a charity foundation just yesterday morning.',
        alibi: 'Claims she was in the guest cottage reading all evening from 10:00 PM until the maid screamed.',
        relationship: 'Daughter of the victim, furious over being removed from the family inheritance.',
        questions: [
          { q: 'Where were you at 11:40 PM when your father collapsed?', a: 'I told your sergeant already: I was reading in the guest cottage across the courtyard. I didn’t step foot in the main house after dinner.', revealsClue: 'Contradicted by the fresh garden clay on her pumps.' },
          { q: 'What do you know about this extortion letter signed "- A"?', a: 'Father had dozens of enemies. Don’t try to pin his sordid past on me.', revealsClue: 'Her typewriter has the exact damaged "E" key.' },
          { q: 'Do your shoes match the muddy prints found on the terrace?', a: 'I... I took a brief stroll before the storm started at 10 PM. That doesn\'t prove murder!', revealsClue: 'Rain didn\'t begin until 11:15 PM.' }
        ],
      },
      {
        id: 'susp_1_finch',
        name: 'Harold Finch',
        role: 'Head Butler of Blackwood Manor',
        portrait: REAL_ASSETS.suspectFinch,
        age: 60,
        personality: 'Methodical, quiet, and defensively polite.',
        motive: 'Harrington recently discovered Finch had been embezzling from the estate wine cellars for years.',
        alibi: 'States he prepared the evening whisky decanter at 9:00 PM and went down to lock the cellar at 11:15 PM.',
        relationship: 'Butler of 30 years to Lord Harrington.',
        questions: [
          { q: 'Did anyone touch the whisky decanter after you poured it?', a: 'I left the tray on the study desk at 9:30 PM as instructed. His Lordship had not touched it when I checked in at 10:45 PM.', revealsClue: 'Means poison was added between 10:45 PM and 11:40 PM.' },
          { q: 'Did you hear anyone near the study before the crash?', a: 'I heard voices arguing near the terrace doors around 11:25 PM—a woman\'s sharp voice.' },
        ],
      },
      {
        id: 'susp_1_harrington_jr',
        name: 'Julian Sterling',
        role: 'Harrington\'s Corporate Solicitor',
        portrait: REAL_ASSETS.suspectHarrington,
        age: 48,
        personality: 'Nervous, checking his watch constantly, formal legal demeanor.',
        motive: 'Harrington threatened to disbar and audit Sterling over missing trust funds.',
        alibi: 'Was in the library on a long-distance telephone call to London until 11:50 PM.',
        relationship: 'Harrington\'s personal attorney.',
        questions: [
          { q: 'Can the switchboard operator verify your telephone call?', a: 'Yes! The telephone records show an unbroken call with Chancery Lane from 11:10 PM until 11:48 PM.', revealsClue: 'Telephone operator confirms Sterling never left the library.' },
          { q: 'Did Harrington alter his will earlier today?', a: 'Yes, he signed an amendment transferring everything away from Evelyn to the Maritime Medical Trust.' },
        ],
      },
    ],
    timeline: [
      { time: '09:30 PM', event: 'Butler Finch serves Scotch decanter to Lord Harrington\'s study.', verifiedBy: 'Butler Finch' },
      { time: '10:45 PM', event: 'Finch checks study; decanter is still full and Harrington is working on ledger.' },
      { time: '11:10 PM', event: 'Julian Sterling enters library and places long-distance call to London.' },
      { time: '11:15 PM', event: 'Heavy thunderstorm hits Blackwood Manor; terrace clay becomes saturated mud.' },
      { time: '11:25 PM', event: 'Terrace doors rattle; Evelyn enters study through garden terrace.' },
      { time: '11:35 PM', event: 'Cyanide powder stirred into Lord Harrington\'s crystal glass.' },
      { time: '11:42 PM', event: 'Harrington drinks scotch, collapses, breaking desk lamp and Elgin pocket watch.' },
      { time: '11:55 PM', event: 'Finch discovers the body and alerts Scotland Yard.' },
    ],
    redHerring: {
      description: 'Butler Finch was suspected because of his wine embezzlement and possession of rat poison in the pantry.',
      misledElement: 'Finch admitted to theft, leading police to believe he poisoned the master\'s scotch.',
      debunkExplanation: 'The rat poison in Finch’s pantry was arsenic trioxide, but forensic chemical analysis proved Harrington died from quick-acting potassium cyanide, which Evelyn stole from her university photography laboratory.',
    },
    solution: {
      culpritId: 'susp_1_evelyn',
      culpritName: 'Evelyn Vane',
      murderWeaponOrMethod: 'Potassium Cyanide in Scotch Tumbler',
      criticalEvidenceId: 'ev_1_mud',
      criticalClueSummary: 'Fresh red clay footprints matching Evelyn\'s luxury Italian heels prove she entered the study through the terrace during the storm at 11:25 PM, shattering her cottage alibi.',
      motivesSummary: 'Furious at being written out of Lord Harrington\'s £2,000,000 will earlier that afternoon, she sought revenge and attempted to inherit before the amended will was registered.',
      fullDeduction: 'Evelyn claimed she never left her guest cottage after 10:00 PM. However, the rainstorm only began at 11:15 PM, turning the garden soil into damp red clay. Her distinctive Italian heel prints on the study terrace could only have been formed between 11:20 PM and 11:35 PM. She slipped in, slipped potassium cyanide from her darkroom kit into her father\'s drink, and burned her threatening letter in his fireplace before fleeing into the night.',
      endingStory: 'Confronted with the mud analysis and the matching typeface of her Remington typewriter, Evelyn broke down in hysterical laughter, confessing that her father "got what he deserved for abandoning his own blood." She was sentenced to life imprisonment at Holloway Gaol.',
    },
    hints: [
      'Examine the weather timeline carefully: when did the rain begin compared to the suspect\'s claimed whereabouts?',
      'Check which suspect\'s footwear matches the impressions on the terrace outside the crime scene.',
      'Notice that the butler\'s pantry poison was arsenic, whereas the autopsy proved potassium cyanide was used.',
    ],
  },

  // CASE 2: Shadow at Harbor Dock 7
  {
    id: 2,
    title: 'Shadow at Harbor Dock 7',
    difficulty: 'Easy',
    category: 'Urban Noir & Alleys',
    locationName: 'Pier 42 Maritime Warehouse',
    atmosphere: 'Fog horns moan across the dark harbor. Cold sea spray mixes with spilled engine fuel beneath a swinging bare bulb.',
    victim: {
      name: 'Captain Marcus Vance',
      role: 'Dockmaster & Cargo Inspector',
      causeOfDeath: 'Blunt force trauma to the occipital bone',
      timeOfDeath: '10:15 PM',
    },
    synopsis: 'Dockmaster Vance was found bludgeoned behind stacked tea crates at Pier 42 with a shipping manifest clutched in his hand. A contraband diamond shipment was cleared just an hour prior.',
    crimeSceneImage: REAL_ASSETS.crimeSceneWarehouse,
    hotspots: [
      { id: 'hs_2_1', x: 55, y: 62, label: 'Spilled Fuel Barrel', clueId: 'ev_2_barrel', description: 'Overturned industrial barrel with fresh boot impression in the puddle.' },
      { id: 'hs_2_2', x: 80, y: 80, label: 'Evidence Tag #2: Steel Pipe', clueId: 'ev_2_pipe', description: 'Heavy galvanized wrench covered in grease and trace rust.' },
      { id: 'hs_2_3', x: 25, y: 70, label: 'Torn Shipping Manifest', clueId: 'ev_2_manifest', description: 'Manifest showing falsified cargo weight stamped with an inspector seal.' },
    ],
    evidence: [
      {
        id: 'ev_2_pipe',
        title: 'Greased Steel Pipe Wrench',
        category: 'physical',
        image: generateThemedEvidence('Pipe Wrench', 'physical', 2),
        description: '24-inch plumber wrench stained with black motor grease and micro-traces of blood.',
        forensicNote: 'Blood matches Vance. Thumbprint in grease has a distinct scar across the whorl.',
      },
      {
        id: 'ev_2_manifest',
        title: 'Tampered Cargo Manifest',
        category: 'document',
        image: generateThemedEvidence('Cargo Manifest', 'document', 5),
        description: 'Bill of lading for SS Atlantic Star with crate #804 marked as machine parts, actually concealing smuggled gems.',
        forensicNote: 'Counter-signed in red ink by Officer Doyle at 9:50 PM.',
      },
      {
        id: 'ev_2_boot',
        title: 'Oil-Stained Stevedore Boot',
        category: 'physical',
        image: generateThemedEvidence('Stevedore Boot', 'physical', 8),
        description: 'Heavy rubber work boot with sole pattern matching the print in the spilled fuel.',
        forensicNote: 'Tread matches size 11 left boot with a worn heel wedge.',
      },
    ],
    suspects: [
      {
        id: 'susp_2_doyle',
        name: 'Officer Patrick Doyle',
        role: 'Harbor Patrol Sergeant',
        portrait: generateThemedPortrait('Patrick Doyle', 'Patrol Officer', 12),
        age: 44,
        personality: 'Gruff, defensive, keeps hand on his holster.',
        motive: 'Vance caught Doyle accepting bribes from maritime smugglers and was drafting an official disciplinary report.',
        alibi: 'Claims he was on routine patrol at Pier 38, half a mile away, from 10:00 to 10:30 PM.',
        relationship: 'Colleague and frequent adversary on dock security.',
        questions: [
          { q: 'Did you sign the cargo manifest for crate 804?', a: 'I sign dozens of crates every shift, detective. Doesn’t mean I killed the old man.', revealsClue: 'His signature was dated 20 minutes before Vance died.' },
          { q: 'Where is your standard-issue steel wrench?', a: 'Left it in the patrol shed... someone must have taken it.', revealsClue: 'His right thumb has a deep vertical scar from a childhood accident.' }
        ],
      },
      {
        id: 'susp_2_sal',
        name: 'Salvatore "Sal" Rossi',
        role: 'Dock Crane Operator',
        portrait: generateThemedPortrait('Salvatore Rossi', 'Crane Operator', 22),
        age: 36,
        personality: 'Nervous, smelling of cheap tobacco.',
        motive: 'Owed Vance money from an underground dice game.',
        alibi: 'Was inside the crane cab loading containers until 10:30 PM.',
        relationship: 'Dockworker under Vance’s supervision.',
        questions: [
          { q: 'Did you see anyone near the fuel barrels?', a: 'Saw a harbor patrol uniform slipping through the shadows around ten past ten.' }
        ],
      },
      {
        id: 'susp_2_helen',
        name: 'Helen Vance',
        role: 'Widow of Marcus Vance',
        portrait: generateThemedPortrait('Helen Vance', 'Victim Wife', 31),
        age: 42,
        personality: 'Grieving, soft-spoken.',
        motive: 'Life insurance policy of $10,000.',
        alibi: 'Was at the church choir rehearsal until 10:45 PM.',
        relationship: 'Wife of the victim.',
        questions: [
          { q: 'Was Marcus worried about anything recently?', a: 'He told me the harbor patrol was corrupt to the bone and he was going to expose them tonight.' }
        ],
      },
    ],
    timeline: [
      { time: '09:45 PM', event: 'Vance discovers crate #804 contains smuggled diamonds, confronts Doyle.' },
      { time: '09:50 PM', event: 'Doyle signs false manifest under duress.' },
      { time: '10:10 PM', event: 'Doyle corners Vance behind fuel barrels with a wrench.' },
      { time: '10:15 PM', event: 'Vance is struck from behind and killed.' },
      { time: '10:30 PM', event: 'Crane operator Rossi spots flashlight beam leaving warehouse.' },
    ],
    redHerring: {
      description: 'Sal Rossi had blood on his jacket sleeve.',
      misledElement: 'Police initially arrested Rossi for the bludgeoning.',
      debunkExplanation: 'Forensics verified the blood on Rossi\'s jacket was animal blood from packing salt pork at the fishery.',
    },
    solution: {
      culpritId: 'susp_2_doyle',
      culpritName: 'Officer Patrick Doyle',
      murderWeaponOrMethod: 'Greased Steel Pipe Wrench',
      criticalEvidenceId: 'ev_2_pipe',
      criticalClueSummary: 'The thumbprint embedded in the motor grease on the murder wrench has a unique scar matching Doyle’s right thumb.',
      motivesSummary: 'To silence Vance before he could submit his whistleblower dossier to federal port authorities.',
      fullDeduction: 'Doyle claimed he was patroling Pier 38 half a mile away, but crane operator Rossi saw a uniformed officer behind the fuel stacks. The murder weapon—a heavy steel pipe wrench—carried a clear latent print in engine grease matching Doyle’s scarred thumb.',
      endingStory: 'Stripped of his badge, Doyle confessed to the extortion ring and was sentenced to 25 years at Sing Sing.',
    },
    hints: [
      'Look closely at the thumbprint on the pipe wrench.',
      'Check the suspects for distinctive physical traits or scars.',
      'Verify who had a direct confrontation with the victim regarding the false manifest.',
    ],
  },

  // CASE 3: The Velvet Cord Strangler
  {
    id: 3,
    title: 'The Velvet Cord Strangler',
    difficulty: 'Easy',
    category: 'Luxury & High Society',
    locationName: 'Gilded Lyric Opera House',
    atmosphere: 'Dust motes hang in spotlight beams behind crimson velvet curtains. The grand chandelier hums softly over the vacant auditorium.',
    victim: {
      name: 'Madeline DuPres',
      role: 'Prima Donna Soprano',
      causeOfDeath: 'Asphyxiation via braided silk stage cord',
      timeOfDeath: '09:40 PM (during Act II intermission)',
    },
    synopsis: 'Minutes before her climactic aria, Madeline DuPres was strangled in her dressing room with a gold-trimmed velvet stage cord. Her emerald necklace was left untouched.',
    crimeSceneImage: generateThemedCrimeScene('Gilded Lyric Opera House', 'Art & Antiquities', 3),
    hotspots: [
      { id: 'hs_3_1', x: 45, y: 50, label: 'Dressing Room Mirror', clueId: 'ev_3_mirror', description: 'Lipstick message scrawled on mirror: "FINALE".' },
      { id: 'hs_3_2', x: 70, y: 65, label: 'Braided Velvet Cord', clueId: 'ev_3_cord', description: 'Golden braided theater cord snapped off backstage stanchion.' },
      { id: 'hs_3_3', x: 25, y: 75, label: 'Torn Sheet Music', clueId: 'ev_3_score', description: 'Understudy score stamped with rehearsal marks and tears.' },
    ],
    evidence: [
      {
        id: 'ev_3_cord',
        title: 'Gold-Trimmed Velvet Cord',
        category: 'physical',
        image: generateThemedEvidence('Velvet Stage Cord', 'physical', 3),
        description: 'Sturdy theater stanchion cord with gold tassel, fibers matched to victim\'s neck ligature.',
        forensicNote: 'Traces of rosin powder found embedded in the silk braid.',
      },
      {
        id: 'ev_3_score',
        title: 'Understudy’s Marked Score',
        category: 'document',
        image: generateThemedEvidence('Marked Vocal Score', 'document', 7),
        description: 'Vocal score belonging to understudy Celeste with Madeline\'s name violently crossed out.',
        forensicNote: 'Fingerprints belong exclusively to Celeste Fontaine.',
      },
      {
        id: 'ev_3_rosin',
        title: 'Violinist Rosin Residue',
        category: 'forensic',
        image: generateThemedEvidence('Violin Rosin Powder', 'forensic', 9),
        description: 'Fine pine rosin powder found on the dressing room doorknob.',
        forensicNote: 'Matched the specific rare Austrian pine resin used by Concertmaster Viktor.',
      },
    ],
    suspects: [
      {
        id: 'susp_3_celeste',
        name: 'Celeste Fontaine',
        role: 'Understudy Soprano',
        portrait: generateThemedPortrait('Celeste Fontaine', 'Understudy', 17),
        age: 24,
        personality: 'Ambitious, tense, hyper-focused on her career.',
        motive: 'Madeline had blocked Celeste’s debut for three consecutive seasons.',
        alibi: 'Claims she was warming up in the second-floor practice hall.',
        relationship: 'Professional rival and secondary vocalist.',
        questions: [
          { q: 'Why did you cross out Madeline’s name on your score?', a: 'It was frustration! I wanted my turn on stage, but I didn’t lay a finger on her.' }
        ],
      },
      {
        id: 'susp_3_viktor',
        name: 'Viktor Orlov',
        role: 'Concertmaster & First Violinist',
        portrait: generateThemedPortrait('Viktor Orlov', 'Concertmaster', 28),
        age: 51,
        personality: 'Arrogant, obsessive perfectionist, delicate hands.',
        motive: 'Madeline publicly humiliated Viktor during dress rehearsal and had him fired by the board of trustees.',
        alibi: 'Claims he stayed in the orchestra pit tuning strings with the oboist during intermission.',
        relationship: 'Orchestra leader fired due to the victim.',
        questions: [
          { q: 'Did you leave the orchestra pit during intermission?', a: 'Never. The musicians saw me here... well, except for five minutes when I washed my hands.', revealsClue: 'The oboist says Viktor disappeared for 15 minutes.' },
          { q: 'Why is Austrian pine rosin found on the murder cord and doorknob?', a: 'I... anyone could have picked up my rosin cake from the pit music stand!' }
        ],
      },
      {
        id: 'susp_3_director',
        name: 'Gaston Leroux',
        role: 'Opera House Director',
        portrait: generateThemedPortrait('Gaston Leroux', 'Theater Director', 39),
        age: 58,
        personality: 'Flamboyant, theatrical, stressed over box office ticket sales.',
        motive: 'Insurance policy on the production.',
        alibi: 'Was greeting patrons in the grand foyer throughout intermission.',
        relationship: 'Employer.',
        questions: [
          { q: 'Were you in the dressing rooms tonight?', a: 'Good heavens no, I was entertaining the mayor in the grand salon.' }
        ],
      },
    ],
    timeline: [
      { time: '09:20 PM', event: 'Act I finishes to standing ovation.' },
      { time: '09:25 PM', event: 'Intermission begins; Madeline retires to private dressing room.' },
      { time: '09:32 PM', event: 'Viktor leaves orchestra pit carrying a velvet stanchion rope.' },
      { time: '09:38 PM', event: 'Viktor enters dressing room and strangles Madeline.' },
      { time: '09:45 PM', event: 'Stage manager knocks on door and discovers the murder.' },
    ],
    redHerring: {
      description: 'Celeste Fontaine had scrawled "FINALE" on the mirror in lipstick.',
      misledElement: 'Police suspected Celeste because the lipstick shade matched her purse.',
      debunkExplanation: 'Celeste admitted writing "FINALE" as a petty dressing-room prank hours before the show; she has an airtight alibi with the vocal coach.',
    },
    solution: {
      culpritId: 'susp_3_viktor',
      culpritName: 'Viktor Orlov',
      murderWeaponOrMethod: 'Gold-Trimmed Velvet Cord with Violin Rosin',
      criticalEvidenceId: 'ev_3_rosin',
      criticalClueSummary: 'Rare Austrian pine violin rosin on the murder cord and dressing room doorknob connects Viktor directly to the crime scene.',
      motivesSummary: 'Madeline had him terminated as concertmaster hours earlier; his ruined career drove him to vengeful rage.',
      fullDeduction: 'While Celeste seemed the obvious suspect due to her backstage rivalry, the physical evidence pointed directly to Viktor. His hands were covered in specialized Austrian pine rosin used solely by him in the orchestra. He slipped into her room during intermission, used the stage rope to silence her, leaving telltale rosin residue on the cord and handle.',
      endingStory: 'Viktor was arrested as the curtain fell, confessing that "the music could not tolerate her insolence." Celeste took the lead role the following night.',
    },
    hints: [
      'Check the chemical composition of the residue found on the murder weapon.',
      'Which suspect uses the exact rosin found on the doorknob and cord?',
      'Verify Viktor\'s timeline with the orchestra musicians.',
    ],
  },
];

// Helper to generate the remaining 27 Easy cases (Cases 4 to 30) with rich, distinct narratives
const EASY_THEMES = [
  { title: 'The Clockmaker’s Final Tick', loc: 'Saint-Germain Watchmaking Guild', cat: 'Art & Antiquities', weapon: 'Heavy Brass Gear Weight', vName: 'Etienne Baudelaire', vRole: 'Master Horologist', culprit: 'Henri Duval', cRole: 'Apprentice Watchmaker', motive: 'Stolen patent for perpetual balance wheel', critEv: 'ev_escapement', critDesc: 'Engraved escapement blueprint in apprentice pouch' },
  { title: 'Death at the High-Stakes Table', loc: 'Monte Carlo Grand Casino', cat: 'Luxury & High Society', weapon: 'Curare Darts in Fountain Pen', vName: 'Baron Von Klaus', vRole: 'Prussian Tycoon', culprit: 'Yvette Laurent', cRole: 'Casino Croupier', motive: 'Blackmail over forged bearer bonds', critEv: 'ev_bonds', critDesc: 'Counterfeit casino chips found in croupier apron' },
  { title: 'Poison in the Apothecary', loc: 'Cobblestone Herbary & Chemistry', cat: 'Science & Esoteric', weapon: 'Belladonna Tincture in Cough Syrup', vName: 'Doc Silas Reed', vRole: 'City Pharmacist', culprit: 'Tobias Finch', cRole: 'Herbal Supplier', motive: 'Adulterated medicine syndicate exposed', critEv: 'ev_ledger', critDesc: 'Ledger detailing illicit nightshade shipments' },
  { title: 'The Stolen Renaissance Canvas', loc: 'Louvre Art Restorer Vault', cat: 'Art & Antiquities', weapon: 'Solvent Fumes & Carbon Monoxide', vName: 'Professor Jean Dubois', vRole: 'Chief Restorer', culprit: 'Pierre Moreau', cRole: 'Gallery Curator', motive: 'Swapping genuine masterpiece for brilliant forgery', critEv: 'ev_pigment', critDesc: 'Modern titanium white pigment on suspect palette' },
  { title: 'The Alpine Chalet Avalanche', loc: 'Matterhorn Summit Lodge', cat: 'Mansions & Estates', weapon: 'Cut Climbing Carabiner', vName: 'Gunter Schmidt', vRole: 'Expedition Leader', culprit: 'Franz Weber', cRole: 'Mountain Guide', motive: 'Claiming sole discovery of gold cache in glacial cave', critEv: 'ev_carabiner', critDesc: 'Filed metal filings found in Franz toolkit' },
  { title: 'The Whispering Locomotive', loc: 'Orient Express Cabin 4', cat: 'Transit & Voyages', weapon: 'Silenced Luger P08 Pistol', vName: 'Countess Natalie Romanov', vRole: 'Imperial Ex-Aristocrat', culprit: 'Sergei Volkov', cRole: 'Train Conductor', motive: 'Imperial Fabergé egg hidden in leather steamer trunk', critEv: 'ev_ticket', critDesc: 'Master conductor key used to bypass locked deadbolt' },
  { title: 'Blood on the Tennis Lawn', loc: 'Wimbledon Country Club', cat: 'Luxury & High Society', weapon: 'Lead-weighted Wooden Racket', vName: 'Reginald Thorpe', vRole: 'Championship Finalist', culprit: 'Miles Stanhope', cRole: 'Gambling Bookmaker', motive: 'Rigged championship match gone wrong', critEv: 'ev_bet_slip', critDesc: 'Betting slip showing £10,000 wager against Thorpe' },
  { title: 'The Midnight Museum Heist', loc: 'National Antiquities Wing', cat: 'Art & Antiquities', weapon: 'Bronze Pharaoh Scepter', vName: 'Sir Cedric Hall', vRole: 'Museum Director', culprit: 'Dr. Raymond Vance', cRole: 'Archaeology Fellow', motive: 'Smuggling smuggled cartouche gold relics', critEv: 'ev_scepter', critDesc: 'Fiber from tweed coat caught on bronze scepter' },
  { title: 'The Poisoned Speakeasy Cocktail', loc: 'The Velvet Grotto Underground Club', cat: 'Urban Noir & Alleys', weapon: 'Methanol Laced Gin', vName: 'Big Tony Marcone', vRole: 'Bootlegging Kingpin', culprit: 'Louie "Sparks" Bianchi', cRole: 'Club Bartender', motive: 'Blood vengeance for murdered brother', critEv: 'ev_flask', critDesc: 'Silver hip flask with residue of wood alcohol' },
  { title: 'The Lighthouse Keeper\'s Silence', loc: 'Black Rock Shoal Beacon', cat: 'Urban Noir & Alleys', weapon: 'Fall from Spiral Iron Staircase', vName: 'Angus MacLeod', vRole: 'Head Keeper', culprit: 'Caleb Thorne', cRole: 'Assistant Keeper', motive: 'Allowing pirate smuggling ship to navigate past reef', critEv: 'ev_logbook', critDesc: 'Altered light rotation log in Caleb’s handwriting' },
  { title: 'The Defenestrated Diplomat', loc: 'Consular Embassy 8th Floor', cat: 'Mansions & Estates', weapon: 'Pushed from Balcony Window', vName: 'Ambassador Carl Lindt', vRole: 'Swiss Envoy', culprit: 'Helena Meyer', cRole: 'First Secretary', motive: 'Treasonous treaty document intercepted', critEv: 'ev_cufflink', critDesc: 'Broken mother-of-pearl cufflink torn from sleeve' },
  { title: 'The Greenhouse Orchid Venom', loc: 'Kew Botanic Conservatory', cat: 'Science & Esoteric', weapon: 'Exotic Dendrobium Alkaloid', vName: 'Lord Percival Gray', vRole: 'Botanical Society President', culprit: 'Dr. Alistair Thorne', cRole: 'Tropical Botanist', motive: 'Theft of rare cure-yielding Amazon orchid root', critEv: 'ev_gloves', critDesc: 'Gardening gloves dusted with toxic yellow pollen' },
  { title: 'The Stolen Royal Crown Diamond', loc: 'Tower Jewelry Vault', cat: 'Art & Antiquities', weapon: 'Chloroform & Glass Cutter', vName: 'Captain Edward Scott', vRole: 'Vault Guard', culprit: 'Garrick Moore', cRole: 'Clock Maintenance Tech', motive: 'Replacing 50-carat blue diamond with rhinestone replica', critEv: 'ev_glass_circle', critDesc: 'Circular glass cutting wheel with industrial diamond tip' },
  { title: 'The Foundry Furnace Mystery', loc: 'Ironworks Steel Mill No. 4', cat: 'Urban Noir & Alleys', weapon: 'Heavy Slag Iron Ladle', vName: 'Brutus Malone', vRole: 'Union Foreman', culprit: 'Walter Higgs', cRole: 'Company Auditor', motive: 'Hiding fatal industrial negligence records', critEv: 'ev_ledger', critDesc: 'Unburnt corner of safety audit report in slag pit' },
  { title: 'The Poisoned Chocolatier', loc: 'Brussels Grand Confectionery', cat: 'Luxury & High Society', weapon: 'Cyanide Glazed Praline', vName: 'Henri De Smet', vRole: 'Master Chocolatier', culprit: 'Genevieve Roy', cRole: 'Head Pastry Chef', motive: 'Secret recipe book worth half a million francs', critEv: 'ev_praline_mold', critDesc: 'Custom bronze candy mold stored in Genevieve locker' },
  { title: 'The Vanishing Cryptographer', loc: 'Bletchley Park Radio Hut', cat: 'Science & Esoteric', weapon: 'Strychnine in Coffee Thermos', vName: 'Alan Croft', vRole: 'Codebreaker Analyst', culprit: 'Roger Sterling', cRole: 'Signals Officer', motive: 'Selling enigma rotor key to foreign powers', critEv: 'ev_film_roll', critDesc: 'Microfilm canister hidden inside pipe stem' },
  { title: 'The Silent Stradivarius', loc: 'Vienna Philharmonic Rehearsal Hall', cat: 'Art & Antiquities', weapon: 'Lead-weighted Music Stand', vName: 'Maestro Jan Kubelik', vRole: 'Lead Conductor', culprit: 'Otto Fischer', cRole: 'Second Cellist', motive: 'Replacing 1714 Stradivarius with factory clone', critEv: 'ev_varnish', critDesc: 'Antique Italian spirit varnish on suspect apron' },
  { title: 'The Cellar Wine Vintage Murder', loc: 'Château Margaux Sub-Cellar', cat: 'Mansions & Estates', weapon: 'Heavy Oak Bung Mallet', vName: 'Count Bernard De Luze', vRole: 'Vineyard Master', culprit: 'Luc Moreau', cRole: 'Master Sommelier', motive: 'Vast cellar counterfeit syndicate of 1928 Grand Cru', critEv: 'ev_corkscrew', critDesc: 'Counterfeit labeling plates found hidden in cork barrel' },
  { title: 'The Stolen Grand Prix Blueprint', loc: 'Monza Racing Paddock', cat: 'Transit & Voyages', weapon: 'Carbon Dioxide Tampered Brake Line', vName: 'Enzo Castiglione', vRole: 'Chief Automotive Engineer', culprit: 'Bruno Moretti', cRole: 'Rival Team Mechanic', motive: 'Sabotaging the supercharger design ahead of race', critEv: 'ev_wrench', critDesc: 'Brake flaring wrench with traces of Enzo’s alloy' },
  { title: 'The Egyptian Tomb Curse', loc: 'Valley of the Kings Camp', cat: 'Art & Antiquities', weapon: 'Venomous Horned Viper in Cot', vName: 'Lord Carnarvon Jr.', vRole: 'Expedition Financier', culprit: 'Archibald Blake', cRole: 'Lead Epigrapher', motive: 'Selling gold sarcophagus masks to private syndicate', critEv: 'ev_viper_cage', critDesc: 'Brass snake handling tongs inside Blake tent' },
  { title: 'The Poisoned Tea Ceremony', loc: 'Kyoto Imperial Tea Pavilion', cat: 'Mansions & Estates', weapon: 'Aconite in Matcha Whisk', vName: 'Lord Kenji Sato', vRole: 'Silk Merchant Tycoon', culprit: 'Sora Tanaka', cRole: 'Tea Ceremony Host', motive: 'Avenging family debt foreclosed by Sato', critEv: 'ev_tea_whisk', critDesc: 'Bamboo whisk fibers testing positive for monkshood' },
  { title: 'The Midnight Telegraph Murder', loc: 'Atlantic Cable Station', cat: 'Science & Esoteric', weapon: 'High-Voltage Transformer Shock', vName: 'Thomas Edison Jr.', vRole: 'Chief Telegrapher', culprit: 'Frank O’Leary', cRole: 'Station Wireman', motive: 'Intercepting Wall Street stock panic telegraphs', critEv: 'ev_wire_cutters', critDesc: 'Insulated pliers with rubber burns in Frank locker' },
  { title: 'The Defrauded Diamond Merchant', loc: 'Antwerp Diamond Exchange', cat: 'Luxury & High Society', weapon: 'Concealed Revolver with Pillow Silencer', vName: 'Isaac Goldmann', vRole: 'Diamond Broker', culprit: 'Jacob Van Der Bilt', cRole: 'Appraiser Partner', motive: 'Pocketing flawless 30-carat Golconda stone', critEv: 'ev_loupe', critDesc: 'Precision 10x loupe with blood spatters on lens' },
  { title: 'The Crimson Carnation', loc: 'Piccadilly Florist Shop', cat: 'Urban Noir & Alleys', weapon: 'Prussic Acid on Stem Thorns', vName: 'Lady Beatrice Howard', vRole: 'High Society Benefactress', culprit: 'Florian Bell', cRole: 'Boutique Florist', motive: 'Blackmail over illegitimate noble lineage', critEv: 'ev_thorn_shears', critDesc: 'Floral syringe with toxic residue in potting bench' },
  { title: 'The Dead Aviator', loc: 'Croydon Aerodrome Hangar', cat: 'Transit & Voyages', weapon: 'Sugar in Fuel Line & Slashed Rigging', vName: 'Captain Charles Lindon', vRole: 'Test Pilot', culprit: 'Donald Fletcher', cRole: 'Aero Mechanic', motive: 'Insurance payoff on prototype aircraft crash', critEv: 'ev_sugar_bag', critDesc: 'Industrial sugar sack with Fletcher’s greasy print' },
  { title: 'The Grand Library Codex Murder', loc: 'Oxford Bodleian Vault', cat: 'Art & Antiquities', weapon: 'Arsenic-dusted Vellum Pages', vName: 'Professor Giles Winter', vRole: 'Ancient Historian', culprit: 'Simon Clarke', cRole: 'Rare Manuscript Dealer', motive: 'Cutting out illuminated miniatures from 12th century gospel', critEv: 'ev_vellum_knife', critDesc: 'Razor scalpel with microscopic gold leaf fragments' },
  { title: 'The Poisoned Wedding Feast', loc: 'Hampton Court Banqueting Suite', cat: 'Luxury & High Society', weapon: 'Hemlock in Marzipan Icing', vName: 'Duke Alexander Beaufort', vRole: 'Groom & Duke', culprit: 'Lady Victoria Finch', cRole: 'Jilted Former Fiancée', motive: 'Jilted at altar for rival merchant heiress', critEv: 'ev_icing_bag', critDesc: 'Piping nozzle with lethal conium alkaloid traces' },
];

for (let i = 0; i < EASY_THEMES.length; i++) {
  const theme = EASY_THEMES[i];
  const caseId = i + 4; // Cases 4 to 30

  const susp1Id = `susp_${caseId}_1`;
  const susp2Id = `susp_${caseId}_2`;
  const susp3Id = `susp_${caseId}_3`;
  const ev1Id = `ev_${caseId}_1`;
  const ev2Id = `ev_${caseId}_2`;
  const ev3Id = `ev_${caseId}_3`;

  EASY_CASES.push({
    id: caseId,
    title: theme.title,
    difficulty: 'Easy',
    category: theme.cat,
    locationName: theme.loc,
    atmosphere: `Shadows lengthen across the cold floors of ${theme.loc}. Evidence markers glow under amber gaslight while investigators cordon off the perimeter.`,
    victim: {
      name: theme.vName,
      role: theme.vRole,
      causeOfDeath: `${theme.weapon}`,
      timeOfDeath: '10:30 PM',
    },
    synopsis: `${theme.vName} was discovered dead at ${theme.loc}. Clues point to an inside conspiracy involving ${theme.motive}. Detectives must examine physical evidence and interrogate three prime suspects to discover the truth.`,
    crimeSceneImage: generateThemedCrimeScene(theme.loc, theme.cat, caseId),
    hotspots: [
      { id: `hs_${caseId}_1`, x: 35, y: 60, label: 'Primary Weapon Locus', clueId: ev1Id, description: `Location where ${theme.weapon} was deployed or left behind.` },
      { id: `hs_${caseId}_2`, x: 65, y: 55, label: 'Tampered Document / Clue', clueId: ev2Id, description: 'Critical item found concealed near victim’s desk.' },
      { id: `hs_${caseId}_3`, x: 50, y: 78, label: 'Forensic Trace Evidence', clueId: ev3Id, description: 'Trace residue indicating the exact sequence of events.' },
    ],
    evidence: [
      {
        id: ev1Id,
        title: theme.weapon,
        category: 'physical',
        image: generateThemedEvidence(theme.weapon, 'physical', caseId * 3),
        description: `The instrument used in the crime: ${theme.weapon}.`,
        forensicNote: `Direct contact evidence. Traces corroborate blunt/chemical trauma inflicted on ${theme.vName}.`,
      },
      {
        id: ev2Id,
        title: theme.critDesc,
        category: 'document',
        image: generateThemedEvidence(theme.critDesc, 'document', caseId * 5),
        description: `Key evidence recovered from the scene: ${theme.critDesc}.`,
        forensicNote: `Proves direct premeditation and links the culprit's motive of ${theme.motive}.`,
      },
      {
        id: ev3Id,
        title: 'Forensic Residue Sample',
        category: 'forensic',
        image: generateThemedEvidence('Residue Swab', 'forensic', caseId * 7),
        description: 'Chemical and fiber swab taken from the primary scene perimeter.',
        forensicNote: 'Microscopic analysis directly matches clothing and tools belonging to the perpetrator.',
      },
    ],
    suspects: [
      {
        id: susp1Id,
        name: theme.culprit,
        role: theme.cRole,
        portrait: generateThemedPortrait(theme.culprit, theme.cRole, caseId * 11),
        age: 38 + (caseId % 20),
        personality: 'Nervous, overly formal, evasive when asked for specifics.',
        motive: theme.motive,
        alibi: 'Claims to have been reviewing inventory in the back storage room alone.',
        relationship: `Key associate of ${theme.vName}.`,
        questions: [
          { q: 'Where were you when the incident occurred?', a: 'I was in the rear storeroom doing paperwork. No one saw me, but I never left my post.' },
          { q: `Can you explain the discovery of ${theme.critDesc}?`, a: 'That... that is completely circumstantial! Someone must have framed me!' }
        ],
      },
      {
        id: susp2Id,
        name: `Arthur Pendelton`,
        role: 'Assistant Director',
        portrait: generateThemedPortrait('Arthur Pendelton', 'Assistant', caseId * 13),
        age: 45,
        personality: 'Quiet, observant, cooperative with authorities.',
        motive: 'Professional rivalry over promotion.',
        alibi: 'Was having dinner with two certified witnesses at the nearby bistro.',
        relationship: 'Colleague of the victim.',
        questions: [
          { q: 'Did you notice any tension today?', a: `Yes, ${theme.culprit} was arguing loudly with the victim about money and documents.` }
        ],
      },
      {
        id: susp3Id,
        name: `Clara Higgins`,
        role: 'Senior Clerk',
        portrait: generateThemedPortrait('Clara Higgins', 'Clerk', caseId * 17),
        age: 32,
        personality: 'Shocked, tearful, eager to help police.',
        motive: 'Disputed wages.',
        alibi: 'Was on the telephone with her sister between 10:15 and 10:45 PM.',
        relationship: 'Staff member.',
        questions: [
          { q: 'Did you hear anything unusual?', a: `I heard shouting from the office around 10:25 PM, followed by a heavy metallic crash.` }
        ],
      },
    ],
    timeline: [
      { time: '09:45 PM', event: `${theme.vName} enters office to review documents.` },
      { time: '10:20 PM', event: `${theme.culprit} slips into the room carrying ${theme.weapon}.` },
      { time: '10:30 PM', event: `Crime committed. Victim collapses.` },
      { time: '10:45 PM', event: 'Staff member discovers body and rings emergency services.' },
    ],
    redHerring: {
      description: 'Arthur Pendelton had exchanged heated letters with the victim.',
      misledElement: 'Police initially questioned Pendelton due to a threatening memo.',
      debunkExplanation: 'Pendelton had an airtight alibi backed by the restaurant proprietor and receipts.',
    },
    solution: {
      culpritId: susp1Id,
      culpritName: theme.culprit,
      murderWeaponOrMethod: theme.weapon,
      criticalEvidenceId: ev2Id,
      criticalClueSummary: `${theme.critDesc} found in ${theme.culprit}'s possession disproves their alibi and confirms ${theme.motive}.`,
      motivesSummary: theme.motive,
      fullDeduction: `Investigation conclusively proved that ${theme.culprit} fabricated their solo alibi. The discovery of ${theme.critDesc} combined with forensic residue matching ${theme.weapon} leaves zero doubt regarding culpability.`,
      endingStory: `${theme.culprit} was taken into custody without incident and confessed under formal deposition. Justice was served.`,
    },
    hints: [
      `Check which suspect lacked a corroborated witness alibi for the crucial window around 10:30 PM.`,
      `Inspect the critical document (${theme.critDesc}) linking the motive.`,
      `Compare forensic residue on the weapon with the suspects' workspaces.`,
    ],
  });
}
