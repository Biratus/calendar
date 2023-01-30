"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { createContext, useEffect } from "react";
import { useCalendar } from "../../(components)/CalendarProvider";
import { FiliereView } from "../../(components)/CalendarViews";
import GlobalViewLink from "../../(components)/GlobalViewLink";
import { useLegend } from "../../(components)/LegendProvider";
import CalendarDetail from "../../../../components/newCalendar/SingleData/CalendarDetail";
import { missingFormateurStyle } from "../../../../components/newCalendar/styles";
import { useZoom } from "../../../../components/zoom/ZoomProvider";
import ZoomUI from "../../../../components/zoom/ZoomUI";
import { mapISO } from "../../../../lib/date";
import { isFormateurMissing } from "../../../../lib/realData";

const viewWidth = 0.5;
const minCellHeight = 1.3;
const zoomCoef = 0.4;

const FiliereContext = createContext();

export default function CalendarFiliere({ name, modules }) {
  const filiereData = mapISO(modules, ["start", "end"]);
  const { showLegend, colorOf } = useLegend();
  const { zoom } = useZoom();
  const { openMenu } = useCalendar();

  useEffect(
    () => showLegend([...new Set(filiereData.map(({ theme }) => theme))], true),
    []
  );
  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <Typography variant="h2" align="center">
        {name}
      </Typography>
      <Stack direction="row" justifyContent="space-between" sx={{ width: 0.5 }}>
        <GlobalViewLink view={FiliereView.key} />
        <ZoomUI range={5} />
        <Link href={`/api/filiere/${name}/pdf`}>Export to PDF</Link>
      </Stack>
      <Box sx={{ width: viewWidth + zoom * 0.1 }}>
        <FiliereContext.Provider
          value={{
            color: ({ theme }) => colorOf(theme),
            eventHighlighted: isFormateurMissing,
            highlightedProps: missingFormateurStyle,
            onClick: openMenu,
            label: (mod) => mod.name,
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
