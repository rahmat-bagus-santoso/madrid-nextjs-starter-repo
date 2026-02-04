import { useState, useEffect } from 'react';

// TODO Hook 4: Implement the useFetch hook
// This hook should fetch data from a URL and provide loading and error states.
// Hint: Use async/await inside useEffect and handle errors with try/catch.

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // START TODO: Implement fetching logic with loading and error handling
      setLoading(true);
      try {
        // const response = await fetch(url);
        // const result = await response.json();
        // setData(result);
      } catch (err) {
        // setError(err as Error);
      } finally {
        setLoading(false);
      }
      // END TODO
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
