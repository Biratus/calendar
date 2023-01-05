import { startOfMonth, startOfToday } from "date-fns";
import { getAllJoursFeries } from "../../lib/calendar";
import CalendarProvider from "./(components)/CalendarProvider";

const monthStart = startOfMonth(startOfToday());

export default async function Layout({ children }) {
  const joursFeries = await getAllJoursFeries(monthStart);

  return (
    <CalendarProvider joursFeries={joursFeries}> {/* PopupMenu, Modals, joursFeries*/}
      {children}
    </CalendarProvider>
  );
}
