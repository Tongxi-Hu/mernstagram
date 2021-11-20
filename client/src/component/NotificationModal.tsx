import React, {FC} from "react";
import {Link} from "react-router-dom";
import {AuthState} from "../store/auth";
import {NotificationState} from "../store/update";
import Avatar from "./Avatar";
import moment from "moment";

const NotificationModal: FC<{ authState: AuthState, notification: NotificationState }>=({authState, notification})=>{
  return (
    <div style={{minWidth: "280px"}}>
      <div className="d-flex justify-content-between align-items-center px-3">
        {notification.length===0 && <div className="text-success">you are up to date</div>}
        <div style={{maxHeight: "calc(100vh-200px", overflow: "auto"}}>
          {notification.map(notification=>(
            <div key={notification._id} className="d-flex justify-content-between" style={{width: "100%"}}>
              <Link to={`${notification.url}`} className="d-flex text-dark align-items-center">
                <Avatar url={notification.user.avatar} username={notification.user.username} size="small-avatar"/>
                <div className="flex-fill">
                  <div>
                    <span>{notification.text}</span>
                    <small className="d-flex">
                      {moment(notification.createdAt).fromNow()}
                    </small>
                  </div>
                </div>
              </Link>
              {!notification.isRead && <i className="fas fa-circle text-info ms-5 mt-2"/>}
            </div>
          ))}
        </div>
      </div>
      <hr/>
      <div className="text-center text-danger" style={{cursor: "pointer"}}>Delete All</div>
    </div>
  );
};

export default NotificationModal;