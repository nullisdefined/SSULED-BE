export class GroupResponseDto {
  id: number;
  ownerId: string;
  memberId: string[];
  title: string;
  password?: string;
  isAccessible: boolean;
  maxMember: number;
  createdAt: Date;
  updatedAt: Date;
}
