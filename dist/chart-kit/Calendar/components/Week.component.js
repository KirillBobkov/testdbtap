import React, { memo } from 'react';
import { Day } from './Day.component';
import { RowStyled } from './Week.styled';
export const Week = memo(props => {
    const { _key } = props;
    return (React.createElement(RowStyled, { key: _key }, Array.from(new Array(7).keys()).map(i => (React.createElement(Day, { key: i, i: i, ...props })))));
});
