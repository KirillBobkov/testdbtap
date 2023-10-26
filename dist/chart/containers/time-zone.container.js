import { context } from '../../context/context2';
import { createElement } from 'react';
import { TimeZoneDropdown } from '../components/time-zone/time-zone-dropdown.component';
import { EXCHANGE } from '../view-models/time-zone.view-model';
import { useObservable } from '../../utils/use-observable';
import { namedMemo } from '../../utils/named-memo';
import { useProperty } from '../../utils/react.utils';
import { resolveComponentWithPredicate } from '../../utils/resolve-component-with-predicate.utils';
export const TimeZoneContainer = context.combine(context.key()('timeZoneViewModel'), context.key()('chartReactConfig'), (timeZoneViewModel, chartReactConfig) => resolveComponentWithPredicate(chartReactConfig.timezoneControls.enabled, namedMemo('TimeZoneContainer', () => {
    const value = useObservable(timeZoneViewModel.currentTimezone, EXCHANGE);
    const timeZones = useObservable(timeZoneViewModel.timeZones, []);
    const currentExchange = useProperty(timeZoneViewModel.currentExchange);
    return createElement(TimeZoneDropdown, {
        value,
        currentExchange,
        timeZones,
        onSelect: timeZoneViewModel.setTimezone,
        onSearchTimezone: timeZoneViewModel.onSearchTimezone,
    });
})));
