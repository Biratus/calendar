"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, {
  createContext,
  useCallback,
  useEffect
} from "react";
import { useCalendar } from "../../(components)/CalendarProvider";
import { FiliereView } from "../../(components)/CalendarViews";
import GlobalViewLink from "../../(components)/GlobalViewLink";
import { useLegend } from "../../(components)/LegendProvider";
import { LoadingBar } from "../../../../components/LoadingBar";
import CalendarDetail from "../../../../components/newCalendar/SingleData/CalendarDetail";
import { missingFormateurStyle } from "../../../../components/newCalendar/styles";
import { useZoom } from "../../../../components/zoom/ZoomProvider";
import ZoomUI from "../../../../components/zoom/ZoomUI";
import { mapISO } from "../../../../lib/calendar";
import { isFormateurMissing } from "../../../../lib/realData";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import filiereToPdf from "../../../../components/pdf/planning-filiere/Simple";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const viewWidth = 0.5;
const minCellHeight = 1.3;
const zoomCoef = 0.4;

const FiliereContext = createContext();

export default function CalendarFiliere({ name, data }) {
  const filiereData = mapISO(data, ["start", "end"]);
  const { showLegend, colorOf } = useLegend();
  const { zoom, loaded } = useZoom();
  const { openMenu } = useCalendar();

  useEffect(
    () => showLegend([...new Set(filiereData.map(({ theme }) => theme))], true),
    []
  );
  const exportToPDF = useCallback(() => {
    pdfMake.createPdf(filiereToPdf({name,modules:filiereData})).download();
  }, []);
  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <Typography variant="h2" align="center">
        {name}
      </Typography>
      <Stack direction="row" justifyContent="space-between" sx={{ width: 0.5 }}>
        <GlobalViewLink view={FiliereView.key} />
        <ZoomUI range={5} />
        <Button onClick={exportToPDF} variant="outlined" size="small">Export to PDF</Button>
       
      </Stack>
      <Box sx={{ width: viewWidth + zoom * 0.1 }}>
        {!loaded ? (
          <LoadingBar />
        ) : (
          <FiliereContext.Provider
            value={{
              color: ({ theme }) => colorOf(theme),
              eventHighlighted: isFormateurMissing,
              highlightedProp: missingFormateurStyle,
              onClick: openMenu,
            }}
          >
            <CalendarDetail
              context={FiliereContext}
              cellHeight={`${minCellHeight + zoom * zoomCoef}em`}
              events={filiereData}
              additionalLabel="Formateur"
              AdditionalInfo={FormateurSimple}
            />
          </FiliereContext.Provider>
        )}
      </Box>
    </Stack>
  );
}

function FormateurSimple({ event: { formateur } }) {
  return (
    <Stack direction="row" alignItems="center" gap={3} sx={{ height: 1 }}>
      <AccountCircleIcon /> {formateur.nom + " " + formateur.prenom}
    </Stack>
  );
}
