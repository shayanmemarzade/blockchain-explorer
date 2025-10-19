import type { Transaction } from '../types/transaction';

const hexToString = (hex: string): string => {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    const charCode = parseInt(hex.substr(i, 2), 16);
    if (charCode >= 32 && charCode <= 126) {
      str += String.fromCharCode(charCode);
    }
  }
  return str;
};

export const getMinerInfo = (transaction: Transaction): string => {
  if (transaction && transaction.inputs && transaction.inputs[0]) {
    const input = transaction.inputs[0];
    const sigscriptHex: string | undefined = input.script || input.sigscript;

    if (!sigscriptHex) return 'Unknown';

    const sigScriptText: string = hexToString(sigscriptHex).toLowerCase();

    if (sigScriptText.includes('antpool')) return 'AntPool';
    if (sigScriptText.includes('f2pool')) return 'F2Pool';
    if (sigScriptText.includes('foundry')) return 'Foundry USA';
    if (sigScriptText.includes('viabtc')) return 'ViaBTC';
    if (sigScriptText.includes('binance')) return 'Binance Pool';
    if (sigScriptText.includes('poolin')) return 'Poolin';
    if (sigScriptText.includes('luxor')) return 'Luxor';
    if (sigScriptText.includes('slush')) return 'SlushPool';
    if (sigScriptText.includes('mara')) return 'MARA Pool';
  }

  return 'Unknown';
};