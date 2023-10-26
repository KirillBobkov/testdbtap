import React, { forwardRef, memo, useContext } from 'react';
import { LineStyleSquareAnchorButtonStyled, LineStyleSquareAnchorContentStyled } from './LineStyleSquareAnchor.styled';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { DrawingsToolbarIconWrapperStyled } from '../../../../chart/components/drawings/drawing-settings-toolbar/drawings-settings-toolbar.styled';
export const LineStyleSquareAnchor = memo(forwardRef((props, forwardedRef) => {
    const { onClick, children, className } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    return (React.createElement(LineStyleSquareAnchorButtonStyled, { className: className, ref: forwardedRef, onClick: onClick },
        React.createElement(LineStyleSquareAnchorContentStyled, null,
            React.createElement(DrawingsToolbarIconWrapperStyled, null, iconsConfig.drawings.settingsToolbar.linepicker)),
        children));
}));
