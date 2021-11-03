import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AuthState, login} from "../store/auth";
import {State} from "../store";

const Login=()=>{
  const dispatch=useDispatch();
  const history=useHistory();
  const authState=useSelector<State, AuthState>(state=>state.auth)
  const initialState={email: "", password: ""};
  const [userData, setUserData]=useState(initialState);
  const {email, password}=userData;
  const [typePass, setTypePass]=useState(false);

  const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
    const {name, value}=e.target;
    setUserData({...userData, [name]: value});
  };

  const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(()=>{
    if (authState.token) history.push("/");
  }, [authState.token, history]);
  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">Mernstagram</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            onChange={handleChange} value={email} name="email"/>
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <div className="pass">
            <input type={typePass ? "text" : "password"} className="form-control" id="exampleInputPassword1"
              onChange={handleChange} value={password} name="password"/>
            <small onClick={()=>setTypePass(!typePass)}>{typePass ? "Hide" : "Show"}</small>
          </div>
        </div>
        <button type="submit" className="btn btn-dark w-100" disabled={!(email && password)}>Login</button>
        <p className="my-2">
          New user? <Link to="/register" style={{color: "crimson"}}>Register now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;