import { Validate } from '../../../lib/validate';

export class CreateCompanyDto {
  @Validate.String({ required: true })
  name: string;

  @Validate.String({ required: true, maxLength: 3 })
  domain: string;

  @Validate.String({ required: true })
  description: string;
}
