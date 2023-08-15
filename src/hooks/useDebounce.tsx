import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null);

  useEffect(() => {
    if (value !== debouncedValue) {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, delay, debouncedValue]);

  return debouncedValue;
}
