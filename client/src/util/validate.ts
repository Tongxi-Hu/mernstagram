import {RawUserInfo} from "../store/auth";

export const validateUserInfo=(user: RawUserInfo)=>{
  const error: Array<string>=[];
  if (!user.fullname) error.push("enter fullname");
  if (user.fullname.length>25) error.push("name too long");
  if (!user.username) error.push("enter username");
  if (user.username.length>25) error.push("username too long");
  if (!user.email) error.push("enter email");
  if (!validateEmail(user.email)) error.push("incorrect email");
  if (!user.password) error.push("enter password");
  if (user.password.length<6) error.push("password too short");
  return error;
};

function validateEmail(email: string) {
  const re=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}