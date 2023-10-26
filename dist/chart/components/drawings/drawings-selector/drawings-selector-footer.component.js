import React, { memo } from 'react';
import { DrawingSelectorFooterStyled, DrawingSelectorFooterButtonStyled, DrawingSelectorFooterButtonContainerStyled, } from './drawings-selector-footer.styled';
export const DrawingSelectorFooter = memo(({ isVisibilityButtonEnabled, visibilityButtonText, onVisibilityButtonClick, isClearButtonEnabled, clearButtonText, onClearButtonClick, localization, }) => (React.createElement(DrawingSelectorFooterStyled, null,
    React.createElement(DrawingSelectorFooterButtonContainerStyled, { "aria-label": localization.a11y_buttons.a11y_hide_drawings, tabIndex: 0 },
        React.createElement(DrawingSelectorFooterButtonStyled, { disabled: !isVisibilityButtonEnabled, onClick: onVisibilityButtonClick }, visibilityButtonText)),
    React.createElement(DrawingSelectorFooterButtonContainerStyled, { tabIndex: 0 },
        React.createElement(DrawingSelectorFooterButtonStyled, { "aria-label": localization.a11y_buttons.a11y_clear_drawings, disabled: !isClearButtonEnabled, onClick: onClearButtonClick }, clearButtonText)))));
