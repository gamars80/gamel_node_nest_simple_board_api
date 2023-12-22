import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
	@MinLength(8)
	@MaxLength(10)
	@IsNotEmpty()
	@ApiProperty({
		description: '작성자 아이디',
		required: true,
		example: '1',
	})
	username: string;

	@MinLength(8)
	@IsNotEmpty()
	@ApiProperty({
		description: '내용',
		required: true,
		example: '천재다',
	})
	password: string;

	@MinLength(2)
	@IsNotEmpty()
	name: string;

	// @IsEmail()
	// email: string;

	// @IsPhoneNumber('KR')
	// phoneNumber: string;

	// @IsIn(['Female', 'Male']) //이 두가지 이외의 값이 들어올경우 에러메세지 보여줌
	// gender: string;
}
