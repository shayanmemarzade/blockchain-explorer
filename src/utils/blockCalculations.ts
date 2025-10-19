import type { BlockData } from '../types/block';
import type { Transaction } from '../types/transaction';

const SATOSHIS_PER_BTC = 100_000_000;
const INITIAL_SUBSIDY = 50 * SATOSHIS_PER_BTC;
const HALVING_INTERVAL = 210_000;
const MAX_HALVINGS = 64;

export const formatBTC = (satoshis: number): string => {
  return (satoshis / SATOSHIS_PER_BTC).toFixed(8);
};

export const getBlockSubsidy = (height: number): number => {
  const halvings = Math.floor(height / HALVING_INTERVAL);
  if (halvings >= MAX_HALVINGS) return 0;

  const divisor = Math.pow(2, halvings);
  return Math.floor(INITIAL_SUBSIDY / divisor);
};

const getTransactionOutputValue = (transaction: Transaction): number => {
  const outputs = transaction.out || [];
  return outputs.reduce((sum, output) => sum + (output?.value || 0), 0);
};

export const getFeeReward = (block: BlockData | null, transactions: Transaction[]): number => {
  if (!block || !transactions || transactions.length === 0) return 0;

  const subsidy = getBlockSubsidy(block.height);

  for (const tx of transactions) {
    const outputs = getTransactionOutputValue(tx);
    return Math.max(0, outputs - subsidy);
  }
  return 0;
};

export const getTransactionVolume = (block: BlockData | null): number => {
  if (!block || !Array.isArray(block.tx)) return 0;

  try {
    let totalVolume = 0;

    for (let i = 1; i < block.tx.length; i++) {
      const tx = block.tx[i];
      const outputs = tx.out || [];

      totalVolume += outputs.reduce(
        (sum, output) => sum + (output?.value || 0),
        0
      );
    }

    return totalVolume;
  } catch (error) {
    console.error('Error calculating transaction volume:', error);
    return 0;
  }
};
