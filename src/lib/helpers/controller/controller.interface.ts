import { ApiResponseOptions } from '@nestjs/swagger';

export type ControllerType = 'get' | 'post' | 'patch' | 'put' | 'delete';

export type Constructable<T = any> = new (...args: any[]) => T;

export type RootOption = {
  /**
   * @description Путь ручки
   */
  path?: string;

  /**
   * @description Тип ручки
   * @type {ControllerType}
   */
  type?: ControllerType;

  /**
   * @description Тип выходных данных ручки
   */
  responseType?: any;

  /**
   * @description Тип входных данных в теле запроса
   */
  payloadType?: any;

  /**
   * @description Указание входных данных как массив
   */
  payloadIsArray?: boolean;

  /**
   * @description Использовать валидацию
   * @default false
   */
  validate?: boolean;

  /**
   * @description Класс валидации
   */
  validation?: Constructable;

  /**
   * @description Ответ Swagger
   * @type {ApiResponseOptions}
   */
  apiResponse?: ApiResponseOptions;

  /**
   * @description Ответ является массивом
   */
  isArray?: boolean;

  /**
   * @description Описание ручки
   */
  description: string;

  /**
   * @description Дополнительные декораторы ручки
   * @type {Function[]}
   */
  decorates?: Function[];
};

export type DefaultEndpointOptions = Omit<RootOption, 'type'>;

export type WithoutPayloadEndpointOptions = Omit<
  DefaultEndpointOptions,
  'payloadType' | 'payloadIsArray'
>;

export type Options = {
  get: WithoutPayloadEndpointOptions;
  post: DefaultEndpointOptions;
  patch: DefaultEndpointOptions;
  put: DefaultEndpointOptions;
  delete: WithoutPayloadEndpointOptions;
};
