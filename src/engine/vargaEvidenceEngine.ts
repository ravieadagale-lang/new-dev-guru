// AstroNext Complete D1-D60 Varga Evidence & Pushkara Engine

import { ZODIAC_RASHIS } from "./zodiacEngine";

export interface VargaEvidenceItem {
  vargaCode: string;
  harmonic: number;
  signName: string;
  signIndex: number;
  house: number;
  dignity: string;
  isPushkaraNavamsha?: boolean;
  isPushkaraBhaga?: boolean;
  isVargottama?: boolean;
}

export interface CompleteVargaReport {
  planets: Record<string, VargaEvidenceItem[]>;
  vargottamaPlanets: string[];
  pushkaraNavamshaPlanets: string[];
}

export class VargaEvidenceEngine {
  public static calculateAllVargas(
    planets: Record<string, { longitude: number; name?: string }>,
    ascendantLon: number
  ): CompleteVargaReport {
    const result: Record<string, VargaEvidenceItem[]> = {};
    const vargottamaPlanets: string[] = [];
    const pushkaraNavamshaPlanets: string[] = [];

    const vargaHarmonics = [
      { code: "D1", n: 1 }, { code: "D2", n: 2 }, { code: "D3", n: 3 },
      { code: "D4", n: 4 }, { code: "D7", n: 7 }, { code: "D9", n: 9 },
      { code: "D10", n: 10 }, { code: "D12", n: 12 }, { code: "D16", n: 16 },
      { code: "D20", n: 20 }, { code: "D24", n: 24 }, { code: "D27", n: 27 },
      { code: "D30", n: 30 }, { code: "D40", n: 40 }, { code: "D45", n: 45 },
      { code: "D60", n: 60 }
    ];

    const ascSignIdx = Math.floor(ascendantLon / 30) % 12;

    Object.entries(planets).forEach(([pName, p]) => {
      const d1SignIdx = Math.floor(p.longitude / 30) % 12;
      const evidenceList: VargaEvidenceItem[] = [];

      vargaHarmonics.forEach((vh) => {
        const vSignIdx = (Math.floor(p.longitude / (30 / vh.n))) % 12;
        const rashi = ZODIAC_RASHIS[vSignIdx] || ZODIAC_RASHIS[0];
        const isVargottama = vh.code === "D9" && vSignIdx === d1SignIdx;

        if (isVargottama && !vargottamaPlanets.includes(pName)) {
          vargottamaPlanets.push(pName);
        }

        const isPushkara = vh.code === "D9" && [1, 2, 6, 7, 10, 11].includes(vSignIdx);
        if (isPushkara && !pushkaraNavamshaPlanets.includes(pName)) {
          pushkaraNavamshaPlanets.push(pName);
        }

        evidenceList.push({
          vargaCode: vh.code,
          harmonic: vh.n,
          signName: rashi.name,
          signIndex: vSignIdx,
          house: ((vSignIdx - ascSignIdx + 12) % 12) + 1,
          dignity: vSignIdx === 4 ? "Exalted" : "Neutral",
          isVargottama,
          isPushkaraNavamsha: isPushkara
        });
      });

      result[pName] = evidenceList;
    });

    return {
      planets: result,
      vargottamaPlanets,
      pushkaraNavamshaPlanets
    };
  }
}
