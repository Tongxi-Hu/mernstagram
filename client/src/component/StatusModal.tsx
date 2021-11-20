import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeModal, STATUS} from "../store/status";
import {AuthState} from "../store/auth";
import {State} from "../store";
import {notifyFail} from "../store/notify";
import {createPost, updatePost} from "../store/homePost";
import {SocketState} from "../store/socket";

const StatusModal=()=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const status=useSelector<State, STATUS>(state=>state.status);
  const socket=useSelector<State, SocketState>(state=>state.socket);
  const [content, setContent]=useState("");
  const [images, setImages]=useState<Array<File>>([]);

  const handleImageUpload=(e: ChangeEvent<HTMLInputElement>)=>{
    const files=Array.from(e.target.files!);
    let err="";
    let newImages: Array<File>=[];
    files.forEach(file=>{
      if (!file) return err="file does not exists";
      if (file.type!=="image/jpeg" && file.type!=="image/png") return err="incorrect file type";
      return newImages.push(file);
    });
    if (err) notifyFail(err);
    setImages(images=>{return [...images, ...newImages];});
  };

  const handleDeleteImage=(index: number)=>{
    const newArr=[...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if (images.length===0) return dispatch(notifyFail("add your photo"));
    if (!socket) return;
    if (status.post?._id) {
      dispatch(updatePost(content, images, authState, status.post._id));
    } else {
      dispatch(createPost(content, images, authState, socket));
    }
    setContent("");
    setImages([]);
    dispatch(closeModal());
  };

  useEffect(()=>{
    if (status.post) {
      setContent(status.post.content);
      status.post.images.forEach(async (image, index)=>{
        const res=await fetch(image);
        const data=await res.blob();
        const file=new File([data], index+".jpg");
        setImages(oldImages=>[...oldImages, file]);
      });
    }
  }, [status.post]);

  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h5>Create Post</h5>
          <span onClick={()=>dispatch(closeModal())}>&times;</span>
        </div>
        <div className="status_body">
          <textarea name="content" placeholder={`@${authState.user!.username}, what are you thinking?`} value={content}
            onChange={e=>setContent(e.target.value)}/>
          <div className="show_images">
            {images.map((img, index)=>(
              <div key={index} id="file_img">
                <img src={URL.createObjectURL(img)} alt="img"/>
                <span onClick={()=>handleDeleteImage(index)}>&times;</span>
              </div>
            ))}
          </div>
        </div>
        <div className="status_footer">
          <div className="input_images">
            <div className="file_upload">
              <i className="fas fa-image"/>
              <input type="file" name="file" id="file" multiple accept="iamge/*" onChange={handleImageUpload}/>
            </div>
          </div>
          <button className="btn btn-outline-info btn-sm" type="submit">Post</button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;