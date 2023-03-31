import { Validate } from '@validate';

export class GetUserResponseDto {
  @Validate.String({ description: 'id' })
  id: number;

  @Validate.String({ description: 'Username' })
  username: string;

  @Validate.String({ description: 'E-mail' })
  email: string;

  @Validate.Boolean({ description: 'Is active' })
  isActive: boolean;

  @Validate.Date({ description: 'Created at' })
  createdAt: Date;

  @Validate.Date({ description: 'Updated at' })
  updatedAt: Date;
}
