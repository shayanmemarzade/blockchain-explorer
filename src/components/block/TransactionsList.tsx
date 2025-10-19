import type { Transaction } from '../../types/transaction';
import { TransactionItem } from './TransactionItem';
import styles from '../../styles/BtcBlockDetail.module.scss';

interface TransactionsListProps {
  transactions: Transaction[];
  limit?: number;
}

export const TransactionsList = ({ transactions, limit = 10 }: TransactionsListProps) => {
  const displayedTransactions = transactions.slice(0, limit);

  if (transactions.length === 0) {
    return (
      <p className={styles.noTransactions}>No transaction details available</p>
    );
  }

  return (
    <>
      <h3 className={styles.heading}>Transactions</h3>
      <div className={styles.transactionsContainer}>
        <div className={styles.transactionsList}>
          {displayedTransactions.map((tx) => (
            <TransactionItem key={tx.hash || tx.txid} transaction={tx} />
          ))}
        </div>
        {transactions.length > limit && (
          <p className={styles.transactionNote}>
            Showing {limit} of {transactions.length} transactions
          </p>
        )}
      </div>
    </>
  );
};
