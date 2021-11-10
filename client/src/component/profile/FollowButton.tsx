import React, {FC, useEffect, useState} from "react";
import {AuthState} from "../../store/auth";
import {UserType} from "../../type/User";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {followUser, unfollowUser} from "../../store/profile";

const FollowButton: FC<{ profile: UserType }>=({profile})=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const [followed, setFollowed]=useState(false);
  const handleUnfollow=()=>{
    dispatch(unfollowUser(profile._id, authState.token));
  };
  const handleFollow=()=>{
    dispatch(followUser(profile._id, authState.token));
  };

  useEffect(()=>{
    if (authState.user!.following.find(following=>following===profile._id)) setFollowed(true);
  }, [profile, authState]);

  return (
    <>
      {
        followed ? <button className="btn btn-outline-danger btn-sm mt-1" onClick={handleUnfollow}>Unfollow</button>
          : <button className="btn btn-outline-success btn-sm mt-1" onClick={handleFollow}>Follow</button>
      }
    </>
  );
};

export default FollowButton;