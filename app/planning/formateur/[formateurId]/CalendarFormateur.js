"use client";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

import { Button, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { missingFormateurStyle } from "../../../../components/calendar/styles/styles";
import ZoomUI from "../../../../components/calendar/ZoomUI";
import CalendarSimple from "../../../../components/newCalendar/SimpleView/CalendarSimple";
import { useLocalStorage } from "../../../../hooks/localStorageHook";
import { mapISO } from "../../../../lib/calendar";
import { isFormateurMissing } from "../../../../lib/realData";
import { FormateurView } from "../../CalendarViews";

const viewWidth = 0.5;
const zoomCoefKey = "zoom_calendar_small";
const defaultCoef = 5;

export default function CalendarFormateur({
  formateur: { nom, prenom, mail },
  modules,
  joursFeries,
  colors,
  time,
}) {
  const formateurData = mapISO(modules, ["start", "end"]).map(m => ({...m,label:m.name}));
  const [zoom, setZoom, loaded] = useLocalStorage(zoomCoefKey, defaultCoef);

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <Typography variant="h2" align="center">
        {`${nom} ${prenom} - [${mail}]`}
      </Typography>
      <Stack direction="row" justifyContent="space-between" sx={{ width: 0.5 }}>
        <Button
          onClick={() => console.log("TODO go back")}
          startIcon={<ArrowCircleLeftOutlinedIcon />}
          variant="outlined"
        >
          Vue gobale
        </Button>
        <ZoomUI range={5} onChange={setZoom} value={zoom} />
      </Stack>
      <CalendarSimple
        time={time}
        events={formateurData}
        zoom={zoom}
        eventProps={{
          eventLabel:(event) => event.name,
          tooltipAdditionalInfo: FormateurView.tooltipAdditionalInfo,
          color: (evt) => colors[evt.theme],
          onClick: () => console.warn("TODO"),
        }}
        dayProps={{
          highlighted: (day) => isJoursFeries(joursFeries, day),
          highlightedProp: { color: "red" },
          highlightInfo: (day) => getJourFeries(joursFeries, day),
        }}
        sx={{
          width:viewWidth + zoom * 0.1
        }}
      />
    </Stack>
  );
}

const isJoursFeries = (joursFeries, day) => {
  return joursFeries.hasOwnProperty(format(day, "yyyy-MM-dd"));
};

const getJourFeries = (joursFeries, day) => {
  return joursFeries[format(day, "yyyy-MM-dd")];
};
