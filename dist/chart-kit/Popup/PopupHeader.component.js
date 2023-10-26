import React, { useContext } from 'react';
import { IconsOverridingContext } from '../../utils/icons-overriding-context';
import { IconWrapper } from '../IconWrapper/IconWrapper.component';
import { PopupHeaderContainerStyled, PopupHeaderCloseBtnStyled, PopupHeaderHeading } from './PopupHeader.styled';
export const PopupHeader = props => {
    const { children, isClosable, onRequestClose, className, closeBtnAriaLabel } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    if (isClosable || children) {
        return (React.createElement(PopupHeaderContainerStyled, { className: className },
            React.Children.map(children, child => {
                if (typeof child === 'string' || typeof child === 'number') {
                    return React.createElement(PopupHeaderHeading, {
                        id: 'dialog_header',
                        children: child,
                    });
                }
                return child;
            }),
            isClosable && (React.createElement(PopupHeaderCloseBtnStyled, { "aria-label": closeBtnAriaLabel, icon: React.createElement(IconWrapper, null, iconsConfig.popup.header.bigcross), onClick: onRequestClose, isFlat: true }))));
    }
    return null;
};
