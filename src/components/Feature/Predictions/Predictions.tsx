import type { FC } from 'react';
import { Title, Typography } from '@components/UI';
import { MatchCard } from './components/MatchCard';
import { MOCK_MATCH_CARDS, PREDICTIONS_COPY } from './mock';
import styles from './Predictions.module.scss';

export const Predictions: FC = () => {
  return (
    <section className={styles.section} aria-labelledby="predictions-heading">
      <div className={styles.header}>
        <Title
          tag="h2"
          variant="bold"
          id="predictions-heading"
          className={styles.heading}
        >
          {PREDICTIONS_COPY.heading}
        </Title>
        <Typography variant="medium" className={styles.description}>
          {PREDICTIONS_COPY.description}
        </Typography>
      </div>

      <div className={styles.list}>
        <MatchCard key={MOCK_MATCH_CARDS.id} data={MOCK_MATCH_CARDS} />
      </div>
    </section>
  );
};
