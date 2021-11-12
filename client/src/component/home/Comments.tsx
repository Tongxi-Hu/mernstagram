import React, {FC, useEffect, useState} from "react";
import {PostType} from "../../type/Post";
import CommentDisplay from "./comment/CommentDisplay";
import {CommentType} from "../../type/Comment";

const Comments: FC<{ post: PostType }>=({post})=>{
  const [comments, setComments]=useState<Array<CommentType>>([]);
  const [replyComments, setReplyComments]=useState<Array<CommentType>>([]);

  useEffect(()=>{
    const newComment=post.comments.filter(comment=>!comment.reply);
    setComments(newComment);
  }, [post.comments]);

  useEffect(()=>{
    const newReplyComment=post.comments.filter(comment=>comment.reply);
    setReplyComments(newReplyComment);
  }, [post.comments]);
  return (
    <div className="comments">
      {
        comments.map(comment=>(
          <CommentDisplay key={comment._id} comment={comment} post={post} replyComments={replyComments}/>
        ))
      }
    </div>
  );
};

export default Comments;