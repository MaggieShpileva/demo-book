import type { FC } from 'react';
import { Typography } from '@components/UI';
import type { Fact } from '@/types/fact';
import styles from './FactModalContent.module.scss';

type FactModalContentProps = {
  fact: Fact;
};

export const FactModalContent: FC<FactModalContentProps> = ({ fact }) => (
  <article className={styles.root}>
    <p className={styles.badge}>{fact.badge}</p>
    <div className={styles.hero}>
      <div className={styles.copy}>
        <Typography
          as="h2"
          variant="medium"
          size="large"
          uppercase
          className={styles.title}
        >
          {fact.title}
        </Typography>
        <Typography size="small" className={styles.text}>
          {fact.lead}
        </Typography>
      </div>
      <img
        className={styles.image}
        src={fact.image}
        alt={fact.imageAlt}
        width={124}
        height={130}
      />
    </div>
    <Typography size="small" className={styles.text}>
      {fact.body}
    </Typography>
  </article>
);
