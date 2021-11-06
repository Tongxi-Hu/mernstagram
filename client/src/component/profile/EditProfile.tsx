import React, {ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState} from "react";

import {UserType} from "../../type/User";
import {checkImage} from "../../util/uploadImage";
import {notifyFail} from "../../store/notify";
import {useDispatch, useSelector} from "react-redux";
import {updateUserProfile} from "../../store/profile";
import {AuthState} from "../../store/auth";
import {State} from "../../store";

const EditProfile: FC<{ profile: UserType, setOnEdit: Dispatch<SetStateAction<boolean>> }>=({profile, setOnEdit})=>{
  const dispatch=useDispatch();
  const authState=useSelector<State, AuthState>(state=>state.auth);
  const [userData, setUserData]=useState(profile);
  const {fullname, mobile, address, story, website,gender}=userData;
  const [avatar, setAvatar]=useState<File>();

  const changeAvatar=(e: ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files![0];
    const err=checkImage(file);
    if (err) return dispatch(notifyFail(err));
    setAvatar(file);
  };

  const handleInput=(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
    const {name, value}=e.target;
    setUserData({...userData, [name]: value});
  };

  const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    dispatch(updateUserProfile(userData, avatar!, authState.token));
  };

  return (
    <div className="edit_profile">
      <button className="btn btn-danger btn_close" onClick={()=>setOnEdit(false)}>Close</button>
      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img src={avatar ? URL.createObjectURL(avatar) : profile.avatar} alt="profile"/>
          <span>
            <i className="fas fa-camera"/>
            <p>Change</p>
            <input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar}/>
          </span>
        </div>
        <div className="form_group">
          <label htmlFor="fullname">Full Name</label>
          <div className="position-relative">
            <input type="text" name="fullname" id="fullname" className="form-control" value={fullname}
              onChange={handleInput}/>
            <small className="text-danger position-absolute"
              style={{top: "50%", right: "5px", transform: "translateY(-50%)"}}>{fullname.length}/25</small>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" name="mobile" id="mobile" className="form-control" value={mobile}
            onChange={handleInput}/>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address" className="form-control" value={address}
            onChange={handleInput}/>
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input type="text" name="website" id="website" className="form-control" value={website}
            onChange={handleInput}/>
        </div>
        <div className="form-group">
          <label htmlFor="story">Story</label>
          <textarea name="story" id="story" className="form-control" value={story} cols={30} rows={4}
            onChange={handleInput}/>
          <small className="text-danger"
          >{story.length}/200</small>
        </div>
        <label htmlFor="gender">Gender</label>
        <div className="input-group-prepend px-0 mb-4">
          <select name="gender" id="gender" className="form-select text-capitalize" onChange={handleInput} value={gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button className="btn btn-success text-light w-100">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;