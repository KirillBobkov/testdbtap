import * as React from 'react';
import { memo } from 'react';
import { DemoCardContainerStyled, DemoBodyStyled, DemoHeaderStyled, DemoTitleStyled } from './DemoCard.styled';
export const DemoCard = memo(props => {
    const { children, title, style } = props;
    return (React.createElement(DemoCardContainerStyled, { style: style },
        title && (React.createElement(DemoHeaderStyled, null,
            React.createElement(DemoTitleStyled, null, title))),
        React.createElement(DemoBodyStyled, null, children)));
});
