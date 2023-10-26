import React, { memo, useMemo } from 'react';
import { ProgressBarLoaderStyled, ProgressBarLoaderContainerStyled, ProgressBarLoaderThumbStyled, } from './ProgressBarLoader.styled';
const getCurrentShift = (loadingState) => {
    let currentPercent = 0;
    const loadingStateKeys = Object.keys(loadingState);
    const oneElWeight = 100 / loadingStateKeys.length;
    loadingStateKeys.forEach(key => {
        const status = loadingState[key];
        switch (status) {
            case 'done':
                currentPercent += oneElWeight;
                break;
            case 'initial':
                currentPercent += oneElWeight / 3;
                break;
            case 'started':
                currentPercent += oneElWeight / 2;
                break;
        }
    });
    return currentPercent;
};
export const ProgressBarLoader = memo(props => {
    const { loadingState } = props;
    const width = useMemo(() => getCurrentShift(loadingState), [loadingState]);
    return (React.createElement(ProgressBarLoaderStyled, null,
        React.createElement(ProgressBarLoaderContainerStyled, null,
            React.createElement(ProgressBarLoaderThumbStyled, { width: width }))));
});
