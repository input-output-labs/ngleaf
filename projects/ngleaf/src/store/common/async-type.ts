export function upsert<T extends { id?: string }>(item: T, list: T[] = []): T[] {
  const index = list.findIndex((listItem) => listItem.id === item.id);
  if (index < 0) {
    return [...list, item];
  } else {
    return [...list.slice(0, index), item, ...list.slice(index + 1)];
  }
}

export function remove<T extends { id?: string }>(itemId: string, list: T[] = []): T[] {
  const index = list.findIndex((listItem) => listItem.id === itemId);
  if (index >= 0) {
    return [...list.slice(0, index), ...list.slice(index + 1)];
  }
  return list;
}

export function asyncUpsert<T extends { id?: string }>(item: T, asyncItem: AsyncType<T[]>): AsyncType<T[]> {
  return {
    ...asyncItem,
    data: upsert<T>(item, asyncItem.data),
  };
}

export function asyncRemove<T extends { id?: string }>(itemId: string, asyncItem: AsyncType<T[]>): AsyncType<T[]> {
  return {
    ...asyncItem,
    data: remove<T>(itemId, asyncItem.data),
  };
}

export function asyncInjectInList<T extends { id?: string }, V>(asyncItem: AsyncType<T[]>, itemId: string, key: string, data: V): AsyncType<T[]> {
  return {
    ...asyncItem,
    data: injectInList<T, V>(asyncItem.data || [], itemId, key, data),
  };
}

export function injectInList<T extends { id?: string }, V>(list: T[] = [], itemId: string, key: string, data: V): T[] {
  const index = list.findIndex((listItem) => listItem.id === itemId);
  if (index >= 0) {
    return [...list.slice(0, index), {
      ...list[index],
      [key]: data,
    }, ...list.slice(index + 1)];
  }
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
      status: {
          pending: true,
          failure: false,
          success: false
      }
  };
}

export function createAsyncTypeFromCall<T>() {
  return {
      data: undefined,
      error: undefined,
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
  status: AsyncStatus;
}
