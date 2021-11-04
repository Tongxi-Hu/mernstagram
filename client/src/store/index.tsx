import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import React, {FC} from "react";

import auth, {AuthState} from "./auth";
import notify, {NotifyState} from "./notify";
import darkMode, {DarkModeState} from "./theme";
import search, {SearchState} from "./search";
import {composeWithDevTools} from "redux-devtools-extension";

const reducer=combineReducers({
  auth,
  notify,
  darkMode,
  search
});

export interface State {
  auth: AuthState;
  notify: NotifyState;
  darkMode: DarkModeState;
  search: SearchState;
}

const store=createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const DataProvider: FC=({children})=>{
  return (
    <Provider store={store}>{children}</Provider>
  );
};

export default DataProvider;