import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '../auth/dto/user.dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserDto;
  },
);
