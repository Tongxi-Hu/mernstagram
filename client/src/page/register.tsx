import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {State} from "../store";
import {AuthState,register} from "../store/auth";

const Register=()=>{
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const history=useHistory();
  const dispatch=useDispatch();
  const initialState={email: "", password: "", fullname: "", username: "", gender: "male"};
  const [userData, setUserData]=useState(initialState);
  const {email, password, fullname, username}=userData;

  const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
    const {name, value}=e.target;
    setUserData({...userData, [name]: value});
  };

  const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    dispatch(register(userData));
  };

  useEffect(()=>{
    if (authState.token) history.push("/");
  }, [authState.token, history]);
  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">Mernstagram</h3>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="fullname"
            onChange={handleChange} value={fullname} name="fullname"/>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username"
            onChange={handleChange} value={username.toLocaleLowerCase().replace(/ /g, "")} name="username"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            onChange={handleChange} value={email} name="email"/>
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <div className="pass">
            <input type="text" className="form-control" id="exampleInputPassword1"
              onChange={handleChange} value={password} name="password"/>
          </div>
        </div>
        <div className="row mx-0 mb-2">
          <div className="col gx-5">
            <label htmlFor="male">
              Male:<input type="radio" id="male" name="gender" value="male" defaultChecked onChange={handleChange}/>
            </label>
          </div>
          <div className="col">
            <label htmlFor="female">
              Female:<input type="radio" id="female" name="gender" value="female" onChange={handleChange}/>
            </label>
          </div>
          <div className="col">
            <label htmlFor="other">
              Other:<input type="radio" id="other" name="gender" value="other" onChange={handleChange}/>
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-dark w-100"
          disabled={!(email && password && fullname && username)}>Register
        </button>
        <p className="my-2 text-info">
          Already a customer? <Link to="/login" style={{color: "crimson"}}>Login then!</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;