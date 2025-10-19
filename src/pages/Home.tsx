import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { truncateHash } from '../utils/truncate';
import { timeAgo } from '../utils/timeAgo';
import { getMinerInfo } from '../utils/minerInfo';
import { Search, Loading } from '../components';
import { fetchRecentBlocks } from '../api';
import type { Block } from '../types/block';
import CoinPriceList from '../components/block/CoinPriceList';
import styles from '../styles/Home.module.scss';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [latestBlocks, setLatestBlocks] = useState<Block[]>([]);
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
            <div className={styles.tableContainer}>
              <div className={styles.tableGrid}>
                <div className={`${styles.tableRow} ${styles.tableRowHeader}`}>
                  <div className={`${styles.tableCell} ${styles.tableHeader}`}>Height</div>
                  <div className={`${styles.tableCell} ${styles.tableHeader}`}>Hash</div>
                  <div className={`${styles.tableCell} ${styles.tableHeader}`}>Mined</div>
                  <div className={`${styles.tableCell} ${styles.tableHeader}`}>Miner</div>
                  <div className={`${styles.tableCell} ${styles.tableHeader}`}>Size</div>
                </div>
                {latestBlocks.map((block, index) => (
                  <div className={styles.tableRow}
                    key={block.hash}
                  >
                    <div className={`${styles.tableCell} ${styles.tableData} ${styles.heightCell}`} data-label="Height">{block.height}</div>
                    <div className={`${styles.tableCell} ${styles.tableData} ${styles.hashCell}`} data-label="Hash">
                      <Link to={`/explorer/blocks/btc/${block.hash}`}><span className={styles.hashText}>{truncateHash(block.hash, 1, 40)}</span></Link>
                    </div>
                    <div className={`${styles.tableCell} ${styles.tableData}`} data-label="Mined">
                      {timeAgo(block.time)}
                    </div>
                    <div className={`${styles.tableCell} ${styles.tableData} ${styles.minerCell}`} data-label="Miner">
                      {getMinerInfo(transactions[index])}
                    </div>
                    <div className={`${styles.tableCell} ${styles.tableData}`} data-label="Size">{(block.size).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Bytes</div>
                  </div>
                ))}

              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Home
