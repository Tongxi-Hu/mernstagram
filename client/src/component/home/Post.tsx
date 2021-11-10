import React, {useEffect} from "react";
import {getPosts, PostState} from "../../store/post";
import {AuthState} from "../../store/auth";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import CardHeader from "./post_card/CardHeader";
import CardBody from "./post_card/CardBody";
import CardFooter from "./post_card/CardFooter";

const Post=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const homePosts=useSelector<State, PostState>(state=>state.homePosts);
  useEffect(()=>{
    dispatch(getPosts(authState.token));
  }, [authState.token,dispatch]);

  return (
    <>
      {homePosts.length===0 ? <h2 className="text-center">No Post</h2> :
        <div className="posts">
          {homePosts.map(post=>(
            <div className="card my-3" key={post._id}>
              <CardHeader post={post}/>
              <CardBody />
              <CardFooter/>
            </div>
          ))}
        </div>}
    </>
  );
};

export default Post;