import { useState, useEffect, useRef } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) setValue(JSON.parse(item) as T);
    } catch {
      // Ignore
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore
    }
  }, [key, value, isLoaded]);

  return [value, setValue, isLoaded] as const;
}

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) callback();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [callback]);

  return ref;
}
