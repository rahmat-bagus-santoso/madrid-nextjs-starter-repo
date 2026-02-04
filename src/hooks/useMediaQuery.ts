import { useState, useEffect } from 'react';

// TODO Hook 2: Implement the useMediaQuery hook
// This hook should return true if the current window matches the provided media query string.
// Hint: Use window.matchMedia(query) and add an event listener for the 'change' event.

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // START TODO: Check the media query and set the initial state
    // const media = window.matchMedia(query);
    
    // START TODO: Add a listener for changes to the media query
    // const listener = () => setMatches(media.matches);
    // media.addEventListener('change', listener);
    
    return () => {
      // START TODO: Remove the event listener on cleanup
      // media.removeEventListener('change', listener);
    };
  }, [query]); // Note: query is a dependency

  return matches;
}
