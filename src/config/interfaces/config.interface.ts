import { IEmailConfig } from './email-config.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';

export interface IConfig {
  id: string;
  port: number;
  db: TypeOrmModuleOptions;
  jwt: JwtModuleOptions;
  emailService: IEmailConfig;
}
