import React, {FC, FormEvent, useState} from "react";
import {PostType} from "../../type/Post";
import {AuthState} from "../../store/auth";
import {State} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {createComment} from "../../store/comment";

const InputComment: FC<{ post: PostType }>=({post, children})=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const [content, setContent]=useState("");

  const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if (!content.trim()) return;
    dispatch(createComment(post, authState, content));
    setContent("");
  };

  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit}>
      {children}
      <input type="text" placeholder="your nice words..." value={content} onChange={e=>setContent(e.target.value)}/>
      <button type="submit" className="postBtn">Post</button>
    </form>
  );
};

export default InputComment;