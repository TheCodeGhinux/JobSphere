import { string } from 'joi';
import { User, UserType } from '@user/entities/user.entity';

export const mockUser: User = {
  id: 'user1',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  password: 'hashedpassword',
  phone_number: '1234567890',
  is_active: true,
  user_type: UserType.USER,
  status: 'active',
  created_at: new Date(),
  updated_at: new Date(),
  hashPassword: () => null,
  // hashPassword: string
};
