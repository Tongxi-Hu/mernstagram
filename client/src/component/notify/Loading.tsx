import React from "react";

const Loading=()=>{
  return (
    <div style={{background:"#0008",color:"white", top:0,left:0,zIndex:2000}} className="position-fixed w-100 h-100 text-center loading">
      <svg width="205" height="250" viewBox="0 0 40 60">
        <polygon stroke="#fff" strokeWidth="0.5" fill="none" points="20,1 40,40 1,40"/>
        <text fill="#fff" x="3" y="47">Loading</text>
      </svg>
    </div>
  );
};

export default Loading;