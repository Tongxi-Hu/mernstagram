import {PostType} from "../type/Post";
import {ThunkAction} from "redux-thunk";
import {State} from "./index";
import {NOTIFY_ACTION, NOTIFY_ACTION_TYPE} from "./notify";
import {AuthState} from "./auth";
import {getDataAPI} from "../util/fetchData";

export enum POST_DETAIL_ACTION_TYPE {
  POST_DETAIL_ACTION_GET="POST_DETAIL_ACTION_GET",
  POST_DETAIL_ACTION_CLEAR="POST_DETAIL_ACTION_CLEAR"
}

type POST_DETAIL_ACTION_GET={
  type: POST_DETAIL_ACTION_TYPE.POST_DETAIL_ACTION_GET,
  payload: PostType
}

type POST_DETAIL_ACTION_CLEAR={
  type: POST_DETAIL_ACTION_TYPE.POST_DETAIL_ACTION_CLEAR
}

export type POST_DETAIL_ACTION=POST_DETAIL_ACTION_GET | POST_DETAIL_ACTION_CLEAR;

export type PostDetailState=PostType | null;

const postDetailReducer=(state: PostDetailState=null, action: POST_DETAIL_ACTION): PostDetailState=>{
  switch (action.type) {
    case POST_DETAIL_ACTION_TYPE.POST_DETAIL_ACTION_GET:
      return action.payload;
    case POST_DETAIL_ACTION_TYPE.POST_DETAIL_ACTION_CLEAR:
      return null;
    default:
      return state;
  }
};

export const getPost=(id: string,
  authState: AuthState): ThunkAction<any, State, any, NOTIFY_ACTION | POST_DETAIL_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res=await getDataAPI("post/"+id, authState.token);
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
    dispatch({type: POST_DETAIL_ACTION_TYPE.POST_DETAIL_ACTION_GET, payload: res.data.post});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export default postDetailReducer;

