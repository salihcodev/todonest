import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { TodoStatus } from '../../enums/todo-status.enum';

export class GetFilterDto {
  @IsOptional()
  @IsIn([TodoStatus.OPEN, TodoStatus.IN_PROGRESS, TodoStatus.CLOSED])
  status: string;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
