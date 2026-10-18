// AstroNext Graha Yuddha (Planetary War) & Combustion Engine

export interface PlanetaryWarContest {
  planet1: string;
  planet2: string;
  angularSeparationDeg: number;
  winnerPlanet: string;
  loserPlanet: string;
  victoryCriterion: string;
  description: string;
}

export interface CombustionDeepDetail {
  planet: string;
  angularSeparationDeg: number;
  thresholdDeg: number;
  isCombust: boolean;
  intensityPercentage: number;
}

export interface ShayanaadiAvasthaResult {
  planet: string;
  avasthaIndex: number;
  avasthaName: string;
  description: string;
}

const COMBUSTION_THRESHOLDS: Record<string, { direct: number; retrograde: number }> = {
  Moon: { direct: 12.0, retrograde: 12.0 },
  Mars: { direct: 17.0, retrograde: 17.0 },
  Mercury: { direct: 14.0, retrograde: 12.0 },
  Jupiter: { direct: 11.0, retrograde: 11.0 },
  Venus: { direct: 10.0, retrograde: 8.0 },
  Saturn: { direct: 15.0, retrograde: 15.0 }
};

const SHAYANAADI_AVASTHAS = [
  "Sayana (Resting / Inactive)",
  "Upaveshana (Seated / Meditative)",
  "Netrapani (Eyes on Hand / Planning)",
  "Prakasha (Radiant / Illuminated)",
  "Gamana (On the Move / Traversing)",
  "Agamana (Returning / Home-bound)",
  "Sabha (Assembly / In Council)",
  "Agama (Attentive / Receptive)",
  "Bhojana (Feasting / Enjoying)",
  "Nrityalipsa (Eager to Dance / Joyous)",
  "Kautuka (Curious / Fascinated)",
  "Nidra (Sleeping / Unconscious)"
];

export class GrahaYuddhaEngine {
  public static calculateCombustions(
    sunLon: number,
    planets: Record<string, { longitude: number; isRetrograde?: boolean }>
  ): Record<string, CombustionDeepDetail> {
    const result: Record<string, CombustionDeepDetail> = {};

    Object.entries(planets).forEach(([pName, p]) => {
      if (pName === "Sun" || pName === "Rahu" || pName === "Ketu") return;

      const diff = Math.abs(p.longitude - sunLon);
      const separation = Math.min(diff, 360 - diff);
      const thresholds = COMBUSTION_THRESHOLDS[pName] || { direct: 12.0, retrograde: 12.0 };
      const threshold = p.isRetrograde ? thresholds.retrograde : thresholds.direct;
      const isCombust = separation <= threshold;
      const intensityPct = isCombust ? Math.round(((threshold - separation) / threshold) * 100) : 0;

      result[pName] = {
        planet: pName,
        angularSeparationDeg: parseFloat(separation.toFixed(4)),
        thresholdDeg: threshold,
        isCombust,
        intensityPercentage: intensityPct
      };
    });

    return result;
  }

  public static evaluatePlanetaryWar(
    planets: Record<string, { longitude: number; latitude?: number; name?: string }>
  ): PlanetaryWarContest[] {
    const wars: PlanetaryWarContest[] = [];
    const validPlanets = ["Mars", "Mercury", "Jupiter", "Venus", "Saturn"];

    for (let i = 0; i < validPlanets.length; i++) {
      for (let j = i + 1; j < validPlanets.length; j++) {
        const p1Name = validPlanets[i];
        const p2Name = validPlanets[j];
        const p1 = planets[p1Name];
        const p2 = planets[p2Name];

        if (!p1 || !p2) continue;

        const diff = Math.abs(p1.longitude - p2.longitude);
        const sep = Math.min(diff, 360 - diff);

        if (sep <= 1.0) {
          // Winner: planet with higher (more northern) latitude, or Venus rule
          const lat1 = p1.latitude ?? 0;
          const lat2 = p2.latitude ?? 0;

          const p1Wins = lat1 >= lat2;
          const winner = p1Wins ? p1Name : p2Name;
          const loser = p1Wins ? p2Name : p1Name;

          wars.push({
            planet1: p1Name,
            planet2: p2Name,
            angularSeparationDeg: parseFloat(sep.toFixed(4)),
            winnerPlanet: winner,
            loserPlanet: loser,
            victoryCriterion: "Northern Ecliptic Latitude (Uttara Kanti Vijaya)",
            description: `${winner} emerges victorious in Graha Yuddha over ${loser} due to northern latitude superiority.`
          });
        }
      }
    }

    return wars;
  }

  public static calculateShayanaadiAvasthas(
    planets: Record<string, { longitude: number; name?: string }>,
    ascendantLon: number,
    birthMoonNakshatraIndex: number
  ): Record<string, ShayanaadiAvasthaResult> {
    const result: Record<string, ShayanaadiAvasthaResult> = {};
    const planetNames = Object.keys(planets);

    planetNames.forEach((pName, idx) => {
      const p = planets[pName];
      const pNak = Math.floor(p.longitude / (360 / 27));
      const avasthaIdx = (pNak + birthMoonNakshatraIndex + idx) % 12;

      result[pName] = {
        planet: pName,
        avasthaIndex: avasthaIdx + 1,
        avasthaName: SHAYANAADI_AVASTHAS[avasthaIdx] || SHAYANAADI_AVASTHAS[0],
        description: `Operating in ${SHAYANAADI_AVASTHAS[avasthaIdx]} mode, modulating functional output.`
      };
    });

    return result;
  }
}
