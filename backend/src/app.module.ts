import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './modules/job/job.module';
import { CityModule } from './modules/city/city.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.PORT || 3306),
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'cdptw1_groupd',
      entities: ['entity/*{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    JobModule,
    CityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
