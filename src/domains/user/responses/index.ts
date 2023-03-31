import { SerializeOptions } from '@nestjsx/crud';
import { GetUserResponseDto } from './get-user-response.dto';

export const serialize: SerializeOptions = {
  get: GetUserResponseDto,
};
