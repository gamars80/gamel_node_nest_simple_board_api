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

# 전체 회원 리스트 가져오기, 회원 가입, 로그인
    nest cli로 user 모듈 생성 nest g mo user > app.module.ts imports에 추가됨
    nest cli로 user 콘트롤러와 서비스 추가 nest g co use , nest g s user
    서브 쿼리 원할시 쿼리 빌더 이용해보기
        const qb = this.userRepository.createQueryBuilder();
		qb.addSelect((subQuery) => {
			return subQuery
				.select('count(id)')
				.from(Board, 'Board')
				.where('Board.userId = User.id');
		}, 'User_boardCount'); // User_원하는명 User 엔티티라는 식으로 네이밍 필요 

		return qb.getMany();

        User 엔티티에 서브 쿼리의 alias 컬럼  boardCount 추가 해당 컬럼은 해당엔티티 자체에서 셀렉트 되면 안되고 널러블이고 인서트아니고 업데이트시 아니고
        @Column({ select: false, nullable: true, insert: false, update: false })
	    boardCount?: number;
    회원가입시 비번 암호화 인한 패키지 설치  yarn add bcrypt
    jwt 토큰 생성해하여 로그인 성공시 acceess toekn 내려주기 : 추가 패키지 설치 yarn add jsonwebtoken
    passport 라이브러리 사용한 로그인 리팩토링 : 추가 패키지 설치 yarn add @nestjs/passport passport passport-local
        passport-local이 좀 오래된 라이브러리 추가 타입 설피 yarn add -D @types/passport-local
        컨트롤러가 수행되기 전에 인증 절차를 거치도록 하는 auth 모들과 서비스 생성 : nest g mo auth, nest g s auth
        passport는 전략파일을 생성해야 한다
        컨트롤러에 해당 데코레이터 선언 @UseGuards(AuthGuard('local'))
        passport에서 사용할 jwt 패키지 설치 : yarn add @nestjs/jwt passport-jwt , yarn add -D @types/passport-jwt

    localhost:3000/login 이 호출되면 app.controller 의 login 함수가 호출 > 컨트롤러에 선언된 @UseGuards 인해 LocalStrategy 가 호출 > LocalStrategy 클래스내의 validate 
    
    
    함수가 호출되서 userService에서 username 과 패스워드로 회원을 찾아 존재하고 비번이 일치시 유저 정보를 반환하여 Request오브젝트에 담겨 authService의 login 함수가 호출 
    > authService에서 jwt sign을 통해 어세스 토큰을 내려준다

    JwtStrategy를 생성하여 @UseGuards(JwtAuthGuard) 를 통해 me라는 api가 호출시 이번에는 Jwt 전략을 타서 헤더에서 토큰을 가져오도록 한다

    유저엔티티를 가져올 경우 password는 가져오기 않게 하기 위한 객체 직렬화
        ClassSerializerInterceptor : API 응답을 보내기 전에 응답객체의 엔티티, DTO에 class transformer 데코레이터를 맞게 응답객체를 변형하는 인터셉터
        유저엔티티의 password에 @Exclude() 선언 컨트롤러에 @UseInterceptors(ClassSerializerInterceptor) 선언

# 게시판에 회원정보 적용하기
    게시글에 대한 생성 수정 삭제시 로그인 되어 있는지 체크 할 수 있도록
    UserInfo 라는 커스텀 데코레이터를 생성한다 : 역할은 로그인 성공시 리퀘스트에 담긴 유저정보 존재 유무를 확인하기 위한
    그리하여 로그인이 필요한 컨트롤러 메소드 변수로 받는다 @UserInfo() userInfo 로 받아서 로그인한 user의 고유 아이디를 가져다 사용할 수 있다
    게시글 삭제 수정에도 UserInfo 적용하고 그를 위용해 소유자 체크

# pm2를 이용한 노드 프로세스 관리
    1.yarn build 하면 .dist라는 경로에 빌드가 되고 해당 경로의 main.js 파일을 실행하면 프로젝트가 실행된다
    2.package.json 의 스크립트로 각 env 환경에 맞게 프로젝트 실행가능
        crossenv 패키지 추가 yarn add cross-env
        "start:prod": "cross-env NODE_ENV=production node dist/main.js",
    pm2 설치 : yarn global add pm2
    package.json 수정 "start:prod": "cross-env NODE_ENV=production pm2 start dist/main.js",
    pm2 log : 서버 실행시 로그 확인
    pm2 ls: 실행되고 있는 서버의 상태 확인
    pm2 monit: 실시간으로 pm2의 상황을 보고 싶을시
    pm2 restart: 인스턴스 환경에서 최신 소스를 깃 풀하고 빌드 하고 서버를 재시작 할시
    pm2 stop 이름 또는 아이디 : 중지
    pm2 delete 이름 또는 아이디: 삭제

# 유닛 테스트와 e2e 테스트 적용해보기
    바라보는 관점의 차이임
        유닛테스트 : 각 영역에서 동작하는 기능에 대해 사용자의 관점에 대해 비즈니스로직을 테스트 하는 목적이므로 좀더 상세
        e2e 테스트 : 각각의 테스트가 모인 형태를 전체적으로 테스트 하기 때문에 전체 시나리오 테스트하는 것 같은 설계로 진행 그만큼 시간이 많이 소요
    package.json 수정
        "moduleNameMapper": {
            "src/(.*)" : "<rootDir>/src/$1"
        } //추가

        "roots": ["src"], <-- 이렇게 수정

    


    





