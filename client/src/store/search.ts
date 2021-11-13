import {UserType} from "../type/User";
import {ThunkAction} from "redux-thunk";
import {State} from "./index";
import {NOTIFY_ACTION, NOTIFY_ACTION_TYPE} from "./notify";
import {getDataAPI} from "../util/fetchData";
import {AxiosResponse} from "axios";

export enum SEARCH_ACTION_TYPE {
  SEARCH_USER="SEARCH_USER",
  SEARCH_CLEAR="SEARCH_CLEAR",
}

type SEARCH_USER={
  type: SEARCH_ACTION_TYPE.SEARCH_USER,
  payload: Array<UserType>
}

type SEARCH_CLEAR={
  type: SEARCH_ACTION_TYPE.SEARCH_CLEAR
}

type SEARCH_ACTION=SEARCH_USER | SEARCH_CLEAR;

export type SearchState=Array<UserType>;

const searchReducer=(state: SearchState=[], action: SEARCH_ACTION): SearchState=>{
  switch (action.type) {
    case SEARCH_ACTION_TYPE.SEARCH_USER:
      return action.payload;
    case SEARCH_ACTION_TYPE.SEARCH_CLEAR:
      return [];
    default:
      return state;
  }
};

export const searchUser=(input: string,
  token: string): ThunkAction<any, State, any, NOTIFY_ACTION | SEARCH_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    dispatch({type: SEARCH_ACTION_TYPE.SEARCH_CLEAR});
    const res: AxiosResponse<{ users: Array<UserType>, msg: string }>=await getDataAPI("/search?username="+input, token);
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
    dispatch({type: SEARCH_ACTION_TYPE.SEARCH_USER, payload: res.data.users});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export default searchReducer;