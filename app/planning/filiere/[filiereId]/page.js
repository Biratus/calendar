import ZoomProvider from "../../../../components/zoom/ZoomProvider";
import { fetchFiliere } from "../../../../lib/realData";
import CalendarFiliere from "./Calendar";

export default function FilierePage({ params: { filiereId } }) {
  const filiereData = fetchFiliere(filiereId).map((m) => ({
    ...m,
    label: m.name,
  }));

  return (
    <ZoomProvider storageKey="zoom_calendar_filiere" defaultCoef={5}>
      <CalendarFiliere name={filiereId} data={filiereData} />
    </ZoomProvider>
  );
}
