import distinctColors from "distinct-colors";
import { missingFormateurStyle } from "../components/calendar/styles/styles";

export function getColorsForLabels(labelList) {
  let labels = [...new Set(labelList)];

  let arr = distinctColors({
    count: labels.length,
    chromaMin: 50,
    lightMin: 20,
    lightMax: 80,
  }).map(
    ({ _rgb: [r, g, b] }) =>
      `rgb(${r.toFixed(2)},${g.toFixed(2)},${b.toFixed(2)})`
  );
  let colors = {};

  for (let i in labels) {
    colors[labels[i]] = arr[i];
  }
  return colors;
}

export const missingFormateurLegend = {
  label: "Formateur non défini",
  color: missingFormateurStyle("grey"),
}

export function colorListFromModules(modules, additionalLegend=[]) {
  const themeList = [...new Set(modules.map((m) => m.theme))];
  const colors = getColorsForLabels(themeList);
  return [[
    ...additionalLegend,
    ...themeList.map((t) => ({ label: t, color: colors[t] })),
  ],colors];
}
