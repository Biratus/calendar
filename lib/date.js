import * as dateFns from "date-fns";
import fr from "date-fns/locale/fr";
import { upperFirst } from "./strings";

const locale = { locale: fr };

export function formatMonthYear(d) {
  return upperFirst(format(d, "MMMM yyyy"));
}

export function formatSimpleDayLabel(d) {
  return upperFirst(format(d, "EEEEE"));
}

export function formatShortDayLabel(d) {
  return upperFirst(format(d, "E"));
}

export function formatFullDayLabel(d) {
  return upperFirst(format(d, "EEEE"));
}

export function formatDayDate(d) {
  return format(d, "dd");
}

export function formatFullDate(d) {
  return format(d, "dd/MM/yy");
}

export function formatFullPrettyDate(d) {
  return `${formatFullDayLabel(d)} ${format(d, "d")} ${formatMonthYear(d)}`;
}

export function parseMonthAndYear(monthStr) {
  return parse(monthStr, "MMMM yyyy");
}

export function parse(d, format) {
  return dateFns.parse(d, format, new Date(), locale);
}

export function format(d, f) {
  return dateFns.format(d, f, locale);
}

export function endOfWeek(d) {
  return dateFns.endOfWeek(d, locale);
}
export function startOfWeek(d) {
  return dateFns.startOfWeek(d, locale);
}

export function nbOfDaysBetween(start, end) {
  return dateFns.isSameMonth(start, end)
    ? end.getDate() - start.getDate() + 1
    : dateFns.eachDayOfInterval({ start, end }).length;
}

export function mapISO(list, fields) {
  return list.map((item) => {
    let newItem = { ...item };

    fields.forEach((f) => (newItem[f] = parseISO(newItem[f])));

    return newItem;
  });
}