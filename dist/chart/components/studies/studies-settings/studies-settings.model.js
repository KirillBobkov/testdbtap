import { findFirst } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
// This is done intentionally for easier possible future separation between logic and presentation
// All the components view layer stuff must use imports from this file and not from the domain model file
export * from '../../../model/studies.model';
export const getStudyById = (studies, id) => pipe(studies, findFirst(x => x.id === id));
export const getStudyByUUID = (studies, uuid) => pipe(studies, findFirst(x => x.uuid === uuid));
