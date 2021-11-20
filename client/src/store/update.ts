import {Socket} from "socket.io-client";
import {AuthState} from "./auth";
import {ThunkAction} from "redux-thunk";
import {State} from "./index";
import {NOTIFY_ACTION, NOTIFY_ACTION_TYPE} from "./notify";
import {deleteDataAPI, getDataAPI, postDataAPI} from "../util/fetchData";
import {NotifyType} from "../type/Notify";

enum NOTIFICATION_ACTION_TYPE {
  NOTIFICATION_GET="NOTIFICATION_GET"
}

type NOTIFICATION_ACTION_GET={
  type: NOTIFICATION_ACTION_TYPE,
  payload: Array<NotifyType>
}

type NOTIFICATION_ACTION=NOTIFICATION_ACTION_GET;

export type NotificationState=Array<NotifyType>;

const notificationReducer=(state: NotificationState=[], action: NOTIFICATION_ACTION): NotificationState=>{
  switch (action.type) {
    case NOTIFICATION_ACTION_TYPE.NOTIFICATION_GET:
      return action.payload;
    default:
      return state;
  }
};

type Message={
  id: string,
  text: string,
  url: string,
  content: string,
  image: string
}
export const createNotify=(msg: Message, authState: AuthState,
  socket: Socket): ThunkAction<any, State, any, NOTIFY_ACTION>=>async (dispatch)=>{
  try {
    await postDataAPI("/notify", authState.token, msg);
    socket.emit("createNotify", authState.user!._id);
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const deleteNotify=(msg: Message, authState: AuthState,
  socket: Socket): ThunkAction<any, State, any, NOTIFY_ACTION>=>async (dispatch)=>{
  try {
    await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, authState.token);
    socket.emit("deleteNotify", authState.user!._id);
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const getNotify=(authState: AuthState,
  socket: Socket): ThunkAction<any, State, any, NOTIFICATION_ACTION | NOTIFY_ACTION>=>async (dispatch)=>{
  try {
    const res=await getDataAPI("notify", authState.token);
    dispatch({type: NOTIFICATION_ACTION_TYPE.NOTIFICATION_GET, payload: res.data.notifies});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export default notificationReducer;