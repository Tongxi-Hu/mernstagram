import {UserType} from "../type/User";
import {ConversationType} from "../type/ConversationType";
import {AuthState} from "./auth";
import {ThunkAction} from "redux-thunk";
import {State} from "./index";
import {getDataAPI, postDataAPI} from "../util/fetchData";
import {NOTIFY_ACTION, NOTIFY_ACTION_TYPE} from "./notify";
import {Socket} from "socket.io-client";

enum CONVERSATION_ACTION_TYPE {
  START_CONVERSATION="START_CONVERSATION"
}

type CONVERSATION_ACTION_START={
  type: CONVERSATION_ACTION_TYPE.START_CONVERSATION;
  payload: { target: UserType, conversation: ConversationType }
}

type CONVERSATION_ACTION=CONVERSATION_ACTION_START;

export interface ConversationState {
  target: UserType | null;
  conversation: ConversationType | null;
}

const conversationReducer=(state: ConversationState={target: null, conversation: null},
  action: CONVERSATION_ACTION): ConversationState=>{
  switch (action.type) {
    case CONVERSATION_ACTION_TYPE.START_CONVERSATION:
      return action.payload;
    default:
      return state;
  }
};

export const startConversation=(user: UserType,
  authState: AuthState): ThunkAction<any, State, any, CONVERSATION_ACTION | NOTIFY_ACTION>=>async (dispatch)=>{
  try {
    const res=await getDataAPI("conversation/"+user._id, authState.token);
    dispatch({
      type: CONVERSATION_ACTION_TYPE.START_CONVERSATION,
      payload: {target: user, conversation: res.data.conversation}
    });
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const sendNewMessage=(content: string, conversationId: string, target: UserType,
  authState: AuthState,
  socket: Socket): ThunkAction<any, State, any, CONVERSATION_ACTION | NOTIFY_ACTION>=>async (dispatch)=>{
  try {
    await postDataAPI("/conversation/"+conversationId, authState.token, {content});
    const res=await getDataAPI("conversation/"+target._id, authState.token);
    dispatch({
      type: CONVERSATION_ACTION_TYPE.START_CONVERSATION,
      payload: {target, conversation: res.data.conversation}
    });
    socket.emit("newMessage", {targetId: target._id, conversationId});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export default conversationReducer;