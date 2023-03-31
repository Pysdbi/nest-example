import { readFileSync } from 'fs';
import { join } from 'path';
import { IConfig } from './interfaces/config.interface';
import * as PgConnParser from 'pg-connection-string';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config = (): IConfig => {
  const conn = PgConnParser.parse(process.env.DATABASE_URL);

  return {
    id: process.env.APP_ID,
    port: parseInt(process.env.PORT, 10),
    jwt: {
      global: true,
      secret: process.env.JWT_CONFIRMATION_SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.JWT_ACCESS_TIME, 10),
      },
    },
    emailService: {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
    db: {
      type: 'postgres',
      host: conn.host,
      port: Number(conn.port),
      database: conn.database,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      applicationName: 'nest-app',
      entities: [join(__dirname, '/../../**/*.entity{.ts,.js}')],
      autoLoadEntities: true,
      synchronize: true,
      logging: process.env.DATABASE_LOG,
      ssl: {
        ca:
          process.env.CA_CERT ||
          readFileSync('./ca-certificate.crt').toString(),
        // rejectUnauthorized: false,
        // ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString()
        // key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
        // cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
      },
    } as TypeOrmModuleOptions,
  };
};
