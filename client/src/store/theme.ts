import {ThunkAction} from "redux-thunk";
import {State} from "./index";

enum THEME_ACTION_TYPE {
  TOGGLE="TOGGLE",
}

type THEME_ACTION={
  type: THEME_ACTION_TYPE
}

export type DarkModeState={
  darkMode: boolean
}

const initialState: DarkModeState={darkMode: localStorage.getItem("darkmode")==="true"};

const darkModeReducer=(state=initialState, action: THEME_ACTION): DarkModeState=>{
  switch (action.type) {
    case THEME_ACTION_TYPE.TOGGLE:
      return {darkMode: !state.darkMode};
    default:
      return state;
  }
};

export const toggleTheme=(): ThunkAction<any, State, any, THEME_ACTION>=>(dispatch)=>{
  dispatch({type: THEME_ACTION_TYPE.TOGGLE});
};

export default darkModeReducer;
