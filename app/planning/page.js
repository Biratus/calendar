import { formatISO, startOfMonth, startOfToday } from "date-fns";
import { getAllJoursFeries } from "../../lib/calendar";
import { parseMonthAndYear } from "../../lib/date";
import { modules } from "../../lib/realData";
import CommonCalendar from "./NewCalendar";

const monthStart = startOfMonth(startOfToday());

export default async function PlanningPage({searchParams:{date,view}}) {
  const joursFeries = await getAllJoursFeries(monthStart);

  if(date) date = parseMonthAndYear(date);

  return <CommonCalendar month={formatISO(date || monthStart)} joursFeries={joursFeries} modules={modules} view={view}/>;
}