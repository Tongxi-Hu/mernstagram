import React, {FC} from "react";
import {CommentType} from "../../../type/Comment";
import {PostType} from "../../../type/Post";
import {AuthState} from "../../../store/auth";
import {useDispatch} from "react-redux";
import {deleteComment} from "../../../store/comment";

const CommentMenu: FC<{ comment: CommentType, post: PostType, authState: AuthState, setOnEdit: (onEdit: boolean)=>void }>=({
  post,
  comment,
  authState,
  setOnEdit
})=>{
  const dispatch=useDispatch();

  const handleDelete=()=>{
    dispatch(deleteComment(post,comment,authState));
  }

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
                <div className="dropdown-item" onClick={()=>setOnEdit(true)}>
                    <span className="material-icons">create</span>edit
                </div>
                <div className="dropdown-item" onClick={handleDelete}>
                    <span className="material-icons">delete_outline</span>remove
                </div>
            </>}
          </div>
      </div>}
    </div>
  );
};

export default CommentMenu;