export interface CoinPrice {
  bitcoin: Price
  "bitcoin-cash": Price
  ethereum: Price
}

export interface Price {
  usd: number
  usd_24h_change: number
}

export interface PricesData {
  btc: string;
  eth: string;
  bch: string;
}
