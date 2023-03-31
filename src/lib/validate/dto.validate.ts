import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  toDate,
  transformToArray,
  transformToBoolean,
  transformToNumber,
  transformToString,
} from '@helpers';
import { Options, RootOption, ValidationType } from './dto.validate.interface';

function defaultValidateDecorations(options: RootOption) {
  // Set CONST
  options.optional = !(options?.required ?? false);
  options.apiProperty.isArray = options?.isArray;
  options.apiProperty.description = options.description;
  options.apiPropertyType =
    options?.apiPropertyType ?? options.optional ? 'optional' : undefined;

  const decorates = [];

  const isOptional = options?.optional ?? true;
  const isArray = options?.isArray ?? false;

  // ======--- Options ---======
  if (!isOptional && typeof options?.required === 'function') {
    decorates.push(ValidateIf(options.required));
  } else if (isOptional) decorates.push(IsOptional());

  // ======--- Type ---======
  const IsTypes = {
    string: IsString,
    number: (options: ValidationOptions) => IsNumber(null, options),
    boolean: IsBoolean,
    date: IsDate,
    object: IsObject,
  };

  const isTypeFunc = IsTypes[options.type]({ each: isArray });
  if (options?.type) decorates.push(isTypeFunc);

  // ======--- Is Array ---======
  if (options?.isArray) decorates.push(IsArray());

  // ======--- Swagger ---======
  const SwaggerType = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    object: 'object',
  };
  const swaggerType = SwaggerType?.[options.type];
  const ApiPropertyType = {
    hide: ApiHideProperty,
    optional: ApiPropertyOptional,
  };
  const apiProperty =
    ApiPropertyType?.[options?.apiPropertyType] ?? ApiProperty;
  decorates.push(
    apiProperty({
      ...options.apiProperty,
      ...(swaggerType && { type: swaggerType }),
      ...(options?.objectType && {
        type: () => options.objectType,
      }),
    }),
  );

  // ======--- Other ---======
  decorates.push(...(options?.decorates ?? []));

  // ======--- Transform ---======
  const TransformFunc = {
    string: transformToString,
    number: transformToNumber,
    boolean: transformToBoolean,
    date: toDate,
    object: (args) => args,
  };
  const transformFunction = TransformFunc?.[options.type];
  if (options?.isArray) {
    decorates.push(
      Transform(
        transformToArray(
          options?.transform?.func ?? transformFunction,
          options?.transform?.separatorSplitArray,
        ),
      ),
    );
  } else if (transformFunction) {
    decorates.push(Transform(transformFunction));
  }
  return decorates;
}

// ________________________________________________________________
// =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
// =======---=======---======= Validate =======---=======---=======
export class Validate {
  private static getOptions<T extends ValidationType>(
    options: Options[T],
    type?: ValidationType,
    objectType?: any,
  ): RootOption {
    if (!options?.apiProperty) options.apiProperty = {} as ApiPropertyOptions;
    const opt = options as RootOption;
    opt.type = type;
    opt.objectType = objectType;

    return opt;
  }

  static String(options: Options['string']) {
    const opt = Validate.getOptions(options, 'string');
    const decorates = [...defaultValidateDecorations(opt)];

    // ======--- Options ---======
    if (options?.maxLength) decorates.push(MaxLength(options.maxLength));
    if (options?.minLength) decorates.push(MinLength(options.minLength));
    if (options?.notEmpty) decorates.push(IsNotEmpty());
    if (options?.isEmail) decorates.push(IsEmail());

    return applyDecorators(...decorates);
  }

  static Number(options: Options['number']) {
    const opt = Validate.getOptions(options, 'number');
    const decorates = [...defaultValidateDecorations(opt)];

    // ======--- Options ---======

    return applyDecorators(...decorates);
  }
  static Boolean(options: Options['boolean']) {
    const opt = Validate.getOptions(options, 'boolean');
    const decorates = [...defaultValidateDecorations(opt)];

    // ======--- Options ---======

    return applyDecorators(...decorates);
  }

  static Date(options: Options['date']) {
    const opt = Validate.getOptions(options, 'date');
    const decorates = [...defaultValidateDecorations(opt)];

    // ======--- Options ---======

    return applyDecorators(...decorates);
  }
  static Object(options: Options['object']) {
    const opt = Validate.getOptions(options, 'object', options?.type);
    const decorates = [...defaultValidateDecorations(opt)];

    // ======--- Options ---======
    decorates.push(ValidateNested());
    if (opt?.objectType) decorates.push(Type(() => opt.objectType));

    return applyDecorators(...decorates);
  }
}
