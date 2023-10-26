import { findFirst, findIndex, head, lookup, last } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { option } from 'fp-ts';
export const getSuggest = (symbol) => (suggests) => pipe(suggests, findFirst(suggest => suggest.symbol === symbol));
export const nextSuggest = (selectedId) => (suggests) => pipe(selectedId, option.chain(selectedId => pipe(suggests, findIndex(item => item.symbol === selectedId))), option.map(i => i + 1), option.chain(i => lookup(i, suggests)), option.alt(() => head(suggests)));
export const prevSuggest = (selectedId) => (suggests) => pipe(selectedId, option.chain(selectedId => pipe(suggests, findIndex(item => item.symbol === selectedId))), option.map(i => i - 1), option.chain(i => lookup(i, suggests)), option.alt(() => last(suggests)));
