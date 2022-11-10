import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { CityCreateDto } from './dto/cityCreateDto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  create(@Body() createCityDto: CityCreateDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOneById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id);
  }
}
