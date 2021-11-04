import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import React, {FC} from "react";
import {composeWithDevTools} from "redux-devtools-extension";

import {UserType} from "../type/User";
import auth, {AuthState} from "./auth";
import notify, {NotifyState} from "./notify";
import darkMode, {DarkModeState} from "./theme";
import search, {SearchState} from "./search";
import profile from "./profile";

const reducer=combineReducers({
  auth,
  notify,
  darkMode,
  search,
  profile
});

export interface State {
  auth: AuthState;
  notify: NotifyState;
  darkMode: DarkModeState;
  search: SearchState;
  profile:UserType
}

const store=createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const DataProvider: FC=({children})=>{
  return (
    <Provider store={store}>{children}</Provider>
  );
};

export default DataProvider;