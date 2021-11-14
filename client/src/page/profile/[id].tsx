import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Info from "../../component/profile/Info";
import Posts from "../../component/profile/Posts";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {AuthState} from "../../store/auth";
import {getProfile} from "../../store/profile";
import Saved from "../../component/profile/Saved";

const Profile=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const {id}=useParams<{ id: string }>();
  const [savedTab, setSavedTab]=useState(false);
  useEffect(()=>{
    if (authState.token)
      dispatch(getProfile(id, authState.token));
  }, [dispatch, authState, id]);

  return (
    <div className="profile">
      <Info authState={authState}/>
      {authState.user&&authState.user._id===id &&
      <div className="profile_tab">
          <button className={savedTab ? "" : "active"} onClick={()=>setSavedTab(false)}>Posts</button>
          <button className={savedTab ? "active" : ""} onClick={()=>setSavedTab(true)}>Saved</button>
      </div>}
      {savedTab ? <Saved authState={authState}/> :
        <Posts authState={authState}/>}
    </div>
  );
};

export default Profile;