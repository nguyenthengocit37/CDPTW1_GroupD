import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './modules/post/post.module';
import { JobModule } from './modules/job/job.module';

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
      synchronize: process.env.NODE_ENV !== 'production',
      autoLoadEntities: true,
    }),
    PostModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
