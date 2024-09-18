import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) {}

  async getCompanyByEmail(email: string) {
    const company = await this.companyRepository.findOne({
      where: { company_email: email },
    });
    return company;
  }

  async getCompanyByname(name: string) {
    const company = await this.companyRepository.findOne({
      where: { name },
    });
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

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
