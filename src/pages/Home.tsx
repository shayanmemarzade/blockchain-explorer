import { useEffect, useState } from 'react';
import { Search, Loading } from '../components';
import { LatestBlocksTable } from '../components/block';
import { fetchRecentBlocks } from '../api';
import type { BlockData } from '../types/block';
import CoinPriceList from '../components/block/CoinPriceList';
import styles from '../styles/Home.module.scss';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [latestBlocks, setLatestBlocks] = useState<BlockData[]>([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchLatestBlocks();
  }, []);

  const fetchLatestBlocks = async () => {
    setLoading(true);
    try {
      const { blocks, transactions } = await fetchRecentBlocks(10);
      setLatestBlocks(blocks);
      setTransactions(transactions);
    } catch (error) {
      console.error('Error fetching latest blocks:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      <div className={styles.homeParent}>
        <aside className={styles.aside}>
          <CoinPriceList />
        </aside>
        <main className={styles.mainContent}>
          <Search />
          <h3 className={styles.heading}>Latest blocks</h3>
          {loading ? (
            <Loading message="Loading latest blocks..." />
          ) : (
            <LatestBlocksTable blocks={latestBlocks} transactions={transactions} />
          )}
        </main>
      </div>
    </div>
  )
}

export default Home
