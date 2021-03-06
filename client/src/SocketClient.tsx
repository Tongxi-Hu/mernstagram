import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AuthState, getAuthInBackground} from "./store/auth";
import {State} from "./store";
import {SocketState} from "./store/socket";
import {getPostsInBackground} from "./store/homePost";
import {getNotify} from "./store/update";
import {ConversationState, startConversation} from "./store/conversation";

const SocketClient=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const socket=useSelector<State, SocketState>(state=>state.socket);
  const conversation=useSelector<State,ConversationState>(state=>state.conversation)
  useEffect(()=>{
    if (authState.user && socket) socket.emit("joinUser", authState.user._id);
  }, [socket, authState.user]);
  useEffect(()=>{
    if (!socket) return;
    socket.on("likeToClient", ()=>{
      dispatch(getPostsInBackground(authState.token));
    });
    return ()=>{socket.off("likeToClient");};
  }, [socket, dispatch, authState]);
  useEffect(()=>{
    if (!socket) return;
    socket.on("unlikeToClient", ()=>{
      dispatch(getPostsInBackground(authState.token));
    });
    return ()=>{socket.off("unlikeToClient");};
  }, [socket, dispatch, authState]);
  useEffect(()=>{
    if (!socket) return;
    socket.on("unlikeToClient", ()=>{
      dispatch(getPostsInBackground(authState.token));
    });
    return ()=>{socket.off("unlikeToClient");};
  }, [socket, dispatch, authState]);

  useEffect(()=>{
    if (!socket) return;
    socket.on("createCommentToClient", ()=>{
      dispatch(getPostsInBackground(authState.token));
    });
    return ()=>{socket.off("createCommentToClient");};
  }, [socket, dispatch, authState]);

  useEffect(()=>{
    if (!socket) return;
    socket.on("newMessageToClient", (id:string)=>{
      if(!conversation.target||!conversation.conversation||conversation.conversation._id!==id) return;
      dispatch(startConversation( conversation.target,authState));
    });
    return ()=>{socket.off("newMessageToClient");};
  }, [socket, dispatch, authState,conversation]);

  useEffect(()=>{
    if (!socket) return;
    socket.on("deleteCommentToClient", ()=>{
      dispatch(getPostsInBackground(authState.token));
    });
    return ()=>{socket.off("deleteCommentToClient");};
  }, [socket, dispatch, authState]);
  useEffect(()=>{
    if (!socket) return;
    socket.on("followToClient", ()=>{
      dispatch(getAuthInBackground());
    });
    return ()=>{socket.off("followToClient");};
  }, [socket, dispatch, authState]);
  useEffect(()=>{
    if (!socket) return;
    socket.on("unfollowToClient", ()=>{
      dispatch(getAuthInBackground());
    });
    return ()=>{socket.off("unfollowToClient");};
  }, [socket, dispatch, authState]);

  useEffect(()=>{
    if (!socket) return;
    socket.on("createNotifyToClient", ()=>{
      dispatch(getNotify(authState, socket));
    });
    return ()=>{socket.off("createNotifyToClient");};
  }, [socket, dispatch, authState]);

  useEffect(()=>{
    if (!socket) return;
    socket.on("deleteNotifyToClient", ()=>{
      dispatch(getNotify(authState, socket));
    });
    return ()=>{socket.off("deleteNotifyToClient");};
  }, [socket, dispatch, authState]);
  return (
    <>
    </>
  );
};

export default SocketClient;