import styles from '../styles/Header.module.scss';
import { Link } from 'react-router';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">Blockchain Explorer</Link>
    </header>
  );
};

export default Header;
