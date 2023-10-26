import { useContext } from 'react';
import { CHART_REACT_WRAPPER_ID } from '../../chart/chart-react-app.styled';
import { ChartReactAppContext } from '../../chart/defaults';
/**
 * @doc-tags utility,hooks
 * @return a selected container element for popup and popover
 */
export const useAppendTo = (appendTo) => {
    const { rootElement = document.getElementById(CHART_REACT_WRAPPER_ID), showPopupsOutside } = useContext(ChartReactAppContext);
    return showPopupsOutside ? document.body : appendTo ?? rootElement ?? document.body;
};
