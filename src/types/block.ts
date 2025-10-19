import type { Transaction } from './transaction';

export interface Block {
  hash: string
  height: number
  mainchain: boolean
  previous: string
  time: number
  version: number
  bits: number
  nonce: number
  size: number
  tx: string[]
  merkle: string
  subsidy: number
  fees: number
  outputs: number
  work: number
  weight: number
}

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
