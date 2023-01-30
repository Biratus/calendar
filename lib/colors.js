import distinctColors from "distinct-colors";
import { modules } from "./realData";

export function allColorsForThemes() {
  return getColorsForLabels(modules.map((m) => m.theme));
}

export function getColorsForLabels(labelList) {
  let labels = [...new Set(labelList)];

  let arr = distinctColors({
    count: labels.length,
    chromaMin: 50,
    lightMin: 20,
    lightMax: 80,
  }).map(({ _rgb: [r, g, b] }) => ({
    r: r.toFixed(2),
    g: g.toFixed(2),
    b: b.toFixed(2),
    rgb: `rgb(${r.toFixed(2)},${g.toFixed(2)},${b.toFixed(2)})`,
  }));
  let colors = {};

  for (let i in labels) {
    colors[labels[i]] = arr[i];
  }
  return colors;
}
