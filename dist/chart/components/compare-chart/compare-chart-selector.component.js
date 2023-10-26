import React, { memo, useCallback, useContext, useState } from 'react';
import { CompareChartContainerStyled, CompareChartNoDataContentStyled, CompareChartPopoverStyled, CompareChartSymbolSuggestStyled, } from './compare-chart-selector.styled';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { toInstrument } from '../../containers/instrument-selector/instrument-selector.model';
import { ChartToolbarButtonWithTooltip } from '../chart-toolbar/chart-toolbar-button-with-tooltip.component';
export const CompareChartSelector = memo(props => {
    const { isDisabled, data, addCompareInstrument, searchValue } = props;
    const anchorRef = React.useRef(null);
    const iconsConfig = useContext(IconsOverridingContext);
    const { keyboardModeEnabled, localization } = useContext(MultiChartComponentContext);
    const [isOpened, setOpened] = useState(false);
    const closePopover = useCallback(() => setOpened(false), []);
    const togglePopover = useCallback(() => setOpened(opened => !opened), []);
    const onChangeInstrument = useCallback((suggest) => {
        const instrument = toInstrument(suggest);
        addCompareInstrument(instrument);
        closePopover();
    }, [addCompareInstrument, closePopover]);
    return (React.createElement(React.Fragment, null,
        React.createElement(ChartToolbarButtonWithTooltip, { ariaLabel: localization.toolbar.a11y_buttons.a11y_compare_charts_popover, ariaExpanded: isOpened, ariaHaspopup: true, tabIndex: -1, disabled: isDisabled, icon: React.createElement(IconWrapper, null, iconsConfig.toolbar.compareChart), onClick: togglePopover, ref: anchorRef, hasMenu: true, isActive: isOpened, testId: TEST_IDS.button_compare, disableTooltip: isOpened, label: localization.toolbar.tooltip.compare_charts_popover }),
        React.createElement(CompareChartPopoverStyled, { opened: isOpened, anchorRef: anchorRef, onRequestClose: closePopover, keyboardMode: keyboardModeEnabled, align: "start", position: "bottom" },
            React.createElement(CompareChartContainerStyled, null,
                React.createElement(CompareChartSymbolSuggestStyled, { data: data, selectedInstrument: searchValue, initialFocus: true, clearAfterSelect: true, placeholder: localization.toolbar.compareChart.placeholder, testId: TEST_IDS.suggest_compare, ariaDescribedBy: 'compare-suggest-desc', searchInstruments: props.searchInstruments, onCloseRequest: closePopover, onEnter: onChangeInstrument }),
                searchValue === '' && React.createElement(CompareSuggestNoData, null)))));
});
const CompareSuggestNoData = () => {
    const { localization } = useContext(MultiChartComponentContext);
    return (React.createElement(CompareChartNoDataContentStyled, { id: "compare-suggest-desc" }, localization.toolbar.compareChart.suggestHint));
};
