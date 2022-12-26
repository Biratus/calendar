"use client";

import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { formateurForFields } from "../../lib/dataMapForComponent";
import { toGetParams } from "../../lib/navigation";

var formateurs = formateurForFields();

export default function FormateurForm({ formateur }) {
  const [formateurLoading, setFormateurLoading] = useState(false);

  const availableRef = useRef();
  const ableRef = useRef();

  var formateurValue = formateurs.filter(
    (f) => f.id == formateur.current.mail
  )[0];

  const updateFormateurList = async () => {
    setFormateurLoading(true);
    let options = {
      available: availableRef.current.checked,
      able: ableRef.current.checked,
    };
    try {
      const resp = await axios.get("/api/formateurs" + toGetParams(options));
      formateurs = formateurForFields(resp.data);
    } catch (e) {
    } finally {
      setFormateurLoading(false);
    }
  };

  const onChange = (value) => {
    formateurValue = value;
    formateur.current = value;
  };

  return (
    <Stack direction="column">
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Filtrer les formateurs</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox inputRef={availableRef} />}
            label="Disponibles"
            onChange={updateFormateurList}
          />
          <FormControlLabel
            control={<Checkbox inputRef={ableRef} />}
            label="Ayant les compétences"
            onChange={updateFormateurList}
          />
        </FormGroup>
      </FormControl>
      <Autocomplete
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        autoHighlight
        options={formateurs}
        onChange={(evt, value) => onChange(value)}
        isOptionEqualToValue={(option, value) => option.id == value.id}
        defaultValue={formateurValue}
        sx={{ width: 1 }}
        loading={formateurLoading}
        renderInput={(params) => (
          <TextField
            required
            {...params}
            label="Formateur"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {formateurLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Stack>
  );
}
