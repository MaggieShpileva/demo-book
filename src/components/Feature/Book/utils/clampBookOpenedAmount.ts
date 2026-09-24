export const clampBookOpenedAmount = (amount: number) =>
  Math.min(1, Math.max(0, amount));
