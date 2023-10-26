import React, { memo, useContext } from 'react';
import { PopupHeaderStyled } from '../../../../chart-kit/Popup/PopupUI.styled';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { ChartSettingsPopupStyled, ChartSettingsPopupHeaderTitleStyled } from './chart-settings-mobile-popup.styled';
export const ChartSettingsPopup = memo((props) => {
    const { children, isOpened, onRequestClose } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const header = (React.createElement(PopupHeaderStyled, null,
        React.createElement(ChartSettingsPopupHeaderTitleStyled, { id: "dialog_header" }, localization.settingsPopup.chartSettings)));
    return (React.createElement(ChartSettingsPopupStyled, { header: header, draggable: false, isOpened: isOpened, onRequestClose: onRequestClose }, children));
});
