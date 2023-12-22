import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({ description: '유저 아이디', example: 'admin' })
	@Column({ unique: true })
	username: string;

	@ApiProperty({ description: '유저 비밀번호', example: '1234' })
	@Column()
	password: string;

	@ApiProperty({ description: '유저 이름', example: '가가멜' })
	@Column()
	name: string;

	@ApiProperty({ description: '작성한 게시글들' })
	@OneToMany(() => Board, (board) => board.user)
	boards: Board[];

	@Column({ select: false, nullable: true, insert: false, update: false })
	boardCount?: number;
}
