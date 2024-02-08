import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/auth/entities/user.entity';
import { ClimateEntity } from './modules/core/entities/climate.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'time',
      entities: [UserEntity, ClimateEntity],
      //dropSchema: true,
      synchronize: true,
    }),
    AuthModule,
    CoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
