import React, {Dispatch, FC, useEffect, useState} from "react";
import {AuthState} from "../../store/auth";
import PostThumb from "../PostThumb";
import {PostType} from "../../type/Post";
import {getDataAPI} from "../../util/fetchData";

const getSavedPost=async (authState: AuthState, setSavedPosts: Dispatch<React.SetStateAction<PostType[]>>)=>{
  const res=await getDataAPI("/saved", authState.token);
  setSavedPosts(res.data.posts);
};

const Saved: FC<{ authState: AuthState }>=({authState})=>{
  const [savedPosts, setSavedPosts]=useState<Array<PostType>>([]);
  useEffect(()=>{
    if(authState.token)
    getSavedPost(authState, setSavedPosts);
  }, [authState]);
  return (
    <div>
      <PostThumb posts={savedPosts}/>
    </div>
  );
};

export default Saved;