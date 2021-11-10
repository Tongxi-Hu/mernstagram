import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import PageRender from "./customRouter/PageRender";
import Login from "./page/login";
import Notify from "./component/notify/Notify";
import {useDispatch, useSelector} from "react-redux";
import {AuthState, refreshToken} from "./store/auth";
import {State} from "./store";
import Home from "./page/home";
import Header from "./component/header/Header";
import Register from "./page/register";
import SearchResult from "./component/SearchResult";
import {DarkModeState} from "./store/theme";
import {NotifyState} from "./store/notify";
import {STATUS} from "./store/status";
import StatusModal from "./component/StatusModal";

function App() {
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const darkMode=useSelector<State, DarkModeState>(state=>state.darkMode);
  const status=useSelector<State, STATUS>(state=>state.status)
  const notify=useSelector<State, NotifyState>(state=>state.notify);
  const [display, setDisplay]=useState(false);

  useEffect(()=>{
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(()=>{
    setDisplay(true);
    setTimeout(()=>{
      setDisplay(false);
    }, 1000);
  }, [notify, dispatch]);
  return (
    <BrowserRouter>
      <div style={{display: display ? "" : "none"}}>
        <Notify/>
      </div>
      <div className="App" style={{filter: darkMode.darkMode ? "invert(1)" : ""}}>
        <SearchResult/>
        <div className="main">
          {authState.token && <Header/>}
          {status.modal&&<StatusModal/>}
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/:page" component={PageRender}/>
            <Route exact path="/:page/:id" component={PageRender}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
