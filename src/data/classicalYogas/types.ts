export type ClassicalYogaCategory =
  | "Pancha Mahapurusha"
  | "Surya (Solar) Yogas"
  | "Chandra (Lunar) Yogas"
  | "Maha Raja Yogas"
  | "Dhana (Wealth) Yogas"
  | "Nabhasa (Geometric) Yogas"
  | "Parivartana (House Exchange) Yogas"
  | "Bhava (12 Houses) Yogas"
  | "Conjunction Yogas (Two/Three Planets)"
  | "Intellect & Saraswati Yogas"
  | "Spiritual & Sanyasa Yogas"
  | "Specialized & Character Yogas"
  | "Parashari & Special Classical Yogas"
  | "Daridra & Affliction Yogas";


export interface ClassicalVedicYoga {
  number: number;
  id: string;
  name: string;
  sanskritName: string;
  category: ClassicalYogaCategory;
  formula: string;
  classicalSource: string;
  planetaryActors: string[];
  bhavaInvolved: number[];
  results: string;
  dashaActivation: string;
  cancellationException?: string;
}
