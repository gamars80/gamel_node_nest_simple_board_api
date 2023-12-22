import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserInfo = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): string => {
		const request = ctx.switchToHttp().getRequest();
		return request.user;
	},
);
