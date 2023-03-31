import { Global, Module } from '@nestjs/common';
import { ConfigModule as GlobalConfigModule } from '@nestjs/config';
import { validationSchema } from './validation/config.schema';
import { TypeOrmConfigService } from './type-orm.config';
import { config } from './config';
import { JwtConfigService } from '@/config/jwt.config';

@Global()
@Module({
  imports: [
    GlobalConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [config],
    }),
  ],
  providers: [TypeOrmConfigService, JwtConfigService],
  exports: [TypeOrmConfigService, JwtConfigService],
})
export class ConfigModule {}
