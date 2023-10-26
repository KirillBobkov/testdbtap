import { memo } from 'react';
import { IndicatorListFilter } from '../indicator-list/indicator-list-filter.component';
import * as React from 'react';
export const StudiesSettingsContentHeader = memo(props => {
    const { localization, onCreateNewScript, filterString, handleTextFilterChange, dxScriptEnabled } = props;
    return (React.createElement(IndicatorListFilter, { handleTextFilterChange: handleTextFilterChange, value: filterString, localization: localization, onCreateNewScript: onCreateNewScript, dxScriptEnabled: dxScriptEnabled }));
});
