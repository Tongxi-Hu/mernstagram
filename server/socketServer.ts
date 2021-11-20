import {Socket} from "socket.io";
import Post from "./model/Post";
import User, {UserType} from "./model/User";

const users: Array<{ id: string, socketId: string }>=[];
const SocketServer=(socket: Socket)=>{
  socket.on("joinUser", id=>{
    const i=users.findIndex(user=>user.id===id);
    if (i> -1) users[i]={id, socketId: socket.id};
    else users.push({id, socketId: socket.id});
    console.log(users);
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
  socket.on("createNotify", async (id: string)=>{
    const author=await User.findById(id);
    if (!author) return;
    // @ts-ignore;
    const followers=users.filter(user=>author.followers.includes(user.id));
    followers.forEach(user=>socket.to(user.socketId).emit("createNotifyToClient"));
  });
  socket.on("deleteNotify", async (id: string)=>{
    const author=await User.findById(id);
    if (!author) return;
    // @ts-ignore;
    const followers=users.filter(user=>author.followers.includes(user.id));
    followers.forEach(user=>socket.to(user.socketId).emit("deleteNotifyToClient"));
  });
};

export default SocketServer;