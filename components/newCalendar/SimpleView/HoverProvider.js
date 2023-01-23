"use client";
import { createContext, useContext, useState } from "react";

const HoverContext = createContext();
export default function HoverProvider({ children }) {
  const [hover, setHover] = useState();

  return (
    <HoverContext.Provider value={[hover, setHover]}>
      {children}
    </HoverContext.Provider>
  );
}

export function useHover() {
  const ctx = useContext(HoverContext);
  if (ctx === undefined) {
    throw new Error("useHover must be used within a HoverContext");
  }
  return ctx;
}
