import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { serialize } from './responses';
import { dto } from './requests';
import { UserService } from './user.service';
import { User } from './user.entity';

@Crud({
  model: {
    type: User,
  },
  dto,
  routes: {
    only: ['deleteOneBase', 'getOneBase', 'updateOneBase', 'getManyBase'],
  },
  serialize,
  query: {
    softDelete: true,
  },
})
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(public service: UserService) {}
}
