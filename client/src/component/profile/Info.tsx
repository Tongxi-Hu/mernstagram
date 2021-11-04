import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {AuthState} from "../../store/auth";
import {getProfile} from "../../store/profile";
import {UserType} from "../../type/User";
import Avatar from "../Avatar";

const Info=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const {id}=useParams<{ id: string }>();
  const profile=useSelector<State, UserType>(state=>state.profile);

  useEffect(()=>{
    dispatch(getProfile(id, authState.token));
  }, [dispatch, authState.token, id]);
  return (
    <div className="info">
      {profile &&
      <div className="info_container">
          <Avatar url={profile.avatar} username={profile.username} size="super-avatar"/>
      </div>}
    </div>
  );
};

export default Info;