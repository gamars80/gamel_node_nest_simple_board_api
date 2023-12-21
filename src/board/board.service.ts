import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from 'src/entity/board.entity';

@Injectable()
export default class BoardService {
	constructor(
		@InjectRepository(Board)
		private boardRepository: Repository<Board>,
	) {}

	async findAll() {
		// return this.boardRepository.createQueryBuilder().andWhere().orderBy;
		return this.boardRepository.find();
	}

	async find(id: number) {
		// const index = this.getBoardId(id);
		// console.log('index:::' + index);
		const board = await this.boardRepository.findOne({
			where: {
				id,
			},
			order: {},
			relations: {
				user: true,
			},
		});

		if (!board) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return board;
	}

	async create(data: CreateBoardDto) {
		// const newBoard = { id: this.getNextId(), ...data };
		// this.boards.push(newBoard);
		// return newBoard;

		// const board = this.boardRepository.create(data);
		// board.content='수정';

		// create는 인스턴스까지만 생성 save가 실제 db에 생성
		return this.boardRepository.save(data);
	}

	async update(id: number, data: UpdateBoardDto) {
		//보드 조회
		const board = await this.getBoardById(id);

		if (!board) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.boardRepository.update(id, {
			...data,
		});
	}

	async delete(id: number) {
		//보드 조회
		const board = await this.getBoardById(id);

		if (!board) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.boardRepository.remove(board);
	}

	async getBoardById(id: number) {
		return this.boardRepository.findOneBy({
			id: id,
		});
	}
}
