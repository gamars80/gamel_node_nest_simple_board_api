import { UserModule } from './../routes/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { LocalStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
	imports: [
		UserModule,
		PassportModule,
		TypeOrmModule.forFeature([User]),
		JwtModule.register({
			secret: 'secret_key',
			signOptions: {
				expiresIn: '1h',
			},
		}),
	],
	providers: [AuthService, LocalStrategy],
	exports: [AuthService],
})
export class AuthModule {}
