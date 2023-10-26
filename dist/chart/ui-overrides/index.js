import React from 'react';
import { valueByPath } from '../../utils/get-value-by-path.util';
import { ChartReactAPIPropsContext } from '../components/multi-chart/chart-react-api.context';
export function useUIOverride(path) {
    const uiOverride = React.useContext(UIOverridesContext);
    //@ts-ignore
    return valueByPath(uiOverride, path) ?? undefined;
}
export function useUIOverrideComponent(path) {
    const uiOverride = React.useContext(UIOverridesContext);
    const chartReactAPIProps = React.useContext(ChartReactAPIPropsContext);
    //@ts-ignore
    const component = valueByPath(uiOverride, path) ?? undefined;
    return component ? React.createElement(component, chartReactAPIProps) : undefined;
}
export const UIOverridesContext = React.createContext({});
