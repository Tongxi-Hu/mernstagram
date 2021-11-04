import React, {FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {AuthState} from "../../store/auth";
import {searchUser} from "../../store/search";

const Search=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const [search, setSearch]=useState("");

  const handleSearch=(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    dispatch(searchUser(search, authState.token));
  };

  return (
    <form className="d-flex ms-auto" onSubmit={handleSearch}>
      <input className="form-control me-2" type="search" value={search}
        onChange={(e)=>setSearch(e.target.value)} aria-label="Search"/>
      <button className="btn btn-outline-info" type="submit" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" disabled={!search}>Search
      </button>
    </form>
  );
};

export default Search;