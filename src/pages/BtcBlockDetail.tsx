import { useParams } from 'react-router';
import { Loading } from '../components';
import { useBlockData } from '../hooks/useBlockData';
import { BlockHeader } from '../components/block/BlockHeader';
import { BlockInfoTable } from '../components/block/BlockInfoTable';
import { TransactionsList } from '../components/block/TransactionsList';
import type { Transaction } from '../types/transaction';
import styles from '../styles/BtcBlockDetail.module.scss';

const BtcBlockDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { blockData, confirmations, loading, error } = useBlockData(id);

  return (
    <div className="container">
      <BlockHeader height={blockData?.height} />

      {loading ? (
        <Loading message="Loading block details..." />
      ) : error ? (
        <div className={styles.errorMessage}>
          <p>Block not found. Please check the block hash and try again.</p>
          <p className={styles.errorDetail}>{error}</p>
        </div>
      ) : blockData ? (
        <>
          <BlockInfoTable
            blockData={blockData}
            confirmations={confirmations}
          />
          <TransactionsList transactions={blockData.tx as Transaction[]} limit={10} />
        </>
      ) : (
        <div className={styles.errorMessage}>
          <p>No data available</p>
        </div>
      )}
    </div>
  );
};

export default BtcBlockDetail;
