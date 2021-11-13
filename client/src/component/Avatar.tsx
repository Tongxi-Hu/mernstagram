import React, {FC} from "react";
import {useSelector} from "react-redux";
import {State} from "../store";
import {DarkModeState} from "../store/theme";

const Avatar: FC<{ url: string, username: string, size: string }>=({url, username, size})=>{
  const darkMode=useSelector<State, DarkModeState>(state=>state.darkMode);

  return (
    <img src={url} alt={username} className={size} style={{filter: darkMode.darkMode ? "invert(1)" : "invert(0"}}/>
  );
};

export default Avatar;