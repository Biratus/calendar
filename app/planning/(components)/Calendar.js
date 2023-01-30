"use client";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useEffect, useMemo } from "react";
import {
  calendarDayStyle,
  missingFormateurStyle,
  overlapModuleStyle,
} from "../../../components/newCalendar/styles";
import { useZoom } from "../../../components/zoom/ZoomProvider";
import ZoomUI from "../../../components/zoom/ZoomUI";
import { isFormateurMissing } from "../../../lib/realData";
import CalendarFiliere from "./CalendarFiliere";
import CalendarFormateur from "./CalendarFormateur";
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
      label: (mod) => {
        if (mod.overlap)
          return (
            <WarningAmberIcon color="error" sx={{ verticalAlign: "middle" }} />
          );
        else return mod.duration == 1 ? "" : mod.name;
      },
      color: (mod) => colorOf(mod.theme),
      onClick: openMenu,
      highlighted: (mod) => isFormateurMissing(mod) || mod.overlap,
      highlightedProps: (mod) => {
        if (mod.overlap) return overlapModuleStyle;
        else if (isFormateurMissing(mod))
          return missingFormateurStyle(colorOf(mod.theme));
      },
    },
    day: {
      tooltip: {
        hasTooltip: isJoursFeries,
        tooltipInfo: getJourFeries,
      },
      styleProps: (date, theme) => {
        let style = {
          ...calendarDayStyle(date, theme),
        };
        if (isJoursFeries(date)) style.color = "red";
        return style;
      },
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
