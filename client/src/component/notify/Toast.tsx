import React, {FC} from "react";

const Toast: FC<{ msg: string, handleShow: ()=>void, bgColor: string }>=({msg, handleShow, bgColor})=>{
  return (
  <div className="position-fixed top-0 end-0" style={{zIndex: 2001}}>
    <div id="liveToast" className={`toast show ${bgColor}`} role="alert" aria-live="assertive" aria-atomic="true">
      <div className={`toast-header text-light ${bgColor}`}>
          <strong className="me-auto">{bgColor==="bg-success"?"Success!":"Error!"}</strong>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close" onClick={handleShow}/>
      </div>
      <div className="toast-body text-light">
        {msg}
      </div>
    </div>
  </div>
  );
};

export default Toast;