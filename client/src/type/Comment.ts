
export interface CommentType {
  _id: string,
  content: string,
  tag?: string,
  tagname?:string,
  reply?: string,
  likes: Array<string>,
  user: string,
  username: string,
  createdAt: string;
  updatedAt: string;
}