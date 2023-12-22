import { Module } from '@nestjs/common';
import BoardService from './board.service';
import { BoardController } from './board.controller';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([Board, User])],
	controllers: [BoardController],
	providers: [BoardService],
})
export class BoardModule {}
