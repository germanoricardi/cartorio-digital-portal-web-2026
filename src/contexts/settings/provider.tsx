'use client';

import isEqual from 'lodash/isEqual';
import { useMemo, useState, useCallback } from 'react';

import { SettingsValueProps } from './types';
import { SettingsContext } from './index';
import { useLocalStorage } from '@/hooks/use-local-storage';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'settings';

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage<SettingsValueProps>(
    STORAGE_KEY,
    defaultSettings
  );

  const [open, setOpen] = useState(false);

  // Drawer
  const onToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const canReset = !isEqual(state, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...state,

      // update (tipado corretamente via hook)
      onUpdate: update,

      // reset
      canReset,
      onReset: reset,

      // drawer
      open,
      onToggle,
      onClose,
    }),
    [state, update, reset, canReset, open, onToggle, onClose]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}