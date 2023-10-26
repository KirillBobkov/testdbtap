import { pipe } from 'fp-ts/function';
import { of, take, tap } from 'rxjs';
/**
 * Executes a callback on subscription to this observable
 * Can be used in vm's effect to specify logic which should be executed on vm subscription
 * @param onSubscribe
 * @returns
 */
export const onSubscribe = (onSubscribe) => pipe(of([]), tap(() => onSubscribe()), take(1));
