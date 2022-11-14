import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '@root/entity/Skill';
import { DeleteResult, Repository } from 'typeorm';
import { SkillCreateDto } from './dto/skillCreateDto';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}
  async findAll(): Promise<Skill[]> {
    return await this.skillRepository.find();
  }
  async findByCondition(condition: any): Promise<Skill[]> {
    return await this.skillRepository.find(condition);
  }
  async findOneById(id: number): Promise<Skill> {
    return await this.skillRepository.findOneBy({ id });
  }
  async findOneByCondition(condition: any): Promise<Skill> {
    return await this.skillRepository.findOneBy(condition);
  }
  async remove(id: number): Promise<DeleteResult> {
    return await this.skillRepository.delete(id);
  }
  async create(data: SkillCreateDto): Promise<Skill> {
    return this.skillRepository.create(data);
  }
}
