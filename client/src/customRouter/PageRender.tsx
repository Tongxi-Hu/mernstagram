import React, {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import NotFound from "../component/NotFound";
import {useSelector} from "react-redux";
import {State} from "../store";
import {AuthState} from "../store/auth";

const generatePage=(pageName: string)=>{
  const component=()=>require(`../page/${pageName}`).default;
  try {
    return React.createElement(component());
  } catch (e) {
    return <NotFound/>;
  }
};

const PageRender=()=>{
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const history=useHistory();
  const {page, id}=useParams<{ page: string, id?: string }>();

  useEffect(()=>{
    if (!authState.token) history.push("/login");
  }, [authState.token, history]);

  let pageName="";
  if (id) {
    pageName=`${page}/[id]`;
  } else {
    pageName=`${page}`;
  }
  return generatePage(pageName);
};

export default PageRender;