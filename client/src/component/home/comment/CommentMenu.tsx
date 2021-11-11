import React, {FC} from "react";
import {CommentType} from "../../../type/Comment";
import {PostType} from "../../../type/Post";
import {AuthState} from "../../../store/auth";

const CommentMenu: FC<{ comment: CommentType, post: PostType, authState: AuthState }>=({post, comment, authState})=>{

  return (
    <div>
      {(post.user===authState.user?._id || comment.user===authState.user?._id) &&
      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-bs-toggle="dropdown">
          more_vert
        </span>
          <div className="dropdown-menu" aria-labelledby="moreLink">
            {
              post.user===authState.user._id && comment.user!==authState.user?._id &&
              <div className="dropdown-item">
                  <span className="material-icons">delete_outline</span>remove
              </div>}
            {comment.user===authState.user._id &&
            <>
                <div className="dropdown-item">
                    <span className="material-icons">create</span>edit
                </div>
                <div className="dropdown-item">
                    <span className="material-icons">delete_outline</span>remove
                </div>
            </>}
          </div>
      </div>}
    </div>
  );
};

export default CommentMenu;