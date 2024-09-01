import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          myColor: {
            main: "#F6F9FC",
          },
          neutral: {
            main: "#64748B",
          },
          background: {
            default: "#F6F9FC",
            paper: "#f2f2f2",
          },
          favColor: {
            main: grey[300],
          },
          primary: {
            main: grey[700],
          },
          secondary: {
            main: grey[100],
          },
          text: {
            primary: "#000000",
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          myColor: {
            main: "#252b32",
          },
          neutral: {
            main: "#64748B",
          },
          favColor: {
            main: grey[800],
          },
          background: {
            default: '#111827', 
            paper: "#111827", 
          },
          primary: {
            main: "#90caf9",
          },
          secondary: {
            main: "#f48fb1",
          },
          text: {
            primary: "#e0e0e0", 
            secondary: grey[400],
          },
        }),
  },
});

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(
    localStorage.getItem("mode") ? localStorage.getItem("mode") : "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return [theme, colorMode];
};
