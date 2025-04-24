import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { BlacklistedToken } from '../entities/blacklisted-token.entity';

@Injectable()
export class TokenBlacklistService {
  constructor(
    @InjectRepository(BlacklistedToken)
    private readonly repo: Repository<BlacklistedToken>,
  ) {}

  async add(token: string, expiresAt: Date): Promise<void> {
    await this.repo.save(this.repo.create({ token, expiresAt }));
  }

  async isBlacklisted(token: string): Promise<boolean> {
    await this.cleanup();
    return (await this.repo.count({ where: { token } })) > 0;
  }
  private async cleanup() {
    await this.repo.delete({ expiresAt: LessThan(new Date()) });
  }
}
