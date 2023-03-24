import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { TransformFunction } from '../helpers';

export type ValidationType =
  | 'number'
  | 'string'
  | 'boolean'
  | 'date'
  | 'object';

export type RootOption = {
  type?: ValidationType;
  objectType?: any;
  apiProperty?: ApiPropertyOptions;
  required?: boolean; // default=false
  optional?: boolean; // default=true --> Use require: true
  isArray?: boolean;
  description?: string;
  apiPropertyType?: 'hide' | 'optional';

  transform?: {
    func?: TransformFunction;
    separatorSplitArray?: string; // default=','. Указание разделителя для массивов.
  };
  decorates?: Function[];
};

export type ValidateOptions = Omit<RootOption, 'type' | 'objectType'>;

export type Options = {
  string: ValidateOptions & {
    maxLength?: number;
    minLength?: number;
    notEmpty?: boolean;
    isEmail?: boolean;
  };
  number: ValidateOptions;
  boolean: ValidateOptions;
  date: ValidateOptions;
  object: ValidateOptions & { type: any };
};
