import type { FC } from 'react';
import { Button, Title, Typography } from '@components/UI';
import SVG_ArrowUpRight from '@assets/icons/arrow-up-right.svg?react';
import WEBP_Safe from '@assets/images/main-banner/safe.webp';
import SVG_Glow from '@assets/images/main-banner/glow.svg';
import { MAIN_BANNER_COPY } from './mock';
import styles from './MainBanner.module.scss';

type MainBannerProps = {
  onCtaClick?: () => void;
};

export const MainBanner: FC<MainBannerProps> = ({ onCtaClick }) => {
  return (
    <section className={styles.banner} aria-labelledby="main-banner-heading">
      <img className={styles.glow} src={SVG_Glow} alt="" aria-hidden />
      <div className={styles.blurTop} aria-hidden />
      <div className={styles.blurBottom} aria-hidden />

      <div className={styles.prize}>
        <Title
          tag="h1"
          variant="bold"
          id="main-banner-heading"
          className={styles.label}
        >
          {MAIN_BANNER_COPY.label}
        </Title>
        <p className={styles.amount}>{MAIN_BANNER_COPY.amount}</p>
      </div>

      <div className={styles.safeWrap}>
        <img
          className={styles.safe}
          src={WEBP_Safe}
          alt=""
          aria-hidden
        />
      </div>

      <Button type="button" className={styles.cta} onClick={onCtaClick}>
        <SVG_ArrowUpRight className={styles.ctaIcon} aria-hidden />
        <Typography as="span" variant="bold" className={styles.ctaText}>
          {MAIN_BANNER_COPY.cta}
        </Typography>
      </Button>
    </section>
  );
};
