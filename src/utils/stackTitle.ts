const PLACEHOLDER_TITLE = 'ЗАГОЛОВОК';

const DEFAULT_STACKED_PLACEHOLDER = 'ЗАГОЛО\nВОК';

export const stackTitle = (
  title: string,
  stackedPlaceholder = DEFAULT_STACKED_PLACEHOLDER
): string => {
  const normalized = title.replace(/\s+/g, '').toLocaleUpperCase('ru-RU');

  if (normalized === PLACEHOLDER_TITLE) {
    return stackedPlaceholder;
  }

  return title.toLocaleUpperCase('ru-RU');
};
