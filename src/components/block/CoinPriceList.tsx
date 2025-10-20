import { useEffect, useState } from 'react'
import commaSeparate from '../../utils/commaSeparate';
import { fetchCryptoPrices } from '../../api';
import styles from '../../styles/Home.module.scss';

export default function CoinPriceList() {
  const [prices, setPrices] = useState({
    btc: '',
    eth: '',
    bch: ''
  });

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const pricesData = await fetchCryptoPrices();
      setPrices(pricesData);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  const coins = [
    { id: 'btc', name: 'Bitcoin', icon: '/icons/btc.png', alt: 'Bitcoin Icon' },
    { id: 'eth', name: 'Ethereum', icon: '/icons/eth.png', alt: 'Ethereum Icon' },
    { id: 'bch', name: 'Bitcoin Cash', icon: '/icons/bch.svg', alt: 'Bitcoin Cash Icon' }
  ];

  return (
    <>
      <h3 className={styles.heading}>Block Explorer</h3>
      <ul className={styles.coinPriceList}>
        {coins.map((coin) => (
          <li key={coin.id}>
            <img src={coin.icon} alt={coin.alt} />
            <div>
              <span className={styles.coinName}>{coin.name}</span>
              <span className={styles.coinPrice}>
                {prices[coin.id as keyof typeof prices] ? `$${commaSeparate(prices[coin.id as keyof typeof prices])}` : 'Loading...'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
