import React, {useEffect} from "react";
import {AuthState} from "../store/auth";
import {State} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {DiscoverState, getDiscoverPosts, getMoreDiscover} from "../store/discover";
import PostThumb from "../component/PostThumb";
import LoadMoreBtn from "../component/LoadMoreBtn";

const Discover=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const discover=useSelector<State, DiscoverState>(state=>state.discover);

  const handleLoadMore=async ()=>{
    dispatch(getMoreDiscover(authState.token, discover.page));
  };

  useEffect(()=>{
    if (authState.token && discover.firstLoad)
      dispatch(getDiscoverPosts(authState.token));
  }, [authState, dispatch, discover]);

  return (
    <>
      {
        discover.posts.length>0 &&
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          padding: "5rem 10%",
          width: "90%",
          height: "100%",
          overflowY: "scroll",
          marginLeft: "5%"
        }}>
            <PostThumb posts={discover.posts}/>
            <LoadMoreBtn result={discover.result} page={discover.page} handleLoadMore={handleLoadMore}/>
        </div>
      }
    </>
  );
};

export default Discover;