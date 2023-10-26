import { context } from '../../context/context2';
import { createElement, useCallback, useMemo } from 'react';
import { MaximizeChartButton } from '../components/multichart-maximize-button/multichart-maximize-button.component';
import { none, some } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { option } from 'fp-ts';
import { useDirectProperty } from '../../utils/use-property';
import { namedMemo } from '../../utils/named-memo';
// We can't inline projection function, because of React hooks limitations
const project = (vm, chartId, localization) => namedMemo('MaximizeChartButtonContainer', () => {
    const maximizedChartId = useDirectProperty(vm.state, ['maximizedChartId']);
    const onClick = useCallback(() => vm.maximizeChart(pipe(maximizedChartId, option.fold(() => some(chartId), () => none))), [maximizedChartId]);
    const isMaximized = option.isSome(maximizedChartId);
    const layout = useDirectProperty(vm.state, ['layout']);
    const isMaximizeAvailable = useMemo(() => layout !== '1x1', [layout]);
    return isMaximizeAvailable
        ? createElement(MaximizeChartButton, { onClick, isMaximized, localization: localization.toolbar })
        : null;
});
export const MaximizeChartButtonContainer = context.combine(context.key()('multiChartViewModel'), context.key()('chartId'), context.key()('localization'), project);
