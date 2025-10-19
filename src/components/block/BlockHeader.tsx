import styles from '../../styles/BtcBlockDetail.module.scss';

interface BlockHeaderProps {
  height?: number;
}

export const BlockHeader = ({ height }: BlockHeaderProps) => {
  return (
    <div className={styles.title}>
      <div className={styles.coinTitle}>
        <h1 className={styles.coinName}>
          <img alt="Bitcoin Icon" src="/icons/btc.png" />
          <span>BTC</span> / <span className={styles.block}>Block</span>
        </h1>
      </div>
      {height !== undefined && (
        <span className={styles.blockDepth}>
          Block at depth {height} in the Bitcoin blockchain
        </span>
      )}
    </div>
  );
};
