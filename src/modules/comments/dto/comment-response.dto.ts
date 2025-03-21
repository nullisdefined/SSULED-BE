export class CommentResponseDto {
  id: number;
  postId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name?: string;
    profileImage?: string;
  };
}
