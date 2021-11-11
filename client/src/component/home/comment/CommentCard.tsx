import React, {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CommentType} from "../../../type/Comment";
import {PostType} from "../../../type/Post";
import moment from "moment";
import LikeButton from "../../LikeButton";
import {State} from "../../../store";
import {AuthState} from "../../../store/auth";
import {useSelector} from "react-redux";
import CommentMenu from "./CommentMenu";

const CommentCard: FC<{ comment: CommentType, post: PostType }>=({comment, post})=>{
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const [content, setContent]=useState("");
  const [readMore, setReadMore]=useState(false);
  const [isLike, setIsLike]=useState(false);

  const handleLike=()=>{};
  const handleUnLike=()=>{};

  useEffect(()=>{setContent(comment.content);}, [comment.content]);
  return (
    <div className="comment_card">
      <Link to={`/profile/${comment.user}`} className="text-dark">
        <h6 className="mx-1">@{comment.username}:</h6>
      </Link>
      <div className="comment_content">
        <div className="flex-fill">
          <div>
            <span>
              {content.length<100 ? content : (readMore ? content+" " : content.slice(0, 100)+"...")}
            </span>
            {
              content.length>100 &&
              <span className="readMore" onClick={()=>setReadMore(!readMore)}>
                {readMore ? "hide" : "more"}
            </span>
            }
          </div>
          <div style={{cursor: "pointer"}}>
            <small className="text-muted">
              {moment(comment.createdAt).fromNow()}
            </small>
            <small className="font-weight-bold ms-3">
              {comment.likes.length} likes
            </small>
            <small className="font-weight-bold ms-3">
              reply
            </small>
          </div>
        </div>
        <div className="d-flex align-items-center ms-3 me-2 gap-2" style={{cursor:"pointer"}}>
          <CommentMenu post={post} comment={comment} authState={authState}/>
          <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike}/>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;