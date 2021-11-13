import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import LoadIcon from "../../image/loading.gif";
import {AuthState} from "../../store/auth";
import {State} from "../../store";
import UserCard from "../UserCard";
import {getDataAPI} from "../../util/fetchData";
import {UserType} from "../../type/User";

const getSuggestUser=async (token: string,
  setSuggestUsers: React.Dispatch<React.SetStateAction<UserType[]>>)=>{
  const res=await getDataAPI("/suggestuser", token);
  setSuggestUsers(res.data.users);
};

const RightSideBar=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const [suggestUsers, setSuggestUsers]=useState<Array<UserType>>([]);

  useEffect(()=>{
    if (authState.token)
      getSuggestUser(authState.token, setSuggestUsers);
  }, [dispatch, authState]);

  return (
    <div>
      {authState.user &&
      <>
          <UserCard user={authState.user!}/>
          <div className="d-flex justify-content-between align-items-center my-2">
              <h5 className="text-info fw-light">meet new friends</h5>
              <i className="fas fa-redo" style={{cursor: "pointer"}}
                  onClick={()=>getSuggestUser(authState.token, setSuggestUsers)
                  }/>
          </div>
        {
          suggestUsers.length===0 ?
            <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4"/>
            :
            <div className="suggestions">
              {suggestUsers.map((suggestUser)=>(
                <UserCard user={suggestUser} key={suggestUser._id}/>
              ))}
            </div>

        }
      </>}
    </div>
  );
};

export default RightSideBar;