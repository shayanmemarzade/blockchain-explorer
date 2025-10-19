import type { Transaction } from '../../types/transaction';
import { formatBTC } from '../../utils/blockCalculations';
import { getMinerInfo } from '../../utils/minerInfo';
import styles from '../../styles/BtcBlockDetail.module.scss';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const txHash = transaction.txid || transaction.hash;

  return (
    <div className={styles.transactionItem}>
      <div className={styles.transactionHeader}>
        <p className={styles.transactionHash}>
          <span className={styles.label}>Hash: </span>
          <span className={styles.value}>{txHash}</span>
        </p>
      </div>

      <div className={styles.transactionDetails}>
        <div className={styles.transactionSection}>
          {transaction.inputs?.map((input, idx) => (
            <div key={idx} className={styles.transactionOutput}>
              <span className={styles.transactionOutputAddress}>
                {input.prev_out?.addr || getMinerInfo(transaction)}
              </span>
              <span className={styles.transactionOutputValue}>
                {formatBTC(input.prev_out?.value || 0)} BTC
              </span>
            </div>
          ))}
        </div>

        <div className={styles.arrowIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" />
          </svg>
        </div>

        <div className={styles.transactionSection}>
          {transaction.out?.map((output, idx) => (
            <div key={idx} className={styles.transactionOutput}>
              {output.addr && <span className={styles.transactionOutputAddress}>
                {output.addr}
              </span>}
              {!output.addr && <span className={styles.transactionOutputAddressOpReturn}>
                {'OP_RETURN'}
              </span>}
              <span className={styles.transactionOutputValue}>
                {formatBTC(output.value)} BTC
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
