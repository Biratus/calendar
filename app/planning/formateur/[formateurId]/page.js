import { addMonths, formatISO, startOfMonth, startOfToday } from "date-fns";
import { getAllJoursFeries } from "../../../../lib/calendar";
import { colorListFromModules } from "../../../../lib/colors";
import { parseMonthAndYear } from "../../../../lib/date";
import { formateurs, getModulesOfFormateur } from "../../../../lib/realData";
import CalendarFormateur from "./CalendarFormateur";

const monthStart = startOfMonth(startOfToday());
const monthLength = 3;

export default async function Formateur({
  params: { formateurId },
  searchParams: { date: monthParam },
}) {
  const formateur = formateurs[decodeURIComponent(formateurId)];
  const month = monthParam ? parseMonthAndYear(monthParam) : monthStart;
  const joursFeries = await getAllJoursFeries(month);

  const modules = getModulesOfFormateur(formateur.mail, {
    start: month,
    end: addMonths(month, monthLength),
  });
  const [legendList, colors] = colorListFromModules(modules);

  return (
    <CalendarFormateur
      modules={modules}
      joursFeries={joursFeries}
      formateur={formateur}
      colors={colors}
      time={{start:formatISO(month),monthLength}}
    />
  );
}
