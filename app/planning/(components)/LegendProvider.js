"use client";
import { createContext, useContext, useState } from "react";
import { getColorsForLabels, missingFormateurLegend } from "../../../lib/colors";
import Legend from "./Legend";

const LegendContext = createContext();

export default function LegendProvider({ themes, children }) {
  const colors = getColorsForLabels(themes);
  const fullLegend = [
    missingFormateurLegend,
    ...themes.map((t) => ({ label: t, color: colors[t] })),
  ];

  const [legendList, setLegendList] = useState(fullLegend);

  const showLegend = (themes, includeMissingFormateur = false) => {
    setLegendList([
      ...fullLegend.filter(
        (l) =>
          themes.includes(l.label) ||
          (includeMissingFormateur && l.label == missingFormateurLegend.label)
      ),
    ]);
  };

  const colorOf = (label) => colors[label];

  return (
    <LegendContext.Provider value={{ showLegend,colorOf }}>
      {children}
      <Legend legendList={legendList} />
    </LegendContext.Provider>
  );
}

export function useLegend() {
  const ctx = useContext(LegendContext);
  if (ctx === undefined) {
    throw new Error("useLegend must be used within a LegendProvider");
  }
  return ctx;
}
