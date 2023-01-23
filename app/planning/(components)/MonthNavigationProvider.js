"use client";

import { addMonths, parseISO, startOfMonth, subMonths } from "date-fns";
import {
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation";
import { createContext, useContext } from "react";
import { formatMonthYear } from "../../../lib/date";
import { searchParamsClone } from "../../../lib/navigation";

const MonthNavigationContext = createContext();

export default function MonthNavigationProvider({ focus,children }) {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();

  const month = parseISO(focus);

  const nextMonth = () => {
    replaceRoute({ date: formatMonthYear(addMonths(month, 1)) })
  }
  const prevMonth = () => {    
    replaceRoute({ date: formatMonthYear(subMonths(month, 1)) })
  }

  const setMonth = (value) => {
    replaceRoute({ date: formatMonthYear(startOfMonth(value)) })
  }

  const replaceRoute = (additionalParams) => {
    let newParams = searchParamsClone(params);

    for (let k in additionalParams) {
      newParams.set(k, additionalParams[k]);
    }
    router.replace(path + "?" + newParams.toString());
  };

  return (
    <MonthNavigationContext.Provider value={[month,prevMonth,nextMonth,setMonth]}>
      {children}
    </MonthNavigationContext.Provider>
  );
}

export function useMonthNavigation() {
  const ctx = useContext(MonthNavigationContext);
  if (ctx === undefined) {
    throw new Error("useMonthNavigation must be used within a MonthNavigationContext");
  }
  return ctx;
}
