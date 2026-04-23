'use client';

import { useState, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------

export function useLocalStorage<T>(key: string, initialState: T) {
  const [state, setState] = useState<T>(initialState);

  // 🔄 Restaura do localStorage (client only)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);

      if (stored) {
        const parsed = JSON.parse(stored) as Partial<T>;

        setState((prev) => ({
          ...prev,
          ...parsed,
        }));
      }
    } catch (error) {
      console.error('Error reading localStorage:', error);
    }
  }, [key]);

  // 🔁 Update direto (type-safe, sem dor de cabeça com generics)
  const update = useCallback(
    <K extends keyof T>(name: K, value: T[K]) => {
      setState((prev) => {
        const newState = {
          ...prev,
          [name]: value,
        };

        try {
          window.localStorage.setItem(key, JSON.stringify(newState));
        } catch (error) {
          console.error('Error writing localStorage:', error);
        }

        return newState;
      });
    },
    [key]
  );

  // 🔄 Reset
  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing localStorage:', error);
    }

    setState(initialState);
  }, [initialState, key]);

  return {
    state,
    update,
    reset,
  };
}