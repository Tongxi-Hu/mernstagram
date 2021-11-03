import React, {FC} from "react";

const Avatar:FC<{url:string,username:string,dark:boolean}>=({url,username,dark})=>{
  return (
    <img src={url} alt={username} className="avatar" style={{filter:`${dark? 'invert(1)':'invert(0)'}`}}/>
  );
};

export default Avatar;