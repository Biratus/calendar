"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fr from "date-fns/locale/fr";
import Modal from "./CustomModal";

import { useRef, useState } from "react";
import FormateurForm from "../forms/FormateurForm";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "50% 50%",
  gridTemplateRows: "repeat(6,1fr)",
  gridRowGap: "1em",
  gridColumnGap: "1em",
};

const commonLeftSideStyle = {
  gridColumn: 1,
};

const commonRightSideStyle = {
  gridColumn: 2,
  display: "flex",
  px: 2,
  alignItems: "center",
};

export default function SplitModuleModal({ module, open, close, submit }) {
  const { start, end, formateur } = module;

  const formateursOfModule = [
    useRef({ ...formateur }),
    useRef({ ...formateur }),
  ];

  const [splitDate, setSplitDate] = useState(start);

  const submitForm = async () => {
    const success = await submit({
      split: splitDate,
      formateurs: formateursOfModule,
    });
    if (success) close();
  };

  return (
    <Modal open={open} close={close}>
      <Stack direction="column" spacing={2}>
        <Typography component="h1" align="center">
          {module.name}
        </Typography>
        <Box sx={gridStyle}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
            <Box
              sx={{ ...commonLeftSideStyle, gridRowStart: 1, gridRowEnd: 3 }}
            >
              <DatePicker
                label="Début"
                disabled
                value={start}
                onChange={() => {}}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box
              sx={{ ...commonLeftSideStyle, gridRowStart: 3, gridRowEnd: 5 }}
            >
              <DatePicker
                label="Fin de la première partie"
                value={splitDate}
                onChange={(newValue) => {
                  setSplitDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box
              sx={{ ...commonLeftSideStyle, gridRowStart: 5, gridRowEnd: 7 }}
            >
              <DatePicker
                label="Fin"
                disabled
                value={end}
                onChange={() => {}}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box
              sx={{ ...commonRightSideStyle, gridRowStart: 1, gridRowEnd: 4 }}
            >
              <FormateurForm formateur={formateursOfModule[0]} />
            </Box>
            <Box
              sx={{ ...commonRightSideStyle, gridRowStart: 4, gridRowEnd: 7 }}
            >
              <FormateurForm formateur={formateursOfModule[1]} />
            </Box>
          </LocalizationProvider>
        </Box>
        <Stack direction="row" justifyContent="space-around" sx={{ width: 1 }}>
          <Button variant="contained" color="success" onClick={submitForm}>
            Modifier
          </Button>
          <Button variant="outlined" color="error" onClick={close}>
            Annuler
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
