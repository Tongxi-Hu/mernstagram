import React from "react";
import Avatar from "../Avatar";
import {AuthState} from "../../store/auth";
import {useSelector,useDispatch} from "react-redux";
import {State} from "../../store";
import {openModal} from "../../store/status";

const Status=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  return (
    <>
      {authState.user &&
      <div className="status my-3 d-flex">
          <Avatar url={authState.user!.avatar} username={authState.user!.username} size="big-avatar"/>
          <button className="status_button" onClick={()=>dispatch(openModal())}>
              @{authState.user?.username}, what are you thinking?
          </button>
      </div>}
    </>
  );
};

export default Status;