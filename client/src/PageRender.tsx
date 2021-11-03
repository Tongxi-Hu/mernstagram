import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "./component/NotFound";

const generatePage=(pageName:string)=>{
  const component =()=>require(`./page/${pageName}`).default;
  try{
    return React.createElement(component());
  }catch(e){
    return <NotFound/>
  }
}

const PageRender=()=>{
  const {page,id}=useParams<{page:string,id?:string}>();
  let pageName="";
  if(id){
    pageName=`${page}/[id]`;
  }else{
    pageName=`${page}`
  }
  return generatePage(pageName);
};

export default PageRender;