import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as PgConnParser from 'pg-connection-string';
import { AppController } from './app.controller';
import { Company, CompanyModule } from './domains/company';
import * as fs from 'fs';

const databaseUrl: string = process.env.DB_URL;
const conn = PgConnParser.parse(databaseUrl);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: conn.host,
      port: Number(conn.port),
      database: conn.database,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      applicationName: 'nest-app',
      entities: [Company],
      synchronize: true,
      logging: true,
      ssl: {
        ca:
          process.env.CA_CERT ||
          fs.readFileSync('./ca-certificate.crt').toString(),
        // rejectUnauthorized: false,
        // ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString()
        // key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
        // cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
      },
    }),
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
