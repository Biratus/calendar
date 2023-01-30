import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
  parseISO,
  startOfMonth
} from "date-fns";
import { formatDayDate, mapISO } from "./date";

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
    dataMap[index].push({
      ...d,
      // label: duration > 1 ? d.name : "",
      duration:eachDayOfInterval({
        start: typeof d.start === "string" ? parseISO(d.start) : d.start,
        end:
          typeof d.end === "string" ? parseISO(d.end).getTime() : d.end.getTime(),
      }).length,
    });
  }

  let calendarData = [];
  for (let key in dataMap) {
    // Iterate over rows
    let events = dataMap[key];
    let keyObject = view.keyObject(events[0]);
    calendarData.push({
      key: keyObject,
      labelTitle: view.labelTitle(keyObject),
      events: mapIso ? mapISO(dataMap[key], ["start", "end"]) : dataMap[key],
    });
  }
  calendarData.sort((a, b) => a.labelTitle.localeCompare(b.labelTitle));
  return calendarData;
}

function getDataField(object, field) {
  let target = object;
  for (let subField of field.split(".")) target = target[subField];
  return target;
}

export function moduleOverlap(m1, m2) {
  return isWithinInterval(m1.start, m2) || isWithinInterval(m1.end, m2);
}

export function mergeModule(dest, mod) {
  let newModule = { overlap: true, ...dest, name: "Module superposés" };
  if (isBefore(mod.start, dest.start)) newModule.start = mod.start;
  if (isAfter(mod.end, dest.end)) newModule.end = mod.end;
  newModule.overlappedModules
    ? newModule.overlappedModules.push(mod)
    : (newModule.overlappedModules = [dest, mod]);
  return newModule;
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

export function checkOverlapModules(data) {
  for (let row of data) {
    let newEvents = [];
    for (let mod of row.events) {
      let overlap = null;
      for (let eventIndex in newEvents) {
        let event = newEvents[eventIndex];
        if (moduleOverlap(mod, event)) {
          overlap = overlap
            ? mergeModule(overlap, event)
            : mergeModule(event, mod);
          newEvents.splice(eventIndex, 1);
        }
      }
      if (!overlap) newEvents.push(mod);
      else {
        overlap.duration = eachDayOfInterval(overlap).length;

        newEvents.push(overlap);
      }
    }
    row.events = newEvents;
  }
}
