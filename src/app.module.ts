import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company, CompanyModule } from './domains/company';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      username: 'root',
      password: 'root',
      database: 'main-db',
      applicationName: 'nest-app',
      entities: [Company],
      synchronize: true,
      logging: true,
    }),
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
