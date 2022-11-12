import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SkillService } from './city.service';
import { SkillCreateDto } from './dto/skillCreateDto';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  create(@Body() createCityDto: SkillCreateDto) {
    return this.skillService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillService.findOneById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillService.remove(+id);
  }
}
