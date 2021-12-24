import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const myStore = createStore(rootReducer);
const nameColorMap = {};
let colorPointer = 0;
window.getColorByName = function(name){
 let colors = [
 "rgba(255, 99, 132, 0.2)",
 "rgba(54, 162, 235, 0.2)",
 "rgba(255, 206, 86, 0.2)",
 "rgba(75, 192, 192, 0.2)",
 "rgba(153, 102, 255, 0.2)",
 "rgba(255, 159, 64, 0.2)",
 "rgba(186, 217, 141, 0.8)",
 "rgba(69, 235, 194, 1)",
 "rgba(171, 0, 0, 0.29)",
 "rgba(30, 154, 66, 0.99)",
 "rgba(240, 154, 255, 1)",
 "rgba(215, 249, 99, 1)",
 "rgba(241, 156, 51, 1)",
 "rgba(92, 120, 114, 1)",
 "rgba(187, 170, 119, 1)",
 ];
 if (!nameColorMap.hasOwnProperty(name)) {
 nameColorMap[name] = colors[colorPointer%13];
 colorPointer++;
 } 
 return nameColorMap[name];
};
window.pieLabel = [];
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#f8e678",
      // light: '#f6e04f',
      main: "#f6e04f",
      dark: "#ac9c3c",
      // contrastText: '#fff',
      contrastText: "#676767",
    },
    secondary: {
      light: "#b2e3ff",
      main: "#9fddff",
      dark: "#6f9ab2",
      contrastText: "#000",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
