import { formatISO, startOfMonth, startOfToday } from "date-fns";
import { parseMonthAndYear } from "../../lib/date";
import { modules } from "../../lib/realData";
import MonthNavigation from "./(components)/MonthNavigation";
import MonthNavigationProvider from "./(components)/MonthNavigationProvider";
import CommonCalendar from "./(components)/Calendar";
import ViewDropdown from "./(components)/ViewDropdown";

const monthStart = startOfMonth(startOfToday());

export default function PlanningPage({ searchParams: { date, view } }) {

  if (date) date = parseMonthAndYear(date);

  return (
    <MonthNavigationProvider focus={formatISO(date || monthStart)}>
      <ViewDropdown view={view} />
      <MonthNavigation />
      <CommonCalendar
        modules={modules}
        view={view}
      />
    </MonthNavigationProvider>
  );
}
