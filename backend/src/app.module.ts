import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './modules/job/job.module';
import { CityModule } from './modules/city/city.module';
import { SkillModule } from './modules/skill/skill.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'MYSQL5045.site4now.net',
      port:  3306,
      username:'a90c6d_groupd',
      password: 'cdptw2groupD',
      database: 'db_a90c6d_groupd',
      entities: ['entity/*{.ts,.js}'],
      synchronize: process.env.ENV !== 'production',
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    JobModule,
    CityModule,
    SkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
