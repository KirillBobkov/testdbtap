import { context } from '../../context/context2';
import { createElement } from 'react';
import { useObservable } from '../../utils/use-observable';
import { distinctUntilChanged } from 'rxjs/operators';
import { DEFAULT_BOUNDS } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { SwitchAxisTypeButtonsContainer } from '../components/switch-axis-type-button-container/SwitchAxisTypeButtonContainer.component';
import { useDirectProperty } from '../../utils/use-property';
import { namedMemo } from '../../utils/named-memo';
import { observable } from 'fp-ts-rxjs';
import { pipe } from 'fp-ts/function';
export const SwitchAxisTypeContainer = context.combine(context.key()('chartConfiguratorViewModel'), context.key()('yAxisConfiguratorViewModel'), context.key()('multiChartViewModel'), context.key()('localization'), (vm, yAxisVM, multiChartVM, localization) => {
    const axisType$ = pipe(vm.state, observable.map(state => state.settings.chartCore.components.yAxis.type), distinctUntilChanged());
    return namedMemo('SwitchAxisTypeContainer', () => {
        const axisType = useObservable(axisType$, 'regular');
        const top = useObservable(vm.switchAxisButtonsTopMargin, 0);
        // it is needed to invoke renders
        useDirectProperty(multiChartVM.state, ['layout']);
        useDirectProperty(multiChartVM.state, ['maximizedChartId']);
        useObservable(vm.observeBounds$, DEFAULT_BOUNDS);
        return createElement(SwitchAxisTypeButtonsContainer, {
            onPercentButtonClick: yAxisVM.togglePercentAxis,
            isPercentButtonActive: axisType === 'percent',
            onLogButtonClick: yAxisVM.toggleLogAxis,
            isLogButtonActive: axisType === 'logarithmic',
            top,
            localization,
        });
    });
});
