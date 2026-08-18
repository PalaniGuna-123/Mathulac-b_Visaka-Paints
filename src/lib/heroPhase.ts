type Listener = (hidden: boolean) => void;
const listeners = new Set<Listener>();

export const heroNav = {
  on(fn: Listener) { listeners.add(fn); },
  off(fn: Listener) { listeners.delete(fn); },
  /** @internal called by Hero timeline */
  emit(hidden: boolean) { listeners.forEach(fn => fn(hidden)); },
};
