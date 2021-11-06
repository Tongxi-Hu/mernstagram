import {ThunkAction} from "redux-thunk";
import {State} from "./index";

export enum NOTIFY_ACTION_TYPE {
  LOADING="LOADING",
  SUCCESS="SUCCESS",
  FAIL="FAIL",
  CLEAR="CLEAR",
}

export interface NOTIFY_LOADING {
  type: NOTIFY_ACTION_TYPE.LOADING;
}

export interface NOTIFY_SUCCESS {
  type: NOTIFY_ACTION_TYPE.SUCCESS;
  payload: string;
}

export interface NOTIFY_FAIL {
  type: NOTIFY_ACTION_TYPE.FAIL;
  payload: string;
}

export interface NOTIFY_CLEAR {
  type: NOTIFY_ACTION_TYPE.CLEAR;
}

export type NOTIFY_ACTION=NOTIFY_LOADING | NOTIFY_SUCCESS | NOTIFY_FAIL | NOTIFY_CLEAR;

export interface NotifyState {
  loading: boolean;
  success: string;
  fail: string;
}

const notifyReducer=(state: NotifyState={loading: false, success: "", fail: ""}, action: NOTIFY_ACTION): NotifyState=>{
  switch (action.type) {
    case NOTIFY_ACTION_TYPE.LOADING:
      return {loading: true, success: "", fail: ""};
    case NOTIFY_ACTION_TYPE.SUCCESS:
      return {loading: false, success: action.payload, fail: ""};
    case NOTIFY_ACTION_TYPE.FAIL:
      return {loading: false, success: "", fail: action.payload};
    case NOTIFY_ACTION_TYPE.CLEAR:
      return {loading: false, success: "", fail: ""};
    default:
      return state;
  }
};

export const clearNotify=(): ThunkAction<any, State, any, NOTIFY_ACTION>=>(dispatch)=>{
  dispatch({type: NOTIFY_ACTION_TYPE.CLEAR});
};

export const notifyFail=(msg: string): ThunkAction<any, State, any, NOTIFY_ACTION>=>(dispatch)=>{
  dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: msg});
};

export default notifyReducer;