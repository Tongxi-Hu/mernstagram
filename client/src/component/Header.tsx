import React from "react";
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../store";
import {AuthState, logout} from "../store/auth";
import {toggleTheme} from "../store/theme";
import Avatar from "./Avatar";

const Header=()=>{
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const darkMode=useSelector<State, boolean>(state=>state.darkMode);
  const dispatch=useDispatch();
  const {pathname}=useLocation();
  const navLinks=[
    {label: "Home", icon: "home", path: "/"},
    {label: "Message", icon: "near_me", path: "/message"},
    {label: "Discover", icon: "explore", path: "/discover"},
    {label: "Notify", icon: "favorite", path: "/notify"}
  ];

  const handleLogout=()=>{
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mernstagram</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navLinks.map(link=>(
              <li className={`nav-item me-2`} key={link.label}>
                <Link className={`nav-link ${pathname===link.path ? "text-info" : ""}`} aria-current="page"
                  to={link.path}><span
                  className="material-icons">{link.icon}</span></Link>
              </li>
            ))}
            <li className="nav-item dropdown me-3">
              <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <Avatar url={authState.user!.avatar} username={authState.user!.username} dark={darkMode}/>
              </span>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to={`/profile/${authState.user!._id}`}>Profile</Link></li>
                <li><label htmlFor="theme" className="dropdown-item"
                  onClick={()=>dispatch(toggleTheme())}>{darkMode ? "Light Mode" : "Dark Mode"}</label></li>
                <li>
                  <hr className="dropdown-divider"/>
                </li>
                <li><Link className="dropdown-item" to="/" onClick={handleLogout}>LogOut</Link></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;