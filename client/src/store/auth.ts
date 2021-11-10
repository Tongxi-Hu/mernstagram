import {ThunkAction} from "redux-thunk";

import {postDataAPI} from "../util/fetchData";
import {NOTIFY_ACTION, NOTIFY_ACTION_TYPE} from "./notify";
import {UserType} from "../type/User";
import {State} from "./index";
import {validateUserInfo} from "../util/validate";
import {AxiosResponse} from "axios";

enum AUTH_ACTION_TYPE {
  LOGIN="LOGIN",
  REGISTER="REGISTER",
  LOGOUT="LOGOUT"
};

type AUTH_ACTION_LOGIN={
  type: AUTH_ACTION_TYPE.LOGIN;
  payload: { token: string, user: UserType }
}
type AUTH_ACTION_REGISTER={
  type: AUTH_ACTION_TYPE.REGISTER;
  payload: { token: string, user: UserType }
}

type AUTH_ACTION_LOGOUT={
  type: AUTH_ACTION_TYPE.LOGOUT;
}

type AUTH_ACTION=AUTH_ACTION_LOGIN | AUTH_ACTION_REGISTER | AUTH_ACTION_LOGOUT

export type AuthState={ token: string, user: UserType | null };

const authReducer=(state: AuthState={token: "", user: null}, action: AUTH_ACTION)=>{
  switch (action.type) {
    case AUTH_ACTION_TYPE.LOGIN:
      return {token: action.payload.token, user: action.payload.user};
    case AUTH_ACTION_TYPE.REGISTER:
      return {token: action.payload.token, user: action.payload.user};
    case AUTH_ACTION_TYPE.LOGOUT:
      return {token: "", user: null};
    default:
      return state;
  }
};

export const login=(email: string,
  password: string): ThunkAction<any, State, any, AUTH_ACTION | NOTIFY_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res: AxiosResponse<{ msg: string, access_token: string, user: UserType }>=await postDataAPI("login", "", {
      email,
      password
    });
    dispatch({type: AUTH_ACTION_TYPE.LOGIN, payload: {token: res.data.access_token, user: res.data.user}});
    localStorage.setItem("mernstagram", res.data.access_token);
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const logout=(): ThunkAction<any, State, any, NOTIFY_ACTION | AUTH_ACTION>=>async (dispatch)=>{
  try {
    localStorage.removeItem("mernstagram");
    const res=await postDataAPI("logout", "", "");
    dispatch({type: AUTH_ACTION_TYPE.LOGOUT});
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export interface RawUserInfo {
  email: string,
  fullname: string,
  username: string,
  password: string,
  gender: string
}

export const register=(user: RawUserInfo): ThunkAction<any, State, any, AUTH_ACTION | NOTIFY_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const error=validateUserInfo(user);
    if (error.length>0) return dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: error[0]});
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res: AxiosResponse<{ msg: string, access_token: string, user: UserType }>=await postDataAPI("register", "", user);
    dispatch({type: AUTH_ACTION_TYPE.REGISTER, payload: {token: res.data.access_token, user: res.data.user}});
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const refreshToken=(): ThunkAction<any, State, any, AUTH_ACTION | NOTIFY_ACTION>=>async (dispatch)=>{
  const oldToken=localStorage.getItem("mernstagram");
  if (oldToken) {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    try {
      const res=await postDataAPI("refresh_token", "", "");
      dispatch({type: AUTH_ACTION_TYPE.LOGIN, payload: {token: res.data.access_token, user: res.data.user}});
      localStorage.setItem("mernstagram", res.data.access_token);
      dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
    } catch (e: any) {
      dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
    }
  }
};

export default authReducer;
