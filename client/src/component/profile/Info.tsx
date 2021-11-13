import React, {FC, useState} from "react";
import {AuthState} from "../../store/auth";
import {UserType} from "../../type/User";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowButton from "./FollowButton";
import {useSelector} from "react-redux";
import {State} from "../../store";

const Info: FC<{authState: AuthState }>=({ authState})=>{
  const [onEdit, setOnEdit]=useState(false);
  const profile=useSelector<State, UserType>(state=>state.profile);

  return (
    <div className="info">
      {profile &&
      <div className="info_container">
          <Avatar url={profile.avatar} username={profile.username} size="super-avatar"/>
          <div className="info_content">
              <div className="info_content_title">
                  <h2>{profile.username}</h2>
                {profile._id===authState.user?._id ?
                  <button className="btn btn-outline-success btn-sm mt-1"
                    onClick={()=>setOnEdit(true)}>Edit Profile</button>
                  : <FollowButton profile={profile}/>
                }
              </div>
              <div className="info_detail">
                  <h6>{profile.fullname}</h6>
                  <div className="follow_btn">
                  <span className="me-4">
                      {profile.followers.length} Followers
                  </span>
                      <span className="ms-4">
                      {profile.following.length} Following
                  </span>
                  </div>
                  <p className="m-0">{profile.address}</p>
                  <p className="m-0">{profile.email}</p>
                  <a href={profile.website} target="_blank" rel="noreferrer">{profile.website.slice(0, 35)+"..."}</a>
                  <p>{profile.story}</p>
              </div>
          </div>
      </div>}
      {profile && onEdit && <EditProfile profile={profile} setOnEdit={setOnEdit}/>}
    </div>
  );
};

export default Info;