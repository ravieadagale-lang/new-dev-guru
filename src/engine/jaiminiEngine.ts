// AstroNext Jaimini Classical Engine

import { ZODIAC_RASHIS } from "./zodiacEngine";
import { degToDMS } from "./astronomyMath";

export interface CharaKarakaResult {
  karakaCode: string;
  karakaType: string;
  roleDescription: string;
  planet: string;
  signName: string;
  dmsInSign: string;
  longitude: number;
  degreeInSign: number;
}

export interface ArudhaPadaResult {
  padaCode: string;
  padaName: string;
  signName: string;
  houseFromLagna: number;
  significance: string;
}

export interface JaiminiReport {
  charaKarakas: CharaKarakaResult[];
  arudhaPadasList: ArudhaPadaResult[];
  atmakaraka: CharaKarakaResult;
  amatyakaraka: CharaKarakaResult;
  darakaraka: CharaKarakaResult;
}

const KARAKA_DEFINITIONS = [
  { code: "AK", name: "Atmakaraka (AK)", role: "Soul, Inner Self & Destiny Driver" },
  { code: "AmK", name: "Amatyakaraka (AmK)", role: "Career, Intellect & Chief Advisor" },
  { code: "BK", name: "Bhratrikaraka (BK)", role: "Siblings, Gurus, Courage & Teachers" },
  { code: "MK", name: "Matrikaraka (MK)", role: "Mother, Education & Emotional Refuge" },
  { code: "PK", name: "Putrakaraka (PK)", role: "Children, Wisdom & Creative Genius" },
  { code: "GK", name: "Gnatikaraka (GK)", role: "Karmic Competitors, Strife & Obstacles" },
  { code: "DK", name: "Darakaraka (DK)", role: "Spouse, Life Partner & Business Alliances" },
];

const SIGN_LORDS: Record<number, string> = {
  0: "Mars", 1: "Venus", 2: "Mercury", 3: "Moon",
  4: "Sun", 5: "Mercury", 6: "Venus", 7: "Mars",
  8: "Jupiter", 9: "Saturn", 10: "Saturn", 11: "Jupiter"
};

export class JaiminiEngine {
  public static calculateJaimini(
    planets: Record<string, { longitude: number; isRetrograde?: boolean; name?: string; dignity?: string }>,
    lagnaLongitude: number,
    includeRahu: boolean = false
  ): JaiminiReport {
    const planetKeys = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
    if (includeRahu && planets.Rahu) {
      planetKeys.push("Rahu");
    }

    const sorted = planetKeys
      .filter((k) => planets[k] !== undefined)
      .map((k) => {
        const lon = planets[k].longitude;
        const degInSign = lon % 30;
        const signIdx = Math.floor(lon / 30) % 12;
        return {
          planet: k,
          longitude: lon,
          degInSign,
          signIndex: signIdx
        };
      })
      .sort((a, b) => b.degInSign - a.degInSign);

    const charaKarakas: CharaKarakaResult[] = sorted.map((p, idx) => {
      const def = KARAKA_DEFINITIONS[Math.min(idx, KARAKA_DEFINITIONS.length - 1)];
      const rashi = ZODIAC_RASHIS[p.signIndex] || ZODIAC_RASHIS[0];
      return {
        karakaCode: def.code,
        karakaType: def.name,
        roleDescription: def.role,
        planet: p.planet,
        signName: rashi.name,
        dmsInSign: degToDMS(p.degInSign),
        longitude: p.longitude,
        degreeInSign: p.degInSign
      };
    });

    const lagnaSignIndex = Math.floor(lagnaLongitude / 30) % 12;
    const arudhaPadasList: ArudhaPadaResult[] = [];

    for (let h = 1; h <= 12; h++) {
      const houseSign = (lagnaSignIndex + (h - 1)) % 12;
      const lordName = SIGN_LORDS[houseSign] || "Mars";
      const lordPlanet = planets[lordName];
      const lordSign = lordPlanet ? Math.floor(lordPlanet.longitude / 30) % 12 : houseSign;

      const dist = (lordSign - houseSign + 12) % 12;
      let arudhaSign = (lordSign + dist) % 12;
      if (arudhaSign === houseSign || arudhaSign === (houseSign + 6) % 12) {
        arudhaSign = (arudhaSign + 9) % 12;
      }

      const rashi = ZODIAC_RASHIS[arudhaSign] || ZODIAC_RASHIS[0];
      const houseFromLagna = ((arudhaSign - lagnaSignIndex + 12) % 12) + 1;

      let code = `A${h}`;
      let name = `Arudha Pada ${h}`;
      let significance = `Material fruition and karmic reflection of House ${h}`;

      if (h === 1) {
        code = "AL";
        name = "Arudha Lagna (AL) — 1st Pada";
        significance = "Public image, status, prestige, and worldly persona.";
      } else if (h === 7) {
        code = "A7";
        name = "Darapada (A7) — 7th Pada";
        significance = "Worldly manifestation of business partnerships and marriage.";
      } else if (h === 12) {
        code = "UL";
        name = "Upapada Lagna (UL) — 12th Pada";
        significance = "Spouse institution, matrimonial durability, and family harmony.";
      }

      arudhaPadasList.push({
        padaCode: code,
        padaName: name,
        signName: rashi.name,
        houseFromLagna,
        significance
      });
    }

    return {
      charaKarakas,
      arudhaPadasList,
      atmakaraka: charaKarakas[0] || ({} as any),
      amatyakaraka: charaKarakas[1] || ({} as any),
      darakaraka: charaKarakas[charaKarakas.length - 1] || ({} as any)
    };
  }
}
