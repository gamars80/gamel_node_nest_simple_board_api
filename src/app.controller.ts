import { User } from 'src/entity/user.entity';
import { Ip } from './decorators/ip.decorator';
import {
	Controller,
	Get,
	Logger,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly configService: ConfigService,
		private readonly authService: AuthService,
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

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		console.log(req.user);
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	async me(@Request() req) {
		return req.user;
	}
}
