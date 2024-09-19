import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyOwnersGuard } from '@guards/company-owner.guard';
import { DeleteCompanyDocs, FindAllCompaniesDocs, FindCompanyByIdDocs, UpdateCompanyDocs } from './docs/company.docs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @FindAllCompaniesDocs()
  @Get()
  async findAll() {
    return await this.companiesService.findAll();
  }

  @FindCompanyByIdDocs()
  @Get(':id')
  async findCompanyById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.companiesService.findCompanyById(id);
  }

  @UpdateCompanyDocs()
  @UseGuards(CompanyOwnersGuard)
  @Patch(':id')
  updateCompany(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.updateCompany(id, updateCompanyDto);
  }

  @DeleteCompanyDocs()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
