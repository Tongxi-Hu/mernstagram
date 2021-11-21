import React, {useState} from "react";
import UserCard from "../UserCard";
import {State} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {AuthState} from "../../store/auth";
import {UserType} from "../../type/User";
import {getDataAPI} from "../../util/fetchData";
import {NOTIFY_ACTION_TYPE} from "../../store/notify";
import {startConversation} from "../../store/conversation";

const LeftSide=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const [search, setSearch]=useState("");
  const [searchUsers, setSearchUsers]=useState<Array<UserType>>([]);

  const handleSearch=async (e: React.MouseEvent)=>{
    e.preventDefault();
    if (!search) return setSearchUsers([]);
    try {
      const res=await getDataAPI(`search?username=${search}`, authState.token);
      setSearchUsers(res.data.users);
    } catch (err: any) {
      dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: err.response.data.mesg});
    }
  };

  const handleAddUser=(user: UserType)=>{
    setSearch("");
    dispatch(startConversation(user, authState));
    setSearchUsers([]);
  };

  return (
    <>
      <form className="message_header" onClick={handleSearch}>
        <input type="text" value={search} placeholder="search name" onChange={e=>setSearch(e.target.value)}/>
        <button type="submit" id="search">find</button>
      </form>
      <div className="message_cat_list">
        {searchUsers.map(user=>(
          user._id!==authState.user?._id&&
          <div key={user._id} className="message_user">
            <div className="message_cover" onClick={()=>handleAddUser(user)}/>
            <UserCard user={user}/>
          </div>
        ))}
      </div>
    </>
  );
};

export default LeftSide;