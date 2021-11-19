import React, {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {PostType} from "../../../type/Post";
import Send from "../../../image/send.svg";
import LikeButton from "../../LikeButton";
import {useDispatch, useSelector} from "react-redux";
import {AuthState} from "../../../store/auth";
import {State} from "../../../store";
import {likePost, savePost, unLikePost, unSavePost} from "../../../store/homePost";
import {SocketState} from "../../../store/socket";

const CardFooter: FC<{ post: PostType }>=({post})=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const socket=useSelector<State, SocketState>(state=>state.socket);
  const [isLike, setIsLike]=useState(false);
  const [isSaved, setIsSaved]=useState(false);

  const handleLike=()=>{
    if (socket) dispatch(likePost(post, authState, socket));
  };
  const handleUnLike=()=>{
    if (socket) dispatch(unLikePost(post, authState, socket));
  };

  const handleSave=()=>{
    dispatch(savePost(post, authState));
  };

  const handleUnSave=()=>{
    dispatch(unSavePost(post, authState));
  };

  useEffect(()=>{
    if (post.likes.find(like=>like===authState.user?._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
    if (authState.user?.saved.find(saved=>saved===post._id)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [post.likes, post._id, authState.user?.saved, authState.user?._id]);
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
        {isSaved ? <i className="fas fa-bookmark text-success" onClick={handleUnSave}/>
          : <i className="far fa-bookmark" onClick={handleSave}/>}
      </div>
      <div className="footer_info">
        <h6>{post.likes.length} likes</h6>
        <h6>{post.comments.filter(comment=>!comment.reply).length} comments</h6>
      </div>
    </div>
  );
};

export default CardFooter;