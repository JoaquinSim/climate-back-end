import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/user.service';
import { authProviders } from './providers/providers';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/login.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
  ],
  controllers:[UsersController, AuthController],
  providers:[...authProviders, UsersService, AuthService, JwtService],
  exports:[UsersService, AuthService, JwtService]
})
export class AuthModule {}
