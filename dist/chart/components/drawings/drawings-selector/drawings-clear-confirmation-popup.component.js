import React, { memo, useCallback } from 'react';
import { DrawingClearConfirmationActionStyled, DrawingClearConfirmationFooterStyled, } from './drawing-clear-confirmation-popup.styled';
import { Button } from '../../../../chart-kit/Button/Button.component';
import { DrawingsClearConfirmationPopupStyled } from './drawings-clear-confirmation-popup.styled';
export const DrawingsClearConfirmationPopup = memo((props) => {
    const { isOpened, onCancel, onClear, drawingsDict } = props;
    const renderClearConfirmationFooter = useCallback(() => (React.createElement(DrawingClearConfirmationFooterStyled, null,
        React.createElement(DrawingClearConfirmationActionStyled, null,
            React.createElement(Button, { onClick: onCancel }, drawingsDict.confirmationPopup.cancel)),
        React.createElement(DrawingClearConfirmationActionStyled, null,
            React.createElement(Button, { isPrimary: true, onClick: onClear }, drawingsDict.confirmationPopup.confirm)))), [onClear, onCancel, drawingsDict]);
    return (React.createElement(DrawingsClearConfirmationPopupStyled, { onRequestClose: onCancel, header: drawingsDict.confirmationPopup.title, footer: renderClearConfirmationFooter(), isOpened: isOpened, isModal: true, shouldCloseOnClickAway: true },
        React.createElement("span", null, drawingsDict.confirmationPopup.confirmationMessage)));
});
