import { startOfMonth, startOfToday } from "date-fns";
import { getJoursFeries } from "../lib/calendar";
import { modules } from "../lib/realData";
import Calendar from "./Calendar";

const monthStart = startOfMonth(startOfToday());

export default async function Home() {
  const joursFeries = await getAllJoursFeries();
  return <Calendar modules={modules} joursFeries={joursFeries} />;
}

async function getAllJoursFeries() {
  let currentYear = monthStart.getFullYear();
  try {
    const prev = await getJoursFeries(currentYear - 1);
    const curr = await getJoursFeries(currentYear);
    const next = await getJoursFeries(currentYear + 1);

    return { ...prev, ...curr, ...next };
  } catch (e) {
    console.error(e);
    console.error("Could not load jours-feries");
    return {};
  }
}
