"use client";

import {
  createTheme,
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { themeForMode } from "../../lib/theme";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode,setMode] = useState(prefersDarkMode?'dark':'light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...themeForMode(mode),
        },
      }),
    [mode]
  );
  return (
    <ThemeContext.Provider value={{mode,setMode}}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
