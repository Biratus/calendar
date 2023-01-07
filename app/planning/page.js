import { formatISO, startOfMonth, startOfToday } from "date-fns";
import ZoomProvider from "../../components/zoom/ZoomProvider";
import { parseMonthAndYear } from "../../lib/date";
import { modules } from "../../lib/realData";
import CommonCalendar from "./(components)/Calendar";
import MonthNavigation from "./(components)/MonthNavigation";
import MonthNavigationProvider from "./(components)/MonthNavigationProvider";
import ViewDropdown from "./(components)/ViewDropdown";

const monthStart = startOfMonth(startOfToday());

export default function PlanningPage({ searchParams: { date, view } }) {
  if (date) date = parseMonthAndYear(date);

  return (
    <MonthNavigationProvider focus={formatISO(date || monthStart)}>
      <ViewDropdown view={view} />
      <MonthNavigation />
      <ZoomProvider storageKey="zoom_calendar_full" defaultCoef={2}>
        <CommonCalendar modules={modules} view={view} />
      </ZoomProvider>
    </MonthNavigationProvider>
  );
}
