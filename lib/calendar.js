import { parseISO } from "date-fns";

export function toCalendarData(
  data,
  key,
  mapIso,
  toEvent = (m) => {
    return {
      ...m,
      label: m.name,
    };
  }
) {
  let dataMap = {};
  for (let d of data) {
    let index = key(d);
    if (!dataMap.hasOwnProperty(index)) dataMap[index] = [];
    dataMap[index].push({ ...toEvent(d) });
  }
  let calendarData = [];
  for (let label in dataMap)
    calendarData.push({ label, events: mapIso?mapISO(dataMap[label],['start','end']):dataMap[label] });
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
    const resp = await fetch(
      `https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`,{next:{revalidate:60*60*24}}
    );
    return resp.json();
  } catch (e) {
    throw e;
  }
}
