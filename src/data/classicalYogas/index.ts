import { ClassicalVedicYoga, ClassicalYogaCategory } from "./types";
import { YOGAS_1_TO_60 } from "./yogas1to60";
import { YOGAS_61_TO_120 } from "./yogas61to120";
import { YOGAS_121_TO_190 } from "./yogas121to190";
import { YOGAS_191_TO_250 } from "./yogas191to250";
import { YOGAS_251_TO_300_PLUS } from "./yogas251to300plus";
import { ALL_CLASSICAL_YOGAS_1001 } from "./yogas1001Directory";

export * from "./types";
export { YOGAS_1_TO_60 } from "./yogas1to60";
export { YOGAS_61_TO_120 } from "./yogas61to120";
export { YOGAS_121_TO_190 } from "./yogas121to190";
export { YOGAS_191_TO_250 } from "./yogas191to250";
export { YOGAS_251_TO_300_PLUS } from "./yogas251to300plus";
export { ALL_CLASSICAL_YOGAS_1001 } from "./yogas1001Directory";

// 1001+ Classical Yogas Master Dataset
export const ALL_CLASSICAL_YOGAS_1001_PLUS: ClassicalVedicYoga[] = ALL_CLASSICAL_YOGAS_1001;
export const ALL_CLASSICAL_YOGAS_300_PLUS: ClassicalVedicYoga[] = ALL_CLASSICAL_YOGAS_1001;

export const CLASSICAL_YOGA_CATEGORIES: ClassicalYogaCategory[] = [
  "Pancha Mahapurusha",
  "Surya (Solar) Yogas",
  "Chandra (Lunar) Yogas",
  "Maha Raja Yogas",
  "Dhana (Wealth) Yogas",
  "Nabhasa (Geometric) Yogas",
  "Parivartana (House Exchange) Yogas",
  "Bhava (12 Houses) Yogas",
  "Conjunction Yogas (Two/Three Planets)",
  "Intellect & Saraswati Yogas",
  "Spiritual & Sanyasa Yogas",
  "Specialized & Character Yogas",
  "Parashari & Special Classical Yogas",
  "Daridra & Affliction Yogas",
];

export function getClassicalYogaById(id: string): ClassicalVedicYoga | undefined {
  return ALL_CLASSICAL_YOGAS_1001.find((y) => y.id === id);
}

export function getClassicalYogasByCategory(category: ClassicalYogaCategory): ClassicalVedicYoga[] {
  return ALL_CLASSICAL_YOGAS_1001.filter((y) => y.category === category);
}

export function searchClassicalYogas(query: string): ClassicalVedicYoga[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_CLASSICAL_YOGAS_1001;

  return ALL_CLASSICAL_YOGAS_1001.filter((yoga) => {
    return (
      yoga.name.toLowerCase().includes(q) ||
      yoga.sanskritName.toLowerCase().includes(q) ||
      yoga.formula.toLowerCase().includes(q) ||
      yoga.category.toLowerCase().includes(q) ||
      yoga.classicalSource.toLowerCase().includes(q) ||
      yoga.results.toLowerCase().includes(q) ||
      yoga.planetaryActors.some((p) => p.toLowerCase().includes(q))
    );
  });
}
