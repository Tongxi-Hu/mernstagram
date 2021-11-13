import {PostType} from "../type/Post";

export enum PROFILE_POST_ACTION_TYPE {
  PROFILE_POST_ACTION_GET="PROFILE_POST_ACTION_GET"
}

type PROFILE_POST_ACTION_GET={
  type: PROFILE_POST_ACTION_TYPE.PROFILE_POST_ACTION_GET,
  payload: Array<PostType>
}

export type PROFILE_POST_ACTION=PROFILE_POST_ACTION_GET;

export type ProfilePostsState=Array<PostType>

const initialState: ProfilePostsState=[];

const profilePostsReducer=(state: ProfilePostsState=initialState, action: PROFILE_POST_ACTION): Array<PostType>=>{
  switch (action.type) {
    case PROFILE_POST_ACTION_TYPE.PROFILE_POST_ACTION_GET:
      return action.payload;
    default:
      return state;
  }
};

export default profilePostsReducer;
