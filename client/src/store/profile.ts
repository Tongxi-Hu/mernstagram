import {UserType} from "../type/User";
import {ThunkAction} from "redux-thunk";
import {State} from "./index";
import {NOTIFY_ACTION, NOTIFY_ACTION_TYPE} from "./notify";
import {getDataAPI} from "../util/fetchData";

enum PROFILE_ACTION_TYPE {
  GET_PROFIlE="GET_PROFILE"
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

export default profileReducer;

