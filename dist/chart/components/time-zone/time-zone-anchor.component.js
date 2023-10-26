import React from 'react';
import { useContext } from 'react';
import { TimeZoneTimer } from './time-zone-timer.component';
import { TimeZoneAnchorButtonStyled } from './time-zone-anchor.styled';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { namedMemoRef } from '../../../utils/named-memo';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
export const TimeZoneAnchor = namedMemoRef('TimeZoneAnchor', ({ children, onClick, onKeyDown, value, isOpened }, ref) => {
    const { localization } = useContext(MultiChartComponentContext);
    return (React.createElement(TimeZoneAnchorButtonStyled, { "aria-label": localization.timeZone.a11y_timezoneMenu, "aria-expanded": isOpened, "aria-haspopup": true, testId: TEST_IDS.time_zone_component, onKeyDown: onKeyDown, onClick: onClick, ref: ref },
        React.createElement(TimeZoneTimer, { value: value }),
        children));
});
