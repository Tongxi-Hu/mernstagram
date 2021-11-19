import {Socket} from "socket.io-client";

export enum SOCKET_ACTION_TYPE {
  SOCKET_CONNECT="SOCKET_CONNECT"
}

type SOCKET_ACTION={
  type: SOCKET_ACTION_TYPE,
  payload: Socket
}

export type SocketState=Socket | null;

const socketReducer=(state: SocketState=null, action: SOCKET_ACTION)=>{
  switch (action.type) {
    case SOCKET_ACTION_TYPE.SOCKET_CONNECT:
      return action.payload;
    default:
      return state;
  }
};

export default socketReducer;