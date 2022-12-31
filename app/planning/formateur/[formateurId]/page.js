import { addMonths, startOfMonth, startOfToday } from "date-fns";
import { getAllJoursFeries } from "../../../../lib/calendar";
import { colorListFromModules } from "../../../../lib/colors";
import { parseMonthAndYear } from "../../../../lib/date";
import {
  formateurs,
  getModulesOfFormateur
} from "../../../../lib/realData";

const monthStart = startOfMonth(startOfToday());
const monthLength = 3;

export default async function Formateur({
  params: { formateurId },
  searchParams: { month: monthParam },
}) {
  const formateur = formateurs[formateurId];
  const joursFeries = await getAllJoursFeries();
  const month = monthParam ? parseMonthAndYear(monthParam) : monthStart;

  const modules = getModulesOfFormateur(formateurId, {
    start: month,
    end: addMonths(month, monthLength),
  });
  const [legendList, colors] = colorListFromModules(modules);

  return (
    // <CalendarFormateur
    //   modules={modules}
    //   joursFeries={joursFeries}
    //   formateur={formateur}
    //   colors={colors}
    //   time={{month,monthLength}}
    // />
    <>Hello</>
  );
}
