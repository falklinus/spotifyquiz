import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import axios from "axios";

// Components
import Navbar from "./components/layout/Navbar";

// Pages
import home from "./pages/home";
import login from "./pages/login";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser } from "./redux/actions/userActions";

const theme = createMuiTheme(themeFile);

const token = JSON.parse(localStorage.getItem("SpotifyToken"));
if (token) {
  console.log(token);
  if (token.expires < Date.now()) {
    store.dispatch(logoutUser());
    //window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED, payload: token.access_token });
    const headerToken = `Bearer ${token.access_token}`;
    axios.defaults.headers.common["Authorization"] = headerToken;
    //store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
