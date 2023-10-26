import { either } from 'fp-ts';
import { ValuesOfObject } from '../../../utils/object.utils';
export interface ValidationError {
    readonly reason: string;
}
export declare const validationError: (reason: string) => ValidationError;
export declare const validateEmptyString: (errorMessage?: string) => (s: string) => either.Either<ValidationError, string>;
export declare const validateExistenceInArray: (errorMessage: string) => <T>(items: T[]) => (cmp: (it: T) => boolean) => either.Either<ValidationError, T>;
export declare const validateNoDuplicatesInArray: (errorMessage: string) => <T>(items: T[], cmp: (it: T) => boolean) => <V extends T extends Record<string, any> ? ValuesOfObject<T> : T>(value: V) => either.Either<ValidationError, V>;
