import React, {FC} from "react";
import {Link} from "react-router-dom";
import {PostType} from "../type/Post";
import {useSelector} from "react-redux";
import {State} from "../store";
import {DarkModeState} from "../store/theme";

const PostThumb: FC<{ posts: Array<PostType> }>=({posts})=>{
  const darkMode=useSelector<State, DarkModeState>(state=>state.darkMode);

  if(posts.length===0)return(
    <h2 className="text-danger text-center">No posts</h2>
  )
  return (
    <div className="post_thumb">
      {
        posts.map(post=>(
          <Link key={post._id} to={`/post/${post._id}`}>
            <div className="post_thumb_display">
              <img src={post.images[0]} alt={post._id} style={{filter: darkMode.darkMode ? "invert(1)" : "invert(0"}}/>
              <div className="post_thumb_menu">
                <i className="far fa-heart">{post.likes.length}</i>
                <i className="far fa-comment">{post.comments.filter(comment=>!comment.reply).length}</i>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export default PostThumb;