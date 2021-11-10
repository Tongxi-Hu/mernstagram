export interface PostType {
  _id: string,
  content: string;
  images: Array<string>;
  likes: Array<string>;
  comments: Array<string>;
  user: string;
}