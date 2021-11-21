import React, {useEffect, useRef, useState} from "react";
import LeftSide from "../../component/message/LeftSide";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {ConversationState, sendNewMessage} from "../../store/conversation";
import {NOTIFY_ACTION_TYPE} from "../../store/notify";
import {AuthState} from "../../store/auth";
import moment from "moment";
import Avatar from "../../component/Avatar";
import {SocketState} from "../../store/socket";

const Message=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const conversation=useSelector<State, ConversationState>(state=>state.conversation);
  const socket=useSelector<State, SocketState>(state=>state.socket);
  const [dialogMode, setDialogMode]=useState(false);
  const [message, setMessage]=useState("");
  const viewPoint=useRef<HTMLDivElement | null>(null);

  const scrollToView=()=>{
    viewPoint.current!.scrollIntoView({behavior: "smooth"});
  };

  const handleSendMessage=async (e: React.MouseEvent)=>{
    e.preventDefault();
    if (!message) return;
    try {
      if (!conversation.conversation || !conversation.target || !socket) return;
      dispatch(sendNewMessage(message, conversation.conversation._id, conversation.target, authState, socket));
    } catch (err: any) {
      dispatch({type: NOTIFY_ACTION_TYPE.FAIL, payload: err.response.data.mesg});
    }
    setMessage("");
  };

  useEffect(()=>{
    if (conversation.target) {
      setDialogMode(true);
      setTimeout(()=>scrollToView(),100)
    }
  }, [conversation.target]);

  return (
    <>
      <div className="placeholder"/>
      <div className="message d-flex">
        <div className="col-md-4 col-sm-5 border-right px-0">
          <LeftSide/>
        </div>
        <div className="col-md-8 col-sm-7 px-0">
          <div className="d-flex justify-content-center align-items-center flex-column h-100">
            {!dialogMode ?
              <>
                <i className="fab fa-facebook-messenger text-primary" style={{fontSize: "5rem"}}/>
                <h4>Messenger</h4>
              </> :
              <div className="dialog_box">
                <div className="dialog_list">
                  {conversation.conversation?.dialog.map(message=>(
                    <div key={message._id}
                      className={`message_container ${message.sender===authState.user?._id ? "" : "target"}`}>
                      <div className="message_card">
                        {message.sender===conversation.target?._id &&
                        <>
                            <Avatar url={conversation.target!.avatar} username={conversation.target!.username}
                                size="small-avatar"/>:{"\u00A0"}
                        </>}
                        {message.content}</div>
                      <span>{moment(message.createdAt)
                      .fromNow()}</span>
                    </div>
                  ))}
                  <div ref={viewPoint}/>
                </div>
                <form className="message_input" onClick={handleSendMessage}>
                  <input type="text" value={message} placeholder={`to @${conversation.target?.username}`}
                    onChange={e=>setMessage(e.target.value)}/>
                  <button type="submit" id="search">find</button>
                </form>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;