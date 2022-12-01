import React, { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const debounce = setTimeout(() => setDebounceValue(value), delay);
    return () => {
      clearTimeout(debounce);
    };
  }, [delay, value]);
  return debounceValue;
};

export default useDebounce;
