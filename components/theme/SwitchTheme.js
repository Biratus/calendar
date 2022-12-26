"use client";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function SwitchThemeUI({}) {
  const { mode, setMode } = useContext(ThemeContext);
  return (
    <ToggleButtonGroup
      exclusive
      value={mode}
      onChange={(evt, value) => setMode(value)}
    >
      <ToggleButton value="light">
        <Brightness7Icon />
      </ToggleButton>
      <ToggleButton value="dark">
        <Brightness4Icon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
