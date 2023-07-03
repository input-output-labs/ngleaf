import { Observable } from 'rxjs';

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

export function createEmptyAsyncType() {
  return {
      data: undefined,
      error: undefined,
      call: undefined,
      status: {
          pending: undefined,
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
