import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import EventTooltip from "../../../components/newCalendar/EventTooltip";

const FiliereLabel = React.forwardRef(
  ({ labelKey: filiere, ...props }, ref) => {
    return (
      <RowLabel
        label={filiere}
        href={`filiere/${filiere}`}
        ref={ref}
        {...props}
      />
    );
  }
);
const FormateurLabel = React.forwardRef(
  ({ labelKey: { nom, prenom, mail }, ...props }, ref) => {
    return (
      <RowLabel
        label={formateurSimple({ nom, prenom, mail })}
        href={`formateur/${mail}`}
        ref={ref}
        {...props}
      />
    );
  }
);
const formateurSimple = ({ nom, prenom, mail }) => `${nom} ${prenom} - ${mail}`;

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
  key: "filiere",
  label: "Filière",
  keyObject: ({ filiere }) => filiere,
  labelTitle: (f) => f,
  LabelComponent: FiliereLabel,
  EventTooltip: FormateurTooltip,
};

export const FormateurView = {
  key: "formateur",
  label: "Formateur",
  keyObject: ({ formateur }) => formateur,
  labelTitle: ({ nom, prenom, mail }) => `${nom} ${prenom} [${mail}]`,
  LabelComponent: FormateurLabel,
  EventTooltip: FiliereTooltip,
};

function FiliereTooltip({ event, children }) {
  return (
    <EventTooltip
      event={event}
      additionalInfos={{ label: "Filière", value: event.filiere }}
    >
      {children}
    </EventTooltip>
  );
}
function FormateurTooltip({ event, children }) {

  return (
    <EventTooltip
      event={event}
      additionalInfos={{
        label: "Formateur",
        value: formateurSimple(event.formateur),
      }}
    >
      {children}
    </EventTooltip>
  );
}

const RowLabel = React.forwardRef(({ href, label, ...props }, ref) => (
  <Box sx={labelStyle} {...props} ref={ref}>
    <Typography noWrap>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        href={`planning/${href}`}
        prefetch={false}
      >
        {label}
      </Link>
    </Typography>
  </Box>
));
