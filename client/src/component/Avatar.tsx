import React, {FC} from "react";

const Avatar:FC<{url:string,username:string,size:string}>=({url,username,size})=>{
  return (
    <img src={url} alt={username} className={size}/>
  );
};

export default Avatar;