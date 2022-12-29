import { useTheme } from "@mui/material";
import { startOfMonth, startOfToday } from "date-fns";
import { getJoursFeries } from "../../lib/calendar";

export default async function Test() {
    const joursFeries = await getAllJoursFeries();

    // const theme = useTheme();

    console.log("jours Feries ok");

    return (<h2>Test {JSON.stringify(joursFeries)}</h2>)
}


const monthStart = startOfMonth(startOfToday());

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
