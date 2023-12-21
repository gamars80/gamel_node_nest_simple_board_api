# Awesome Project Build with Sequelize

Steps to run this project:

1. Run `yarn start:dev` command


# 플러그인 설치
    Auto Import, Code Spell Checker, ESLint, Path Intellisense

# nest cli 실습
    nest cli 통해 게시판에 필요한 컨트롤러 생성 : nest g co board
            app.module.ts에 controllers 에 BoardController가 자동 추가됨

# code convention
    Nest 에서는 대부분 케밥케이스사용
    파일시스템에서 대소문자 구분 회피
    URL에서 안전하게 사용할 수 있음 ex) user-profile.controller.ts

# 게시글 가져오기/생성/업데이트/삭제
    라우터 만들기
    board-controller에 라우터들 만들어 보기
    보드 컨트롤러를 모듈로 사용하기 위해 nest-cli 통해 모듈 생성해보기 : nest g mo board
    보드 서비스 nest-cli 통해 생성: nest g s board
    postman도 좋지만 플러그인 설치해 보기 Rest Client
    우선 DB 없이 service에 목업데이터 생성
    게시글 전체 가져오기, 하나만 가져오기, 작성하기, 삭제하기 서비스 비즈니스 로직 구현

# Swagger 간단하게 셋팅해보고 ui 접근해보기
    패키지 설치 yarn add @nestjs/swagger
    main.ts에 config 셋팅
    boardcontroller에 ApiTag 데코레이터 설정 

# 게시글 생성에 필요한 DTO 
    create-board.dto.ts, update-board.dto.ts
    추가 패키지 설치 yarn add class-validator class-transformer
    Pipes 란? 파이브는 클라이언트 사이드에서 요청이 라우터 핸들러로 도달하기까지 그 전단계에서 실행되는 로직 클라이언트사이드 -> 필터 -> 파이프
    파이프 역활 
        유효성 검사
        데이터 변환 : ex)헤더에서 토큰 정보 받아서 유저정보조 회하는 로직등
    여러 파이프 중에 ValidatePipe: DTO에 명시된 형식 체크하는 파이 이용해보기
    @ApiProperty 통해 dto에 swagger 보강

# 커스터 데코레이터 만들어보기
    Ip 알아보는 매개변수용 데코레이터 만들어서 사용해보기

# Exception Filters
    라우트 핸들러까지 파이프나 라우터 핸들러에서 동작을 수행하다가 예외가 발생시 혜당 예외를 처리하는 코드로 라우팅 해주는 필터
    익셉션 필터 직접 작성해보기 (전역 또는 특정 클래스만에도 가능)
    src/exception/http.exception.ts 파일 작성 @Catch(HttpException) 데코레이터 이용하여 익셉션 발생히 해당 필터를 타서 status code 랑 , 시간, 패스 등을 json으로 내려주도록 커스터마이징
    main.ts에 글로벌로 app.useGlobalFilters(new HttpExceptionFilter()); 선언

# Logger 모듈을 이용한 
    nestjs 기본적으로 로그 모듈을 내장하고 있다, 단 DI의 개념이 아니기 때문에 클래스에서 직접 인스턴스를 생성해서 사용해야 한다.
    private readonly logger = new Logger();
    기본적으로 api 요청과 응답에 대한 로그를 출력하지 않는다.에러발생시 에러에 대한 로그만 출력
            출력하기 위해서는 미들웨어를 통해서 api 작업을 마쳤을때 로그를 남기도록 작업해줘야 한다.
            src/middleware/logging.middleware.ts 에 api 호출이 끝났을시 url, status code, 응답시간등을 logger로 남긴다
            해당 미들웨어를 사용하기 위해 app.module.ts에 추가 consumer.apply(LoggingMiddleware).forRoutes('*');

# 컨피그 모듈 적용해 환경설정하기
    필요 패키지 설치 yarn add @nestjs/config 설치
    src/config 에 필요한 파일 작성 후 app.module.ts imports에 추가
    사용법: console.log(this.configService.get<string>('ENVIRONMENT'))

# TypeORM 이란
    특징
        Active Record 지원 , Data Mapper 지원 (자바로 치면 JPA 방식과 querydsl 방식)
        타입스크립트 지원
        다양한 데이터베이스 지원
        마이그레이션 지원
        데이터베이스 연관관계 지원
# Postgresql 설치
    db 매니저 툴인 DBeaver 설치 https://dbeaver.io/

# TypeORM 
    패키지 설치 yarn add @nestjs/typeorm typeorm pg
    app.moudle.ts에 imports 추가
        TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'gamel',
			password: 'rlgudska1!',
			entities: [__dirname + '/**/*.entity.{.ts,.js}'],
			synchronize: false, //엔티티가 변할때 실제 db에 반영하겠냐 여부 프로덕트 환경은 위험
		})
    board 랑 user typeorm 엔티티 작성
    엔티티에 스웨커 프로퍼티 적용 @ApiProperty({ description: '유저 이름', example: '홍길동' })

# TypeORM 관계 설정
    유저 엔티티와 보드 엔티티 관계 설정

# TypeORM Migrations를 이용해 Postgresql 테이블 생성해보기
    필요 패키지 설치 yarn add ts-node tsconfig-paths
    db접속 정보들도 환경변수로 빼기 위해 패키지 추가 설치 yarn add dotenv
    package.json에 script 추가
        "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --dataSource ./src/database/data-source.ts",
        "migration:create": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:create ./src/database/migrations/Migration",
        "migration:generate": "yarn typeorm migration:generate ./src/database/migrations/Migration",
        "migration:run": "yarn typeorm  migration:run",
        "migration:revert": "yarn typeorm migration:revert"

# TypeORM Seeding을 통한 초기데이터 생성
    개발 단계에서 초기데이터가 필요한 경우 좀 많을 경우 유효하게 사용될 수 있음
    추가 패키지 설치 yarn add typeorm-extension
    src/database/seeder/user.seeder.ts 생성하여 User 시더 생성
    시더 실행용 스크립트 package.json에 추가
        "seed": "ts-node -r tsconfig-paths/register ./node_modules/typeorm-extension/dist/cli/index.js seed",
    
# TypeORM 이용하여 게시글 가져오기 리팩토링
    기존에 만들어 놓은 페이크데이터를 데이터 베이스에서 가져오도록
    board.module.ts 에 imports: [TypeOrmModule.forFeature([Board, User])],
    board.service.ts에 레포지토리 선언 
        constructor(@InjectRepository(Board) private boardRepository: Repository<Board>,) {}
    find() , findOne() 메소드 이용해봄

# TypeORM 이용해 게시글 작성하기 리팩토링
    기존에 만든 게시글 생성을 레포지토리 이용하여 db에 저장하기

# TypeORM 이용해 게시글 수정하기 리팩토링
    기존에 만든 게시글 수정을 레포지토리 이용하여 db값 수정해보기

# TypeORM 이용해 게시글 삭제하기 리팩토링
    기존에 만든 게시글 삭제 레포지토리 이용하여 db값 수정해보기


