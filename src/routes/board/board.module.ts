import { Module } from '@nestjs/common';

import { BoardController } from './board.controller';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './board.service';

@Module({
	imports: [TypeOrmModule.forFeature([Board, User])],
	controllers: [BoardController],
	providers: [BoardService],
})
export class BoardModule {}
