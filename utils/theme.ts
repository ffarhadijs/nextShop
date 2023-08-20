import { blue } from "@mui/material/colors";
import { createTheme, getContrastRatio } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";


export const themeSettings = (mode: "light" | "dark") => {
  return {
    palette: {
      mode: mode,
      primary: {
        light: blue[300],
        main: blue[500],
        dark: blue[700],
        darker: blue[900],
        contrastText:
          getContrastRatio(blue[500], "#fff") > 2.5 ? "#fff" : "#111",
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode] as const;
};
