"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  missingFormateurStyle,
  overlapModuleStyle
} from "../../../components/newCalendar/styles";
import { getColorsForLabels } from "../../../lib/colors";
import Legend from "./Legend";

const missingFormateurLegend = {
  label: "Formateur non défini",
  color: missingFormateurStyle("grey"),
};

const overlapModuleLegend = {
  label: "Modules superposés",
  color: overlapModuleStyle,
};

const LegendContext = createContext();

export default function LegendProvider({ themes, children }) {
  const colors = getColorsForLabels(themes);

  const colorOf = useCallback((label, raw = false) => {
    if (!colors[label]) throw new Error("No matching color for ", label);
    if (raw) return colors[label];
    return colors[label].rgb;
  });
  
  const fullLegend = useMemo(() => [
    missingFormateurLegend,
    overlapModuleLegend,
    ...themes.map((t) => ({ label: t, color: colorOf(t) })),
  ]);

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
