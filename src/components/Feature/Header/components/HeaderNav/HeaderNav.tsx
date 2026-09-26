import type { FC } from 'react';
import clsx from 'clsx';
import { HEADER_COPY } from '../../constants';
import { HeaderNavSection } from './components/HeaderNavSection/HeaderNavSection';
import { useHeaderNav } from './hooks/useHeaderNav';
import styles from './HeaderNav.module.scss';

export const HeaderNav: FC = () => {
  const {
    sections,
    activeIndex,
    setSection,
    getProgress,
    getFillRatio,
    isVisible,
  } = useHeaderNav();

  return (
    <nav
      className={clsx(styles.headerNav, {
        [styles.headerNavVisible]: isVisible,
      })}
      aria-label={HEADER_COPY.bookNav}
      aria-hidden={!isVisible}
      inert={!isVisible ? true : undefined}
    >
      {sections.map((section, index) => (
        <HeaderNavSection
          key={section.id}
          isActive={index === activeIndex}
          isCover={section.id === 'contents' || section.id === 'back'}
          isBack={section.id === 'back'}
          ariaLabel={section.ariaLabel}
          label={section.label}
          progress={getProgress(index)}
          fillRatio={index === activeIndex ? getFillRatio(index) : 0}
          onSelect={() => setSection(index)}
        />
      ))}
    </nav>
  );
};
