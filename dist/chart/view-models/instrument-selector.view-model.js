import { option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { from, merge, of } from 'rxjs';
import { debounceTime, share, switchMap } from 'rxjs/operators';
import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { createPropertyAdapter } from '../../utils/property.utils';
export const createInstrumentSelectorViewModel = context.combine(context.key()('localInstrumentStore'), context.key()('symbolSuggestProvider'), context.key()('chartId'), (localInstrumentStore, symbolSuggestProvider, chartId) => {
    const [searchInstruments, searchValue] = createPropertyAdapter('');
    const suggest$ = pipe(searchValue, debounceTime(300), switchMap(symbolSuggestProvider.searchInstruments), share());
    const onChangeInstrument = (instrument) => {
        symbolSuggestProvider.onInstrumentChanged(instrument.symbol, chartId);
    };
    const getInstrument = (instrument) => pipe(from([localInstrumentStore.getInstrumentBySymbol(instrument)]), switchMap(i => {
        if (i === undefined) {
            return from(symbolSuggestProvider
                .findInstrument(instrument)
                .then(i => {
                localInstrumentStore.updateInstruments([i]);
                return option.some(i);
            })
                .catch(err => option.none));
        }
        else {
            return of(option.some(i));
        }
    }));
    return newSink(callTracerProxy('instrumentSelectorViewModel', {
        getInstrument,
        onChangeInstrument,
        data$: suggest$,
        searchValue,
        searchInstruments,
    }), merge());
});
