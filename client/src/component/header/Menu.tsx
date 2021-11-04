import React, {FC} from "react";
import Avatar from "../Avatar";
import {DarkModeState, toggleTheme} from "../../store/theme";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {AuthState, logout} from "../../store/auth";
import {Link, useLocation} from "react-router-dom";

const Menu: FC<{ navLinks: Array<{ label: string, icon: string, path: string }> }>=({navLinks})=>{
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const darkMode=useSelector<State, DarkModeState>(state=>state.darkMode);
  const {pathname}=useLocation();
  const dispatch=useDispatch();

  const handleLogout=()=>{
    dispatch(logout());
  };

  const handleToggle=()=>{
    localStorage.setItem("darkmode",String(!darkMode.darkMode));
    dispatch(toggleTheme());
  }

  return (
    <ul className="navbar-nav ms-3 mb-2 mb-lg-0">
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
                <Avatar url={authState.user!.avatar} username={authState.user!.username} dark={darkMode.darkMode}/>
              </span>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><Link className="dropdown-item" to={`/profile/${authState.user!._id}`}>Profile</Link></li>
          <li><label className="dropdown-item"
            onClick={handleToggle}>{darkMode.darkMode ? "Light Mode" : "Dark Mode"}</label></li>
          <li>
            <hr className="dropdown-divider"/>
          </li>
          <li><Link className="dropdown-item" to="/" onClick={handleLogout}>LogOut</Link></li>
        </ul>
      </li>
    </ul>
  );
};

export default Menu;