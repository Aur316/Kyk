import { useState, useEffect } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (v: T) => any] => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") {
        return;
      }
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
    try {
      if (typeof window === "undefined") {
        return;
      }
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export const useFetch = <T>(url: string) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setStatus("fetching");
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setStatus("fetched");
    };

    fetchData();
  }, [url]);

  return { status, data };
};

export const useFetchDoc = <T>(url: string) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setStatus("fetching");
      const response = await fetch(url);
      const data = await response.text();
      setData(data);
      setStatus("fetched");
    };

    fetchData();
  }, [url]);

  return { status, data };
};
