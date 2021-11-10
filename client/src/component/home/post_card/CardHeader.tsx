import React, {FC} from "react";
import {PostType} from "../../../type/Post";
import {Link} from "react-router-dom";
import moment from "moment";
import {AuthState} from "../../../store/auth";
import {State} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {openEditPost} from "../../../store/status";

const CardHeader: FC<{ post: PostType }>=({post})=>{
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const dispatch=useDispatch();

  const handleEditClick=()=>{
    dispatch(openEditPost(post));
  };

  return (
    <div className="card_header">
      <div className="d-flex">
        <div className="card_name">
          <h6>
            <Link to={`/profile/${post.user}`}>@{post.username}</Link>
          </h6>
          <small className="text-muted">{moment(post.createdAt).fromNow()}</small>
        </div>
      </div>
      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-bs-toggle="dropdown">
          more_horiz
        </span>
        <div className="dropdown-menu">
          {
            authState.user?._id===post.user &&
            <>
                <div className="dropdown-item" onClick={handleEditClick}>
                    <span className="material-icons">create</span>edit
                </div>
                <div className="dropdown-item">
                    <span className="material-icons">delete_outline</span>delete
                </div>
            </>
          }
          <div className="dropdown-item">
            <span className="material-icons">content_copy</span>copy link
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;