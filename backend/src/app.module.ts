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
      host: process.env.DB_HOST || 'MYSQL5045.site4now.net',
      port: Number(process.env.PORT || 3306),
      username: process.env.DB_USER || 'a90c6d_groupd',
      password: process.env.DB_PASSWORD || 'cdptw2groupD',
      database: process.env.DB_NAME || 'db_a90c6d_groupd',
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
