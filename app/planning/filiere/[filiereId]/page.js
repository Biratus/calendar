import { fetchFiliere } from "../../../../lib/realData";
import CalendarFiliere from "./Calendar";

export default function FilierePage({ params: { filiereId } }) {
  const filiereData = fetchFiliere(filiereId).map((m) => ({ ...m, label: m.name }));

  return (
    <CalendarFiliere name={filiereId} data={filiereData} />
  );
}