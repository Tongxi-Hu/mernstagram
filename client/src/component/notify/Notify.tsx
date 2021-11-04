import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {clearNotify, NotifyState} from "../../store/notify";
import Loading from "./Loading";
import Toast from "./Toast";

const Notify=()=>{
  const notify=useSelector<State, NotifyState>(state=>state.notify);
  const dispatch=useDispatch();
  const handleClear=()=>dispatch(clearNotify());

  return (
    <div>
      {notify.loading && <Loading/>}
      {notify.fail && <Toast msg={notify.fail} handleShow={handleClear} bgColor="bg-danger"/>}
      {notify.success && <Toast msg={notify.success} handleShow={handleClear} bgColor="bg-success"/>}
    </div>
  );
};

export default Notify;