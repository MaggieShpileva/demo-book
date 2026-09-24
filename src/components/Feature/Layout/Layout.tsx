import clsx from 'clsx';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useSinglePageBook } from '../Book/hooks/useSinglePageBook';
import { FactModal } from '../FactModal';
import { Header } from '../Header';
import styles from './Layout.module.scss';

export const Layout = () => {
  const isMobileBook = useSinglePageBook();

  return (
    <div className={clsx(styles.layout)}>
      <ScrollRestoration />
      {isMobileBook ? <Header /> : null}
      <main className={clsx(styles.main)}>
        <Outlet />
      </main>
      <FactModal />
    </div>
  );
};
