export interface CoinPrice {
  ticker: string;
  price: string;
}

export interface PricesData {
  btc: string;
  eth: string;
  bch: string;
}

export const fetchCryptoPrices = async (): Promise<PricesData> => {
  try {
    const response = await fetch('/api/_next/data/ad0724f/prices.json');

    if (!response.ok) {
      throw new Error('Failed to fetch prices');
    }

    const data = await response.json();

    if (!data?.pageProps?.priceData) {
      throw new Error('Invalid price data format');
    }

    const coins: CoinPrice[] = data.pageProps.priceData;

    return {
      btc: coins.find((coin) => coin.ticker === 'BTC')?.price || '',
      eth: coins.find((coin) => coin.ticker === 'ETH')?.price || '',
      bch: coins.find((coin) => coin.ticker === 'BCH')?.price || ''
    };
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return {
      btc: '',
      eth: '',
      bch: ''
    };
  }
};
