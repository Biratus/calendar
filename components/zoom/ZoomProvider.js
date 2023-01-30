"use client";
import { createContext, useContext } from "react";
import { useLocalStorage } from "../../hooks/localStorageHook";
import { LoadingBar } from "../LoadingBar";

const ZoomContext = createContext();

export default function ZoomProvider({
  storageKey,
  defaultCoef = 1,
  children,
}) {
  const [zoom, setZoom, loaded] = useLocalStorage(storageKey, defaultCoef);
  return (
    <ZoomContext.Provider value={{ zoom, setZoom }}>
      {loaded ? children : <LoadingBar />}
    </ZoomContext.Provider>
  );
}

export function useZoom() {
  const ctx = useContext(ZoomContext);
  if (ctx === undefined) {
    throw new Error("useZoom must be used within a ZoomProvider");
  }
  return ctx;
}
