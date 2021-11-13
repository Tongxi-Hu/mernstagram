import {PostType} from "../type/Post";
import {NOTIFY_ACTION, NOTIFY_ACTION_TYPE} from "./notify";
import {ThunkAction} from "redux-thunk";
import {State} from "./index";
import {getDataAPI} from "../util/fetchData";

enum DISCOVER_ACTION_TYPE {
  DISCOVER_GET="DISCOVER_GET",
  DISCOVER_MORE="DISCOVER_MORE"
}

type DISCOVER_ACTION_GET={
  type: DISCOVER_ACTION_TYPE.DISCOVER_GET,
  payload: Array<PostType>
}

type DISCOVER_ACTION_MORE={
  type: DISCOVER_ACTION_TYPE.DISCOVER_MORE,
  payload: Array<PostType>
}

type DISCOVER_ACTION=DISCOVER_ACTION_GET | DISCOVER_ACTION_MORE

export interface DiscoverState {

  posts: Array<PostType>
  result: number,
  page: number,
  firstLoad: boolean
}

const initialState: DiscoverState={
  posts: [],
  result: 0,
  page: 1,
  firstLoad: true
};
const discoverReducer=(state: DiscoverState=initialState, action: DISCOVER_ACTION): DiscoverState=>{
  switch (action.type) {
    case DISCOVER_ACTION_TYPE.DISCOVER_GET:
      return {page:state.page+1, posts: action.payload, result: action.payload.length, firstLoad: false};
    case DISCOVER_ACTION_TYPE.DISCOVER_MORE:
      return{page:state.page+1,posts:[...state.posts,...action.payload], result: action.payload.length, firstLoad:false};
    default:
      return state;
  }
};

export const getDiscoverPosts=(token: string): ThunkAction<any, State, any, NOTIFY_ACTION | DISCOVER_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res=await getDataAPI(`post_discover`, token);
    dispatch({type: DISCOVER_ACTION_TYPE.DISCOVER_GET, payload: res.data.posts});
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
};

export const getMoreDiscover=(token:string,page:number):ThunkAction<any, State, any, NOTIFY_ACTION|DISCOVER_ACTION>=>async (dispatch)=>{
  try {
    dispatch({type: NOTIFY_ACTION_TYPE.LOADING});
    const res=await getDataAPI(`post_discover?page=${page}`, token);
    dispatch({type: DISCOVER_ACTION_TYPE.DISCOVER_MORE, payload: res.data.posts});
    dispatch({type: NOTIFY_ACTION_TYPE.SUCCESS, payload: res.data.msg});
  } catch (e: any) {
    dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: e.response.data.msg});
  }
}

export default discoverReducer;