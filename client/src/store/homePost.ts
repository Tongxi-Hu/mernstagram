import {AUTH_ACTION, AUTH_ACTION_TYPE, AuthState} from "./auth";
import {ThunkAction} from "redux-thunk";
import {State} from "./index";
import {NOTIFY_ACTION, NOTIFY_ACTION_TYPE} from "./notify";
import {uploadImage} from "../util/uploadImage";
import {deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI} from "../util/fetchData";
import {PostType} from "../type/Post";
import {POST_DETAIL_ACTION, POST_DETAIL_ACTION_TYPE} from "./postDetail";

export enum POST_ACTION_TYPE {
  GET_POST="GET_POST",
}

type POST_ACTION_GET={
  type: POST_ACTION_TYPE.GET_POST;
  payload: Array<PostType>
}

export type POST_ACTION=POST_ACTION_GET

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
  authState: AuthState): ThunkAction<any, State, any, NOTIFY_ACTION | POST_ACTION>=>async (dispatch)=>{
  try {
    let media: Array<{ public_id: string, url: string }>=[];
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    if (images.length>0) media= await uploadImage(images);
    const res=await postDataAPI("/post", authState.token, {
      content,
      images: media.map(image=>image.url)
    });
    const res1=await getDataAPI("post", authState.token);
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
    dispatch({type: POST_ACTION_TYPE.GET_POST, payload: res1.data.posts});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const getPosts=(token: string): ThunkAction<any, State, any, NOTIFY_ACTION | POST_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res=await getDataAPI("post", token);
    dispatch({type: POST_ACTION_TYPE.GET_POST, payload: res.data.posts});
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const updatePost=(content: string, images: Array<File>,
  authState: AuthState,
  id: string): ThunkAction<any, State, any, NOTIFY_ACTION | POST_ACTION | POST_DETAIL_ACTION>=>async (dispatch)=>{
  try {
    let media: Array<{ public_id: string, url: string }>=[];
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    if (images.length>0) media= await uploadImage(images);
    const res=await patchDataAPI("post/"+id, authState.token, {
      content,
      images: media.map(image=>image.url)
    });
    const res1=await getDataAPI("post", authState.token);
    const res2=await getDataAPI("post/"+id, authState.token);
    dispatch({type: POST_DETAIL_ACTION_TYPE.POST_DETAIL_ACTION_GET, payload: res2.data.post});
    dispatch({type: POST_ACTION_TYPE.GET_POST, payload: res1.data.posts});
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const deletePost=(post: PostType,
  authState: AuthState): ThunkAction<any, State, any, NOTIFY_ACTION | POST_ACTION | POST_DETAIL_ACTION>=>async (dispatch,
  getState)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res=await deleteDataAPI("post/"+post._id, authState.token);
    const res1=await getDataAPI("post", authState.token);
    dispatch({type: POST_ACTION_TYPE.GET_POST, payload: res1.data.posts});
    const postDetail=getState().postDetail;
    if (postDetail?._id===post._id) dispatch({type: POST_DETAIL_ACTION_TYPE.POST_DETAIL_ACTION_CLEAR});
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    console.log(e);
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const likePost=(post: PostType,
  authState: AuthState): ThunkAction<any, State, any, NOTIFY_ACTION | POST_ACTION | POST_DETAIL_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res=await patchDataAPI("post/"+post._id+"/like", authState.token, {likes: [...post.likes, authState.user?._id]});
    const res1=await getDataAPI("post", authState.token);
    dispatch({type: POST_ACTION_TYPE.GET_POST, payload: res1.data.posts});
    const res2=await getDataAPI("post/"+post._id, authState.token);
    dispatch({type: POST_DETAIL_ACTION_TYPE.POST_DETAIL_ACTION_GET, payload: res2.data.post});
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const unLikePost=(post: PostType,
  authState: AuthState): ThunkAction<any, State, any, NOTIFY_ACTION | POST_ACTION | POST_DETAIL_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res=await patchDataAPI("post/"+post._id+"/unlike", authState.token, {likes: post.likes.filter(like=>like!==authState.user?._id)});
    const res1=await getDataAPI("post", authState.token);
    dispatch({type: POST_ACTION_TYPE.GET_POST, payload: res1.data.posts});
    const res2=await getDataAPI("post/"+post._id, authState.token);
    dispatch({type: POST_DETAIL_ACTION_TYPE.POST_DETAIL_ACTION_GET, payload: res2.data.post});
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const savePost=(post: PostType,
  authState: AuthState): ThunkAction<any, State, any, NOTIFY_ACTION |AUTH_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res=await patchDataAPI("post/"+post._id+"/save", authState.token, null);
    const res1=await postDataAPI("refresh_token", "", "");
    dispatch({type: AUTH_ACTION_TYPE.LOGIN, payload: {token: res1.data.access_token, user: res1.data.user}});
    localStorage.setItem("mernstagram", res1.data.access_token);
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const unSavePost=(post: PostType,
  authState: AuthState): ThunkAction<any, State, any, NOTIFY_ACTION | AUTH_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res=await patchDataAPI("post/"+post._id+"/unsave", authState.token, null);
    const res1=await postDataAPI("refresh_token", "", "");
    dispatch({type: AUTH_ACTION_TYPE.LOGIN, payload: {token: res1.data.access_token, user: res1.data.user}});
    localStorage.setItem("mernstagram", res1.data.access_token);
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export default postReducer;