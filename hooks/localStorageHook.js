"use client";
import { useState, useEffect, useRef } from "react";

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [loaded, setLoaded] = useState(false);

  // Load when localStorage is available
  useEffect(() => {
    const jsonValue = localStorage.getItem(key);
    console.log("Get from LS", jsonValue);
    if (jsonValue == null) localStorage.setItem(key, JSON.stringify(value));
    else {
      setValue(() => JSON.parse(jsonValue));
      setLoaded(true);
    }
  }, []);

  // setValue & persist in localStorage
  const changeValue = (v) => {
    setValue(() => {
      localStorage.setItem(key, JSON.stringify(v));
      return v;
    });
  };

  return [value, changeValue, loaded];
}
