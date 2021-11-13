import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import Info from "../../component/profile/Info";
import Posts from "../../component/profile/Posts";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {AuthState} from "../../store/auth";
import {getProfile} from "../../store/profile";

const Profile=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const {id}=useParams<{ id: string }>();
  useEffect(()=>{
    if (authState.token)
      dispatch(getProfile(id, authState.token));
  }, [dispatch, authState, id]);

  return (
    <div className="profile">
      <Info authState={authState}/>
      <Posts authState={authState}/>
    </div>
  );
};

export default Profile;