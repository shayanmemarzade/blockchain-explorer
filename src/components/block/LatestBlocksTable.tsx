import { Link } from 'react-router';
import { truncateHash } from '../../utils/truncate';
import { timeAgo } from '../../utils/timeAgo';
import { getMinerInfo } from '../../utils/minerInfo';
import type { BlockData } from '../../types/block';
import type { Transaction } from '../../types/transaction';
import styles from '../../styles/Home.module.scss';

interface LatestBlocksTableProps {
  blocks: BlockData[];
  transactions: Transaction[];
}

export const LatestBlocksTable = ({ blocks, transactions }: LatestBlocksTableProps) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableGrid}>
        <div className={`${styles.tableRow} ${styles.tableRowHeader}`}>
          <div className={`${styles.tableCell} ${styles.tableHeader}`}>Height</div>
          <div className={`${styles.tableCell} ${styles.tableHeader}`}>Hash</div>
          <div className={`${styles.tableCell} ${styles.tableHeader}`}>Mined</div>
          <div className={`${styles.tableCell} ${styles.tableHeader}`}>Miner</div>
          <div className={`${styles.tableCell} ${styles.tableHeader}`}>Size</div>
        </div>
        {blocks.map((block, index) => (
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
  );
};

