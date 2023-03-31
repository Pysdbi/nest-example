import { Validate } from '@validate';

export class CreateUserDto {
  @Validate.String({ required: true, description: 'Username' })
  username: string;

  @Validate.String({ isEmail: true, required: true, description: 'E-mail' })
  email: string;

  @Validate.String({ required: true, description: 'New password' })
  password: string;
}
