"use client";
import { useEffect, useMemo } from "react";
import FullCalendar from "../../../components/newCalendar/FullData/CalendarData";
import {
  calendarDayStyle,
  missingFormateurStyle
} from "../../../components/newCalendar/styles";
import { useZoom } from "../../../components/zoom/ZoomProvider";
import ZoomUI from "../../../components/zoom/ZoomUI";
import {
  toCalendarData
} from "../../../lib/calendar";
import { isFormateurMissing } from "../../../lib/realData";
import CalendarFiliere from "./CalendarFiliere";
import { useCalendar } from "./CalendarProvider";
import { FiliereView, FormateurView } from "./CalendarViews";
import { useLegend } from "./LegendProvider";
import { useMonthNavigation } from "./MonthNavigationProvider";

export default function CommonCalendar({
  modules,
  view,
  monthLength = 3,
}) {
  const {
    openMenu,
    showOverlapModules,
    isJoursFeries,
    getJourFeries,
  } = useCalendar();
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
      color: (mod) => colorOf(mod.theme),
      onClick: openMenu,
      highlighted: (mod) => isFormateurMissing(mod) || mod.overlap,
      highlightedProp: (mod) => {
        if (isFormateurMissing(mod))
          return missingFormateurStyle(colorOf(mod.theme));
        else if (mod.overlap)
          return {
            boxShadow: `0px 0px 0.7em 0.1em #D6C588 inset`,
            background: "black",
            color: "white",
          };
      },
    },
    day: {
      highlighted: isJoursFeries,
      highlightInfo: getJourFeries,
    },
    commonDayStyle: calendarDayStyle,
  };

  const onClickFiliere = (mod, ref) => {
    if (mod.overlap) {
      showOverlapModules(mod, ref);
    } else openMenu(mod, ref);
  };
  const calendarFiliere = useMemo(
    () => (
      <CalendarFiliere
        {...commonProps}
        event={{ ...commonProps.event, onClick: onClickFiliere }}
      />
    ),
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
