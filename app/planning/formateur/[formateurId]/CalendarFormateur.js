"use client";

import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useCalendar } from "../../(components)/CalendarProvider";
import { FormateurView } from "../../(components)/CalendarViews";
import GlobalViewLink from "../../(components)/GlobalViewLink";
import { useLegend } from "../../(components)/LegendProvider";
import MonthNavigation from "../../(components)/MonthNavigation";
import { useMonthNavigation } from "../../(components)/MonthNavigationProvider";
import { LoadingBar } from "../../../../components/LoadingBar";
import CalendarSimple from "../../../../components/newCalendar/SimpleView/CalendarSimple";
import ZoomUI from "../../../../components/ZoomUI";
import { useLocalStorage } from "../../../../hooks/localStorageHook";
import { mapISO } from "../../../../lib/calendar";
import { getJourFeries, isJoursFeries } from "../../../../lib/date";

const viewWidth = 0.5;
const zoomCoefKey = "zoom_calendar_small";
const defaultCoef = 5;

export default function CalendarFormateur({
  formateur: { nom, prenom, mail },
  data,
}) {
  const formateurData = mapISO(data, ["start", "end"]);
  const { openMenu, joursFeries } = useCalendar();
  const [month] = useMonthNavigation();
  const { colorOf,showLegend } = useLegend();
  const [zoom, setZoom, loaded] = useLocalStorage(zoomCoefKey, defaultCoef);

  useEffect(
    () =>
      showLegend([...new Set(formateurData.map(({ theme }) => theme))]),
    []
  );

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <Typography variant="h2" align="center">
        {`${nom} ${prenom} - [${mail}]`}
      </Typography>
      <Stack direction="row" justifyContent="space-between" sx={{ width: 0.5 }}>
        <GlobalViewLink view={FormateurView.key} />
        <ZoomUI range={5} onChange={setZoom} value={zoom} />
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
            highlighted: (day) => isJoursFeries(joursFeries, day),
            highlightedProp: { color: "red" },
            highlightInfo: (day) => getJourFeries(joursFeries, day),
          }}
          sx={{
            width: viewWidth + zoom * 0.1,
          }}
        />
      )}
    </Stack>
  );
}
