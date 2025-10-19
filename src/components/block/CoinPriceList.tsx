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

  return (
    <>
      <h3 className={styles.heading}>Block Explorer</h3>
      <ul className={styles.coinPriceList}>
        <li>
          <img src='/icons/btc.png' alt='Bitcoin Icon' />
          <div>
            <span className={styles.coinName}>Bitcoin</span>
            <span className={styles.coinPrice}>{prices.btc ? `$${commaSeparate(prices.btc)}` : 'Loading...'}</span>
          </div>
        </li>
        <li>
          <img src='/icons/eth.png' alt='Ethereum Icon' />
          <div>
            <span className={styles.coinName}>Ethereum</span>
            <span className={styles.coinPrice}>{prices.eth ? `$${commaSeparate(prices.eth)}` : 'Loading...'}</span>
          </div>
        </li>
        <li>
          <img src='/icons/bch.svg' alt='Bitcoin Cash Icon' />
          <div>
            <span className={styles.coinName}>Bitcoin Cash</span>
            <span className={styles.coinPrice}>{prices.bch ? `$${commaSeparate(prices.bch)}` : 'Loading...'}</span>
          </div>
        </li>
      </ul>
    </>
  )
}
