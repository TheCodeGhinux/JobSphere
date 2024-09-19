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

  async findAll() {
    const companies = await this.companyRepository.find();
    return { message: 'Companies found successfully', data: companies };
  }

  async findCompanyById(id: string) {
    const company = await this.companyRepository.findOne({
      where: { id },
    });
    if (!company) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND('Company'), 404);
    }
    return { message: 'Company found successfully', data: company };
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.findOne({
      where: { id },
    });

    if (!company) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND('Company'), 404);
    }

    const updateCompany = await this.companyRepository.update(id, updateCompanyDto);
    if (!updateCompany) {
      throw new CustomHttpException(SYS_MSG.FAILED_TO_UPDATE_COMPANY, 400);
    }
    const updatedCompany = await this.companyRepository.findOne({
      where: { id },
    });

    return { message: 'Company updated successfully', data: updatedCompany };
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
