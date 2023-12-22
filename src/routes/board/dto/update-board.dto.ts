import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateBoardDto {
	@IsNotEmpty()
	@ApiProperty({
		description: '내용',
		required: true,
		example: '천재다',
	})
	content?: string;
}

// export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
// export class UpdateBoardDto extends PickType(CreateBoardDto, ['title']) {}
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ['title']) {}
