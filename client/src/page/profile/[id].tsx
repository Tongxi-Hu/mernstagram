import React from "react";
import Info from "../../component/profile/Info";
import Posts from "../../component/profile/Posts";

const Profile=()=>{

  return (
    <div className="profile">
        <Info/>
        <Posts/>
    </div>
  );
};

export default Profile;