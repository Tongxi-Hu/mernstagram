import React from "react";
import {useSelector} from "react-redux";
import {State} from "../store";
import {SearchState} from "../store/search";
import UserCard from "./UserCard";

const SearchResult=()=>{
  const users=useSelector<State, SearchState>(state=>state.search);
  return (
    <div className={`offcanvas offcanvas-start`} tabIndex={-1} id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title text-info" id="offcanvasExampleLabel">What's new</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
          aria-label="Close"/>
      </div>
      <div className="offcanvas-body">
        {users.map(user=>(
          <UserCard user={user} key={user._id}/>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;