import React, {FC} from "react";
import {CommentType} from "../../../type/Comment";
import {PostType} from "../../../type/Post";
import {AuthState} from "../../../store/auth";
import {useDispatch, useSelector} from "react-redux";
import {deleteComment} from "../../../store/comment";
import {SocketState} from "../../../store/socket";
import {State} from "../../../store";

const CommentMenu: FC<{ comment: CommentType, post: PostType, authState: AuthState, setOnEdit: (onEdit: boolean)=>void }>=({
  post,
  comment,
  authState,
  setOnEdit
})=>{
  const dispatch=useDispatch();
  const socket=useSelector<State, SocketState>(state=>state.socket);

  const handleDelete=()=>{
    if (!socket) return;
    dispatch(deleteComment(post, comment, authState, socket));
  };

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