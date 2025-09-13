import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#F2EBF0",
    },
    primary: {
      main: "#049DBF",
      dark: "#0d5466",
    },
    secondary: {
      main: "#ffffff", //#FCFCA4",
    },
    text: {
      primary: "#083743",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#ffffff88",
          border: "none",
        },
      },
    },
  },
});

export default theme;
