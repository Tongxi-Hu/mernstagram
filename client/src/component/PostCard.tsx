import React, {FC} from "react";
import {PostType} from "../type/Post";
import CardHeader from "./home/post_card/CardHeader";
import CardBody from "./home/post_card/CardBody";
import CardFooter from "./home/post_card/CardFooter";
import InputComment from "./home/InputComment";
import Comments from "./home/Comments";

const PostCard: FC<{ post: PostType }>=({post})=>{
  return (
    <div className="card my-3">
      <CardHeader post={post}/>
      <CardBody post={post}/>
      <CardFooter post={post}/>
      <Comments post={post}/>
      <InputComment post={post} reply={undefined}/>
    </div>
  );
};

export default PostCard;