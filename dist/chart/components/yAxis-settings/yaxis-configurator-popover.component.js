import React, { useCallback, useRef, useState } from 'react';
import { YAxisMainPopover } from './yaxis-main-popover.component';
export const YAxisConfiguratorPopover = React.memo(props => {
    const { onClose, popoverCoordinates, isOpened: isMainPopoverOpened, config, setFitType, setAutoScale, setAxisType, labelsConfig, setLabelMode, selectDescription, selectCountDownBarClose, yAxisDict, toggleLockPriceToBarRatio, togglePriceScaleInverse, setAxisAlign, } = props;
    const [labelPopoverOpen, setLabelPopupOpen] = useState(false);
    const labelsAndLinesRef = useRef(null);
    const toggleLabelAndLine = useCallback(() => setLabelPopupOpen(!labelPopoverOpen), [labelPopoverOpen]);
    const onLabelClose = useCallback(() => {
        setLabelPopupOpen(false);
        onClose();
    }, [setLabelPopupOpen, onClose]);
    const isRightAlign = config.chartCore.components.yAxis.align === 'right';
    const labelsPopoverPosition = isRightAlign ? 'left' : 'right';
    return (React.createElement(React.Fragment, null,
        React.createElement(YAxisMainPopover, { setAxisAlign: setAxisAlign, isOpened: isMainPopoverOpened, onClose: onClose, config: config, popoverCoordinates: popoverCoordinates, changeFitType: setFitType, toggleAutoScale: setAutoScale, toggleLockPriceToBarRatio: toggleLockPriceToBarRatio, toggleAxisType: setAxisType, labelPopoverOpen: labelPopoverOpen, toggleLabelsPopup: toggleLabelAndLine, yAxisDict: yAxisDict, togglePriceScaleInverse: togglePriceScaleInverse, labelsAndLinesRef: labelsAndLinesRef, position: labelsPopoverPosition, onLabelClose: onLabelClose, labelsConfig: labelsConfig, setLabelMode: setLabelMode, selectCountDownBarClose: selectCountDownBarClose, selectDescription: selectDescription, labelsPopoverPosition: labelsPopoverPosition })));
});
export default YAxisConfiguratorPopover;
