import React, { useMemo, useContext } from 'react';
import { DrawingPopupFooter } from './drawing-popup-footer.component';
import { DrawingPopupStyled } from './drawing-popup.styled';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
export const DrawingPopup = (props) => {
    const { requestClose, requestRestoreDefaults, isOpened, title, isModal, children, className } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const footer = useMemo(() => (React.createElement(DrawingPopupFooter, { requestRestoreDefaults: requestRestoreDefaults, onCloseRequest: requestClose, drawingsDict: localization.drawings })), [requestRestoreDefaults, requestClose, localization.drawings]);
    return (React.createElement(DrawingPopupStyled, { isModal: isModal, header: title, footer: footer, isOpened: isOpened, draggable: true, onRequestClose: requestClose, className: className, closeBtnAriaLabel: localization.components.popup.closeBtn, shouldCloseOnClickAway: true }, children));
};
