enum STATUS_ACTION_TYPE {
  SHOW_MODAL="SHOW_MODAL",
  CLOSE_MODAL="CLOSE_MODAL"
}

type STATUS_ACTION_OPEN_MODAL={
  type: STATUS_ACTION_TYPE.SHOW_MODAL
}
type STATUS_ACTION_CLOSE_MODAL={
  type: STATUS_ACTION_TYPE.CLOSE_MODAL
}

type STATUS_ACTION=STATUS_ACTION_OPEN_MODAL |STATUS_ACTION_CLOSE_MODAL;

export interface STATUS {
  modal: boolean;
}

const initialStatus={
  modal:false
}

const statusReducer=(state: STATUS=initialStatus, action: STATUS_ACTION): STATUS=>{
  switch (action.type) {
    case STATUS_ACTION_TYPE.SHOW_MODAL:
      return {modal: true};
    case STATUS_ACTION_TYPE.CLOSE_MODAL:
      return {modal: false};
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

export default statusReducer;