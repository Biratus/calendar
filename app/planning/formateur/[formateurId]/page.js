import { addMonths, formatISO, startOfMonth, startOfToday } from "date-fns";
import MonthNavigationProvider from "../../(components)/MonthNavigationProvider";
import ZoomProvider from "../../../../components/zoom/ZoomProvider";
import { parseMonthAndYear } from "../../../../lib/date";
import { formateurs, getModulesOfFormateur } from "../../../../lib/realData";
import CalendarFormateur from "./CalendarFormateur";

const monthStart = startOfMonth(startOfToday());
const monthLength = 3;

export default function Formateur({
  params: { formateurId },
  searchParams: { date: monthParam },
}) {
  const formateur = formateurs[decodeURIComponent(formateurId)];
  const month = monthParam ? parseMonthAndYear(monthParam) : monthStart;

  const modules = getModulesOfFormateur(formateur.mail, {
    start: month,
    end: addMonths(month, monthLength),
  });

  const formateurData = modules.map((m) => ({ ...m, label: m.name }));
  return (
    <MonthNavigationProvider focus={formatISO(month || monthStart)}>
      <ZoomProvider storageKey="zoom_calendar_formateur" defaultCoef={5}>
        <CalendarFormateur data={formateurData} formateur={formateur} />
      </ZoomProvider>
    </MonthNavigationProvider>
  );
}
