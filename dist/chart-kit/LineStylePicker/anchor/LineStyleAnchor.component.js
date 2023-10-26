import React, { forwardRef, memo, useContext } from 'react';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { LineStyleAnchorButtonStyled, LineStyleAnchorContentStyled, LineStyleAnchorSelectedLineStyled, LineStyleAnchorLineSampleWrapperStyled, LineStyleAnchorLineSampleStyled, LineStyleAnchorIconStyled, } from './LineStyleAnchor.styled';
import { IconWrapper } from '../../IconWrapper/IconWrapper.component';
export const LineStyleAnchor = memo(forwardRef((props, forwardedRef) => {
    const { onClick, children, className, lineDash, lineWidth } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const lineStyle = `${lineDash}-${lineWidth}`;
    return (React.createElement(LineStyleAnchorButtonStyled, { className: className, ref: forwardedRef, onClick: onClick },
        React.createElement(LineStyleAnchorContentStyled, null,
            React.createElement(LineStyleAnchorSelectedLineStyled, null,
                React.createElement(LineStyleAnchorLineSampleWrapperStyled, { lineStyle: lineStyle },
                    React.createElement(LineStyleAnchorLineSampleStyled, null))),
            React.createElement(LineStyleAnchorIconStyled, null,
                React.createElement(IconWrapper, { width: 12, height: 12 }, iconsConfig.lineStylePicker.arrow))),
        children));
}));
LineStyleAnchor.displayName = 'LineStyleAnchor';
