import styles from '../../styles/Loading.module.scss';

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = 'Loading...' }: LoadingProps) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>{message}</p>
    </div>
  );
};

export default Loading;
