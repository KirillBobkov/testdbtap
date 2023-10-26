import * as React from 'react';
import { IconWrapperStyled } from './IconWrapper.styled';
export const IconWrapper = React.memo(({ className, children, width = 20, height = 20, testId, ...props }) => {
    return (React.createElement(IconWrapperStyled, { ...props, ...(testId ? { 'data-test-id': testId } : {}), width: width, height: height, className: className }, children));
});
