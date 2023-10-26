import React, { memo } from 'react';
import { ChartLoadingStyled } from './loading.styled';
export const ChartLoading = memo(props => {
    const { loadingState, hidden } = props;
    return (React.createElement(ChartLoadingStyled, { hidden: hidden ?? false },
        React.createElement("div", null, Object.keys(loadingState).map(type => {
            const state = loadingState[type];
            const stateValue = state === 'initial' ? null : state === 'started' ? '...' : ' done';
            return (React.createElement("p", { key: type },
                "Loading ",
                type,
                stateValue));
        }))));
});
