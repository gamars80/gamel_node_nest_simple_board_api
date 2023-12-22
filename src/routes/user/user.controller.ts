import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Post,
	UseInterceptors,
	ValidationPipe,
} from '@nestjs/common';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async signup(@Body(new ValidationPipe()) data: CreateUserDto) {
		return this.userService.createUser(data);
	}

	@Post('login')
	login(@Body(new ValidationPipe()) data: LoginUserDto) {
		return this.userService.login(data);
	}

	@Get()
	@UseInterceptors(ClassSerializerInterceptor)
	getUsers() {
		return this.userService.getUser();
	}
}
