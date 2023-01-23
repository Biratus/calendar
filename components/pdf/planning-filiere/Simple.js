import { isSameMonth } from "date-fns";
import { moduleDayLabel } from "../../../lib/calendar";
import { formatMonthYear } from "../../../lib/date";
function filiereToPdf({ name, modules }) {
  const tableWidths = ["*", 50, "auto", "*"];
  const tableBody = [[{}, {}, "Module", "Formateur"]];
  
  // Building table rows
  let currMonth = modules[0].start;
  let indexToAdd = 1;
  let objToAdd = null;

  for (let mod of modules) {
    let { end } = mod;
    if (objToAdd == null) {
      // First one
      objToAdd = rowFromModule(mod, true);
    } else if (!isSameMonth(currMonth, end)) {
      // Month changed
      tableBody.splice(indexToAdd, 0, objToAdd);
      objToAdd = rowFromModule(mod, true);
      currMonth = end;
      indexToAdd = tableBody.length;
    } else {
      // Simple
      tableBody.push(rowFromModule(mod));
      objToAdd[0].rowSpan++;
    }
  }
  tableBody.splice(indexToAdd, 0, objToAdd);
  // Table rows built

  const table = { widths: tableWidths, body: tableBody };
  const content = [{ text: name, style: "header" }, { table }];
  const styles = {
    header: {
      fontSize: 18,
      bold: true,
      alignment: "center",
    },
  };

  return { content, styles };
}
function rowFromModule(mod, withMonth = false) {
  let {
    name,
    end,
    formateur: { nom, prenom },
  } = mod;
  let dayLabel = moduleDayLabel(mod);

  return [
    withMonth ? { rowSpan: 1, text: formatMonthYear(end) } : "",
    dayLabel,
    name,
    `${prenom} ${nom.toUpperCase()}`,
  ];
}
export default filiereToPdf;
