import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { serialize } from './responses';
import { dto } from './requests';

@Crud({
  model: {
    type: Company,
  },
  dto,
  serialize,
  query: {
    softDelete: true,
  },
})
@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(public service: CompanyService) {}
}
