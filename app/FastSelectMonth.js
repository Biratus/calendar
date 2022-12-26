import { addMonths, isSameMonth, subMonths } from "date-fns";
import { useMemo } from "react";
import Dropdown from "../components/Dropdown/Dropdown";
import { formatMonthYear } from "../lib/date";
export default function FastSelectMonth({
  focusedMonth,
  min = 12,
  max = 12,
  onChange,
  ...props
}) {
  const months = useMemo(
    () => generateMonthList(min, max, focusedMonth),
    [focusedMonth]
  );

  const monthsActions = months.map((m) => ({
    label: formatMonthYear(m),
    onClick: () => onChange(m),
    selected: isSameMonth(focusedMonth, m),
  }));

  return (
    <Dropdown label="Aller au mois.." actions={monthsActions} {...props} />
  );
}

const generateMonthList = (min, max, month) => {
  let arr = [];
  for (let i = 0; i < min; i++) {
    arr.push(subMonths(month, min - i));
  }
  arr.push(month);
  for (let i = 0; i < max; i++) {
    arr.push(addMonths(month, i + 1));
  }
  return arr;
};
