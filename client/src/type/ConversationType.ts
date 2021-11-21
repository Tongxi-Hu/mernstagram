export interface ConversationType {
  _id: string,
  dialog: Array<{
    content: string,
    sender: string,
    _id: string,
    createdAt: string,
    updatedAt: string,
  }>,
  user1: string,
  user2: string,
  createdAt: string,
  updatedAt: string,
}