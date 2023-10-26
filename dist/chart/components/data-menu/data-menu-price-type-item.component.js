import React, { memo, useCallback, useContext, useRef, useState } from 'react';
import { DataMenuPopoverAnchor } from './data-menu-popovers/data-menu-popovers.styled';
import { RightClickMenuPopoverItemWrapper, RightClickPopoverMenuItemStyled, } from '../right-click-menu/right-click-menu.styled';
import { constVoid } from 'fp-ts/function';
import { renderSettingsItem } from '../yAxis-settings/yaxis-main-popover.component';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { DataMenuPriceTypePopover } from './data-menu-popovers/data-menu-price-type-popover.component';
import { ChartReactAppContext } from '../../defaults';
export const DataMenuPriceTypeItem = memo(props => {
    const { value, priceTypes, onChangeType, onPopoverClose } = props;
    const [isOpened, setIsOpened] = useState(false);
    const { localization } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const priceTypePopoverAnchorRef = useRef(null);
    const { isMobile } = useContext(ChartReactAppContext);
    const onMouseEnterHandler = useCallback(() => setIsOpened(true), [setIsOpened]);
    const onMouseLeaveHandler = useCallback(() => setIsOpened(false), [setIsOpened]);
    return (React.createElement(RightClickMenuPopoverItemWrapper, { onMouseLeave: onMouseLeaveHandler },
        React.createElement(DataMenuPopoverAnchor, { ref: priceTypePopoverAnchorRef }),
        React.createElement(RightClickPopoverMenuItemStyled, { value: 'Price Type', onMouseEnter: isMobile ? constVoid : onMouseEnterHandler }, renderSettingsItem(localization.settingsPopup.priceTypes.label, true, React.createElement(React.Fragment, null), false, React.createElement(IconWrapper, null, iconsConfig.yAxisMainPopover.arrow))),
        React.createElement(DataMenuPriceTypePopover, { isOpened: isOpened, onClose: onPopoverClose, value: value, priceTypes: priceTypes, onChangePriceType: onChangeType, anchorRef: priceTypePopoverAnchorRef })));
});
