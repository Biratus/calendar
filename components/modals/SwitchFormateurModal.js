"use client";

import { Box, Button, Stack } from "@mui/material";
import { useRef } from "react";
import { formatFullPrettyDate } from "../../lib/date";
import { formateurs as formateursObj } from "../../lib/realData";
import FormateurForm from "../forms/FormateurForm";
import Modal from "./CustomModal";

export default function SwitchFormateurModal({ module, open, close, submit }) {
  const { name, start, end, filiere, formateur } = module;

  const formateurRef = useRef(formateur);

  const submitForm = async () => {
    const success = await submit({
      ...module,
      formateur: formateursObj[formateurRef.current.id],
    });

    if (success) close();
  };

  return (
    <Modal open={open} close={close}>
      <Stack spacing={2} alignItems="start">
        <Box>Module : {name}</Box>
        <Box>Filière :{filiere}</Box>
        <Box>Début : {formatFullPrettyDate(start)}</Box>
        <Box>Fin : {formatFullPrettyDate(end)}</Box>
        <FormateurForm formateur={formateurRef}></FormateurForm>
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
