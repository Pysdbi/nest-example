import {
  applyDecorators,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { ControllerType, EndpointMessages, Options, RootOption } from './index';

function defaultControllerDecorations(options: RootOption) {
  if (!options?.apiResponse) options.apiResponse = {} as ApiResponseOptions;
  // Set CONST
  options.apiResponse.description = options.description;

  const decorates = [];

  // ======--- Type ---======
  const TypeController: Record<ControllerType, Function> = {
    get: Get,
    post: Post,
    patch: Patch,
    put: Put,
    delete: Delete,
  };
  decorates.push(TypeController[options.type].call(null, options?.path));

  // ======--- Validation ---======
  if (options?.validate) {
    decorates.push(
      !options?.validation
        ? UsePipes(new ValidationPipe({ transform: true }))
        : UsePipes(new options.validation()),
    );
  } else if (options?.validation)
    decorates.push(UsePipes(new options.validation()));

  // ======--- Swagger ---======
  if (options?.payloadType)
    decorates.push(
      ApiBody({
        type: options.payloadType,
        ...(options?.payloadIsArray && { isArray: true }),
      }),
    );

  decorates.push(
    ApiResponse({
      ...options.apiResponse,
      ...(options?.responseType && {
        type: options.responseType,
      }),
      ...(options?.isArray && {
        isArray: options.isArray,
      }),
    }),
  );

  // ======--- Other ---======
  decorates.push(...(options?.decorates ?? []));

  return decorates;
}

// __________________________________________________________________
// =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--
// =======---=======---======= Controller =======---=======---=======
export class Endpoint {
  static Messages = EndpointMessages;

  private static getOptions<T extends ControllerType>(
    options: Options[T],
  ): RootOption {
    if (!options?.apiResponse) options.apiResponse = {} as ApiResponseOptions;
    return options as RootOption;
  }

  static Get(options: Options['get']) {
    const opt = Endpoint.getOptions(options);
    opt.type = 'get';
    opt.apiResponse.status = 200;

    const decorates = [...defaultControllerDecorations(opt)];

    // ======--- Options ---======

    return applyDecorators(...decorates);
  }

  static Post(options: Options['post']) {
    const opt = Endpoint.getOptions(options);
    opt.type = 'post';
    opt.apiResponse.status = 200;

    const decorates = [...defaultControllerDecorations(opt)];

    // ======--- Options ---======

    return applyDecorators(...decorates);
  }

  static Patch(options: Options['patch']) {
    const opt = Endpoint.getOptions(options);
    opt.type = 'patch';
    opt.apiResponse.status = 204;

    const decorates = [...defaultControllerDecorations(opt)];

    // ======--- Options ---======

    return applyDecorators(...decorates);
  }

  static Put(options: Options['put']) {
    const opt = Endpoint.getOptions(options);
    opt.type = 'put';
    opt.apiResponse.status = 204;

    const decorates = [...defaultControllerDecorations(opt)];

    // ======--- Options ---======

    return applyDecorators(...decorates);
  }

  static Delete(options: Options['delete']) {
    const opt = Endpoint.getOptions(options);
    opt.type = 'delete';
    opt.apiResponse.status = 204;

    const decorates = [...defaultControllerDecorations(opt)];

    // ======--- Options ---======

    return applyDecorators(...decorates);
  }
}
