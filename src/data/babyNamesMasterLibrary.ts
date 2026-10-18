// src/data/babyNamesMasterLibrary.ts
// Comprehensive Curated Baby Name Library with Vedic Syllables, Meanings, Origins & Deity connections
// Modularized across religions: Hindu/Vedic, Muslim/Islamic, Sikh/Gurmukhi, Christian, Jain, Buddhist

import { HINDU_BABY_NAMES } from "./names/hinduNames";
import { MUSLIM_BABY_NAMES } from "./names/muslimNames";
import { SIKH_BABY_NAMES } from "./names/sikhNames";
import { CHRISTIAN_BABY_NAMES } from "./names/christianNames";
import { JAIN_BABY_NAMES } from "./names/jainNames";
import { BUDDHIST_BABY_NAMES } from "./names/buddhistNames";

export interface BabyNameEntry {
  name: string;
  sanskrit: string;
  gender: "boy" | "girl" | "unisex";
  syllable: string; // The primary matching Janmakshar sound (e.g. "A", "Chu", "Che", "La", "Lee", "Lu", "Va", "Ka", "Ma", "Ra", "Sa", "Ha", etc.)
  secondarySyllables?: string[];
  meaning: string;
  origin: "Vedic Sanskrit" | "Modern Indian" | "Devotional" | "Contemporary Classic" | "International Sanskrit" | "Islamic / Arabic" | "Gurmukhi Sikh" | "Biblical Christian" | "Jain Tirthankara" | "Buddhist Dhamma" | "Universal";
  religion?: "hindu" | "muslim" | "sikh" | "christian" | "jain" | "buddhist" | "universal";
  deity?: string;
  element: "Fire" | "Earth" | "Air" | "Water" | "Ether";
}

// Classical and Vedic Core Repository
const CLASSICAL_CORE_NAMES: BabyNameEntry[] = [
  // --- 'A', 'Aa' Syllables (Krittika P1, Rohini, Aries / Taurus) ---
  { name: "Aarav", sanskrit: "आरव", gender: "boy", syllable: "A", meaning: "Peaceful, musical sound, wisdom", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Shiva", element: "Air" },
  { name: "Aaditya", sanskrit: "आदित्य", gender: "boy", syllable: "A", meaning: "Son of Aditi, the Sun God, luminous", origin: "Vedic Sanskrit", religion: "hindu", deity: "Surya Deva", element: "Fire" },
  { name: "Aanya", sanskrit: "आन्या", gender: "girl", syllable: "A", meaning: "Inexhaustible, limitless grace", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Durga", element: "Ether" },
  { name: "Ananya", sanskrit: "अनन्या", gender: "girl", syllable: "A", meaning: "Matchless, unique, divine beauty", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Parvati", element: "Water" },
  { name: "Aaradhya", sanskrit: "आराध्या", gender: "girl", syllable: "A", meaning: "Worthy of worship, divine blessing", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Lakshmi", element: "Earth" },
  { name: "Advait", sanskrit: "अद्वैत", gender: "boy", syllable: "A", meaning: "Non-dual, supreme consciousness, unique", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Brahma / Shiva", element: "Ether" },
  { name: "Aryaman", sanskrit: "अर्यमन्", gender: "boy", syllable: "A", meaning: "Noble, sun deity of friendship", origin: "Vedic Sanskrit", religion: "hindu", deity: "Aryaman", element: "Fire" },
  { name: "Avani", sanskrit: "अवनी", gender: "girl", syllable: "A", meaning: "The nourishing earth, grounded abundance", origin: "Modern Indian", religion: "hindu", deity: "Bhumi Devi", element: "Earth" },
  { name: "Anika", sanskrit: "अनिका", gender: "girl", syllable: "A", meaning: "Grace, army of light, brilliance", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Durga", element: "Fire" },
  { name: "Abhay", sanskrit: "अभय", gender: "boy", syllable: "A", meaning: "Fearless, protected by divine prana", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Vishnu", element: "Air" },
  { name: "Ayush", sanskrit: "आयुष", gender: "boy", syllable: "A", meaning: "Endowed with long life and vitality", origin: "Vedic Sanskrit", religion: "hindu", deity: "Ayush Deva", element: "Fire" },
  { name: "Amrita", sanskrit: "अमृता", gender: "girl", syllable: "A", meaning: "Immortal nectar of celestial realms", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Lakshmi", element: "Water" },
  { name: "Aashvi", sanskrit: "आश्वी", gender: "girl", syllable: "A", meaning: "Blessed, victorious, joyful", origin: "Modern Indian", religion: "hindu", deity: "Goddess Saraswati", element: "Ether" },
  { name: "Agastya", sanskrit: "अगस्त्य", gender: "boy", syllable: "A", meaning: "Great sage, mountain mover, wisdom", origin: "Vedic Sanskrit", religion: "hindu", deity: "Rishi Agastya", element: "Earth" },

  // --- 'Chu', 'Che', 'Cho', 'Cha' (Ashwini P1-P3, Revati P3-P4) ---
  { name: "Chunmay", sanskrit: "चुन्मय", gender: "boy", syllable: "Chu", meaning: "Pure consciousness and delight", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Krishna", element: "Ether" },
  { name: "Chulbul", sanskrit: "चुलबुल", gender: "unisex", syllable: "Chu", meaning: "Playful, lively, energetic spirit", origin: "Modern Indian", religion: "hindu", element: "Air" },
  { name: "Chumki", sanskrit: "चुमकी", gender: "girl", syllable: "Chu", meaning: "Radiant star, glistening ray", origin: "Modern Indian", religion: "hindu", element: "Fire" },
  { name: "Chetan", sanskrit: "चेतन", gender: "boy", syllable: "Che", meaning: "Conscious vitality, awareness, soul", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Shiva", element: "Fire" },
  { name: "Chetana", sanskrit: "चेतना", gender: "girl", syllable: "Che", meaning: "Supreme cosmic awareness and intellect", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Saraswati", element: "Ether" },
  { name: "Chaitanya", sanskrit: "चैतन्य", gender: "boy", syllable: "Che", secondarySyllables: ["Chai"], meaning: "Divine radiance, supreme spirit", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Krishna", element: "Ether" },
  { name: "Chola", sanskrit: "चोला", gender: "boy", syllable: "Cho", meaning: "Righteous king, prosperous leader", origin: "Modern Indian", religion: "hindu", element: "Earth" },
  { name: "Choksha", sanskrit: "चोक्षा", gender: "girl", syllable: "Cho", meaning: "Pure, pristine, brilliant clarity", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Ganga", element: "Water" },
  { name: "Charu", sanskrit: "चारु", gender: "girl", syllable: "Cha", meaning: "Graceful, pleasing, attractive aura", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Lakshmi", element: "Water" },
  { name: "Charvik", sanskrit: "चार्विक", gender: "boy", syllable: "Cha", meaning: "Intelligent, delightful personality", origin: "Modern Indian", religion: "hindu", element: "Air" },

  // --- 'La', 'Lee', 'Lu', 'Le', 'Lo' (Ashwini P4, Bharani P1-P4) ---
  { name: "Laksh", sanskrit: "लक्ष", gender: "boy", syllable: "La", meaning: "Target, focused aim, prosperity", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Vishnu", element: "Fire" },
  { name: "Lakshit", sanskrit: "लक्षित", gender: "boy", syllable: "La", meaning: "Destined for excellence, distinguished", origin: "Modern Indian", religion: "hindu", deity: "Lord Rama", element: "Fire" },
  { name: "Lavanya", sanskrit: "लावण्या", gender: "girl", syllable: "La", meaning: "Graceful elegance, eternal charm", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Parvati", element: "Water" },
  { name: "Lalit", sanskrit: "ललित", gender: "boy", syllable: "La", meaning: "Beautiful, refined, joyful artist", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Krishna", element: "Water" },
  { name: "Lalita", sanskrit: "ललिता", gender: "girl", syllable: "La", meaning: "Playful goddess of cosmic joy", origin: "Vedic Sanskrit", religion: "hindu", deity: "Tripura Sundari", element: "Fire" },
  { name: "Leela", sanskrit: "लीला", gender: "girl", syllable: "Lee", meaning: "Divine cosmic play and sport", origin: "Vedic Sanskrit", religion: "hindu", deity: "Radharani / Krishna", element: "Ether" },
  { name: "Leena", sanskrit: "लीना", gender: "girl", syllable: "Lee", meaning: "Devoted, absorbed in contemplation, gentle", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Lakshmi", element: "Water" },
  { name: "Luv", sanskrit: "लव", gender: "boy", syllable: "Lu", meaning: "Particle of light, valiant son of Rama", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Rama", element: "Fire" },
  { name: "Lekha", sanskrit: "लेखा", gender: "girl", syllable: "Le", meaning: "Sacred writing, crescent moon, divine destiny", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Saraswati", element: "Ether" },
  { name: "Lokendra", sanskrit: "लोकेन्द्र", gender: "boy", syllable: "Lo", meaning: "King of the universe, protector", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Vishnu", element: "Earth" },
  { name: "Lokesh", sanskrit: "लोकेश", gender: "boy", syllable: "Lo", meaning: "Lord of the world, compassionate king", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Shiva", element: "Ether" },

  // --- 'Ee', 'U', 'Ea', 'O' (Krittika P2-P4, Rohini P1) ---
  { name: "Isha", sanskrit: "ईशा", gender: "girl", syllable: "Ee", meaning: "The ruling goddess, sovereign grace", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Durga", element: "Ether" },
  { name: "Ishaan", sanskrit: "ईशान", gender: "boy", syllable: "Ee", meaning: "Guardian of the northeast, supreme lord", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Shiva (Ishana)", element: "Ether" },
  { name: "Ira", sanskrit: "इरा", gender: "girl", syllable: "Ee", meaning: "Earth, crystal waters, muse of speech", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Saraswati", element: "Water" },
  { name: "Uday", sanskrit: "उदय", gender: "boy", syllable: "U", meaning: "Dawn, sunrise, glorious ascent", origin: "Vedic Sanskrit", religion: "hindu", deity: "Surya Deva", element: "Fire" },
  { name: "Utkarsh", sanskrit: "उत्कर्ष", gender: "boy", syllable: "U", meaning: "Prosperity, supreme excellence, rise", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Vishnu", element: "Fire" },
  { name: "Upasana", sanskrit: "उपासना", gender: "girl", syllable: "U", meaning: "Devoted worship, quiet reverence", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Gayatri", element: "Ether" },
  { name: "Eashan", sanskrit: "एशान", gender: "boy", syllable: "Ea", meaning: "Luminous, ruler of inner light", origin: "Modern Indian", religion: "hindu", deity: "Lord Shiva", element: "Ether" },
  { name: "Ekansh", sanskrit: "एकांश", gender: "boy", syllable: "Ea", meaning: "Whole, indivisible, complete part", origin: "Modern Indian", religion: "hindu", deity: "Lord Vishnu", element: "Earth" },
  { name: "Omkar", sanskrit: "ओंकार", gender: "boy", syllable: "O", meaning: "The primordial sacred sound OM", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Ganesha / Shiva", element: "Ether" },
  { name: "Ojas", sanskrit: "ओजस्", gender: "boy", syllable: "O", meaning: "Vital strength, spiritual energy, aura", origin: "Vedic Sanskrit", religion: "hindu", deity: "Surya Deva", element: "Fire" },
  { name: "Ojasvi", sanskrit: "ओजस्वी", gender: "girl", syllable: "O", meaning: "Bright, radiant with vitality and grace", origin: "Modern Indian", religion: "hindu", deity: "Goddess Durga", element: "Fire" },

  // --- 'Va', 'Vee', 'Vu', 'Ve', 'Vo' (Rohini P2-P4, Mrigashira P1-P2) ---
  { name: "Varun", sanskrit: "वरुण", gender: "boy", syllable: "Va", meaning: "Lord of cosmic waters and moral order", origin: "Vedic Sanskrit", religion: "hindu", deity: "Varuna Deva", element: "Water" },
  { name: "Vanya", sanskrit: "वान्या", gender: "girl", syllable: "Va", meaning: "Forest nymph, gracious gift of nature", origin: "Modern Indian", religion: "hindu", deity: "Goddess Parvati", element: "Earth" },
  { name: "Vedant", sanskrit: "वेदान्त", gender: "boy", syllable: "Ve", meaning: "Pinnacle of Vedic wisdom and self-realization", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Brahma", element: "Ether" },
  { name: "Veda", sanskrit: "वेदा", gender: "girl", syllable: "Ve", meaning: "Sacred knowledge, divine wisdom", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Saraswati", element: "Ether" },
  { name: "Vivaan", sanskrit: "विवान", gender: "boy", syllable: "Vee", meaning: "Full of life, first rays of sun", origin: "Modern Indian", religion: "hindu", deity: "Lord Krishna", element: "Fire" },
  { name: "Vidhi", sanskrit: "विधि", gender: "girl", syllable: "Vee", meaning: "Cosmic order, sacred destiny, law", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Saraswati", element: "Ether" },
  { name: "Vihan", sanskrit: "विहान", gender: "boy", syllable: "Vee", meaning: "Morning dawn, commencement of new era", origin: "Modern Indian", religion: "hindu", deity: "Surya Deva", element: "Fire" },
  { name: "Vaibhav", sanskrit: "वैभव", gender: "boy", syllable: "Va", meaning: "Grandeur, prosperous splendor, majesty", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Vishnu", element: "Earth" },
  { name: "Vansh", sanskrit: "वंश", gender: "boy", syllable: "Va", meaning: "Lineage, continuation of ancestral glory", origin: "Modern Indian", religion: "hindu", element: "Earth" },
  { name: "Vrinda", sanskrit: "वृन्दा", gender: "girl", syllable: "Vee", meaning: "Holy basil, sacred companion of Radha and Krishna", origin: "Vedic Sanskrit", religion: "hindu", deity: "Vrinda Devi", element: "Earth" },
  { name: "Vedika", sanskrit: "वेदिका", gender: "girl", syllable: "Ve", meaning: "Sacred altar of Vedic offerings, consciousness", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Saraswati", element: "Fire" },
  { name: "Vamika", sanskrit: "वामिका", gender: "girl", syllable: "Va", meaning: "Epithet of Goddess Durga sitting on left of Shiva", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Durga", element: "Ether" },
  { name: "Varnika", sanskrit: "वर्णिका", gender: "girl", syllable: "Va", meaning: "Purity of gold, beautiful complexion, artist's mark", origin: "Modern Indian", religion: "hindu", deity: "Goddess Lakshmi", element: "Earth" },

  // --- 'Ka', 'Kee', 'Ku', 'Ke', 'Ko' (Mrigashira P3-P4, Ardra P1, Punarvasu P1-P2) ---
  { name: "Kavya", sanskrit: "काव्या", gender: "girl", syllable: "Ka", meaning: "Poetry in motion, prophetic foresight", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Saraswati", element: "Water" },
  { name: "Kartik", sanskrit: "कार्तिक", gender: "boy", syllable: "Ka", meaning: "Commander of divine forces, courage", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Kartikeya (Murugan)", element: "Fire" },
  { name: "Kiyansh", sanskrit: "कीयांश", gender: "boy", syllable: "Kee", meaning: "Person with all divine qualities", origin: "Modern Indian", religion: "hindu", deity: "Lord Krishna", element: "Ether" },
  { name: "Keerthi", sanskrit: "कीर्ति", gender: "girl", syllable: "Kee", meaning: "Fame, glorious reputation, honor", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Lakshmi", element: "Fire" },
  { name: "Kushagra", sanskrit: "कुशाग्र", gender: "boy", syllable: "Ku", meaning: "Sharp as a kusha blade, brilliant mind", origin: "Vedic Sanskrit", religion: "hindu", element: "Air" },
  { name: "Kuhu", sanskrit: "कुहू", gender: "girl", syllable: "Ku", meaning: "Sweet singing bird, pleasant night song", origin: "Modern Indian", religion: "hindu", element: "Air" },
  { name: "Kunal", sanskrit: "कुणाल", gender: "boy", syllable: "Ku", meaning: "Lotus flower, son of Emperor Ashoka", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Buddha", element: "Water" },
  { name: "Keval", sanskrit: "केवल", gender: "boy", syllable: "Ke", meaning: "Pure, solitary supreme truth, absolute", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Shiva", element: "Ether" },
  { name: "Kovid", sanskrit: "कोविद", gender: "boy", syllable: "Ko", meaning: "Scholarly, skilled in all sciences", origin: "Vedic Sanskrit", religion: "hindu", deity: "Brihaspati", element: "Air" },
  { name: "Kairav", sanskrit: "कैरव", gender: "boy", syllable: "Ka", meaning: "White lotus blooming under moonlight", origin: "Vedic Sanskrit", religion: "hindu", deity: "Chandra Deva", element: "Water" },
  { name: "Kanav", sanskrit: "कण्व", gender: "boy", syllable: "Ka", meaning: "Vedic sage who protected Shakuntala, wise teacher", origin: "Vedic Sanskrit", religion: "hindu", deity: "Sage Kanva", element: "Earth" },
  { name: "Krisha", sanskrit: "कृशा", gender: "girl", syllable: "Kee", meaning: "Divine feminine devotion, subtle and delicate", origin: "Modern Indian", religion: "hindu", deity: "Lord Krishna", element: "Water" },
  { name: "Kashvi", sanskrit: "काश्वी", gender: "girl", syllable: "Ka", meaning: "Shining bright, glowing like a lamp", origin: "Modern Indian", religion: "hindu", deity: "Surya Deva", element: "Fire" },
  { name: "Kalyani", sanskrit: "कल्याणी", gender: "girl", syllable: "Ka", meaning: "Bestower of all auspicious blessings and fortune", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Parvati", element: "Water" },

  // --- 'Ha', 'Hee', 'Hu', 'He', 'Ho' (Punarvasu P3-P4, Pushya P1-P3) ---
  { name: "Harsh", sanskrit: "हर्ष", gender: "boy", syllable: "Ha", meaning: "Joy, delight, festive celebration", origin: "Vedic Sanskrit", religion: "hindu", element: "Fire" },
  { name: "Harshita", sanskrit: "हर्षिता", gender: "girl", syllable: "Ha", meaning: "Radiating joy and permanent laughter", origin: "Modern Indian", religion: "hindu", deity: "Goddess Lakshmi", element: "Water" },
  { name: "Hardik", sanskrit: "हार्दिक", gender: "boy", syllable: "Ha", meaning: "Heartfelt, affectionate, sincere soul", origin: "Modern Indian", religion: "hindu", element: "Water" },
  { name: "Hridyansh", sanskrit: "हृद्यांश", gender: "boy", syllable: "Hee", meaning: "Piece of my heart, beloved soul", origin: "Modern Indian", religion: "hindu", deity: "Lord Krishna", element: "Water" },
  { name: "Hiral", sanskrit: "हीरल", gender: "girl", syllable: "Hee", meaning: "Shining diamond, lustrous light", origin: "Modern Indian", religion: "hindu", element: "Earth" },
  { name: "Hunar", sanskrit: "हुनर", gender: "unisex", syllable: "Hu", meaning: "Artistic talent, creative mastery", origin: "Modern Indian", religion: "hindu", element: "Air" },
  { name: "Heman", sanskrit: "हेमन", gender: "boy", syllable: "He", meaning: "Golden, precious as purified gold", origin: "Vedic Sanskrit", religion: "hindu", deity: "Surya Deva", element: "Fire" },
  { name: "Hetal", sanskrit: "हेतल", gender: "girl", syllable: "He", meaning: "Friendly, affectionate, radiant companion", origin: "Modern Indian", religion: "hindu", element: "Water" },
  { name: "Homesh", sanskrit: "होमेश", gender: "boy", syllable: "Ho", meaning: "Lord of the sacred fire ritual", origin: "Vedic Sanskrit", religion: "hindu", deity: "Agni Deva", element: "Fire" },

  // --- 'Da', 'Dee', 'Du', 'De', 'Do' (Pushya P4, Ashlesha P1-P4) ---
  { name: "Daksh", sanskrit: "दक्ष", gender: "boy", syllable: "Da", meaning: "Competent, skilled, capable architect", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Shiva / Brahma", element: "Earth" },
  { name: "Damini", sanskrit: "दामिनी", gender: "girl", syllable: "Da", meaning: "Lightning flash, victorious brightness", origin: "Vedic Sanskrit", religion: "hindu", deity: "Indra / Durga", element: "Fire" },
  { name: "Deepak", sanskrit: "दीपक", gender: "boy", syllable: "Dee", meaning: "Lamp of wisdom, guiding light", origin: "Vedic Sanskrit", religion: "hindu", deity: "Surya Deva", element: "Fire" },
  { name: "Diya", sanskrit: "दिया", gender: "girl", syllable: "Dee", meaning: "Auspicious lamp illuminating prosperity", origin: "Modern Indian", religion: "hindu", deity: "Goddess Lakshmi", element: "Fire" },
  { name: "Divyansh", sanskrit: "दिव्यांश", gender: "boy", syllable: "Dee", meaning: "Divine part of God, celestial fragment", origin: "Modern Indian", religion: "hindu", deity: "Lord Vishnu", element: "Ether" },
  { name: "Dushyant", sanskrit: "दुष्यन्त", gender: "boy", syllable: "Du", meaning: "Destroyer of evil, valiant emperor", origin: "Vedic Sanskrit", religion: "hindu", element: "Fire" },
  { name: "Devansh", sanskrit: "देवांश", gender: "boy", syllable: "De", meaning: "Part of the divine Gods, sacred soul", origin: "Modern Indian", religion: "hindu", deity: "Lord Shiva", element: "Ether" },
  { name: "Devi", sanskrit: "देवी", gender: "girl", syllable: "De", meaning: "Divine feminine embodiment of grace", origin: "Vedic Sanskrit", religion: "hindu", deity: "Mahadevi", element: "Ether" },
  { name: "Dolon", sanskrit: "दोलन", gender: "boy", syllable: "Do", meaning: "Gentle rhythmic wave, sweet breeze", origin: "Modern Indian", religion: "hindu", element: "Air" },

  // --- 'Ma', 'Mee', 'Moo', 'Me', 'Mo' (Magha P1-P4, Purva Phalguni P1) ---
  { name: "Madhav", sanskrit: "माधव", gender: "boy", syllable: "Ma", meaning: "Lord of spring, sweet as honey", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Krishna", element: "Water" },
  { name: "Manan", sanskrit: "मनन", gender: "boy", syllable: "Ma", meaning: "Deep contemplation, profound intellect", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Shiva", element: "Ether" },
  { name: "Manvi", sanskrit: "मानवी", gender: "girl", syllable: "Ma", meaning: "Humane, kind-hearted, graceful woman", origin: "Modern Indian", religion: "hindu", deity: "Goddess Saraswati", element: "Earth" },
  { name: "Meera", sanskrit: "मीरा", gender: "girl", syllable: "Mee", meaning: "Devoted mystic saint, ocean of nectar", origin: "Devotional", religion: "hindu", deity: "Mirabai / Krishna", element: "Water" },
  { name: "Mihir", sanskrit: "मिहिर", gender: "boy", syllable: "Mee", meaning: "The Sun, radiant dawn, warmth", origin: "Vedic Sanskrit", religion: "hindu", deity: "Surya Deva", element: "Fire" },
  { name: "Mridul", sanskrit: "मृदुल", gender: "boy", syllable: "Moo", meaning: "Gentle, compassionate, soft-spoken", origin: "Vedic Sanskrit", religion: "hindu", element: "Water" },
  { name: "Mehul", sanskrit: "मेहुल", gender: "boy", syllable: "Me", meaning: "A rain cloud bringing nourishment", origin: "Modern Indian", religion: "hindu", deity: "Indra Deva", element: "Water" },
  { name: "Medha", sanskrit: "मेधा", gender: "girl", syllable: "Me", meaning: "Supreme cosmic intellect and wisdom", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Saraswati", element: "Ether" },
  { name: "Moksh", sanskrit: "मोक्ष", gender: "boy", syllable: "Mo", meaning: "Ultimate spiritual liberation, salvation", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Shiva", element: "Ether" },
  { name: "Mohit", sanskrit: "मोहित", gender: "boy", syllable: "Mo", meaning: "Charming, captivating, beloved", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Krishna", element: "Water" },

  // --- 'Ta', 'Tee', 'Too', 'Te', 'To' (Purva Phalguni P2-P4, Uttara Phalguni P1-P2) ---
  { name: "Tanvi", sanskrit: "तन्वी", gender: "girl", syllable: "Ta", meaning: "Delicate, graceful, slender beauty", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Durga", element: "Earth" },
  { name: "Tanishq", sanskrit: "तनिष्क", gender: "boy", syllable: "Ta", meaning: "Precious jewel, gold medallion", origin: "Modern Indian", religion: "hindu", element: "Earth" },
  { name: "Teerth", sanskrit: "तीर्थ", gender: "boy", syllable: "Tee", meaning: "Sacred pilgrimage waters, holy crossing", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Vishnu", element: "Water" },
  { name: "Tisha", sanskrit: "तीशा", gender: "girl", syllable: "Tee", meaning: "Joyful, flourishing, victorious", origin: "Modern Indian", religion: "hindu", element: "Air" },
  { name: "Tejas", sanskrit: "तेजस्", gender: "boy", syllable: "Te", meaning: "Radiance, spiritual brilliance, valor", origin: "Vedic Sanskrit", religion: "hindu", deity: "Surya Deva / Agni", element: "Fire" },
  { name: "Tejal", sanskrit: "तेजल", gender: "girl", syllable: "Te", meaning: "Lustrous, bright, inspiring glow", origin: "Modern Indian", religion: "hindu", deity: "Goddess Durga", element: "Fire" },

  // --- 'Pa', 'Pee', 'Pu', 'Pe', 'Po' (Uttara Phalguni P3-P4, Hasta P1, Chitra P1-P2) ---
  { name: "Parth", sanskrit: "पार्थ", gender: "boy", syllable: "Pa", meaning: "Son of Pritha (Arjuna), unfailing archer", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Krishna / Arjuna", element: "Earth" },
  { name: "Prisha", sanskrit: "पृशा", gender: "girl", syllable: "Pa", meaning: "Beloved gift of God, loving soul", origin: "Modern Indian", religion: "hindu", deity: "Goddess Lakshmi", element: "Water" },
  { name: "Pari", sanskrit: "परी", gender: "girl", syllable: "Pa", meaning: "Fairy-like, celestial innocence, beauty", origin: "Modern Indian", religion: "hindu", element: "Air" },
  { name: "Piyush", sanskrit: "पीयूष", gender: "boy", syllable: "Pee", meaning: "Amrita, heavenly nectar of peace", origin: "Vedic Sanskrit", religion: "hindu", deity: "Chandra Deva", element: "Water" },
  { name: "Pushkar", sanskrit: "पुष्कर", gender: "boy", syllable: "Pu", meaning: "Blue lotus, sacred lake of Brahma", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Brahma", element: "Water" },
  { name: "Punya", sanskrit: "पुण्या", gender: "girl", syllable: "Pu", meaning: "Merit, sacred virtue, pure deeds", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Ganga", element: "Water" },

  // --- 'Sha', 'Na', 'Tha' (Hasta P2-P4) ---
  { name: "Shaurya", sanskrit: "शौर्य", gender: "boy", syllable: "Sha", meaning: "Bravery, martial courage, victory", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Kartikeya", element: "Fire" },
  { name: "Shambhavi", sanskrit: "शाम्भवी", gender: "girl", syllable: "Sha", meaning: "Consort of Shambhu (Shiva), serene grace", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Parvati", element: "Ether" },
  { name: "Navya", sanskrit: "नाव्या", gender: "girl", syllable: "Na", meaning: "Fresh, praiseworthy, innovative", origin: "Modern Indian", religion: "hindu", deity: "Goddess Saraswati", element: "Water" },
  { name: "Nakul", sanskrit: "नकुल", gender: "boy", syllable: "Na", meaning: "Agile, handsome, twin Pandava hero", origin: "Vedic Sanskrit", religion: "hindu", deity: "Ashwini Kumaras", element: "Earth" },

  // --- 'Ra', 'Re', 'Ree', 'Ro', 'Ru' (Chitra P3-P4, Swati P1-P4) ---
  { name: "Raghav", sanskrit: "राघव", gender: "boy", syllable: "Ra", meaning: "Descendant of King Raghu, Lord Rama, righteous virtue", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Rama", element: "Earth" },
  { name: "Ranveer", sanskrit: "रणवीर", gender: "boy", syllable: "Ra", meaning: "Hero of the battle, triumphant courageous soul", origin: "Modern Indian", religion: "hindu", element: "Fire" },
  { name: "Riaan", sanskrit: "रियान", gender: "boy", syllable: "Ra", meaning: "Little king, royal blessing, abundant grace", origin: "Modern Indian", religion: "hindu", deity: "Lord Vishnu", element: "Ether" },
  { name: "Ravit", sanskrit: "रवित", gender: "boy", syllable: "Ra", meaning: "Blessed by the Sun, radiant and luminous", origin: "Vedic Sanskrit", religion: "hindu", deity: "Surya Deva", element: "Fire" },
  { name: "Rachit", sanskrit: "रचित", gender: "boy", syllable: "Ra", meaning: "Masterful creation, artistic invention", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Brahma", element: "Air" },
  { name: "Ritesh", sanskrit: "रितेश", gender: "boy", syllable: "Ra", meaning: "Lord of cosmic truth, order, and seasons (Rta)", origin: "Vedic Sanskrit", religion: "hindu", deity: "Varuna / Surya", element: "Water" },
  { name: "Radhika", sanskrit: "राधिका", gender: "girl", syllable: "Ra", meaning: "Beloved of Krishna, full of devotion and prosperity", origin: "Vedic Sanskrit", religion: "hindu", deity: "Radharani", element: "Water" },
  { name: "Rashi", sanskrit: "राशि", gender: "girl", syllable: "Ra", meaning: "Collection of stars, celestial constellation, wealth", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Lakshmi", element: "Ether" },
  { name: "Rachita", sanskrit: "रचिता", gender: "girl", syllable: "Ra", meaning: "Created with divine craftsmanship, graceful work of art", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Saraswati", element: "Ether" },
  { name: "Ranya", sanskrit: "रान्या", gender: "girl", syllable: "Ra", meaning: "Pleasing, victorious queen, soothing aura", origin: "Modern Indian", religion: "hindu", element: "Water" },
  { name: "Ramya", sanskrit: "रम्य", gender: "girl", syllable: "Ra", meaning: "Delightful, captivating, enchanting tranquility", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Parvati", element: "Earth" },
  { name: "Rashmi", sanskrit: "रश्मि", gender: "girl", syllable: "Ra", meaning: "Radiant ray of sacred morning light", origin: "Vedic Sanskrit", religion: "hindu", deity: "Surya Deva", element: "Fire" },
  { name: "Reyaansh", sanskrit: "रेयांश", gender: "boy", syllable: "Re", meaning: "First ray of dawn light, divine part of Vishnu", origin: "Modern Indian", religion: "hindu", deity: "Lord Vishnu", element: "Fire" },
  { name: "Reya", sanskrit: "रेया", gender: "girl", syllable: "Re", meaning: "Graceful singer, angel of melody, shining light", origin: "Modern Indian", religion: "hindu", deity: "Goddess Saraswati", element: "Air" },
  { name: "Reva", sanskrit: "रेवा", gender: "girl", syllable: "Re", meaning: "Agile, sacred waters of Narmada river, star", origin: "Vedic Sanskrit", religion: "hindu", deity: "River Narmada", element: "Water" },
  { name: "Riya", sanskrit: "रिया", gender: "girl", syllable: "Ree", meaning: "Graceful singer, one who dances to cosmic rhythm", origin: "Modern Indian", religion: "hindu", deity: "Goddess Saraswati", element: "Air" },
  { name: "Rishit", sanskrit: "ऋषित", gender: "boy", syllable: "Ree", meaning: "Learned scholar, guided by rishis, enlightened", origin: "Vedic Sanskrit", religion: "hindu", deity: "Brihaspati", element: "Ether" },
  { name: "Rishan", sanskrit: "ऋशान", gender: "boy", syllable: "Ree", meaning: "Good soul, spiritual seeker of light", origin: "Modern Indian", religion: "hindu", deity: "Lord Shiva", element: "Ether" },
  { name: "Riddhi", sanskrit: "ऋद्धि", gender: "girl", syllable: "Ree", meaning: "Supreme spiritual power, prosperity, consort of Ganesha", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Riddhi", element: "Earth" },
  { name: "Rishika", sanskrit: "ऋषिका", gender: "girl", syllable: "Ree", meaning: "Female seer of Vedic mantras, blessed by sages", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Saraswati", element: "Ether" },
  { name: "Ritika", sanskrit: "रीतिका", gender: "girl", syllable: "Ree", meaning: "Flowing stream of sweet water, traditional grace", origin: "Modern Indian", religion: "hindu", deity: "Ganga Devi", element: "Water" },
  { name: "Ronav", sanskrit: "रोणव", gender: "boy", syllable: "Ro", meaning: "Embodiment of charm, pleasant handsome youth", origin: "Modern Indian", religion: "hindu", deity: "Lord Krishna", element: "Air" },
  { name: "Ronit", sanskrit: "रोणित", gender: "boy", syllable: "Ro", meaning: "Radiant, bright song of victory, charming", origin: "Modern Indian", religion: "hindu", deity: "Surya Deva", element: "Fire" },
  { name: "Romir", sanskrit: "रोमीर", gender: "boy", syllable: "Ro", meaning: "Interesting, handsome, pleasant friend", origin: "Modern Indian", religion: "hindu", element: "Air" },
  { name: "Rohini", sanskrit: "रोहिणी", gender: "girl", syllable: "Ro", meaning: "The luminous red celestial star, prosperous queen", origin: "Vedic Sanskrit", religion: "hindu", deity: "Rohini Devi", element: "Earth" },
  { name: "Roopal", sanskrit: "रूपल", gender: "girl", syllable: "Ro", meaning: "Made of silver, exquisite physical and inner beauty", origin: "Modern Indian", religion: "hindu", element: "Water" },
  { name: "Roshana", sanskrit: "रोशना", gender: "girl", syllable: "Ro", meaning: "Bright, illuminating lamp of truth", origin: "Modern Indian", religion: "hindu", element: "Fire" },
  { name: "Rutvik", sanskrit: "ऋत्विक", gender: "boy", syllable: "Ru", meaning: "Master priest who chants Vedic hymns at ceremonies", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Brahma", element: "Fire" },
  { name: "Rushil", sanskrit: "रुशिल", gender: "boy", syllable: "Ru", meaning: "Charming, refined, graceful gentleman", origin: "Modern Indian", religion: "hindu", deity: "Lord Shiva", element: "Air" },
  { name: "Rudransh", sanskrit: "रुद्रांश", gender: "boy", syllable: "Ru", meaning: "A living part of Lord Rudra (Shiva), fearless", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Shiva", element: "Fire" },
  { name: "Ruchi", sanskrit: "रुचि", gender: "girl", syllable: "Ru", meaning: "Refined taste, divine light, beautiful luster", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Lakshmi", element: "Fire" },
  { name: "Ritu", sanskrit: "ऋतु", gender: "girl", syllable: "Ru", meaning: "Season of blossoms, cosmic order and rhythm", origin: "Vedic Sanskrit", religion: "hindu", deity: "Surya Deva", element: "Earth" },
  { name: "Rutvi", sanskrit: "ऋत्वी", gender: "girl", syllable: "Ru", meaning: "Right direction, righteous Vedic path, seasonal grace", origin: "Modern Indian", religion: "hindu", deity: "Goddess Saraswati", element: "Ether" },
  { name: "Ruchira", sanskrit: "रुचिरा", gender: "girl", syllable: "Ru", meaning: "Pleasing, sweet-sounding, sparkling bright", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Lakshmi", element: "Water" },

  // --- 'Sa', 'See', 'Su', 'Se', 'So' (Shatabhisha P1-P4, Purva Bhadrapada P1-P2) ---
  { name: "Siddharth", sanskrit: "सिद्धार्थ", gender: "boy", syllable: "Sa", meaning: "One who has accomplished his noble purpose, enlightened", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Buddha", element: "Ether" },
  { name: "Shivam", sanskrit: "शिवम", gender: "boy", syllable: "Sha", meaning: "Auspicious, peaceful, eternal benevolent consciousness", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Shiva", element: "Ether" },
  { name: "Shlok", sanskrit: "श्लोक", gender: "boy", syllable: "Sha", meaning: "Sacred Vedic hymn, celestial chant of truth", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Saraswati", element: "Ether" },
  { name: "Shreyas", sanskrit: "श्रेयस्", gender: "boy", syllable: "Sha", meaning: "Superior fortune, prosperity, highest virtue", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Vishnu", element: "Earth" },
  { name: "Sarthak", sanskrit: "सार्थक", gender: "boy", syllable: "Sa", meaning: "Having true meaning, successful, purposeful", origin: "Vedic Sanskrit", religion: "hindu", element: "Earth" },
  { name: "Samvit", sanskrit: "संवित्", gender: "boy", syllable: "Sa", meaning: "Pure consciousness, divine intuitive knowledge", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Shiva", element: "Ether" },
  { name: "Shaunak", sanskrit: "शौनक", gender: "boy", syllable: "Sha", meaning: "Wise teacher, great Vedic sage of Rigveda", origin: "Vedic Sanskrit", religion: "hindu", deity: "Rishi Shaunaka", element: "Air" },
  { name: "Sparsh", sanskrit: "स्पर्श", gender: "boy", syllable: "Sa", meaning: "Gentle healing touch, tactile grace", origin: "Modern Indian", religion: "hindu", element: "Air" },
  { name: "Shreya", sanskrit: "श्रेया", gender: "girl", syllable: "Sha", meaning: "Auspicious, prosperity, beautiful grace", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Lakshmi", element: "Water" },
  { name: "Sneha", sanskrit: "स्नेहा", gender: "girl", syllable: "Sa", meaning: "Pure affectionate love, tenderness", origin: "Vedic Sanskrit", religion: "hindu", element: "Water" },
  { name: "Samaira", sanskrit: "समायरा", gender: "girl", syllable: "Sa", meaning: "Enchanting, protected by God, blooming fragrance", origin: "Modern Indian", religion: "hindu", element: "Air" },
  { name: "Shanaya", sanskrit: "शनाया", gender: "girl", syllable: "Sha", meaning: "First ray of the sun, beloved dawn", origin: "Modern Indian", religion: "hindu", deity: "Surya Deva", element: "Fire" },
  { name: "Suhani", sanskrit: "सुहानी", gender: "girl", syllable: "Su", meaning: "Pleasant, charming weather, joyful demeanor", origin: "Modern Indian", religion: "hindu", element: "Air" },
  { name: "Siya", sanskrit: "सिया", gender: "girl", syllable: "See", meaning: "White moonlight; Goddess Sita, symbol of devotion", origin: "Vedic Sanskrit", religion: "hindu", deity: "Sita Devi", element: "Earth" },
  { name: "Saachi", sanskrit: "साची", gender: "girl", syllable: "Sa", meaning: "Beloved truth, companion of righteousness", origin: "Vedic Sanskrit", religion: "hindu", deity: "Indrani", element: "Fire" },
  { name: "Samriddhi", sanskrit: "समृद्धि", gender: "girl", syllable: "Sa", meaning: "Complete wealth, abundance, flourishing progress", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Lakshmi", element: "Earth" },
  { name: "Arjun", sanskrit: "अर्जुन", gender: "boy", syllable: "A", meaning: "Bright, shining white, virtuous warrior of truth", origin: "Vedic Sanskrit", religion: "hindu", deity: "Arjuna / Indra", element: "Fire" },
  { name: "Arnav", sanskrit: "अर्णव", gender: "boy", syllable: "A", meaning: "Vast ocean of wisdom, deep wave", origin: "Vedic Sanskrit", religion: "hindu", deity: "Varuna Deva", element: "Water" },
  { name: "Ansh", sanskrit: "अंश", gender: "boy", syllable: "A", meaning: "Divine portion of the Supreme spirit", origin: "Modern Indian", religion: "hindu", deity: "Lord Krishna", element: "Ether" },
  { name: "Aarush", sanskrit: "आरुष", gender: "boy", syllable: "A", meaning: "First ray of the morning sun, gentle warmth", origin: "Vedic Sanskrit", religion: "hindu", deity: "Surya Deva", element: "Fire" },
  { name: "Atharv", sanskrit: "अथर्व", gender: "boy", syllable: "A", meaning: "Knower of the Atharvaveda, Lord Ganesha", origin: "Vedic Sanskrit", religion: "hindu", deity: "Lord Ganesha", element: "Earth" },
  { name: "Aditi", sanskrit: "अदिति", gender: "girl", syllable: "A", meaning: "Boundless cosmic mother of all divine forces", origin: "Vedic Sanskrit", religion: "hindu", deity: "Aditi Devi", element: "Ether" },
  { name: "Ahana", sanskrit: "अहाना", gender: "girl", syllable: "A", meaning: "First ray of sunrise, born during the day", origin: "Modern Indian", religion: "hindu", deity: "Usha Devi", element: "Fire" },
  { name: "Aarohi", sanskrit: "आरोही", gender: "girl", syllable: "A", meaning: "Ascending musical notes, continuous upward progress", origin: "Modern Indian", religion: "hindu", deity: "Goddess Saraswati", element: "Air" },
  { name: "Akshara", sanskrit: "अक्षरा", gender: "girl", syllable: "A", meaning: "Imperishable, indestructible sacred letter of sound", origin: "Vedic Sanskrit", religion: "hindu", deity: "Goddess Saraswati", element: "Ether" }
];

// Helper to deduplicate lists while preserving order
function mergeAndDeduplicateNames(...arrays: BabyNameEntry[][]): BabyNameEntry[] {
  const seen = new Set<string>();
  const result: BabyNameEntry[] = [];

  for (const array of arrays) {
    for (const item of array) {
      const rel = item.religion || "hindu";
      const key = `${item.name.trim().toLowerCase()}_${rel.toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push({
          ...item,
          religion: (item.religion || (item.origin === "Islamic / Arabic" ? "muslim" : item.origin === "Gurmukhi Sikh" ? "sikh" : item.origin === "Biblical Christian" ? "christian" : item.origin === "Jain Tirthankara" ? "jain" : item.origin === "Buddhist Dhamma" ? "buddhist" : "hindu")) as any
        });
      }
    }
  }

  return result;
}

// Master Aggregated Baby Name Library
export const BABY_NAMES_MASTER_LIBRARY: BabyNameEntry[] = mergeAndDeduplicateNames(
  CLASSICAL_CORE_NAMES,
  HINDU_BABY_NAMES,
  MUSLIM_BABY_NAMES,
  SIKH_BABY_NAMES,
  CHRISTIAN_BABY_NAMES,
  JAIN_BABY_NAMES,
  BUDDHIST_BABY_NAMES
);
