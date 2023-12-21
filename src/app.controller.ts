import { Ip } from './decorators/ip.decorator';
import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly configService: ConfigService,
	) {}
	private readonly logger = new Logger(AppController.name);

	@Get()
	getHello(@Ip() ip: string): string {
		// console.log(this.configService.get('ENVIRONMENT'));
		console.log(this.configService.get<string>('ENVIRONMENT'));
		// console.log(ip);
		// this.logger.log(ip);
		// this.logger.debug(ip);
		// this.logger.error(ip);
		// this.logger.verbose(ip);
		// this.logger.warn(ip);
		return this.appService.getHello();

		// throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
	}
}
