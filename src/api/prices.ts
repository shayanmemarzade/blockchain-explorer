import type { CoinPrice, PricesData } from '../types/prices';

export const fetchCryptoPrices = async (): Promise<PricesData> => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,bitcoin-cash&vs_currencies=usd&include_24hr_change=true');

    if (!response.ok) {
      throw new Error('Failed to fetch prices');
    }

    const data = await response.json();

    const coins: CoinPrice = data;

    return {
      btc: coins['bitcoin'].usd.toString() || '',
      eth: coins['ethereum'].usd.toString() || '',
      bch: coins['bitcoin-cash'].usd.toString() || ''
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
