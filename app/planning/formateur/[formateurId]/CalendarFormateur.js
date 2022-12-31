"use client"
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

import { Button, Stack } from "@mui/material";
import { missingFormateurStyle } from "../../../../components/calendar/styles/styles";
import CalendarSimple from "../../../../components/newCalendar/SimpleView/CalendarSimple";
import { isFormateurMissing } from "../../../../lib/realData";
import { FormateurView } from "../../CalendarViews";

export default function CalendarFormateur({
    formateur:{nom,prenom:mail},
  modules,
  joursFeries,
  colors,
  time,
}) {
  const formateurData = mapISO(
    modules,
    ["start", "end"]
  );
    const [zoom, setZoom, loaded] = useLocalStorage(zoomCoefKey, defaultCoef);

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <Typography variant="h2" align="center">
        {nom} {prenom} - [{mail}]
      </Typography>
      <Stack direction="row" justifyContent="space-between" sx={{ width: 0.5 }}>
        <Button
          onClick={() => console.log("TODO go back")}
          startIcon={<ArrowCircleLeftOutlinedIcon />}
          variant="outlined"
        >
          Vue gobale
        </Button>
      </Stack>
    {/* <CalendarSimple
      time={time}
      events={formateurData}
      zoom={zoom}
      eventProps={{
        tooltip: (event) => (
          <InfoTooltip
            additionalInfos={FormateurView.tooltipAdditionalInfo(event)}
            {...event}
          />
        ),
        color: (evt) => colors[evt.theme],
        onClick: () => console.warn("TODO"),
      }}
      dayProps={{
        highlighted: (day) => isJoursFeries(joursFeries, day),
        highlightedProp: { color: "red" },
        highlightInfo: (day) => getJourFeries(joursFeries, day),
      }}
    /> */}
    </Stack>
  );
}

const isJoursFeries = (joursFeries, day) => {
  return joursFeries.hasOwnProperty(format(day, "yyyy-MM-dd"));
};

const getJourFeries = (joursFeries, day) => {
  return joursFeries[format(day, "yyyy-MM-dd")];
};
