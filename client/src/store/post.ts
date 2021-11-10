import {AuthState} from "./auth";
import {ThunkAction} from "redux-thunk";
import {State} from "./index";
import {NOTIFY_ACTION, NOTIFY_ACTION_TYPE} from "./notify";
import {uploadImage} from "../util/uploadImage";
import {getDataAPI, postDataAPI} from "../util/fetchData";
import {PostType} from "../type/Post";

enum POST_ACTION_TYPE {
  GET_POST="GET_POST",
}

type POST_ACTION_GET={
  type: POST_ACTION_TYPE.GET_POST;
  payload: Array<PostType>
}

type POST_ACTION=POST_ACTION_GET

export type PostState=Array<PostType>;

const postReducer=(state: PostState=[], action: POST_ACTION): PostState=>{
  switch (action.type) {
    case POST_ACTION_TYPE.GET_POST:
      return action.payload;
    default:
      return state;
  }
};

export const createPost=(content: string, images: Array<File>,
  authState: AuthState): ThunkAction<any, State, any, NOTIFY_ACTION>=>async (dispatch)=>{
  try {
    let media: Array<{ public_id: string, url: string }>=[];
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    if (images.length>0) media= await uploadImage(images);
    const res=await postDataAPI("/post", authState.token, {
      content,
      images: media.map(image=>image.url),
      user: authState.user!._id
    });
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
    dispatch(getPosts(authState.token));
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const getPosts=(token: string): ThunkAction<any, State, any, NOTIFY_ACTION | POST_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res=await getDataAPI("post", token);
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
    dispatch({type: POST_ACTION_TYPE.GET_POST, payload: res.data.posts});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export default postReducer;