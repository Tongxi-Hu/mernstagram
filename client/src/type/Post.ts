import {CommentType} from "./Comment";

export interface PostType {
  _id: string,
  content: string;
  images: Array<string>;
  likes: Array<string>;
  comments: Array<CommentType>;
  user: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}