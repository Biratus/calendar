"use client";
import { useState, useEffect } from "react";

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue == null)
        localStorage.setItem(key, JSON.stringify(defaultValue));
      else {
        defaultValue = JSON.parse(jsonValue);
      }
    }
    return { value: defaultValue, loaded: false };
  });

  // Load when localStorage is available
  useEffect(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) localStorage.setItem(key, JSON.stringify(value));
    else {
      setValue(() => ({ value: JSON.parse(jsonValue), loaded: true }));
    }
  }, []);

  // setValue & persist in localStorage
  const changeValue = (newValue) => {
    if (newValue instanceof Function)
      setValue((prev) => {
        let nv = newValue(prev.value);
        localStorage.setItem(key, JSON.stringify(nv));
        return { ...prev, value: nv };
      });
    else {
      setValue((nv) => {
        localStorage.setItem(key, JSON.stringify(v));
        return v;
      });
    }
  };

  return [value.value, changeValue, value.loaded];
}
