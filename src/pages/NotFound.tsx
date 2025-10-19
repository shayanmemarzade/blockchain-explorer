import { Link } from 'react-router';
import styles from '../styles/NotFound.module.scss';

const NotFound = () => {
  return (
    <div className="container">
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.description}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.homeLink}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
