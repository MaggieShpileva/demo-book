type BookLoadPauseKey = 'walk' | 'drag';

const flags: Record<BookLoadPauseKey, boolean> = {
  walk: false,
  drag: false,
};

const listeners = new Set<() => void>();

const notifyBookLoadPause = () => {
  listeners.forEach((listener) => listener());
};

export const isBookLoadPaused = () => flags.walk || flags.drag;

export const setBookLoadPause = (key: BookLoadPauseKey, value: boolean) => {
  if (flags[key] === value) {
    return;
  }

  flags[key] = value;
  notifyBookLoadPause();
};

export const subscribeBookLoadPause = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const waitBookLoadResume = () =>
  new Promise<void>((resolve) => {
    if (!isBookLoadPaused()) {
      resolve();
      return;
    }

    const onChange = () => {
      if (isBookLoadPaused()) {
        return;
      }

      listeners.delete(onChange);
      resolve();
    };

    listeners.add(onChange);
  });
