import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from '@root/entity/City';
import { DeleteResult, Repository } from 'typeorm';
import { CityCreateDto } from './dto/cityCreateDto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}
  async findAll(): Promise<City[]> {
    return await this.cityRepository.find();
  }
  async findByCondition(condition: any): Promise<City[]> {
    return await this.cityRepository.find(condition);
  }
  async findOneById(id: number): Promise<City> {
    return await this.cityRepository.findOneBy({ id });
  }
  async findOneByCondition(condition: any): Promise<City> {
    return await this.cityRepository.findOneBy(condition);
  }
  async remove(id: number): Promise<DeleteResult> {
    return await this.cityRepository.delete(id);
  }
  async create(data: CityCreateDto): Promise<City> {
    return this.cityRepository.create(data);
  }
}
