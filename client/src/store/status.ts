import {PostType} from "../type/Post";

enum STATUS_ACTION_TYPE {
  SHOW_MODAL="SHOW_MODAL",
  CLOSE_MODAL="CLOSE_MODAL",
  EDIT_POST="EDIT_POST"
}

type STATUS_ACTION_OPEN_MODAL={
  type: STATUS_ACTION_TYPE.SHOW_MODAL
}
type STATUS_ACTION_CLOSE_MODAL={
  type: STATUS_ACTION_TYPE.CLOSE_MODAL
}

type STATUS_ACTION_EDIT_POST={
  type: STATUS_ACTION_TYPE.EDIT_POST,
  payload: PostType
}

type STATUS_ACTION=STATUS_ACTION_OPEN_MODAL | STATUS_ACTION_CLOSE_MODAL | STATUS_ACTION_EDIT_POST;

export interface STATUS {
  modal: boolean;
  post: PostType | null;
}

const initialStatus={
  modal: false,
  post: null
};

const statusReducer=(state: STATUS=initialStatus, action: STATUS_ACTION): STATUS=>{
  switch (action.type) {
    case STATUS_ACTION_TYPE.SHOW_MODAL:
      return {modal: true, post: null};
    case STATUS_ACTION_TYPE.CLOSE_MODAL:
      return {modal: false, post: null};
    case STATUS_ACTION_TYPE.EDIT_POST:
      return {modal: true, post: action.payload};
    default:
      return state;
  }
};

export const openModal=(): STATUS_ACTION_OPEN_MODAL=>{
  return {type: STATUS_ACTION_TYPE.SHOW_MODAL};
};

export const closeModal=(): STATUS_ACTION_CLOSE_MODAL=>{
  return {type: STATUS_ACTION_TYPE.CLOSE_MODAL};
};

export const openEditPost=(post: PostType): STATUS_ACTION_EDIT_POST=>{
  return {type: STATUS_ACTION_TYPE.EDIT_POST, payload: post};
};

export default statusReducer;