import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CustomHttpException } from '@/helpers/custom-http-filter';
import * as SYS_MSG from '@/constant/SystemMessages';

@Injectable()
export class CompaniesService {
  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) {}

  findById(id: string) {
    return this.companyRepository.findOne({
      where: { id },
    });
  }
  async getCompanyByEmail(email: string) {
    const company = await this.companyRepository.findOne({
      where: { company_email: email },
    });
    if (!company) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND('Company'), 404);
    }
    return company;
  }

  async getCompanyByname(name: string) {
    const company = await this.companyRepository.findOne({
      where: { name },
    });
    if (!company) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND('Company'), 404);
    }
    return company;
  }

  async createCompany(createComapnyPayload: CreateCompanyDto): Promise<any> {
    const newCompany = new Company();
    Object.assign(newCompany, createComapnyPayload);
    return await this.companyRepository.save(newCompany);
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: string) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
