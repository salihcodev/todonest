import { TodoStatus } from 'src/common/enums/todo-status.enum';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class TodoStatusValidator implements PipeTransform {
  readonly allowedStatusTypes = [
    TodoStatus.OPEN,
    TodoStatus.IN_PROGRESS,
    TodoStatus.CLOSED,
  ];

  transform(value: any) {
    // to match statuses types writing:
    const val = value.toUpperCase();

    // validate:
    if (!this.isTodoStatusValid(val)) {
      throw new BadRequestException(`${val} is invalid todo status!!`);
    }

    return value;
  }

  private isTodoStatusValid(val: any) {
    const idx = this.allowedStatusTypes.indexOf(val);

    return idx !== -1;
  }
}
