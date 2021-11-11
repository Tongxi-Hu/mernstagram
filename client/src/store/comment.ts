import {ThunkAction} from "redux-thunk";
import {PostType} from "../type/Post";
import {AuthState} from "./auth";
import {NOTIFY_ACTION, NOTIFY_ACTION_TYPE} from "./notify";
import {getDataAPI, patchDataAPI, postDataAPI} from "../util/fetchData";
import {State} from "./index";
import {POST_ACTION, POST_ACTION_TYPE} from "./post";
import {CommentType} from "../type/Comment";

const commentReducer=()=>{};

export const createComment=(post: PostType, authState: AuthState,
  content: string): ThunkAction<any, State, any, NOTIFY_ACTION | POST_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type:NOTIFY_ACTION_TYPE.LOADING});
    const res=await postDataAPI("comment", authState.token, {postId: post._id, content});
    const res1=await getDataAPI("post", authState.token);
    dispatch({type: POST_ACTION_TYPE.GET_POST, payload: res1.data.posts});
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const updateComment=(newContent: string,comment:CommentType, authState: AuthState,
  ): ThunkAction<any, State, any, NOTIFY_ACTION | POST_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res=await patchDataAPI("comment/"+comment._id, authState.token, {newContent});
    const res1=await getDataAPI("post", authState.token);
    dispatch({type: POST_ACTION_TYPE.GET_POST, payload: res1.data.posts});
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export default commentReducer;