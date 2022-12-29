import { formatISO, startOfMonth, startOfToday } from "date-fns";
import { getJoursFeries } from "../../lib/calendar";
import { parseMonthAndYear } from "../../lib/date";
import { modules } from "../../lib/realData";
import Calendar from "./Calendar";
import CommonCalendar from "./NewCalendar";
import NewCalendar, { CalendarFiliere } from "./NewCalendar";

const monthStart = startOfMonth(startOfToday());
export default async function PlanningPage({searchParams:{date,view}}) {
  const joursFeries = await getAllJoursFeries();

  if(date) date = parseMonthAndYear(date);

  return <CommonCalendar month={formatISO(date || monthStart)} joursFeries={joursFeries} modules={modules} view={view}/>;
}



async function getAllJoursFeries() {
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