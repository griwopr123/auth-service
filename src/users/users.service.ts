import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

interface CreateUserParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
   
  async createUser(params: CreateUserParams): Promise<User> {
    const user = this.userRepository.create({
      email: params.email,
      password: params.password,
      firstName: params.firstName,
      lastName: params.lastName,
    });

    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  async updateUser(id: string, params: Partial<CreateUserParams>): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, params);
    return this.userRepository.save(user);
  }

  async recordLogin(id: string, at: Date = new Date()): Promise<void> {
    await this.userRepository.update(id, { lastLogin: at });
  }
}