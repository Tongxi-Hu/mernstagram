import {UserType} from "../type/User";
import {ThunkAction} from "redux-thunk";
import {State} from "./index";
import {NOTIFY_ACTION, NOTIFY_ACTION_TYPE} from "./notify";
import {getDataAPI, patchDataAPI} from "../util/fetchData";
import {uploadImage} from "../util/uploadImage";

enum PROFILE_ACTION_TYPE {
  GET_PROFIlE="GET_PROFILE",
}

type PROFILE_ACTION_GET={
  type: PROFILE_ACTION_TYPE.GET_PROFIlE,
  payload: UserType
}

type PROFILE_ACTION=PROFILE_ACTION_GET;

const profileReducer=(state: UserType | null=null, action: PROFILE_ACTION): (UserType | null)=>{
  switch (action.type) {
    case PROFILE_ACTION_TYPE.GET_PROFIlE:
      return action.payload;

    default:
      return state;
  }
};

export const getProfile=(id: string,
  token: string): ThunkAction<any, State, any, NOTIFY_ACTION | PROFILE_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res=await getDataAPI("user/"+id, token);
    dispatch({type: PROFILE_ACTION_TYPE.GET_PROFIlE, payload: res.data.user});
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const updateUserProfile=(userData: UserType, avatar: File,
  token: string): ThunkAction<any, State, any, NOTIFY_ACTION | PROFILE_ACTION>=>async (dispatch)=>{
  if (!userData.fullname) return dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: "enter full name"});
  if (userData.fullname.length>25) return dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: "full name too long"});
  if (userData.story.length>200) return dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: "story too long"});
  try {
    let media: Array<{ public_id: string, url: string }>=[];
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    if (avatar) media= await uploadImage([avatar]);
    const res=await patchDataAPI("user", token, {
      ...userData,
      avatar: avatar ? media[0].url : userData.avatar
    });
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
    window.location.reload();
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const followUser=(id: string,
  token: string): ThunkAction<any, State, any, NOTIFY_ACTION | PROFILE_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res1=await patchDataAPI("user/"+id+"/follow", token, null);
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res1.data.msg});
    const res=await getDataAPI("user/"+id, token);
    dispatch({type: PROFILE_ACTION_TYPE.GET_PROFIlE, payload: res.data.user});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const unfollowUser=(id: string,
  token: string): ThunkAction<any, State, any, NOTIFY_ACTION | PROFILE_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res1=await patchDataAPI("user/"+id+"/unfollow", token, null);
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res1.data.msg});
    const res=await getDataAPI("user/"+id, token);
    dispatch({type: PROFILE_ACTION_TYPE.GET_PROFIlE, payload: res.data.user});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export default profileReducer;

