import React, {FC} from "react";
import {useHistory} from "react-router-dom";
import {UserType} from "../type/User";

const UserCard: FC<{ user: UserType }>=({user})=>{
  const history=useHistory();
  return (
    <div className="card mb-3 user_card" onClick={()=>{
      history.push("/profile/"+user._id);
    }}>
      <div className="row g-0">
        <div className="col-md-4 col-sm-2 col-3">
          <img src={user.avatar} className="img-fluid rounded-start card_avatar" alt="..."/>
        </div>
        <div className="col-md-8 col-sm-10 col-9">
          <div className="card-body">
            <h3 className="card-title">{user.fullname.slice(0, 20)}</h3>
            <p className="card-text">@{user.username}
              <br/>
              <small>{user.story.slice(0, 20)+"..."}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;