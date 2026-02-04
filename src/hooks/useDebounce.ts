import { useState, useEffect } from 'react';

// TODO Hook 1: Implement the useDebounce hook
// This hook should delay updating its returned value until a specified delay has passed.
// Hint: Use setTimeout and cleanup with clearTimeout inside useEffect.

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // START TODO: Set a timeout to update debouncedValue after the specified delay
    // setDebouncedValue(value);
    // END TODO

    return () => {
      // START TODO: Clear the timeout if the value or delay changes
      // END TODO
    };
  }, [value, delay]);

  return debouncedValue;
}
