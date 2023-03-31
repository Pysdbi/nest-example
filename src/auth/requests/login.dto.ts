import { Validate } from '@validate';

export class LoginDto {
  @Validate.String({ required: true, description: 'Username' })
  username: string;

  @Validate.String({ required: true, description: 'New password' })
  password: string;
}
