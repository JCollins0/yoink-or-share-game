import { cloneDeep } from 'lodash-es';
import { UnaryFunction, Observable, pipe, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
export const deepClone = cloneDeep;

export function filterNullish<T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
  return pipe(filter((x: T) => x !== null && x !== undefined) as OperatorFunction<T | null | undefined, T>);
}
