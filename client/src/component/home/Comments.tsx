import React, {FC} from "react";
import {PostType} from "../../type/Post";
import CommentDisplay from "./comment/CommentDisplay";

const Comments: FC<{ post: PostType }>=({post})=>{
  return (
    <div>
      {
        post.comments.map(comment=>(
          <CommentDisplay key={comment._id} comment={comment} post={post}/>
        ))
      }
    </div>
  );
};

export default Comments;