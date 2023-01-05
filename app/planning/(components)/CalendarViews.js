import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import FormateurSimple from "../../../components/formateursSimple";
import EventTooltip from "../../../components/newCalendar/EventTooltip";

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
  label: "Filière",
  keyObject: ({ filiere }) => filiere,
  labelTitle: (f) => f,
  labelComponent: (filiere) => (
    <RowLabel label={filiere} href={`filiere/${filiere}`} />
  ),
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
  eventTooltip: (id, event, children) => (
    <FormateurTooltip key={id} event={event}>
      {children}
    </FormateurTooltip>
  ),
};

export const FormateurView = {
  label: "Formateur",
  keyObject: ({ formateur }) => formateur,
  labelTitle: ({ nom, prenom, mail }) => `${nom} ${prenom} [${mail}]`,
  labelComponent: ({ nom, prenom, mail }) => (
    <RowLabel
      label={formateurSimple({ nom, prenom, mail })}
      href={`formateur/${mail}`}
    />
  ),
  eventTooltip: <FiliereTooltip />,
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
