import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import FormateurSimple from "../../components/formateursSimple";
const labelStyle = {
  display: "flex",
  alignItems: "center",
  position: "sticky",
  left: "0",
  alignSelf: "auto",
  color: "ajcBlue.contrastText",
  backgroundColor: "ajcBlue.main",
  cursor: "pointer",
  paddingLeft: "0.5em",
  zIndex: 1,
  "&:hover": {
    backgroundColor: "ajcBlue.dark",
  },
};
export const FiliereView = {
  label: "Filière",
  calendarRowLabel: ({ filiere }) => filiere,
  tooltipAdditionalInfo: ({ formateur }) => {
    return {
      label: "Formateur",
      value: formateur.nom + " " + formateur.prenom + " - " + formateur.mail,
    };
  },
  detailed: {
    additionalLabel: "Formateur",
    additionalInfo: ({ formateur }) => (
      <FormateurSimple formateur={formateur} />
    ),
  },
  labelComponent:(label) => (
    <RowLabel label={label} href="filiere" />
  )
};

export const FormateurView = {
  label: "Formateur",
  calendarRowLabel: ({ formateur }) =>
    `${formateur.nom} ${formateur.prenom} [${formateur.mail}]`,
  tooltipAdditionalInfo: ({ filiere }) => {
    return {
      label: "Filière",
      value: filiere,
    };
  },
  detailed: {
    additionalLabel: "Filière",
    additionalInfo: ({ filiere }) => filiere,
  },
  labelComponent:(label) => (
    <RowLabel label={label} href="formateur" />
  )
};

const RowLabel = React.forwardRef(({ href, label, ...props }, ref) => (
  <Box sx={labelStyle} {...props} ref={ref}>
    <Typography noWrap>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        href={`planning/${href}/${label}`}
      >
        {label}
      </Link>
    </Typography>
  </Box>
));
