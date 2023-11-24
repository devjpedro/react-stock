import { createTheme } from "@mui/material";
import {} from "@mui/material/colors";

export const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: "#8257E6",
      dark: "#6D42D0",
      light: "#5B4699",
      contrastText: "#fff",
    },
    success: {
      main: "#fff",
      dark: "#d6d6d6",
      light: "#a6a6a6",
      contrastText: "#000",
    },
  },
});
