import React, {FC} from "react";
import CommentCard from "./CommentCard";
import {CommentType} from "../../../type/Comment";
import {PostType} from "../../../type/Post";

const displayComments=(comment: CommentType, replyComments: Array<CommentType>, post: PostType)=>{
  if (!replyComments.filter(replyComment=>replyComment.reply===comment._id))
    return (
      <CommentCard comment={comment} post={post} key={comment._id}/>
    );
  return (
    <CommentCard comment={comment} post={post} key={comment._id}>
      <div className="ps-4">
        {replyComments.filter(replyComment=>replyComment.reply===comment._id)
                      .map(replyComment=>displayComments(replyComment, replyComments, post))}
      </div>
    </CommentCard>
  );
};

const CommentDisplay: FC<{ comment: CommentType, post: PostType, replyComments: Array<CommentType> }>=({
  comment,
  post,
  replyComments
})=>{
  return (
    <div className="comment_display">
      {displayComments(comment,replyComments,post)}
    </div>
  );
};

export default CommentDisplay;