"use client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Stack } from "@mui/material";

export default function FormateurSimple({ formateur }) {
  return (
    <Stack direction="row" alignItems="center" gap={3} sx={{ height: 1 }}>
      <AccountCircleIcon /> {formateur.nom + " " + formateur.prenom}
    </Stack>
  );
}
