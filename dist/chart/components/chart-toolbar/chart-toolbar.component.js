import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
import { animationFrameThrottled, cancelThrottledAnimationFrame, } from '@devexperts/dxcharts-lite/dist/chart/utils/performance/request-animation-frame-throttle.utils';
import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState, } from 'react';
import { createPortal } from 'react-dom';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { useA11yListboxArrowsFocusController } from '../../../chart-kit/accessibility/use-a11y-listbox-arrows-focus-controller';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { ChartToolbarLoadingIndicatorStyled, ChartToolbarPopupsButtonsArrowStyled, ChartToolbarPopupsButtonsStyled, ChartToolbarPopupsButtonsTrackStyled, ChartToolbarPopupsButtonsWrapperStyled, ChartToolbarStyled, InstrumentSelectorContainerWrapperStyled, } from './chart-toolbar.styled';
const initialAdaptiveState = {
    isLeftArrowShown: false,
    isRightArrowShown: false,
};
export const ChartToolbar = memo((props) => {
    const { className, buttons, container, MainInstrumentComponent, loadedPercentage = 0 } = props;
    const toolbarButtonsRef = useRef(null);
    const scrollableRef = useRef(null);
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const [adaptiveState, onArrowClick] = useAdaptiveFeatures(scrollableRef, toolbarButtonsRef);
    useA11yListboxArrowsFocusController({
        wrapperRef: toolbarButtonsRef,
        childrenSelector: 'button',
        direction: 'horizontal',
        deps: [adaptiveState],
        role: 'toolbar',
        childRole: 'skip',
    });
    const Toolbar = useMemo(() => (React.createElement(ChartToolbarStyled, { className: className },
        loadedPercentage !== 100 && React.createElement(ChartToolbarLoadingIndicatorStyled, { percentage: loadedPercentage }),
        React.createElement(InstrumentSelectorContainerWrapperStyled, null, MainInstrumentComponent && React.createElement(MainInstrumentComponent, null)),
        React.createElement(ChartToolbarPopupsButtonsStyled, { "aria-label": localization.toolbar.a11y_toolbar, ref: toolbarButtonsRef },
            React.createElement(ChartToolbarPopupsButtonsWrapperStyled, { ref: scrollableRef },
                React.createElement(ChartToolbarPopupsButtonsTrackStyled, null, buttons)),
            adaptiveState.isRightArrowShown && (React.createElement(ChartToolbarPopupsButtonsArrowStyled, { icon: React.createElement(IconWrapper, null, iconsConfig.toolbar.arrow), float: "right", onClick: () => onArrowClick(1) })),
            adaptiveState.isLeftArrowShown && (React.createElement(ChartToolbarPopupsButtonsArrowStyled, { icon: React.createElement(IconWrapper, { width: 20 }, iconsConfig.toolbar.arrow), float: "left", onClick: () => onArrowClick(-1) }))))), [
        className,
        loadedPercentage,
        MainInstrumentComponent,
        buttons,
        adaptiveState.isRightArrowShown,
        adaptiveState.isLeftArrowShown,
        iconsConfig.toolbar.arrow,
        onArrowClick,
        localization.toolbar.a11y_toolbar,
    ]);
    return container ? createPortal(Toolbar, container) : Toolbar;
});
// number of pixels to scroll when toolbar in adaptive mode
const TOOLBAR_SCROLL_STRENGTH = 100;
/**
 * Adaptive features of toolbar.
 */
const useAdaptiveFeatures = (scrollableRef, containerRef) => {
    const [adaptiveState, setAdaptiveState] = useState(initialAdaptiveState);
    const animFrameId = useMemo(() => `toolbar_${uuid()}`, []);
    const recalculateAdaptiveState = useCallback(() => {
        const offsetWidth = scrollableRef.current?.offsetWidth || 0;
        const scrollLeft = scrollableRef.current?.scrollLeft || 0;
        const scrollWidth = scrollableRef.current?.scrollWidth || 0;
        const isLeftArrowShown = scrollLeft > 0;
        const isRightArrowShown = Math.ceil(offsetWidth + scrollLeft) < scrollWidth;
        setAdaptiveState({
            isLeftArrowShown,
            isRightArrowShown,
        });
    }, [scrollableRef]);
    useEffect(() => {
        let mounted = true;
        const onWidthChangeHandler = () => {
            if (mounted) {
                // https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
                animationFrameThrottled(animFrameId, () => {
                    if (mounted) {
                        recalculateAdaptiveState();
                        scrollableRef.current?.scrollTo({ left: 0 });
                    }
                });
            }
        };
        const observer = new ResizeObserver(onWidthChangeHandler);
        containerRef.current && observer.observe(containerRef.current);
        return () => {
            cancelThrottledAnimationFrame(animFrameId);
            containerRef.current && observer.unobserve(containerRef.current);
            mounted = false;
        };
    }, [scrollableRef, recalculateAdaptiveState, containerRef.current, animFrameId]);
    const onArrowClick = useCallback((direction) => {
        scrollableRef.current?.scrollTo({
            left: scrollableRef.current?.scrollLeft + direction * TOOLBAR_SCROLL_STRENGTH,
            behavior: 'smooth',
        });
    }, [scrollableRef]);
    useEffect(() => {
        const ref = scrollableRef.current;
        ref?.addEventListener('scroll', recalculateAdaptiveState);
        return () => {
            ref?.removeEventListener('scroll', recalculateAdaptiveState);
        };
    }, [scrollableRef, recalculateAdaptiveState]);
    return [adaptiveState, onArrowClick];
};
