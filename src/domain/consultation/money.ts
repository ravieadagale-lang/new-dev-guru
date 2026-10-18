import { Money } from "./types";

export function createMoney(amountMinor: number, currency: string = "INR"): Money {
  return {
    amountMinor: Math.round(amountMinor),
    currency,
  };
}

export function fromMajorUnits(amountMajor: number, currency: string = "INR"): Money {
  return {
    amountMinor: Math.round(amountMajor * 100),
    currency,
  };
}

export function toMajorUnits(money: Money): number {
  return money.amountMinor / 100;
}

export function formatMoney(money: Money): string {
  const major = toMajorUnits(money);
  if (money.currency === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(major);
  }
  if (money.currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(major);
  }
  return `${money.currency} ${major.toFixed(2)}`;
}

export function addMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) {
    throw new Error("Cannot add money with different currencies");
  }
  return {
    amountMinor: a.amountMinor + b.amountMinor,
    currency: a.currency,
  };
}

export function subtractMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) {
    throw new Error("Cannot subtract money with different currencies");
  }
  return {
    amountMinor: a.amountMinor - b.amountMinor,
    currency: a.currency,
  };
}

export function multiplyMoney(money: Money, factor: number): Money {
  return {
    amountMinor: Math.round(money.amountMinor * factor),
    currency: money.currency,
  };
}

export function isZeroMoney(money: Money): boolean {
  return money.amountMinor === 0;
}

export function isPositiveMoney(money: Money): boolean {
  return money.amountMinor > 0;
}

export function compareMoney(a: Money, b: Money): number {
  if (a.currency !== b.currency) {
    throw new Error("Cannot compare money with different currencies");
  }
  return a.amountMinor - b.amountMinor;
}
