import { Exclude } from 'class-transformer';
import { Validate } from '../../../lib/validate';

export class GetCompanyResponseDto {
  @Validate.String()
  id: string;

  @Validate.String()
  name: string;

  @Validate.String()
  domain: string;

  @Validate.String()
  description: string;

  @Exclude()
  createdAt: any;

  @Exclude()
  updatedAt: any;
}
