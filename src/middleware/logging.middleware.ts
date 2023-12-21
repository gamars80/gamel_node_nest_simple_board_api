import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { start } from 'repl';

export class LoggingMiddleware implements NestMiddleware {
	private readonly logger = new Logger();

	use(req: Request, res: Response, next: NextFunction) {
		const { method, originalUrl } = req;
		const startTime = Date.now();

		//api 가 완료되는 시점에  동작하도록 finish 이벤트
		res.on('finish', () => {
			const { statusCode } = res;
			const responseTime = Date.now() - startTime;

			this.logger.log(
				`[${method}] ${originalUrl} ${statusCode} - ${responseTime}ms`,
			);
		});
		next();
	}
}
