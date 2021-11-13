import React, {FC} from "react";
import {AuthState} from "../../store/auth";
import {useSelector} from "react-redux";
import {State} from "../../store";
import {ProfilePostsState} from "../../store/profilePost";
import PostThumb from "../PostThumb";

const Posts: FC<{ authState: AuthState }>=({authState})=>{
  const profilePosts=useSelector<State, ProfilePostsState>(state=>state.profilePosts);
  return (
    <div>
      <PostThumb posts={profilePosts}/>
    </div>
  );
};

export default Posts;