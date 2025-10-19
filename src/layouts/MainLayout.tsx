import { Outlet } from 'react-router';
import Header from './Header';
import styles from '../styles/Main.module.scss';

const MainLayout = () => {
  return (
    <div className={styles['main-layout']}>
      <main className={styles['main-content']}>
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
