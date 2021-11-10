import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {State} from "../store";
import {AuthState} from "../store/auth";
import Status from "../component/home/Status";
import Post from "../component/home/Post";

const Home=()=>{
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const history=useHistory();

  useEffect(()=>{
    if (!authState.token) history.push("/login");
  }, [authState.token, history]);
  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status/>
        <Post/>
      </div>
      <div className="col-md-4">
      </div>
    </div>
  );
};

export default Home;