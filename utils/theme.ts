import { createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";

export const themeSettings = (mode: any) => {
  return {
    palette: {
      mode: mode,
      primary: {
        main: "#f0c000",
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
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
