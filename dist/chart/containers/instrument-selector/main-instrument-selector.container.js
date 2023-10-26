import { observableOption } from 'fp-ts-rxjs';
import { some } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import React, { useCallback, useContext, useState } from 'react';
import { of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { context } from '../../../context/context2';
import { namedMemo } from '../../../utils/named-memo';
import { convertToProperty } from '../../../utils/property.utils';
import { useProperty } from '../../../utils/react.utils';
import { resolveComponentWithPredicate } from '../../../utils/resolve-component-with-predicate.utils';
import { useObservable } from '../../../utils/use-observable';
import { MultiChartComponentContext } from '../../components/multi-chart/multi-chart-context';
import { toInstrument, toSuggest } from './instrument-selector.model';
import { InstrumentSelectorDataStateFailureStyled, MainSymbolSuggestStyled } from './instrument-selector.styled';
import { useUIOverride } from '../../ui-overrides';
export const InstrumentSuggestComponent = context.combine(context.key()('instrumentSelectorViewModel'), context.key()('chartDataViewModel'), context.key()('chartReactConfig'), (vm, chartDataViewModel, chartReactConfig) => {
    const InstrumentSuggestComponent = props => {
        const { instrument, onInstrumentChanged } = props;
        const { localization } = useContext(MultiChartComponentContext);
        const [opened, setOpened] = useState(false);
        const handleClosePopup = useCallback(() => setOpened(false), []);
        const handleOpenPopup = useCallback(() => setOpened(true), []);
        const onChangeInstrument = useCallback((suggest) => {
            chartDataViewModel.changeInstrument(some(suggest.symbol));
            onInstrumentChanged(toInstrument(suggest));
            handleClosePopup();
        }, [handleClosePopup, onInstrumentChanged]);
        // IMPORTANT useObservable should always use original object without any transformations
        // otherwise it will lead to infinity loop
        const instruments = useObservable(vm.data$, []);
        const data = instruments.map(toSuggest);
        return (React.createElement(MainSymbolSuggestStyled, { data: data, selectedInstrument: instrument, placeholder: localization.toolbar.instrumentSelector.placeholder, disabled: !chartReactConfig.instrumentSuggest.enabled, opened: opened, onFocus: handleOpenPopup, initialFocus: false, searchInstruments: vm.searchInstruments, onCloseRequest: handleClosePopup, onBlur: handleClosePopup, onEnter: onChangeInstrument, DataStateNoData: InstrumentSelectorDataStateFailureStyled, testId: TEST_IDS.suggest_main }));
    };
    return InstrumentSuggestComponent;
});
export const MainInstrumentSelectorContainer = context.combine(context.key()('chartDataViewModel'), context.key()('instrumentSelectorViewModel'), context.key()('chartReactConfig'), InstrumentSuggestComponent, (chartDataViewModel, vm, chartReactConfig, InstrumentSuggestComponent) => {
    const instrumentNameProperty = convertToProperty(pipe(chartDataViewModel.selectedInstrument, observableOption.getOrElse(() => of('')), distinctUntilChanged()), '');
    return resolveComponentWithPredicate(chartReactConfig.instrumentSuggest.visible, namedMemo('InstrumentSelectorContainer', () => {
        const onInstrumentChanged = useCallback((instrument) => {
            vm.onChangeInstrument(instrument);
        }, []);
        // we use property here since when we change toolbar happens re-render and all components are re-created
        // TODO maybe we can make toolbar not to re-create on multichart change
        const instrument = useProperty(instrumentNameProperty);
        const InstrumentSuggest = useUIOverride(['InstrumentSuggest']) ?? InstrumentSuggestComponent;
        return React.createElement(InstrumentSuggest, { onInstrumentChanged: onInstrumentChanged, instrument: instrument });
    }));
});
export default MainInstrumentSelectorContainer;
