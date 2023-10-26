import * as React from 'react';
import { memo } from 'react';
import { IndicatorTitleStyled, IndicatorHeaderStyled, IndicatorContentStyled, IndicatorContainerStyled, IndicatorFooterStyled, } from './indicator-list-section.styled';
export const IndicatorListSection = memo(({ children, title, actionButton, header, footer, ariaLabel, headingId, ...props }) => {
    const arialLabelledByFinal = ariaLabel === undefined ? headingId : undefined;
    return (React.createElement(IndicatorContainerStyled, { ...props, role: "group", "aria-label": ariaLabel, "aria-labelledby": arialLabelledByFinal },
        React.createElement(IndicatorHeaderStyled, null,
            title && React.createElement(IndicatorTitleStyled, { id: headingId }, title),
            header,
            actionButton),
        React.createElement(IndicatorContentStyled, null, children),
        footer && React.createElement(IndicatorFooterStyled, null, footer)));
});
