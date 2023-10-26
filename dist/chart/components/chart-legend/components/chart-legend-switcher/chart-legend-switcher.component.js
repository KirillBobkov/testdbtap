import React, { useCallback, useContext, useRef, useState } from 'react';
import { IconWrapper } from '../../../../../chart-kit/IconWrapper/IconWrapper.component';
import { Scrollable } from '../../../../../chart-kit/Scrollable/Scrollable';
import { IconsOverridingContext } from '../../../../../utils/icons-overriding-context';
import { usePreventOutsideScrolling } from '../../../../../utils/use-prevent-outside-scrolling';
import { ChartLegendInstrumentStyled, ChartLegendPeriodStyled, ChartLegendScrollIconStyled, ChartLegendSwitcherButtonStyled, ChartLegendSwitcherDropdownContainerStyled, ChartLegendSwitcherDropdownStyled, ChartLegendSwitcherIconStyled, ChartLegendSwitcherStyled, ChartLegendTimeStyled, ChartSwitcherContent, } from './chart-legend-switcher.styled';
import { useChangeStatusWithDelay } from './useChangeStatusWithDelay';
export const ChartLegendSwitcher = React.memo(props => {
    const { children, Header = null, id, duration = 300, isOpened, x = 0, y = 0, timeRef, setFitsContentRef, setHeightRef, ariaLabel, isEmpty, instrument, period, switcherRef, onContextMenu, onOpenedChange, } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const scrollableRef = useRef(null);
    const { isOpening, openToggle } = useChangeStatusWithDelay(duration, isOpened, onOpenedChange);
    const [bottomReached, setBottomReached] = useState(false);
    const [legendFitsContainer, setLegendFitsContainer] = useState(true);
    const [height, setHeight] = useState(0);
    // hard to control properties which depends on height because of SC CSS classes
    setFitsContentRef.current = setLegendFitsContainer;
    setHeightRef.current = setHeight;
    const middleDot = String.fromCharCode(183);
    const mainInstrumentSymbolString = instrument ? `${instrument} ${middleDot}` : '';
    const periodString = period ? `${middleDot} ${period}` : '';
    const handleLegendSwitcherClick = useCallback(() => !isEmpty && openToggle(), [isEmpty, openToggle]);
    const handleScroll = useCallback((left, top) => {
        if (scrollableRef.current) {
            setBottomReached(scrollableRef.current.clientHeight + top >= scrollableRef.current.scrollHeight);
        }
    }, []);
    const onClickScrollIconHandler = useCallback(() => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollBy({
                top: scrollableRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, []);
    if (legendFitsContainer && bottomReached === true) {
        setBottomReached(false);
    }
    usePreventOutsideScrolling(scrollableRef);
    const legendContentId = 'legend_content' + id;
    return (React.createElement(ChartLegendSwitcherStyled, { isOpened: isOpening, ref: switcherRef, x: x, y: y },
        Header,
        React.createElement(ChartSwitcherContent, { onContextMenu: onContextMenu },
            React.createElement(ChartLegendSwitcherButtonStyled, { isDisabled: isEmpty, "aria-label": ariaLabel, "aria-expanded": isOpening, "aria-controls": legendContentId, onClick: handleLegendSwitcherClick, isOpened: isOpening, duration: duration },
                instrument && (React.createElement(ChartLegendInstrumentStyled, null, mainInstrumentSymbolString)),
                React.createElement(ChartLegendTimeStyled, { ref: timeRef }),
                period && React.createElement(ChartLegendPeriodStyled, null, periodString),
                !isEmpty && (React.createElement(ChartLegendSwitcherIconStyled, { isOpened: isOpening, duration: duration },
                    React.createElement(IconWrapper, { width: 12, height: 12 }, iconsConfig.legend.arrow)))),
            React.createElement(ChartLegendSwitcherDropdownStyled, { isOpened: isOpening, duration: duration, height: height },
                React.createElement(Scrollable, { mode: "wheeling", onScroll: handleScroll, containerRef: scrollableRef },
                    React.createElement(ChartLegendSwitcherDropdownContainerStyled, { id: legendContentId }, children))),
            isOpening && !legendFitsContainer && !bottomReached && (React.createElement(ChartLegendScrollIconStyled, { onClick: onClickScrollIconHandler }, iconsConfig.legend.arrow)))));
});
