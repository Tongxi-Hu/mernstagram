import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {AuthState} from "../../store/auth";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {getPost, PostDetailState} from "../../store/postDetail";
import PostCard from "../../component/PostCard";

const PostDetail=()=>{
  const dispatch=useDispatch();
  const {id}=useParams<{ id: string }>();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const postDetail=useSelector<State, PostDetailState>(state=>state.postDetail);

  useEffect(()=>{
    if (authState.token)
      dispatch(getPost(id, authState));
  }, [dispatch, id, authState]);

  return (
    <div className="posts" style={{
      position: "fixed",
      top: "0",
      left: "0",
      padding: "4rem 10%",
      width: "90%",
      height: "100vh",
      overflowY: "scroll",
      marginLeft: "5%"
    }}>
      {postDetail && <PostCard post={postDetail}/>}
    </div>
  );
};

export default PostDetail;