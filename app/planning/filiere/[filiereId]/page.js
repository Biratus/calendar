"use client";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

import { Box, Button, Stack, Typography } from "@mui/material";
import { createContext } from "react";
import { missingFormateurStyle } from "../../../../components/calendar/styles/styles";
import ZoomUI from "../../../../components/calendar/ZoomUI";
import FormateurSimple from "../../../../components/formateursSimple";
import { LoadingBar } from "../../../../components/LoadingBar";
import CalendarDetail from "../../../../components/newCalendar/SingleData/CalendarDetail";
import { useLocalStorage } from "../../../../hooks/localStorageHook";
import { mapISO } from "../../../../lib/calendar";
import {
  colorListFromModules,
  missingFormateurLegend,
} from "../../../../lib/colors";
import { fetchFiliere, isFormateurMissing } from "../../../../lib/realData";
import Legend from "../../Legend";

const viewWidth = 0.5;
const zoomCoefKey = "zoom_calendar_filiere";
const defaultCoef = 5;
const minCellHeight = 1.3;
const zoomCoef = 0.4;

const FiliereContext = createContext();

export default function Filiere({ params: { filiereId } }) {
  const filiereData = mapISO(
    fetchFiliere(filiereId).map((m) => ({ ...m, label: m.name })),
    ["start", "end"]
  );

  const [legendList, colors] = colorListFromModules(filiereData, [
    missingFormateurLegend,
  ]);
  const [zoom, setZoom, loaded] = useLocalStorage(zoomCoefKey, defaultCoef);
  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <Typography variant="h2" align="center">
        {filiereId}
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
      <Box sx={{ width: viewWidth + zoom * 0.1 }}>
        {!loaded ? (
          <LoadingBar />
        ) : (
          <FiliereContext.Provider
            value={{
              color: ({ theme }) => colors[theme],
              eventHighlighted: isFormateurMissing,
              highlightedProp: missingFormateurStyle,
              onClick: () => {
                console.log("TODO !!! Refacto ModuleMenu");
              },
            }}
          >
            <CalendarDetail
              context={FiliereContext}
              cellHeight={`${minCellHeight + zoom * zoomCoef}em`}
              events={filiereData}
              additionalLabel="Formateur"
              additionalInfo={FormateurSimple}
            />
          </FiliereContext.Provider>
        )}
      </Box>
      <Legend legendList={legendList} />
    </Stack>
  );
}
