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
    additionalInfo: ({ formateur }) => formateur.nom + " " + formateur.prenom,
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
