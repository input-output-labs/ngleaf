import { Observable } from 'rxjs';

export function upsert<T extends { id?: string }>(item: T, list: T[] = []): T[] {
  const index = list.findIndex((listItem) => listItem.id === item.id);
  if (index < 0) {
    return [...list, item];
  } else {
    return [...list.slice(0, index), item, ...list.slice(index + 1)];
  }
}

export function asyncUpsert<T extends { id?: string }>(item: T, asyncItem: AsyncType<T[]>): AsyncType<T[]> {
  return {
    ...asyncItem,
    data: upsert<T>(item, asyncItem.data),
  };
}

export function asyncTypeSuccess<T>(asyncObject: AsyncType<T>, data?: T) {
  return {
      ...asyncObject,
      data,
      status: {
          pending: false,
          failure: false,
          success: true
      }
  };
}

export function asyncTypeFailure<T>(asyncObject: AsyncType<T>, error: any) {
  return {
      ...asyncObject,
      error,
      status: {
          pending: false,
          failure: true,
          success: false
      }
  };
}

export function asyncTypePending<T>(asyncObject: AsyncType<T>) {
  return {
      ...asyncObject,
      call: undefined,
      status: {
          pending: true,
          failure: false,
          success: false
      }
  };
}

export function createAsyncTypeFromCall<T>(call?: Observable<T>) {
  return {
      data: undefined,
      error: undefined,
      call,
      status: {
          pending: true,
          failure: undefined,
          success: undefined
      }
  };
}

export function createEmptyAsyncType(data?: any) {
  return {
      data,
      error: undefined,
      call: undefined,
      status: {
          pending: false,
          failure: undefined,
          success: undefined
      }
  };
}

export interface AsyncStatus {
  pending: boolean;
  failure: boolean;
  success: boolean;
}

export interface AsyncType<T> {
  data?: T;
  error?: any;
  call: Observable<T>;
  status: AsyncStatus;
}
