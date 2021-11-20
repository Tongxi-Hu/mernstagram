export interface NotifyType {
  _id: string,
  id: string,
  user: { _id: string, username: string, avatar: string },
  recipient: Array<string>,
  url: string,
  text: string,
  content: string,
  image: string,
  isRead: boolean,
  createdAt: string;
  updatedAt: string;
}
