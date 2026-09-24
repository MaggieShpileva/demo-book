import type { FC } from 'react';
import SVG_qrCode from '@assets/images/desktop-placeholder/qr-code.svg';
import styles from './DesktopPlaceholder.module.scss';

export const DesktopPlaceholder: FC = () => (
  <section className={styles.root} aria-label="Откройте с телефона">
    <div className={styles.content}>
      <h1 className={styles.title}>откройте с телефона</h1>
      <img
        className={styles.qr}
        src={SVG_qrCode}
        width={125}
        height={125}
        alt="QR-код для перехода в приложение"
      />
      <p className={styles.caption}>
        Розыгрыши доступны только в приложении —
        <br />
        сканируйте QR-код, чтобы перейти!
      </p>
    </div>
  </section>
);
