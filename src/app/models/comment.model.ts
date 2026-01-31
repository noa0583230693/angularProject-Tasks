export interface Comment1 {
  id: number;
  taskId: number;
  userId: number;
  createdAt: Date;
  body: string;
}
export interface CommentRequest{
  taskId: number;
  body: string;
}

