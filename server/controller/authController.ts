import bcrypt from "bcrypt";
import jwt, {JwtPayload} from "jsonwebtoken";
import {Request, Response} from "express";

import User from "../model/User";

const createAccessToken=(payload: Object)=>{
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: "1d"});
};

const createRefreshToken=(payload: Object)=>{
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: "30d"});
};

const register=async (req: Request, res: Response)=>{
  try {
    const {fullname, username, email, password, gender}=req.body;
    const oldUser=await User.findOne({email});
    if (oldUser) return res.status(400).json({msg: "email already exists"});
    if (password.length<6) return res.status(400).json({msg: "password too short"});
    const hashedPassword=await bcrypt.hash(password, 6);
    const user=new User({fullname, username: username.replace(/ /g, ""), email, password: hashedPassword, gender});
    await user.save();
    const access_token=createAccessToken({id: user._id});
    const refresh_token=createRefreshToken({id: user._id});
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/refresh_token",
      maxAge: 30*24*60*60*1000
    });
    res.json({
      msg: "register success!", access_token, user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
        gender: user.gender,
        mobile: user.mobile,
        address: user.address,
        story: user.story,
        website: user.website,
        followers: user.followers,
        following: user.following,
        saved: user.saved,
        password: ""
      }
    });
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const login=async (req: Request, res: Response)=>{
  try {
    const {email, password}=req.body;
    const user=await User.findOne({email});
    if (!user) return res.status(400).json({msg: "invalid info"});
    const match=await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({msg: "invalid info"});
    const access_token=createAccessToken({id: user._id});
    const refresh_token=createRefreshToken({id: user._id});
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/refresh_token",
      maxAge: 30*24*60*60*1000
    });
    res.json({
      msg: "login success!", access_token, user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
        gender: user.gender,
        mobile: user.mobile,
        address: user.address,
        story: user.story,
        website: user.website,
        followers: user.followers,
        following: user.following,
        saved: user.saved,
        password: ""
      }
    });
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const logout=async (req: Request, res: Response)=>{
  try {
    res.clearCookie("refreshtoken", {path: "/api/refresh_token"});
    return res.json({msg: "logged out"});
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const generateAccessToken=async (req: Request, res: Response)=>{
  try {
    const refresh_token=req.cookies.refreshtoken;
    if (!refresh_token) return res.status(400).json({msg: "login now"});
    // @ts-ignore
    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET!, async (err: any, decoded: JwtPayload)=>{
      if (err) return res.status(400).json({msg: "login now"});
      const user=await User.findById(decoded.id).select("-password");
      if (!user) return res.status(400).json({msg: "user not exist"});
      const access_token=createAccessToken({id: decoded.id});
      res.json({msg: "token refresh success", access_token, user});
    });
  } catch (e: any) {
    return res.status(500).json({msg: e.message});
  }
};

const authController={
  register,
  login,
  logout,
  generateAccessToken
};

export default authController;

