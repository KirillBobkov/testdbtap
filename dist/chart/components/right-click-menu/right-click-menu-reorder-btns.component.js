import React, { memo, useCallback, useContext } from 'react';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { RightClickPopoverMenuItemLabelStyled, RightClickPopoverMenuItemStyled, RightClickPopoverMenuStyled, } from './right-click-menu.styled';
const RightClickMenuReorderTypes = {
    bringToFront: 'bringToFront',
    sendToBack: 'sendToBack',
    moveTo: 'moveTo',
};
export const RightClickMenuReorderButtons = memo(props => {
    const { onReorder } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const onReorderHandler = useCallback((value) => {
        isRightClickMenuReorderType(value) && onReorder(value);
    }, [onReorder]);
    return (React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onReorderHandler },
        React.createElement(RightClickPopoverMenuItemStyled, { value: RightClickMenuReorderTypes.bringToFront },
            React.createElement(RightClickPopoverMenuItemLabelStyled, null, localization.dynamicObjects.bringToFront)),
        React.createElement(RightClickPopoverMenuItemStyled, { value: RightClickMenuReorderTypes.sendToBack },
            React.createElement(RightClickPopoverMenuItemLabelStyled, null, localization.dynamicObjects.sendToBack))));
});
const isRightClickMenuReorderType = (value) => {
    return value in RightClickMenuReorderTypes;
};
