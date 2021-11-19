import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AuthState, getAuthInBackground} from "./store/auth";
import {State} from "./store";
import {SocketState} from "./store/socket";
import {getPostsInBackground} from "./store/homePost";

const SocketClient=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const socket=useSelector<State, SocketState>(state=>state.socket);
  useEffect(()=>{
    if (authState.user && socket) socket.emit("joinUser", authState.user._id);
  }, [socket, authState.user]);
  useEffect(()=>{
    if (!socket) return;
    socket.on("likeToClient", ()=>{
      console.log("likeToClient");
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
  return (
    <>
    </>
  );
};

export default SocketClient;