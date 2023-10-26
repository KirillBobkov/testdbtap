import React, { useMemo } from 'react';
import { context } from '../../../context/context2';
import { MultiChartContainer } from '../multi-chart.container';
import { useProperty } from '../../../utils/use-property';
import { useObservable } from '../../../utils/use-observable';
import { createMockLayoutData } from '../../model/layout.model';
import { namedMemo } from '../../../utils/named-memo';
/**
 * Shows loading screen before data is loaded.
 * Waits until all required data is loaded.
 */
export const LayoutLoaderContainer = context.combine(context.defer(MultiChartContainer, 'layoutLoaded', 'userDataLoaded', 'initialized', 'dxScriptLoaded', 'dxScriptKeywords'), context.key()('initialLoaderVM'), context.key()('chartConfig'), context.key()('chartReactConfig'), context.key()('initialUserData'), context.key()('initialChartReactSettings'), (MultiChartContainerDefer, initialLoaderVM, chartConfig, chartReactConfig, initialUserData, initialChartReactSettings) => namedMemo('LayoutLoaderContainer', () => {
    const layoutLoaded = useObservable(initialLoaderVM.layoutLoaded, null);
    const userDataLoaded = useObservable(initialLoaderVM.userDataLoaded, null);
    const dxScriptLoaded = useObservable(initialLoaderVM.dxScriptLoaded, null);
    const dxScriptKeywordsLoaded = useObservable(initialLoaderVM.dxScriptKeywordsLoaded, null);
    // why not only useProperty(initialLoaderVM.isLoaded)  ?
    // seems like there is bug in rx: in the container it's possible to get following state:
    // isLoaded = true, dxScriptKeywordsLoaded = null;
    // I've tried to use in the vm combineLatest with dxScriptKeywordsLoaded, layoutLoaded, ... - it didn't help
    const isLoaded = useProperty(initialLoaderVM.isLoaded) &&
        layoutLoaded !== null &&
        userDataLoaded !== null &&
        dxScriptLoaded !== null &&
        dxScriptKeywordsLoaded !== null;
    // for initial loading show empty instrument field
    const mockLayoutData = useMemo(() => createMockLayoutData(chartConfig, chartReactConfig, initialChartReactSettings, undefined), []);
    const MultiChartContainer = useMemo(() => {
        if (isLoaded) {
            // show initialized chart if everything is already loaded
            return MultiChartContainerDefer({
                layoutLoaded,
                userDataLoaded,
                dxScriptLoaded,
                dxScriptKeywords: dxScriptKeywordsLoaded,
                initialized: true,
            }).value();
        }
        // show empty chart if some parts are not loaded yet
        return MultiChartContainerDefer({
            layoutLoaded: mockLayoutData,
            userDataLoaded: initialUserData,
            dxScriptLoaded: [],
            initialized: false,
            dxScriptKeywords: [],
        }).value();
        // update container only when it's fully loaded
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // we haven't added layoutLoaded, userDataLoaded etc. state in the deps directly to prevent
        // a lot of rerendering of the App
        // because we only should rerender the app, when all the data is loaded
    }, [isLoaded]);
    return React.createElement(MultiChartContainer, null);
}));
