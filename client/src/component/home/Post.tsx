import React, {useEffect} from "react";
import {getPosts, PostState} from "../../store/homePost";
import {AuthState} from "../../store/auth";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import PostCard from "../PostCard";

const Post=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const homePosts=useSelector<State, PostState>(state=>state.homePosts);
  useEffect(()=>{
    if (authState.token) dispatch(getPosts(authState.token));
  }, [authState.token, dispatch]);

  return (
    <>
      {homePosts.length===0 ? <h2 className="text-center">No Post</h2> :
        <div className="posts">
          {homePosts.map(post=>(
            <PostCard post={post} key={post._id}/>
          ))}
        </div>}
    </>
  );
};

export default Post;