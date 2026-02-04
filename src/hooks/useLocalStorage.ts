import { useState } from 'react';

// TODO Hook 3: Implement the useLocalStorage hook
// This hook should sync state with window.localStorage.
// Hint: Be careful with SSR (check if window is defined) and handle JSON parsing errors.

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    // START TODO: Retrieve initial value from localStorage or fallback to initialValue
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      console.error(error);
    }
    return initialValue;
    // END TODO
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // START TODO: Update state and save to localStorage
      // const valueToStore = value instanceof Function ? value(storedValue) : value;
      // setStoredValue(valueToStore);
      // if (typeof window !== "undefined") {
      //   window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // }
      // END TODO
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
