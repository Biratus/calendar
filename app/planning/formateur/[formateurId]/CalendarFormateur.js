"use client";

import { Stack, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useCalendar } from "../../(components)/CalendarProvider";
import { FormateurView } from "../../(components)/CalendarViews";
import GlobalViewLink from "../../(components)/GlobalViewLink";
import { useLegend } from "../../(components)/LegendProvider";
import MonthNavigation from "../../(components)/MonthNavigation";
import { useMonthNavigation } from "../../(components)/MonthNavigationProvider";
import { LoadingBar } from "../../../../components/LoadingBar";
import CalendarSimple from "../../../../components/newCalendar/SimpleView/CalendarSimple";
import { calendarDayStyle } from "../../../../components/newCalendar/styles";
import {
  useZoom
} from "../../../../components/zoom/ZoomProvider";
import ZoomUI from "../../../../components/zoom/ZoomUI";
import { mapISO } from "../../../../lib/calendar";

const viewWidth = 0.5;

export default function CalendarFormateur({
  formateur: { nom, prenom, mail },
  data,
}) {
  const formateurData = useMemo(() => mapISO(data, ["start", "end"]),[data]);
  const { openMenu, isJoursFeries, getJourFeries } = useCalendar();
  const [month] = useMonthNavigation();
  const { colorOf, showLegend } = useLegend();
  const { zoom, loaded } = useZoom();

  useEffect(
    () => showLegend([...new Set(formateurData.map(({ theme }) => theme))]),
    []
  );

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <Typography variant="h2" align="center">
        {`${nom} ${prenom} - [${mail}]`}
      </Typography>
      <Stack direction="row" justifyContent="space-between" sx={{ width: 0.5 }}>
        <GlobalViewLink view={FormateurView.key} />
        <ZoomUI range={5} />
      </Stack>
      <MonthNavigation />
      {!loaded ? (
        <LoadingBar />
      ) : (
        <CalendarSimple
          time={{ start: month, monthLength: 3 }}
          events={formateurData}
          zoom={zoom}
          eventProps={{
            EventTooltip: FormateurView.EventTooltip,
            color: (evt) => colorOf(evt.theme),
            onClick: openMenu,
          }}
          dayProps={{
            highlighted: isJoursFeries,
            highlightInfo: getJourFeries,
          }}
          commonDayStyle={calendarDayStyle}
          sx={{
            width: viewWidth + zoom * 0.1,
          }}
        />
      )}
    </Stack>
  );
}
