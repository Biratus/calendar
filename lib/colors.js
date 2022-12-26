import distinctColors from "distinct-colors";

export function getColorsForLabels(labelList,mode) {
  let labels = [...new Set(labelList)];

  let arr = distinctColors({ count: labels.length,chromaMin:50,lightMin:20,lightMax:80 }).map(
    ({ _rgb: [r, g, b] }) =>
      `rgb(${r.toFixed(2)},${g.toFixed(2)},${b.toFixed(2)})`
  );
  let colors = {};

  for (let i in labels) {
    colors[labels[i]] = arr[i];
  }
  return colors;
}