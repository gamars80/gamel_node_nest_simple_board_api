import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { Repository } from 'typeorm';
import { Board } from 'src/entity/board.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BoardService', () => {
	let boardService: BoardService;
	let boardRepository: Repository<Board>;

	const boardRepositoryToken = getRepositoryToken(Board);

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BoardService,
				{
					provide: boardRepositoryToken,
					useValue: {
						create: jest.fn(),
						save: jest.fn(),
						findOne: jest.fn(),
						findOneBy: jest.fn(),
					},
				},
			],
		}).compile();

		boardService = module.get<BoardService>(BoardService);
		boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
	});

	it('boardService should be defined', () => {
		expect(boardService).toBeDefined();
	});

	it('boardRepository should be defined', () => {
		expect(boardService).toBeDefined();
	});

	describe('게시글 조회', () => {
		it('6번 게시글의 작성자는 gagamel82 다', async () => {
			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue({
				id: 1,
				userId: 6,
				content: 'sksksksksk',
				user: {
					id: 6,
					username: 'gagamel82',
					name: 'gagamel82',
				},
			} as Board);
			const board = await boardService.getBoardById(6);
			// console.log(board);
			expect(board.user.name).toBe('gagamel82');
		});
	});
});
