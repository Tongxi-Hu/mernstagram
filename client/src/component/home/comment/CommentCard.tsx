import React, {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CommentType} from "../../../type/Comment";
import {PostType} from "../../../type/Post";
import moment from "moment";
import LikeButton from "../../LikeButton";
import {State} from "../../../store";
import {AuthState} from "../../../store/auth";
import {useDispatch, useSelector} from "react-redux";
import CommentMenu from "./CommentMenu";
import {likeComment, unlikeComment, updateComment} from "../../../store/comment";
import InputComment from "../InputComment";

const CommentCard: FC<{ comment: CommentType, post: PostType }>=({comment, post, children})=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const [content, setContent]=useState("");
  const [readMore, setReadMore]=useState(false);
  const [isLike, setIsLike]=useState(false);
  const [onEdit, setOnEdit]=useState(false);
  const [onReply, setOnReply]=useState(false);

  const handleLike=()=>{
    dispatch(likeComment(comment, post, authState));
  };
  const handleUnLike=()=>{
    dispatch(unlikeComment(comment, post, authState));
  };

  const handleUpdate=async ()=>{
    if (comment.content!==content) {
      await dispatch(updateComment(content, comment, authState));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleReply=()=>{
    if (onReply) return setOnReply(false);
    setOnReply(true);
  };

  useEffect(()=>{
    if (comment.likes.find(like=>like===authState.user?._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [comment, authState]);

  useEffect(()=>{setContent(comment.content);}, [comment.content]);
  return (
    <div className="comment_card">
      <Link to={`/profile/${comment.user}`} className="text-dark">
        <h6 className="mx-1">@{comment.username}:</h6>
      </Link>
      <div className="comment_content">
        <div className="flex-fill">
          {onEdit ? <textarea rows={3} value={content} onChange={e=>setContent(e.target.value)}/> :
            <div>
              {
                comment.tag&&comment.tag!==comment.user&&
                  <Link to={`/profile/${comment.tag}`} className="mr-1">
                      @{comment.tagname}
                  </Link>
              }
            <span>
              {content.length<100 ? " "+content : (readMore ? content+" " : content.slice(0, 100)+"...")}
            </span>
              {
                content.length>100 &&
                <span className="readMore" onClick={()=>setReadMore(!readMore)}>
                {readMore ? "hide" : "more"}</span>
              }
            </div>
          }
          <div style={{cursor: "pointer"}}>
            <small className="text-muted">
              {moment(comment.createdAt).fromNow()}
            </small>
            <small className="font-weight-bold ms-2">
              {comment.likes.length} likes
            </small>
            {onEdit ?
              <>
                <small className="font-weight-bold ms-2" onClick={handleUpdate}>
                  update
                </small>
                <small className="font-weight-bold ms-2" onClick={()=>setOnEdit(false)}>
                  cancel
                </small>
              </> :
              <small className="font-weight-bold ms-2" onClick={handleReply}>
                {onReply ? "cancel" : "reply"}
              </small>}
          </div>
        </div>
        <div className="d-flex align-items-center ms-3 me-2 gap-2" style={{cursor: "pointer"}}>
          <CommentMenu post={post} comment={comment} authState={authState} setOnEdit={setOnEdit}/>
          <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike}/>
        </div>
      </div>
      {onReply && <InputComment post={post} reply={comment._id} setOnReply={setOnReply} tag={comment.user} tagname={comment.username}>
          <Link to={`/profile/${comment.user}`} className="mr-1">
              @{comment.username}:
          </Link>
      </InputComment>}
      {children}
    </div>
  );
};

export default CommentCard;