import { inRectangle } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.view-model';
import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { ChartReactAppContext } from '../../defaults';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { ZoomingToolContainerStyled, ZoomingToolZoomInStyled, ZoomingToolZoomOutStyled, } from './chart-zooming-tool-container.styled';
export const ChartZoomingTool = memo(props => {
    const { chart, zoomIn, zoomOut, buttonsDisabled, marginBottom, localization, currentCanvasBounds } = props;
    const [isInZone, setIsInZone] = useState(false);
    const stopPropagation = useCallback((e) => {
        chart.crossEventProducer.fireCrossClose();
        e.stopPropagation();
    }, [chart.bus]);
    const { isMobile } = useContext(ChartReactAppContext);
    useEffect(() => {
        const unsubMouseMove = chart.canvasInputListener.observeMouseMove().subscribe(point => {
            // size of zone depends of canvas width and height
            // left edge of hover zone on X axis, 3.75/10 of width
            const rectX = currentCanvasBounds.width * 0.375;
            // top offset for edge of hover zone on Y axis
            const rectY = currentCanvasBounds.height * 0.85 - marginBottom + 10;
            // width of hover zone = 1/4 of canvas width
            const rectWidth = currentCanvasBounds.width * 0.25;
            // height of hover zone = 1.5/10 of canvas height
            const rectHeight = currentCanvasBounds.height * 0.15 + marginBottom + 10;
            setIsInZone(inRectangle(point, [rectX, rectY, rectWidth, rectHeight]));
        });
        const unsubMouseLeave = chart.canvasInputListener.observeMouseEnter().subscribe(() => {
            setIsInZone(false);
        });
        return () => {
            unsubMouseMove.unsubscribe();
            unsubMouseLeave.unsubscribe();
        };
    }, [chart, currentCanvasBounds, marginBottom]);
    const { zooming } = useContext(IconsOverridingContext);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const isVisible = isInZone || isMobile || keyboardModeEnabled;
    return (React.createElement(ZoomingToolContainerStyled, { isVisible: isVisible, isMobile: isMobile, marginBottom: marginBottom },
        React.createElement(ZoomingToolZoomInStyled, { "aria-label": localization.legend.a11y_zoomIn, disabled: buttonsDisabled.zoomIn, onClick: zoomIn, onMouseMove: stopPropagation, icon: React.createElement(IconWrapper, null, zooming.zoomin), testId: TEST_IDS.zoom_button_in }),
        React.createElement(ZoomingToolZoomOutStyled, { "aria-label": localization.legend.a11y_zoomOut, disabled: buttonsDisabled.zoomOut, onClick: zoomOut, onMouseMove: stopPropagation, icon: React.createElement(IconWrapper, null, zooming.zoomout), testId: TEST_IDS.zoom_button_out })));
});
