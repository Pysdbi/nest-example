import { TransformFnParams } from 'class-transformer';

export type TransformFunction = (params: Partial<TransformFnParams>) => any;

export function toLowerCase(value: string): string {
  return value.toLowerCase();
}

export function toUpperCase({ value }: TransformFnParams): string {
  return value.toUpperCase();
}

export function trim(value: string): string {
  return value.trim();
}

export function toDate({ value }: TransformFnParams): Date {
  return value ? new Date(value) : null;
}

export function transformToBoolean({ value }: TransformFnParams): boolean {
  return value == 'true' || value == '1';
}

export function transformToNumber(params: TransformFnParams): number {
  return Number(params.value);
}

export function transformToString(params: TransformFnParams): string {
  return String(params.value);
}

export const transformToArray =
  (transform: TransformFunction = transformToString, separator = ',') =>
  (params: TransformFnParams) => {
    console.log(
      String(params.value)
        .split(separator)
        .map((x) => transform({ value: x })),
    );
    return String(params.value)
      .split(separator)
      .map((x) => transform({ value: x }));
  };
