import React, { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { IconsOverridingContext } from '../../utils/icons-overriding-context';
import { AccordionContainerStyled, AccordionWrapperContainerStyled, ArrowStyled } from './Accordion.styled';
const AccordionArrow = memo(props => {
    const { isCollapsed, clickHandler } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    return (React.createElement(ArrowStyled, { width: 16, height: 16, isCollapsed: isCollapsed, onClick: clickHandler }, iconsConfig.accordion.arrowDown));
});
/*
* Accordion collapse toggle is handled by arrow only to avoid double click flash behaviour using with EditableText
* */
export const Accordion = memo(props => {
    const { children, wrapper, skipAnimation, className, isSelected, isHidden, isFocused } = props;
    const [isCollapsed, setCollapsed] = useState(false);
    const wrapperClickHandler = useCallback(() => setCollapsed(isCollapsed => !isCollapsed), []);
    const childrenListRef = useRef(null);
    const [renderChildren, ref] = useTransition(!isCollapsed, {
        config: {
            duration: 300,
        },
        from: { maxHeight: '0px' },
        leave: { maxHeight: '0px' },
    }, []);
    useEffect(() => {
        ref.start({
            maxHeight: (isCollapsed ? 0 : childrenListRef.current?.clientHeight) + 'px',
        });
    }, [ref, isCollapsed]);
    return (React.createElement(AccordionContainerStyled, { skipAnimation: true, tabIndex: 0, className: className, isSelected: isSelected, isHidden: isHidden, isFocused: isFocused },
        React.createElement(AccordionWrapperContainerStyled, null,
            React.createElement(AccordionArrow, { clickHandler: wrapperClickHandler, isCollapsed: isCollapsed }),
            wrapper),
        skipAnimation ? (isCollapsed ? null : (React.createElement("div", { ref: childrenListRef }, children))) : (renderChildren((styles, show) => show && (React.createElement(animated.div, { style: { ...styles, overflow: 'hidden' } },
            React.createElement("div", { ref: childrenListRef }, children)))))));
});
