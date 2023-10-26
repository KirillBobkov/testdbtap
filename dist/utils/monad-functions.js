import { sequenceT } from 'fp-ts/Apply';
import { Apply } from 'fp-ts/Option';
import { observable, observableOption } from 'fp-ts-rxjs';
import { of } from 'rxjs';
import { identity, pipe } from 'fp-ts/function';
export const sequenceTOption = sequenceT(Apply);
export const filterOption = () => observableOption.getOrElse(() => of());
export const filterMapOption = (source) => pipe(source, observable.filterMap(identity));
