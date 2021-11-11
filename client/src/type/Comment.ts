export interface CommentType {
  _id: string,
  content: string,
  tag: Object,
  reply: string,
  likes: Array<string>,
  user: string,
  username: string,
  createdAt: string;
  updatedAt: string;
}