import { startOfMonth, startOfToday } from "date-fns";
import { getAllJoursFeries } from "../../lib/calendar";
import { themes } from "../../lib/realData";
import CalendarProvider from "./(components)/CalendarProvider";
import LegendProvider from "./(components)/LegendProvider";

const monthStart = startOfMonth(startOfToday());

export default async function Layout({ children }) {
  const joursFeries = await getAllJoursFeries(monthStart);

  return (
    <CalendarProvider joursFeries={joursFeries}>
      {/* PopupMenu, Modals, joursFeries*/}
      <LegendProvider themes={themes}>{children}</LegendProvider>
    </CalendarProvider>
  );
}
