"use client";
import { useMemo } from "react";
import { missingFormateurStyle } from "../../../components/calendar/styles/styles";
import FullCalendar from "../../../components/newCalendar/FullData/CalendarData";
import { toCalendarData } from "../../../lib/calendar";
import {
  colorListFromModules,
  missingFormateurLegend,
} from "../../../lib/colors";
import { getJourFeries, isJoursFeries } from "../../../lib/date";
import { isFormateurMissing } from "../../../lib/realData";
import { useCalendar } from "./CalendarProvider";
import { FiliereView, FormateurView } from "./CalendarViews";
import Legend from "./Legend";
import { useMonthNavigation } from "./MonthNavigationProvider";

export default function CommonCalendar({ modules, view, monthLength = 3 }) {
  const { openMenu, joursFeries } = useCalendar();
  const [month] = useMonthNavigation();
  const [legendList, colors] = colorListFromModules(modules, [
    missingFormateurLegend,
  ]);

  const commonProps = {
    modules,
    time: { start: month, monthLength },
    event: {
      color: (evt) => colors[evt.theme],
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
      <Legend legendList={legendList} />
    </>
  );
}

function CalendarFiliere({ modules, event, ...props }) {
  const calendarData = toCalendarData(modules, "filiere", FiliereView, true);

  return (
    <FullCalendar
      data={calendarData}
      event={{ tooltip: FiliereView.eventTooltip, ...event }}
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
        event={{ tooltip: FormateurView.eventTooltip, ...event }}
        {...props}
      />
    </>
  );
}

const legendListFromTheme = (themeList, colors) =>
  [...new Set(themeList)].map((label) => ({
    label,
    color: colors[label],
  }));
