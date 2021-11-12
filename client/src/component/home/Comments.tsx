import React, {FC, useEffect, useState} from "react";
import {PostType} from "../../type/Post";
import CommentDisplay from "./comment/CommentDisplay";
import {CommentType} from "../../type/Comment";

const Comments: FC<{ post: PostType }>=({post})=>{
  const [comments, setComments]=useState<Array<CommentType>>([]);
  const [showComments, setShowComments]=useState<Array<CommentType>>([]);
  const [next, setNext]=useState(2);
  const [replyComments,setReplyComments]=useState<Array<CommentType>>([]);

  useEffect(()=>{
    const newComment=post.comments.filter(comment=>!comment.reply);
    setComments(newComment);
    setShowComments(newComment.slice(0, next));
  }, [post.comments, next]);

  useEffect(()=>{
    const newReplyComment=post.comments.filter(comment=>comment.reply);
    setReplyComments(newReplyComment);
  },[post.comments])
  return (
    <div>
      {
        showComments.map(comment=>(
          <CommentDisplay key={comment._id} comment={comment} post={post} replyComments={replyComments.filter(replyComment=>replyComment.reply===comment._id)}/>
        ))
      }
      <div className="p-2 border-top mx-3">
        {
          comments.length-next>0 ?
            <span style={{cursor: "pointer", color: "teal",marginRight:".5rem"}}
              onClick={()=>setNext(next+3)}>more...</span> : ""
        }
        {comments.length>2 && showComments.length>2 && <span style={{cursor: "pointer", color: "teal"}}
            onClick={()=>setNext(2)}>hide</span>
        }
      </div>
    </div>
  );
};

export default Comments;