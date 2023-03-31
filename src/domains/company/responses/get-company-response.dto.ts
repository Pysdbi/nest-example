import { Exclude } from 'class-transformer';
import { Validate } from '@validate';

export class GetCompanyResponseDto {
  @Validate.String({ description: '' })
  id: string;

  @Validate.String({ description: '' })
  name: string;

  @Validate.String({ description: '' })
  domain: string;

  @Validate.String({ description: '' })
  description: string;

  @Exclude()
  createdAt: any;

  @Exclude()
  updatedAt: any;
}
