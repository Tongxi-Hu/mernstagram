import React, {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {PostType} from "../../../type/Post";
import Send from "../../../image/send.svg";
import LikeButton from "../../LikeButton";
import {useDispatch, useSelector} from "react-redux";
import {AuthState} from "../../../store/auth";
import {State} from "../../../store";
import {likePost, unLikePost} from "../../../store/post";

const CardFooter: FC<{ post: PostType }>=({post})=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const [isLike, setIsLike]=useState(false);

  const handleLike=()=>{
    dispatch(likePost(post, authState));
  };
  const handleUnLike=()=>{
    dispatch(unLikePost(post, authState));
  };

  useEffect(()=>{
    if (post.likes.find(like=>like===authState.user?._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, authState.user?._id]);
  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike}/>
          <Link to={`/post/${post._id}`} className="text-dark">
            <i className="far fa-comment"/>
          </Link>
          <img src={Send} alt="Send"/>
        </div>
        <i className="far fa-bookmark"/>
      </div>
      <div className="footer_info">
        <h6>{post.likes.length} likes</h6>
        <h6>{post.comments.length} comments</h6>
      </div>
    </div>
  );
};

export default CardFooter;