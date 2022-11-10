import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { City } from '@root/entity/City';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
