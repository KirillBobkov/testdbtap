import React from 'react';
import { DrawingPopupActionsStyled, DrawingPopupAdditionalActionsStyled } from './drawing-popup.styled';
import { Button } from '../../../../chart-kit/Button/Button.component';
export const DrawingPopupFooter = (props) => {
    const { onCloseRequest, requestRestoreDefaults, drawingsDict } = props;
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingPopupAdditionalActionsStyled, null,
            React.createElement(Button, { onClick: requestRestoreDefaults, isFlatPrimary: true }, drawingsDict.popup.actions.restore)),
        React.createElement(DrawingPopupActionsStyled, null,
            React.createElement(Button, { isPrimary: true, onClick: onCloseRequest }, drawingsDict.popup.actions.closeBtn))));
};
