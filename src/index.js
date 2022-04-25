import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import axios from "axios";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.withCredentials = true; //set defaults with axios
axios.defaults.baseURL = "http://rem-rest-api.herokuapp.com/api"; //this allows us to call for example users with only axios.get("/users")

//if REM REST API is down we comment the line 6 and uncomment the line 10 of the code
//axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/https://rem.dbwebb.se/api"

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
