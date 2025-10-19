import type { BlockData } from '../../types/block';
import type { Transaction } from '../../types/transaction';
import { InfoRow } from './InfoRow';
import { formatTimestamp } from '../../utils/dateFormat';
import { formatBTC, getBlockSubsidy, getFeeReward, getTransactionVolume } from '../../utils/blockCalculations';
import { getMinerInfo } from '../../utils/minerInfo';
import commaSeparate from '../../utils/commaSeparate';
import styles from '../../styles/BtcBlockDetail.module.scss';

interface BlockInfoTableProps {
  blockData: BlockData;
  confirmations: number;
  onCopy: (text: string) => void;
}

export const BlockInfoTable = ({ blockData, confirmations, onCopy }: BlockInfoTableProps) => {
  const transactions = blockData.tx as Transaction[];
  return (
    <div className={styles.infoTable}>
      <InfoRow
        label="Hash"
        value={blockData.hash}
        copyable
        onCopy={onCopy}
      />
      <InfoRow label="Confirmations" value={confirmations} />
      <InfoRow label="Timestamp" value={formatTimestamp(blockData.time)} />
      <InfoRow label="Height" value={blockData.height} />
      <InfoRow label="Miner" value={getMinerInfo(transactions[0])} />
      <InfoRow label="Number of Transactions" value={blockData.tx.length} />
      <InfoRow
        label="Difficulty"
        value={commaSeparate(parseInt(String(blockData.bits), 16))}
      />
      <InfoRow label="Merkle Root" value={blockData.mrkl_root || 'N/A'} />
      <InfoRow label="Version" value={blockData.ver || 'N/A'} />
      <InfoRow label="Bits" value={blockData.bits} />
      <InfoRow label="Weight" value={`${commaSeparate(blockData.weight)} WU`} />
      <InfoRow label="Size" value={`${commaSeparate(blockData.size)} bytes`} />
      <InfoRow label="Nonce" value={blockData.nonce} />
      <InfoRow
        label="Transactions volume"
        value={`${formatBTC(getTransactionVolume(blockData))} BTC`}
      />
      <InfoRow
        label="Block reward"
        value={`${formatBTC(getBlockSubsidy(blockData.height))} BTC`}
      />
      <InfoRow
        label="Fee reward"
        value={`${formatBTC(getFeeReward(blockData, transactions))} BTC`}
      />
    </div>
  );
};
