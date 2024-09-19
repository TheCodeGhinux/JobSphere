import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '@user/entities/user.entity';
import { Company } from '@companies/entities/company.entity';

@Injectable()
export class SeedingService {
  constructor(private readonly dataSource: DataSource) {}

  async seedDatabase() {
    const userRepository = this.dataSource.getRepository(User);
    const companyRepository = this.dataSource.getRepository(Company);
    try {
      const existingUsers = await userRepository.count();
      if (existingUsers > 0) {
        Logger.log('Database is already populated. Skipping seeding.');
        return;
      }

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const u1 = userRepository.create({
          first_name: 'John',
          last_name: 'Smith',
          email: 'john.smith@example.com',
          password: 'Password@123',
          cv_link: 'https://example.com/cv1.pdf',
          location: 'New York',
        });
        const u2 = userRepository.create({
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@example.com',
          password: 'Password@123',
          cv_link: 'https://example.com/cv2.pdf',
          location: 'Los Angeles',
        });
        const cp1 = companyRepository.create({
          name: 'Company 1',
          company_email: 'company@example.com',
          password: 'Password@123',
        });

        await userRepository.save([u1, u2]);
        await companyRepository.save(cp1);

        const savedUsers = await userRepository.find();
        const savedCompanies = await companyRepository.find();
        if (savedUsers.length !== 2) {
          throw new Error('Failed to create all users');
        }

        if (savedCompanies.length !== 1) {
          throw new Error('Failed to create all companies');
        }

        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('Seeding failed:', error.message);
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      console.error('Error while checking for existing data:', error.message);
    }
  }
  async getUsers(): Promise<User[]> {
    try {
      return this.dataSource.getRepository(User).find();
    } catch (error) {
      console.log('Error fetching users:', error);
      throw new BadRequestException('Error fetching users');
    }
  }
}
