import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Tasks from './components/Tasks';
import { primaryColor } from "./constants/colors";

const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor
    }
  },
  typography: {
    fontFamily: "Montserrat, sans-serif"
  }
});


const App: React.FC = () => {
  return (
    <ThemeProvider theme={materialTheme}>
      <Router>
        <Switch>
          <Route path="/" component={Tasks} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;