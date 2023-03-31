import { Module } from '@nestjs/common';
import { ConfigModule, TypeOrmConfigService } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/domains/user';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: TypeOrmConfigService,
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
