import { Validate } from '@validate';

export class SignUpDto {
  @Validate.String({ required: true, description: 'Username' })
  username: string;

  @Validate.String({ required: true, description: 'E-mail', isEmail: true })
  email: string;

  @Validate.String({ required: true, description: 'New password' })
  password: string;
}
