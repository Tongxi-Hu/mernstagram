import React, {FC} from "react";
import CommentCard from "./CommentCard";
import {CommentType} from "../../../type/Comment";
import {PostType} from "../../../type/Post";

const CommentDisplay: FC<{ comment: CommentType, post: PostType }>=({comment, post})=>{
  return (
    <div className="comment_display">
      <CommentCard comment={comment} post={post}/>
    </div>
  );
};

export default CommentDisplay;