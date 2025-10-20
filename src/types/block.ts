import type { Transaction } from './transaction';
export interface BlockData {
  hash: string;
  height: number;
  time: number;
  tx: Transaction[];
  bits: number | string;
  mrkl_root?: string;
  merkle?: string;
  ver?: number;
  weight: number;
  size: number;
  nonce: number;
  outputs?: number;
}
