import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import React, {FC} from "react";

import auth, {AuthState} from "./auth";
import notify, {NotifyState} from "./notify";
import darkMode from "./theme";

const reducer=combineReducers({
  auth,
  notify,
  darkMode,
});

export interface State{
  auth:AuthState;
  notify:NotifyState;
  darkMode:boolean;
}

const store=createStore(reducer, applyMiddleware(thunk));

const DataProvider: FC=({children})=>{
  return (
    <Provider store={store}>{children}</Provider>
  );
};

export default DataProvider;