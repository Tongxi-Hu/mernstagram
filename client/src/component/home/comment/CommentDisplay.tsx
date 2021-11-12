import React, {FC} from "react";
import CommentCard from "./CommentCard";
import {CommentType} from "../../../type/Comment";
import {PostType} from "../../../type/Post";

const CommentDisplay: FC<{ comment: CommentType, post: PostType, replyComments: Array<CommentType> }>=({
  comment,
  post,
  replyComments
})=>{
  return (
    <div className="comment_display">
      <CommentCard comment={comment} post={post}>
        <div className="ps-4">
          {replyComments.map((replyComment, )=>(
            replyComment.reply &&
            <CommentCard comment={replyComment} post={post} key={replyComment._id}/>
          ))}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;