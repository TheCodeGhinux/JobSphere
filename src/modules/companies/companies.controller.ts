import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyOwnersGuard } from '@guards/company-owner.guard';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async findAll() {
    return await this.companiesService.findAll();
  }

  @Get(':id')
  async findCompanyById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.companiesService.findCompanyById(id);
  }

  @UseGuards(CompanyOwnersGuard)
  @Patch(':id')
  updateCompany(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.updateCompany(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
