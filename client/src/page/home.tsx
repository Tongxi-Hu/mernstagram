import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {State} from "../store";
import {AuthState} from "../store/auth";

const Home=()=>{
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const history=useHistory();

  useEffect(()=>{
    if (!authState.token) history.push("/login");
  }, [authState.token, history]);
  return (
    <div>
      <h1>home</h1>
    </div>
  );
};

export default Home;