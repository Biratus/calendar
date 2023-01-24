"use client";
import { useEffect, useMemo } from "react";
import { LoadingBar } from "../../../components/LoadingBar";
import FullCalendar from "../../../components/newCalendar/FullData/CalendarData";
import {
  calendarDayStyle,
  missingFormateurStyle,
} from "../../../components/newCalendar/styles";
import { useZoom } from "../../../components/zoom/ZoomProvider";
import ZoomUI from "../../../components/zoom/ZoomUI";
import { toCalendarData } from "../../../lib/calendar";
import { isFormateurMissing } from "../../../lib/realData";
import { useCalendar } from "./CalendarProvider";
import { FiliereView, FormateurView } from "./CalendarViews";
import { useLegend } from "./LegendProvider";
import { useMonthNavigation } from "./MonthNavigationProvider";

export default function CommonCalendar({ modules, view, monthLength = 3 }) {
  const { openMenu, isJoursFeries, getJourFeries } = useCalendar();
  const [month] = useMonthNavigation();
  const { colorOf, showLegend } = useLegend();
  const { zoom } = useZoom();
  useEffect(() => showLegend(), []);

  // Props passed to Calendar
  const commonProps = {
    modules,
    zoom,
    time: { start: month, monthLength },
    event: {
      color: (evt) => colorOf(evt.theme),
      onClick: openMenu,
      highlighted: isFormateurMissing,
      highlightedProp: missingFormateurStyle,
    },
    day: {
      highlighted: isJoursFeries,
      highlightInfo: getJourFeries,
    },
    commonDayStyle: calendarDayStyle,
  };

  const calendarFiliere = useMemo(
    () => <CalendarFiliere {...commonProps} />,
    [modules, month, zoom]
  );

  const calendarFormateur = useMemo(
    () => <CalendarFormateur {...commonProps} />,
    [modules, month, zoom]
  );

  return (
    <>
      <ZoomUI range={5} />
      {(!view || view === FiliereView.key) && calendarFiliere}
      {view && view === FormateurView.key && calendarFormateur}
    </>
  );
}

function CalendarFiliere({ modules, ...props }) {
  const calendarData = toCalendarData(modules, "filiere", FiliereView, true);

  return (
    <FullCalendar
      data={calendarData}
      EventTooltip={FiliereView.EventTooltip}
      LabelComponent={FiliereView.LabelComponent}
      {...props}
    />
  );
}

function CalendarFormateur({ modules, ...props }) {
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
        EventTooltip={FormateurView.EventTooltip}
        LabelComponent={FormateurView.LabelComponent}
        {...props}
      />
    </>
  );
}
