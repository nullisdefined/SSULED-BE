import { GroupResponseDto } from './group-response.dto';

export class GroupListResponseDto {
  data: GroupResponseDto[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
