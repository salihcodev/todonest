import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user/user.entity';

// user here is injected by jwt strategy, which is contains user data:
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
