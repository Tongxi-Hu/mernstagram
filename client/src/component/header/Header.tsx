import React from "react";
import {Link} from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";

const Header=()=>{
  const navLinks=[
    {label: "Home", icon: "home", path: "/"},
    {label: "Message", icon: "near_me", path: "/message"},
    {label: "Discover", icon: "explore", path: "/discover"},
    {label: "Notify", icon: "favorite", path: "/notify"}
  ];



  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h1>Mernstagram</h1></Link>
        <button className="navbar-toggler  btn-sm" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Search/>
          <Menu navLinks={navLinks}/>
        </div>
      </div>
    </nav>
  );
};

export default Header;