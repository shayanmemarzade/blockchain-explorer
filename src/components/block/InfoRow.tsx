import { CopyButton } from './CopyButton';
import commaSeparate from '../../utils/commaSeparate';
import styles from '../../styles/BtcBlockDetail.module.scss';

interface InfoRowProps {
  label: string;
  value: string | number | React.ReactNode;
  copyable?: boolean;
  onCopy?: (text: string) => void;
}

export const InfoRow = ({ label, value, copyable = false, onCopy }: InfoRowProps) => {
  const displayValue = typeof value === 'number' ? commaSeparate(value) : value;
  const copyValue = typeof value === 'number' ? value.toString() : (value as string);

  return (
    <div className={styles.infoTableRow}>
      <label>{label}</label>
      <span>
        <div className={styles.text}>{displayValue}</div>
        {copyable && onCopy && (
          <CopyButton text={copyValue} onCopy={onCopy} ariaLabel={`Copy ${label}`} />
        )}
      </span>
    </div>
  );
};
