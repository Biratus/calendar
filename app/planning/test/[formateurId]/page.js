import { addMonths, formatISO, startOfMonth, startOfToday } from "date-fns";
import MonthNavigationProvider from "../../(components)/MonthNavigationProvider";
import ZoomProvider from "../../../../components/zoom/ZoomProvider";
import { formateurs, getModulesOfFormateur } from "../../../../lib/realData";
import TestComponent from "./TestComponent";

const monthStart = startOfMonth(startOfToday());

export default function TestPage({
  params: { formateurId },}) {

  const formateur = formateurs[decodeURIComponent(formateurId)];

  const modules = getModulesOfFormateur(formateur.mail, {
    start: monthStart,
    end: addMonths(monthStart, 3),
  });

  const formateurData = modules.map((m) => ({ ...m, label: m.name }));
  return (
    <MonthNavigationProvider focus={formatISO(monthStart)}>
      <ZoomProvider storageKey="test">
        <TestComponent />
      </ZoomProvider>
    </MonthNavigationProvider>
  );
}
