import {AuthState} from "./auth";
import {ThunkAction} from "redux-thunk";
import {State} from "./index";
import {NOTIFY_ACTION, NOTIFY_ACTION_TYPE} from "./notify";
import {uploadImage} from "../util/uploadImage";
import {postDataAPI} from "../util/fetchData";
import {PostType} from "../type/Post";

enum POST_ACTION_TYPE {
  CREATE_POST="CREATE_POST",
}

type POST_ACTION_CREATE={
  type: POST_ACTION_TYPE.CREATE_POST;
  payload: { content: string, images: Array<string>, user: string }
}

type POST_ACTION=POST_ACTION_CREATE

interface postState {
  posts: Array<PostType>;
}

const postReducer=(state: postState={posts: []}, action: POST_ACTION): postState=>{
  switch (action.type) {

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
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export default postReducer;