import {Socket} from "socket.io";
import Post from "./model/Post";
import User, {UserType} from "./model/User";

const users: Array<{ id: string, socketId: string }>=[];
const SocketServer=(socket: Socket)=>{
  socket.on("joinUser", id=>{
    users.push({id, socketId: socket.id});
  });
  socket.on("disconnect", ()=>{
    users.filter(user=>user.socketId!==socket.id);
  });
  socket.on("likePost", async (id: string)=>{
    const post=await Post.findById(id);
    let user: UserType | null=null;
    if (!post) return;
    user= await User.findById(post.user);
    let ids: Array<string>;
    if (!user) return;
    ids=[user._id, ...user.followers].map(id=>id.toString());
    const clients=users.filter(user=>ids.includes(user.id));
    clients.forEach(client=>{
      socket.to(client.socketId).emit("likeToClient");
    });
  });
  socket.on("unlikePost", async (id: string)=>{
    const post=await Post.findById(id);
    let user: UserType | null=null;
    if (!post) return;
    user= await User.findById(post.user);
    let ids: Array<string>;
    if (!user) return;
    ids=[user._id, ...user.followers].map(id=>id.toString());
    const clients=users.filter(user=>ids.includes(user.id));
    clients.forEach(client=>{
      socket.to(client.socketId).emit("unlikeToClient");
    });
  });
  socket.on("createComment", async (id: string)=>{
    const post=await Post.findById(id);
    let user: UserType | null=null;
    if (!post) return;
    user= await User.findById(post.user);
    let ids: Array<string>;
    if (!user) return;
    ids=[user._id, ...user.followers].map(id=>id.toString());
    const clients=users.filter(user=>ids.includes(user.id));
    clients.forEach(client=>{
      socket.to(client.socketId).emit("createCommentToClient");
    });
  });
  socket.on("deleteComment", async (id: string)=>{
    const post=await Post.findById(id);
    let user: UserType | null=null;
    if (!post) return;
    user= await User.findById(post.user);
    let ids: Array<string>;
    if (!user) return;
    ids=[user._id, ...user.followers].map(id=>id.toString());
    const clients=users.filter(user=>ids.includes(user.id));
    clients.forEach(client=>{
      socket.to(client.socketId).emit("deleteCommentToClient");
    });
  });
  socket.on("follow", async (id: string)=>{
    const user=users.find(user=>user.id===id);
    if (user) socket.to(user.socketId).emit("followToClient");
  });
  socket.on("unfollow", async (id: string)=>{
    const user=users.find(user=>user.id===id);
    if (user) socket.to(user.socketId).emit("unfollowToClient");
  });
};

export default SocketServer;