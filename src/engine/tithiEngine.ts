// AstroNext Tithi Engine

export interface TithiDetails {
  index: number;
  name: string;
  paksha: "Shukla" | "Krishna";
  degreeCompleted: number;
  fractionLeft: number;
}

const TITHI_NAMES = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima"
];

export class TithiEngine {
  public static calculateTithi(sunLon: number, moonLon: number): TithiDetails {
    const diff = (moonLon - sunLon + 360) % 360;
    const rawIdx = Math.floor(diff / 12);
    const index = rawIdx + 1;
    const isShukla = rawIdx < 15;
    const nameIndex = rawIdx % 15;
    const name = nameIndex === 14 ? (isShukla ? "Purnima" : "Amavasya") : TITHI_NAMES[nameIndex];

    return {
      index,
      name,
      paksha: isShukla ? "Shukla" : "Krishna",
      degreeCompleted: diff % 12,
      fractionLeft: (12 - (diff % 12)) / 12
    };
  }
}
