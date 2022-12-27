"use client";

import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Divider,
  Fab,
  Pagination,
  Radio,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Dropdown from "../../components/Dropdown/Dropdown";

export default function ThemeTest() {
  const theme = useTheme();
  const colors = [
    "ajcBlue",
    "ajcYellow",
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
    "success",
  ];

  const variants = ["text", "outlined", "contained"];
  const varTxt = ["filled", "outlined", "standard"];

  const buttons = (variant) => colors.map((c) => button(variant, c));

  const button = (variant, color) => (
    <Button variant={variant} color={color} key={`${variant} ${color}`}>
      bouton
    </Button>
  );

  const fabs = () => colors.map(fab);

  const fab = (color) => (
    <Fab color={color} key={color} aria-label="add">
      <AddIcon />
    </Fab>
  );

  const dropdowns = (v) => colors.map((c) => dropdown(v, c));

  const dropdown = (variant, color) => (
    <Dropdown
      key={`${variant} ${color}`}
      label={variant}
      actions={[{ label: "action" }]}
      variant={variant}
      color={color}
    />
  );

  const radios = () => colors.map(radio);

  const radio = (color) => (
    <Radio key={color} color={color} checked={true}></Radio>
  );

  const textfields = (v) => colors.map((c) => textfield(v, c));

  const textfield = (variant, color) => (
    <TextField
      key={`${variant} ${color}`}
      label="TextField"
      focused
      color={color}
      variant={variant}
    />
  );

  const ajcColors = (
    <>
      <Typography
        component="h1"
        sx={{
          color: theme.palette.ajcBlue.trueMain,
          fontWeight: "bold",
          textDecoration: "underline",
        }}
      >
        Blue main
      </Typography>
      <Typography
        component="h1"
        sx={{
          color: theme.palette.ajcBlue.light,
          fontWeight: "bold",
          textDecoration: "underline",
        }}
      >
        Blue light
      </Typography>
      <Typography
        component="h1"
        sx={{
          color: theme.palette.ajcBlue.dark,
          fontWeight: "bold",
          textDecoration: "underline",
        }}
      >
        Blue dark
      </Typography>
      <Typography
        component="h1"
        sx={{
          color: theme.palette.ajcYellow.trueMain,
          fontWeight: "bold",
          textDecoration: "underline",
        }}
      >
        Yellow main
      </Typography>
      <Typography
        component="h1"
        sx={{
          color: theme.palette.ajcYellow.light,
          fontWeight: "bold",
          textDecoration: "underline",
        }}
      >
        Yellow light
      </Typography>
      <Typography
        component="h1"
        sx={{
          color: theme.palette.ajcYellow.dark,
          fontWeight: "bold",
          textDecoration: "underline",
        }}
      >
        Yellow dark
      </Typography>
    </>
  );

  return (
    <>
      <h1>UI tests</h1>
      <Stack direction="column" spacing={2} sx={{ m: 5 }} divider={<Divider />}>
        <Stack direction="row" spacing={3}>
          {ajcColors}
        </Stack>
        <Stack direction="row" spacing={5}>
          {colors.map((c) => (
            <Typography
              key={c}
              component="h1"
              sx={{
                color: theme.palette[c].main,
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              {c.toUpperCase()}
            </Typography>
          ))}
        </Stack>
        <Stack direction="column" spacing={5}>
          {variants.map((variant) => (
            <Stack direction="row" spacing={5} key={variant}>
              {buttons(variant)}
            </Stack>
          ))}
        </Stack>
        <Stack direction="row" spacing={5}>
          {fabs()}
        </Stack>
        <Stack direction="column" spacing={5}>
          {variants.map((variant) => (
            <Stack direction="row" spacing={5} key={variant}>
              {dropdowns(variant)}
            </Stack>
          ))}
        </Stack>
        <Box>{radios()}</Box>
        <Stack direction="column" spacing={5}>
          {varTxt.map((variant) => (
            <Stack direction="row" spacing={5} key={variant}>
              {textfields(variant)}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
}
