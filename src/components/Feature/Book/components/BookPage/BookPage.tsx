import type { FC } from 'react';
import clsx from 'clsx';
import type { BookPageData } from '../../mock';
import styles from './BookPage.module.scss';

type BookPageProps = {
  page: BookPageData;
};

export const BookPage: FC<BookPageProps> = ({ page }) => {
  const isCover = page.variant === 'cover';

  return (
    <article
      className={clsx(styles.root, isCover ? styles.cover : styles.page)}
      data-density={isCover ? 'hard' : 'soft'}
      aria-label={page.title ?? `Page ${page.pageNumber ?? ''}`}
    >
      {page.title != null && (
        <h2 className={isCover ? styles.coverTitle : styles.pageTitle}>
          {page.title}
        </h2>
      )}
      {isCover && page.subtitle != null && (
        <p className={styles.coverSubtitle}>{page.subtitle}</p>
      )}
      {!isCover && page.body != null && (
        <div className={styles.pageBody}>
          {page.body.map((paragraph) => (
            <p key={paragraph} className={styles.pageParagraph}>
              {paragraph}
            </p>
          ))}
        </div>
      )}
      {page.pageNumber != null && (
        <span className={styles.pageNumber}>{page.pageNumber}</span>
      )}
    </article>
  );
};
