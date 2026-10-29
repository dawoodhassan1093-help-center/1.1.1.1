import type { CaseData } from '../../types/game';
import { generateThemedPortrait, generateThemedEvidence, generateThemedCrimeScene } from '../assetsManifest';

export const HARD_CASES: CaseData[] = [];

// 40 Unique Hard Mystery Themes (Levels 31 to 70)
const HARD_THEMES = [
  { title: 'The Defenestration at the Savoy', loc: 'Penthouse Suite 1402', cat: 'Luxury & High Society', weapon: 'Blunt Blow then Staged Fall from Balcony', vName: 'Lord George Sterling', vRole: 'Shipping magnate', culprit: 'Corinne Vance', cRole: 'Personal Secretary', motive: 'Altered maritime insurance syndicate bonds', critEv: 'ev_cut_drapes', critDesc: 'Fibers from French curtain sash caught in suspect brooch' },
  { title: 'The Stolen Da Vinci Folio', loc: 'Ambassadorial Archives', cat: 'Art & Antiquities', weapon: 'Cyanide Gas via Ventilation Duct', vName: 'Father Matteo', vRole: 'Vatican Archivist', culprit: 'Dominic Cross', cRole: 'Rare Book Conservator', motive: 'Smuggling priceless anatomical sketchbooks', critEv: 'ev_duct_screws', critDesc: 'Magnetic screwdriver bits with HVAC zinc residue' },
  { title: 'Murder on the Night Ferry', loc: 'English Channel Steamship St. Malo', cat: 'Transit & Voyages', weapon: 'Overboard Drowning via Weighted Iron Anchor', vName: 'Inspector Paul Renard', vRole: 'Interpol Agent', culprit: 'Captain Dirk Meyer', cRole: 'First Mate', motive: 'Silencing international drug cartel probe', critEv: 'ev_deck_log', critDesc: 'Torn course alteration log showing unlogged engine stop' },
  { title: 'The Midnight Casino Vault Heist', loc: 'Riviera Grand Vault Room', cat: 'Luxury & High Society', weapon: 'Compressed Nitroglycerin Blast', vName: 'Chief Cashier Luc Dupont', vRole: 'Vault Manager', culprit: 'Gisele Dubois', cRole: 'Vault Security Tech', motive: 'Theft of 5 million francs in gold ingots', critEv: 'ev_thermal_lens', critDesc: 'Burnt electronic safe dial showing inside bypass code' },
  { title: 'The Silent Greenhouse Strangling', loc: 'Botanical Research Glasshouse', cat: 'Science & Esoteric', weapon: 'Reinforced Wire Garrote', vName: 'Dr. Evelyn Brand', vRole: 'Genetic Botanist', culprit: 'Professor Alan Ward', cRole: 'Lab Department Head', motive: 'Plagiarizing drought-resistant grain genetic patent', critEv: 'ev_wire_spool', critDesc: 'Surgical stainless wire spool with Ward thumbprint' },
  { title: 'The Poisoned Celluloid', loc: 'Silver Screen Film Studios Stage 4', cat: 'Urban Noir & Alleys', weapon: 'Arsenic Coated Lipstick', vName: 'Gloria Swanson-Drake', vRole: 'Leading Silent Screen Star', culprit: 'Daphne Ray', cRole: 'Lead Makeup Artist', motive: 'Revenge for ruined acting career', critEv: 'ev_rouge_pot', critDesc: 'Custom cosmetic compact containing arsenic powder' },
  { title: 'The Vanished Alchemist', loc: 'Prague Alchemical Laboratory', cat: 'Science & Esoteric', weapon: 'Mercury Vapor Suffocation', vName: 'Karel Vaneck', vRole: 'Synthetic Chemist', culprit: 'Otakar Novak', cRole: 'Laboratory Assistant', motive: 'Monopolizing synthetic rubber formula', critEv: 'ev_mercury_flask', critDesc: 'Sealed retort flask with condensed quicksilver droplets' },
  { title: 'The Phantom of the Cathedral Belltower', loc: 'St. Jude Gothic Spire', cat: 'Mansions & Estates', weapon: 'Severed Bell Counterweight Rope', vName: 'Deacon Bartholomew', vRole: 'Cathedral Bellringer', culprit: 'Brother Thomas', cRole: 'Choirmaster', motive: 'Theft of medieval gold communion chalices', critEv: 'ev_hemp_knife', critDesc: 'Rope-cutting razor coated with beeswax and tallow' },
  { title: 'The Transatlantic Zeppelin Sabotage', loc: 'Hindenburg-Class Sky Liner LZ-88', cat: 'Transit & Voyages', weapon: 'Phosphorus Igniter in Cargo Bay', vName: 'Baron von Ritter', vRole: 'Diplomatic Courier', culprit: 'Kurt Hauer', cRole: 'Flight Rigging Engineer', motive: 'Intercepting military coded invasion maps', critEv: 'ev_igniter_fuse', critDesc: 'Burnt copper wire fuse matching Hauer toolbox' },
  { title: 'The Underground Speakeasy Gunshot', loc: 'The Copper Kettle Basement', cat: 'Urban Noir & Alleys', weapon: '.32 Caliber Pocket Derringer', vName: 'Mickey "Two-Times" Coletti', vRole: 'Smuggling Boss', culprit: 'Verna Higgins', cRole: 'Jazz Torch Singer', motive: 'Escaping coercive extortion contract', critEv: 'ev_pearl_inlay', critDesc: 'Pearl grip fragment from derringer found in vanity bag' },
  { title: 'The Rigged Thoroughbred Derby', loc: 'Epsom Downs Paddock Stall 6', cat: 'Luxury & High Society', weapon: 'Digitalis Injection via Horse Brush', vName: 'Lord Henry Ascot', vRole: 'Stable Owner', culprit: 'Dr. Malcolm Keith', cRole: 'Track Veterinarian', motive: 'Collecting syndicate payout on 50-to-1 outsider', critEv: 'ev_syringe', critDesc: 'Hidden hypodermic needle concealed in currycomb' },
  { title: 'The Clockwork Watchmaker\'s Fall', loc: 'Geneva Horological Tower', cat: 'Art & Antiquities', weapon: 'Crushed beneath Tower Pendulum', vName: 'Guillaume Tellier', vRole: 'Master Clockmaker', culprit: 'Louis Mercier', cRole: 'Guild Treasurer', motive: 'Concealing systematic theft of guild ruby bearings', critEv: 'ev_pinion_gear', critDesc: 'Blood-spattered brass pinion gear in Mercier pocket' },
  { title: 'The Poisoned Communion Wine', loc: 'All Hallows Stone Chapel', cat: 'Mansions & Estates', weapon: 'Wolfsbane Alkaloid in Chalice', vName: 'Archdeacon Christopher Croft', vRole: 'Diocesan Head', culprit: 'Rev. Simon Vance', cRole: 'Parish Curate', motive: 'Preventing public revelation of illicit financial slush fund', critEv: 'ev_cruet_residue', critDesc: 'Aconitine alkaloid detected in silver communion cruet' },
  { title: 'The Defrauded Stock Exchange Broker', loc: 'London Royal Exchange Office', cat: 'Urban Noir & Alleys', weapon: 'Strychnine in Throat Lozenges', vName: 'Percival Vance', vRole: 'Commodities Speculator', culprit: 'Jonathan Crane', cRole: 'Junior Partner', motive: 'Covering up forged short positions in copper futures', critEv: 'ev_lozenge_tin', critDesc: 'Brass lozenge tin coated with strychnine sulfate' },
  { title: 'The Poisoned Opera Soubrette', loc: 'La Scala Backstage Loge', cat: 'Art & Antiquities', weapon: 'Curare in Corset Stays', vName: 'Signora Bianca Rossi', vRole: 'Lead Soprano', culprit: 'Francesca Lucci', cRole: 'Wardrobe Mistress', motive: 'Avenging sister who committed suicide over scandal', critEv: 'ev_corset_needle', critDesc: 'Envenomed needle hidden inside silk corset lining' },
  { title: 'The Submerged Hydroplane Pilot', loc: 'Lake Geneva Speed Trials Dock', cat: 'Transit & Voyages', weapon: 'Tampered Rudder Linkage Wire', vName: 'Sir Donald Campbell-Smith', vRole: 'World Speed Record Holder', culprit: 'Alain Favre', cRole: 'Chief Pit Mechanic', motive: 'Massive insurance policy bet with syndicate', critEv: 'ev_cut_cable', critDesc: 'Pre-stressed control cable cleanly sheared with shears' },
  { title: 'The Cold War Embassy Code Murder', loc: 'Vienna Neutrality Pavilion', cat: 'Urban Noir & Alleys', weapon: 'Potassium Cyanide Pinprick Umbrella', vName: 'Dmitri Voronov', vRole: 'Cultural Attaché / Defector', culprit: 'Greta Keller', cRole: 'Embassy Translator', motive: 'Preventing delivery of spy ring dossier to MI6', critEv: 'ev_umbrella_tip', critDesc: 'Specially modified ferrule tip containing cyanide bulb' },
  { title: 'The Highland Castle Dungeon Mystery', loc: 'Dunnottar Cliff Stronghold', cat: 'Mansions & Estates', weapon: 'Starvation & Locked Iron Portcullis', vName: 'Lachlan MacIntyre', vRole: 'Highland Laird', culprit: 'Gordon MacIntyre', cRole: 'Half-Brother & Heir', motive: 'Inheriting 10,000-acre estate and coal royalties', critEv: 'ev_skeleton_key', critDesc: 'Forged dungeon ward key with fresh brass file marks' },
  { title: 'The Rigged Boxing Championship', loc: 'Madison Square Arena Locker 3', cat: 'Urban Noir & Alleys', weapon: 'Chloral Hydrate in Water Bottle', vName: 'Danny "The Bull" Callahan', vRole: 'Middleweight Champion', culprit: 'Mickey Finn', cRole: 'Corner Cutman', motive: 'Underworld mob bet of $250,000 on underdog', critEv: 'ev_corked_flask', critDesc: 'Corner water bottle containing knockout drops' },
  { title: 'The Antiquities Forger\'s Drowning', loc: 'Venetian Canal Workshop', cat: 'Art & Antiquities', weapon: 'Weighted Marble Bust in Gondola', vName: 'Marco Bellini', vRole: 'Master Stone Sculptor', culprit: 'Pietro Zeno', cRole: 'Antiquities Dealer', motive: 'Marco threatened to expose dealer\'s fake Greek statues', critEv: 'ev_chisel_marks', critDesc: 'Pietro\'s monogrammed gold signet ring found in canal silt' },
  { title: 'The Poisoned Masquerade Feast', loc: 'Doge\'s Palace Ballroom', cat: 'Luxury & High Society', weapon: 'Arsenic Glaze on Roasted Quail', vName: 'Count Lorenzo Tiepolo', vRole: 'Venetian Senator', culprit: 'Contessa Marina', cRole: 'Spurned Lover', motive: 'Retribution for broken marriage contract', critEv: 'ev_silver_skewer', critDesc: 'Arsenic-coated silver serving skewer from kitchen' },
  { title: 'The High-Altitude Balloonist Murder', loc: 'Black Forest Launch Meadow', cat: 'Transit & Voyages', weapon: 'Severed Oxygen Regulator Hose', vName: 'Professor Ernst Macher', vRole: 'Stratospheric Explorer', culprit: 'Wilhelm Becker', cRole: 'Barometer Specialist', motive: 'Taking sole credit for cosmic ray discovery', critEv: 'ev_slit_hose', critDesc: 'Rubber oxygen tube cleanly slashed with scalpel' },
  { title: 'The Murder in Cabin B-14', loc: 'Trans-Siberian Express Car 7', cat: 'Transit & Voyages', weapon: 'Silenced Nagant Revolver', vName: 'General Ivan Borodin', vRole: 'Tsarist Military Governor', culprit: 'Natasha Rostova', cRole: 'Disguised Countess', motive: 'Blood vengeance for massacred Siberian peasants', critEv: 'ev_spent_shell', critDesc: 'Nagant 7.62mm casing with rare custom rim stamp' },
  { title: 'The Silent Monastery Poisoning', loc: 'Abbey of Saint-Victor Herbal Room', cat: 'Mansions & Estates', weapon: 'Amanita Phalloides (Death Cap) Broth', vName: 'Abbot Jerome', vRole: 'Monastery Prior', culprit: 'Brother Francis', cRole: 'Master Apothecary', motive: 'Preventing sale of ancient abbey library to state', critEv: 'ev_mushroom_spores', critDesc: 'Death cap fungal spores found on Francis pestle' },
  { title: 'The Stolen Radium Phial', loc: 'Curie Institute Radiochemistry Lab', cat: 'Science & Esoteric', weapon: 'Acute Lethal Radiation Exposure', vName: 'Dr. Lucien Lambert', vRole: 'Senior Radiologist', culprit: 'Victorine Mercier', cRole: 'Associate Researcher', motive: 'Selling industrial radioluminescent patents to cartel', critEv: 'ev_lead_cask', critDesc: 'Lead shielded vial case with Victorine fingerprint in wax' },
  { title: 'The Venetian Glassblower\'s End', loc: 'Murano Island Kiln House 5', cat: 'Art & Antiquities', weapon: 'Molten Glass Crucible Scald', vName: 'Maestro Andrea Seguso', vRole: 'Master Glass Artist', culprit: 'Matteo Ferro', cRole: 'Furnace Stoker', motive: 'Theft of classified recipe for iridescent ruby glass', critEv: 'ev_gold_powder', critDesc: 'Colloidal gold batch formula found in Ferro locker' },
  { title: 'The Defrauded Diamond Mine Magnate', loc: 'Kimberley Club Cigar Room', cat: 'Luxury & High Society', weapon: 'Poisoned Havana Cigar', vName: 'Cecil Rhodes Jr.', vRole: 'Mining Tycoon', culprit: 'Arthur Pendelton-Smythe', cRole: 'Charter Director', motive: 'Concealing exhausted diamond pipe fraud from investors', critEv: 'ev_cigar_band', critDesc: 'Cyanide infused tobacco wrapper bearing custom crest' },
  { title: 'The Sabotaged Bathysphere', loc: 'Bermuda Marine Station', cat: 'Science & Esoteric', weapon: 'Loosened Quartz Viewing Port Bolts', vName: 'Dr. William Beebe-Grant', vRole: 'Oceanographer', culprit: 'Jason Drake', cRole: 'Deck Engineer', motive: 'Silencing revelation of illegal seabed oil dumping', critEv: 'ev_stripped_bolts', critDesc: 'High-tensile torque wrench with deliberately stripped teeth' },
  { title: 'The Murdered Illusionist', loc: 'Egyptian Hall of Magic Stage', cat: 'Art & Antiquities', weapon: 'Tampered Iron Maiden Trapdoor', vName: 'The Great Mephisto (Roland Bell)', vRole: 'Master Stage Magician', culprit: 'Alexander "The Astounding"', cRole: 'Rival Illusionist', motive: 'Stealing secret mechanism of the Vanishing Elephant illusion', critEv: 'ev_steel_pin', critDesc: 'Locking cotter pin removed from trick cabinet door' },
  { title: 'The Poisoned Vintage Champagne', loc: 'Reims Grand Cellar Cru 1914', cat: 'Mansions & Estates', weapon: 'Prussic Acid in Riddling Rack', vName: 'Madame Clicquot-Vane', vRole: 'Champagne House Matriarch', culprit: 'Philippe Roederer', cRole: 'Chief Cellar Master', motive: 'Preventing acquisition of estate by Parisian rival', critEv: 'ev_riddling_chalk', critDesc: 'Riddler mark chalk stained with potassium cyanide' },
  { title: 'The Stolen Meteorite Specimen', loc: 'Natural History Mineral Vault', cat: 'Science & Esoteric', weapon: 'Heavy Iron Octahedrite Meteorite', vName: 'Curator Archibald Stone', vRole: 'Meteoriticist', culprit: 'Dr. Leonard Vance', cRole: 'Assistant Curator', motive: 'Private collector offering $100,000 for extraterrestrial diamond specimen', critEv: 'ev_widmanstatten', critDesc: 'Acid etched meteorite fragment in Leonard briefcase' },
  { title: 'The Crimson Tapestry Strangling', loc: 'Bayeux Manor Medieval Wing', cat: 'Art & Antiquities', weapon: 'Gold-Threaded Tapestry Fringe Cord', vName: 'Lady Genevieve D’Arcy', vRole: 'Historic Preservationist', culprit: 'Julian Thorne', cRole: 'Textile Restorer', motive: 'Selling genuine 14th century embroidery on black market', critEv: 'ev_silk_shears', critDesc: 'Restoration shears stained with victim blood droplets' },
  { title: 'The Staged Alpine Ski Avalanche', loc: 'St. Moritz Olympic Slope Cabin', cat: 'Transit & Voyages', weapon: 'Dynamite Stick on Ridge Cornice', vName: 'Hans Gruber', vRole: 'Winter Sports Champion', culprit: 'Klaus Eichel', cRole: 'Ski Patrol Chief', motive: 'Enormous gambling payoff on rival competitor', critEv: 'ev_blasting_cap', critDesc: 'Copper blasting cap with Klaus personal crimping mark' },
  { title: 'The Defrauded Maritime Underwriter', loc: 'Lloyd’s of London Coffee Room', cat: 'Urban Noir & Alleys', weapon: 'Strychnine in China Black Tea', vName: 'Sir Walter Baring', vRole: 'Senior Marine Underwriter', culprit: 'Captain Joshua Vance', cRole: 'Tramp Steamer Owner', motive: 'Preventing inquiry into deliberate scuttling of cargo freighter', critEv: 'ev_scuttle_valve', critDesc: 'Seacock valve wrench concealed in sea chest' },
  { title: 'The Stolen Stradivarius Blueprint', loc: 'Cremona Violin Guild Hall', cat: 'Art & Antiquities', weapon: 'Rosewood Violin Bow Weighted with Lead', vName: 'Maestro Carlo Guarneri', vRole: 'Guild Elder', culprit: 'Dante Amati', cRole: 'Luthier Rival', motive: 'Secret acoustical graduation blueprints of 1698', critEv: 'ev_varnish_swab', critDesc: 'Propolis violin varnish identified on Dante sleeves' },
  { title: 'The Poisoned Caviar Banquet', loc: 'St. Petersburg Winter Palace Suite', cat: 'Luxury & High Society', weapon: 'Botulinum Toxin in Beluga Sturgeon Caviar', vName: 'Grand Duke Nicholas', vRole: 'Czarist Privy Councilor', culprit: 'Countess Olga Pavlova', cRole: 'Court Lady-in-Waiting', motive: 'Revolutionary socialist conspiracy against Romanov regime', critEv: 'ev_silver_spoon', critDesc: 'Mother-of-pearl caviar spoon testing positive for toxin' },
  { title: 'The Defenestrated Astronomer', loc: 'Greenwich Royal Observatory Dome', cat: 'Science & Esoteric', weapon: 'Blunt Impact from Brass Telescope Crane', vName: 'Sir Arthur Eddington-Jones', vRole: 'Astronomer Royal', culprit: 'Dr. Cecil Ward', cRole: 'Senior Computer & Calculator', motive: 'Theft of photographic plates confirming eclipse gravity lensing', critEv: 'ev_spectrometer', critDesc: 'Cracked spectrometer prism with Ward thumbprints' },
  { title: 'The Vanished Bank Vault Courier', loc: 'Bank of England Bullion Gate', cat: 'Urban Noir & Alleys', weapon: 'Chloroform & Hydraulic Press Crushing', vName: 'Thomas Higgins', vRole: 'Chief Bullion Guard', culprit: 'Archie Pendelton', cRole: 'Vault Engineer', motive: 'Replacing 100 gold bars with tungsten carbide cores', critEv: 'ev_tungsten_bar', critDesc: 'Gold plated tungsten ingot with Archie serial etch' },
  { title: 'The Stolen Ancient Papyrus Scroll', loc: 'Cairo Antiquities Museum Annex', cat: 'Art & Antiquities', weapon: 'Bronze Ankh Bludgeon', vName: 'Dr. Mahmoud El-Sayed', vRole: 'Chief Papyrologist', culprit: 'Howard Sterling', cRole: 'British Antiquarian', motive: 'Smuggling Book of the Dead papyrus to private collection', critEv: 'ev_linen_shroud', critDesc: 'Ancient linen wrapping fibers caught in Howard coat lining' },
  { title: 'The Murder in the Speakeasy Distillery', loc: 'Chicago South Side Brewery Cellar', cat: 'Urban Noir & Alleys', weapon: 'Boiling Mash Mash-Tun Immersion', vName: 'Frankie "Five Aces" Torrio', vRole: 'Distillery Boss', culprit: 'Jimmy "The Fox" Costello', cRole: 'Brewmaster & Partner', motive: 'Full takeover of bootleg liquor distribution territory', critEv: 'ev_copper_paddle', critDesc: 'Brewing paddle with Frankie’s blood and Costello’s prints' },
];

for (let i = 0; i < HARD_THEMES.length; i++) {
  const theme = HARD_THEMES[i];
  const caseId = i + 31; // Cases 31 to 70

  const susp1Id = `susp_${caseId}_1`;
  const susp2Id = `susp_${caseId}_2`;
  const susp3Id = `susp_${caseId}_3`;
  const susp4Id = `susp_${caseId}_4`;
  const ev1Id = `ev_${caseId}_1`;
  const ev2Id = `ev_${caseId}_2`;
  const ev3Id = `ev_${caseId}_3`;

  HARD_CASES.push({
    id: caseId,
    title: theme.title,
    difficulty: 'Hard',
    category: theme.cat,
    locationName: theme.loc,
    atmosphere: `A heavy tension permeates ${theme.loc}. Deceptive footprints, forged timelines, and conflicting testimonies challenge even veteran detectives.`,
    victim: {
      name: theme.vName,
      role: theme.vRole,
      causeOfDeath: `${theme.weapon}`,
      timeOfDeath: '11:15 PM',
    },
    synopsis: `${theme.vName} was murdered inside ${theme.loc}. All four suspects present possess deep motives and fabricated alibis. Only meticulous forensic clue matching will expose the true culprit.`,
    crimeSceneImage: generateThemedCrimeScene(theme.loc, theme.cat, caseId),
    hotspots: [
      { id: `hs_${caseId}_1`, x: 30, y: 55, label: 'Point of Impact / Trauma', clueId: ev1Id, description: `Primary locus where ${theme.weapon} was utilized.` },
      { id: `hs_${caseId}_2`, x: 75, y: 65, label: 'Physical Trace Evidence', clueId: ev2Id, description: `Physical clue: ${theme.critDesc}.` },
      { id: `hs_${caseId}_3`, x: 52, y: 82, label: 'Contradictory Clue Note', clueId: ev3Id, description: 'Forensic documentation disproving the suspect\'s manufactured alibi.' },
    ],
    evidence: [
      {
        id: ev1Id,
        title: theme.weapon,
        category: 'physical',
        image: generateThemedEvidence(theme.weapon, 'physical', caseId * 3),
        description: `Instrument of death: ${theme.weapon}.`,
        forensicNote: `Pathology report confirms this weapon caused the fatal trauma on ${theme.vName}.`,
      },
      {
        id: ev2Id,
        title: theme.critDesc,
        category: 'document',
        image: generateThemedEvidence(theme.critDesc, 'document', caseId * 5),
        description: `Crucial evidence: ${theme.critDesc}.`,
        forensicNote: `Directly links ${theme.culprit} to the crime scene and nullifies their claims.`,
      },
      {
        id: ev3Id,
        title: 'Tampered Timepiece & Timeline Note',
        category: 'forensic',
        image: generateThemedEvidence('Timeline Note', 'forensic', caseId * 7),
        description: 'Forensic reconstruction showing that the crime took place 25 minutes earlier than claimed.',
        forensicNote: 'Proves the suspect slipped away during the unmonitored window.',
      },
    ],
    suspects: [
      {
        id: susp1Id,
        name: theme.culprit,
        role: theme.cRole,
        portrait: generateThemedPortrait(theme.culprit, theme.cRole, caseId * 11),
        age: 35 + (caseId % 25),
        personality: 'Cool, calculated, answers with rehearsed precision.',
        motive: theme.motive,
        alibi: 'Asserts they were in an adjoining room handling administrative records throughout the entire evening.',
        relationship: `Key associate of ${theme.vName}.`,
        questions: [
          { q: 'Did you leave your quarters around 11:00 PM?', a: 'Not for a single second. My door remained locked while I reviewed the ledgers.' },
          { q: `How do you explain ${theme.critDesc}?`, a: 'Anyone could have planted that item to shift suspicion onto me!' }
        ],
      },
      {
        id: susp2Id,
        name: 'Victor Vance',
        role: 'Chief Inspector / Associate',
        portrait: generateThemedPortrait('Victor Vance', 'Associate', caseId * 13),
        age: 50,
        personality: 'Stern, observant, quick to accuse rivals.',
        motive: 'Longstanding professional feud.',
        alibi: 'Was in the lobby lounge playing chess with three verified patrons.',
        relationship: 'Rival professional.',
        questions: [
          { q: 'Did you notice any movement near the scene?', a: `I saw ${theme.culprit} sneaking through the side corridor carrying a concealed bundle around 11:10 PM.` }
        ],
      },
      {
        id: susp3Id,
        name: 'Beatrice Sinclair',
        role: 'Estate Manager',
        portrait: generateThemedPortrait('Beatrice Sinclair', 'Manager', caseId * 17),
        age: 41,
        personality: 'Guarded, anxious about financial audits.',
        motive: 'Discrepancies in accounts.',
        alibi: 'Was on the telephone line with the main branch from 11:00 to 11:30 PM.',
        relationship: 'Administrator.',
        questions: [
          { q: 'Can your phone call be verified?', a: 'The switchboard log confirms the connection without interruption.' }
        ],
      },
      {
        id: susp4Id,
        name: 'Giles Sterling',
        role: 'Head Groundsman / Security',
        portrait: generateThemedPortrait('Giles Sterling', 'Security', caseId * 19),
        age: 58,
        personality: 'Gruff, weathered, cooperative.',
        motive: 'Disputed severance package.',
        alibi: 'Patrolling the outer perimeter gate with guard dog.',
        relationship: 'Staff member.',
        questions: [
          { q: 'Were the outer exits locked?', a: 'All exterior deadbolts were secured; the killer never left the main structure.' }
        ],
      },
    ],
    timeline: [
      { time: '10:45 PM', event: `${theme.vName} retires to private quarters.` },
      { time: '11:05 PM', event: `${theme.culprit} slips away through service stairwell.` },
      { time: '11:15 PM', event: `Fatal confrontation. ${theme.weapon} is deployed.` },
      { time: '11:25 PM', event: `${theme.culprit} returns to room and resumes fabricated alibi.` },
      { time: '11:45 PM', event: 'Body discovered; emergency alarm raised.' },
    ],
    redHerring: {
      description: 'Victor Vance had a bloodied handkerchief in his pocket.',
      misledElement: 'Investigators initially suspected Vance of the assault.',
      debunkExplanation: 'Lab analysis verified the blood was from a nosebleed treated in the restroom at 10:15 PM.',
    },
    solution: {
      culpritId: susp1Id,
      culpritName: theme.culprit,
      murderWeaponOrMethod: theme.weapon,
      criticalEvidenceId: ev2Id,
      criticalClueSummary: `${theme.critDesc} definitively disproved ${theme.culprit}'s manufactured alibi and confirmed ${theme.motive}.`,
      motivesSummary: theme.motive,
      fullDeduction: `Although ${theme.culprit} claimed to have remained locked in their quarters, physical trace evidence (${theme.critDesc}) coupled with the unmonitored 20-minute gap in the timeline established incontrovertible proof of guilt.`,
      endingStory: `Confronted with the physical evidence, ${theme.culprit} surrendered to authorities. The magistrate praised the detective's surgical deduction.`,
    },
    hints: [
      'Examine the physical evidence recovered from the scene; one item directly links to the culprit\'s personal items.',
      'Check which suspect had an uncorroborated gap during the critical 11:05 to 11:25 PM window.',
      'Do not be misled by the bloodied handkerchief; verify blood type and timing.',
    ],
  });
}
