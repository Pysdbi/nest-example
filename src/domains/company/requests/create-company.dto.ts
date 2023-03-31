import { Validate } from '@validate';

export class CreateCompanyDto {
  @Validate.String({ required: true, description: '' })
  name: string;

  @Validate.String({ required: true, maxLength: 3, description: '' })
  domain: string;

  @Validate.String({ required: true, description: '' })
  description: string;
}
