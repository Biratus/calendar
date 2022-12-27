import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Stack } from "@mui/material";

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
      <Stack direction="row" alignItems="center" gap={3} sx={{height:1}}>
        <AccountCircleIcon /> {formateur.nom + " " + formateur.prenom}
      </Stack>
    ),
  },
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
};
