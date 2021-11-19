import React, {Dispatch, FC, FormEvent, useState} from "react";
import {PostType} from "../../type/Post";
import {AuthState} from "../../store/auth";
import {State} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {createComment} from "../../store/comment";
import {SocketState} from "../../store/socket";

const InputComment: FC<{ post: PostType, reply: string | undefined, setOnReply?: Dispatch<React.SetStateAction<boolean>>,tag?:string,tagname?:string }>=({
  post,
  children,
  reply,
  setOnReply,
  tag,tagname
})=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const socket=useSelector<State, SocketState>(state=>state.socket);
  const [content, setContent]=useState("");

  const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if (!content.trim()) return;
    if(socket) dispatch(createComment(post, authState, content, reply,tag,tagname,socket));
    setContent("");
    if (setOnReply) {setOnReply(false);}
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