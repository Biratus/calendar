import {
  addMonths,
  endOfMonth,
  isSameDay,
  parseISO,
  startOfMonth,
} from "date-fns";
import { formatDayDate } from "./date";

export function toCalendarData(
  data,
  groupingField, // for mapping
  view,
  mapIso
) {
  let dataMap = {};
  for (let d of data) {
    // modules list to map
    let index = getDataField(d, groupingField);
    if (!dataMap.hasOwnProperty(index)) dataMap[index] = [];
    dataMap[index].push({ ...d, label: d.name });
  }

  let calendarData = [];
  for (let key in dataMap) {
    let events = dataMap[key];
    let keyObject = view.keyObject(events[0]);
    calendarData.push({
      key: keyObject,
      labelTitle: view.labelTitle(keyObject),
      events: mapIso ? mapISO(dataMap[key], ["start", "end"]) : dataMap[key],
    });
  }
  return calendarData;
}

function getDataField(object, field) {
  let target = object;

  for (let subField of field.split(".")) target = target[subField];

  return target;
}

export function mapISO(list, fields) {
  return list.map((item) => {
    let newItem = { ...item };

    fields.forEach((f) => (newItem[f] = parseISO(newItem[f])));

    return newItem;
  });
}

export async function getJoursFeries(year) {
  try {
    const resp = await fetch(
      `https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`,
      { next: { revalidate: 60 * 60 * 24 } }
    );
    return resp.json();
  } catch (e) {
    throw e;
  }
}

export const makeMonths = (month, length) => {
  let months = [];
  for (let i = 0; i <= length; i++) {
    let m = addMonths(month, i);
    months.push({ day: startOfMonth(m), nbOfDays: endOfMonth(m).getDate() });
  }
  return months;
};

export async function getAllJoursFeries(monthStart) {
  let currentYear = monthStart.getFullYear();
  try {
    const prev = await getJoursFeries(currentYear - 1);
    const curr = await getJoursFeries(currentYear);
    const next = await getJoursFeries(currentYear + 1);

    return { ...prev, ...curr, ...next };
  } catch (e) {
    console.error(e);
    console.error("Could not load jours-feries");
    return {};
  }
}

export function moduleDayLabel({ start, end }) {
  return isSameDay(start, end)
    ? formatDayDate(start)
    : formatDayDate(start) + " - " + formatDayDate(end);
}
