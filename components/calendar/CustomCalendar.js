"use client";

import {
  addMonths,
  areIntervalsOverlapping,
  endOfMonth,
  getDaysInMonth,
  startOfMonth,
} from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useMemo } from "react";
import { changeURLParam } from "../../lib/navigation";
import CalendarData from "./FullData/CalendarData";
import CalendarSmall from "./SingleData/CalendarSmall";

export const ColorContext = createContext();
export const CalendarContext = createContext();

export default function CustomCalendar({ data, event, day, detailed }) {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const focused = params.get("focus");

  const months = useMemo(() => {
    let aft = startOfMonth(addMonths(day.focus, 1));
    let aft2 = startOfMonth(addMonths(day.focus, 2));
    return [
      { day: day.focus, nbOfDays: getDaysInMonth(day.focus) },
      { day: aft, nbOfDays: getDaysInMonth(aft) },
      { day: aft2, nbOfDays: getDaysInMonth(aft2) },
    ];
  }, [day.focus]);

  const filteredData = data.filter((d) =>
    d.events.some(({ start, end }) =>
      areIntervalsOverlapping(
        { start, end },
        {
          start: startOfMonth(months[0].day),
          end: endOfMonth(months[months.length - 1].day),
        },
        { inclusive: true }
      )
    )
  );

  const focusData = (label) => {
    let url = changeURLParam({ params, path, newParams: { focus: label } });
    router.push(url);
  };

  const mainView = () => {
    let url = changeURLParam({
      params,
      path,
      newParams: { focus: undefined, viewType: undefined },
    });
    router.push(url);
  };

  // useEffect(() => focusData('I-230119-DIS-399-SOPRA-JAVA') // TESTING /!!!\
  // ,[])

  return (
    <CalendarContext.Provider
      value={{
        event,
        day,
        focusData,
        mainView,
        months,
        data: filteredData,
        detailed,
      }}
    >
      {!focused ? <CalendarData /> : <CalendarSmall data={focused} />}
    </CalendarContext.Provider>
  );
}
