"use client";
import { useMemo } from "react";
import { missingFormateurStyle } from "../../../components/calendar/styles/styles";
import FullCalendar from "../../../components/newCalendar/FullData/CalendarData";
import { toCalendarData } from "../../../lib/calendar";
import { getJourFeries, isJoursFeries } from "../../../lib/date";
import { isFormateurMissing } from "../../../lib/realData";
import { useCalendar } from "./CalendarProvider";
import { FiliereView, FormateurView } from "./CalendarViews";
import { useLegend } from "./LegendProvider";
import { useMonthNavigation } from "./MonthNavigationProvider";

export default function CommonCalendar({ modules, view, monthLength = 3 }) {
  const { openMenu, joursFeries } = useCalendar();
  const [month] = useMonthNavigation();
  const { colorOf } = useLegend();

  const commonProps = {
    modules,
    time: { start: month, monthLength },
    event: {
      color: (evt) => colorOf(evt.theme),
      onClick: openMenu,
      highlighted: isFormateurMissing,
      highlightedProp: missingFormateurStyle,
    },
    day: {
      highlighted: (day) => isJoursFeries(joursFeries, day),
      highlightedProp: { color: "red" },
      highlightInfo: (day) => getJourFeries(joursFeries, day),
    },
  };

  const calendarFiliere = useMemo(
    () => <CalendarFiliere {...commonProps} />,
    [modules, month]
  );

  const calendarFormateur = useMemo(
    () => <CalendarFormateur {...commonProps} />,
    [modules, month]
  );

  return (
    <>
      {(!view || view === "filiere") && calendarFiliere}
      {view && view === "formateur" && calendarFormateur}
    </>
  );
}

function CalendarFiliere({ modules, event, ...props }) {
  const calendarData = toCalendarData(modules, "filiere", FiliereView, true);

  return (
    <FullCalendar
      data={calendarData}
      event={{ EventTooltip: FiliereView.EventTooltip, ...event }}
      {...props}
    />
  );
}

function CalendarFormateur({ modules, event, ...props }) {
  const calendarData = toCalendarData(
    modules.filter((m) => !isFormateurMissing(m)),
    "formateur.mail",
    FormateurView,
    true
  );
  return (
    <>
      <FullCalendar
        data={calendarData}
        event={{ EventTooltip: FormateurView.EventTooltip, ...event }}
        {...props}
      />
    </>
  );
}
