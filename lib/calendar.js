import axios from "axios";
import { isWithinInterval, parseISO } from "date-fns";

export function toCalendarData(
  data,
  key,
  toEvent = (d) => {
    return {
      ...d,
      label: d.name,
    };
  }
) {
  let dataMap = {};
  for (let d of data) {
    let index = key(d);
    if (!dataMap.hasOwnProperty(index)) dataMap[index] = [];
    dataMap[index].push({ ...toEvent(d) });
    // if (isSameDay(parseISO(d.start), parseISO(d.end))) console.log(d.name);
  }
  let calendarData = [];
  for (let label in dataMap)
    calendarData.push({ label, events: dataMap[label] });
  return calendarData;
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
    const resp = await axios.get(
      `https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`
    );
    return resp.data;
  } catch (e) {
    throw e;
  }
}
