import React, {useEffect} from "react";
import {BrowserRouter, Route} from "react-router-dom";

import PageRender from "./PageRender";
import Login from "./page/login";
import Notify from "./component/notify/Notify";
import {useDispatch, useSelector} from "react-redux";
import {AuthState, refreshToken} from "./store/auth";
import {State} from "./store";
import Home from "./page/home";
import Header from "./component/Header";

function App() {
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(refreshToken());
  },[dispatch])
  return (
    <BrowserRouter>
      <Notify/>
      <input type="checkbox" id="theme"/>
      <div className="App">
        <div className="main">
          {authState.token&&<Header/>}
          <Route exact path="/" component={authState.token ? Home : Login}/>
          <Route exact path="/:page" component={PageRender}/>
          <Route exact path="/:page/:id" component={PageRender}/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
