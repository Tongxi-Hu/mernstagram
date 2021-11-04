import React, {FC} from "react";
import {useHistory} from "react-router-dom";
import {UserType} from "../type/User";

const UserCard: FC<{ user: UserType }>=({user})=>{
  const history=useHistory();
  return (
    <div className="card mb-3" onClick={()=>{
      history.push("/profile/"+user._id);
      window.location.reload();
    }}>
      <div className="row g-0">
        <div className="col-4">
          <img src={user.avatar} className="img-fluid rounded-start" alt="..."/>
        </div>
        <div className="col-8">
          <div className="card-body">
            <h2 className="card-title">{user.fullname}</h2>
            <p className="card-text">@{user.username}
              <br/>
                <small>{user.story.slice(0, 30)+"..."}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;