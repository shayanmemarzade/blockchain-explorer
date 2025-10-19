export interface TxOutput {
  value: number;
  addr?: string;
}

export interface TxInput {
  prev_out?: {
    addr?: string;
    value?: number;
  };
  script: string;
  sigscript?: string;
}

export interface Transaction {
  hash?: string;
  txid?: string;
  time: number;
  fee?: number;
  out?: TxOutput[];
  inputs?: TxInput[];
}
