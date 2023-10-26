import React, { useContext } from 'react';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { TimeZoneSearchIconWrapperStyled, TimeZoneSearchInputStyled } from './time-zone-dropdown.styled';
export const TimeZoneInputSearch = props => {
    const { value, onValueChange } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    return (React.createElement(TimeZoneSearchInputStyled, { type: 'text', value: value, testId: TEST_IDS.time_zone_search, autofocus: true, onValueChange: onValueChange, placeholder: localization.timeZone.input_placeholder },
        React.createElement(TimeZoneSearchIconWrapperStyled, null, iconsConfig.timezones.searchInput)));
};
