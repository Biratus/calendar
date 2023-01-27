"use client";
import { createContext, useContext, useState } from "react";
import {
  getColorsForLabels,
  missingFormateurLegend,
} from "../../../lib/colors";
import Legend from "./Legend";

const LegendContext = createContext();

export default function LegendProvider({ themes, children }) {
  const colors = getColorsForLabels(themes);  
  
  const colorOf = (label,raw=false) => {
    if(!colors[label]) throw new Error('No matching color for ',label);
    if(raw) return colors[label];
    return colors[label].rgb;
  }
  const fullLegend = [
    missingFormateurLegend,
    ...themes.map((t) => ({ label: t, color: colorOf(t) })),
  ];

  const [legendList, setLegendList] = useState(fullLegend);

  const showLegend = (themes, includeMissingFormateur = false) => {
    if (!themes) {
      setLegendList(fullLegend);
    } else {
      setLegendList([
        ...fullLegend.filter(
          (l) =>
            themes.includes(l.label) ||
            (includeMissingFormateur && l.label == missingFormateurLegend.label)
        ),
      ]);
    }
  };



  return (
    <LegendContext.Provider value={{ showLegend, colorOf }}>
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
