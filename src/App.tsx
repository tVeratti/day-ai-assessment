import { CssBaseline, ThemeProvider } from "@mui/material";

import Home from "./home";
import Layout from "./layout";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Layout>
          {/* NOTE: Router can replace <Home /> if more pages get added */}
          <Home />
        </Layout>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
