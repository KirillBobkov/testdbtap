import React, { memo, useCallback, useContext, useRef } from 'react';
import { useA11yAnchorKeyDown } from '../../../chart-kit/accessibility/use-a11y-anchor-keydown';
import { useA11yPopFocusController } from '../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { importIdle } from '../../../utils/react.utils';
import { ChartToolbarButtonWithTooltip } from '../chart-toolbar/chart-toolbar-button-with-tooltip.component';
const ChartLayersPopover = importIdle(() => import('./content/chart-layers-popover.component'));
export const ChartLayers = memo((props) => {
    const { isOpened, setOpened, localization } = props;
    const togglePopoverHandler = useCallback(() => setOpened(!isOpened), [setOpened, isOpened]);
    const closePopoverHandler = useCallback(() => setOpened(false), [setOpened]);
    const onKeyDown = useA11yAnchorKeyDown(() => togglePopoverHandler(), []);
    const iconsConfig = useContext(IconsOverridingContext);
    const anchorRef = useRef(null);
    const popoverRef = useRef(null);
    useA11yPopFocusController({
        anchorRef,
        popRef: popoverRef,
        focusSelector: '*[data-focused="true"]',
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(ChartToolbarButtonWithTooltip, { ariaLabel: localization.toolbar.a11y_buttons.a11y_layers_popup, onClick: togglePopoverHandler, ref: anchorRef, isActive: isOpened, onKeyDown: onKeyDown, icon: iconsConfig.toolbar.chartLayers, testId: TEST_IDS.chart_layers_button, label: localization.toolbar.tooltip.layers }),
        React.createElement(ChartLayersPopover, { anchorRef: anchorRef, bounds: props.bounds, isOpened: props.isOpened, customPosition: props.customPosition, layerItems: props.layerItems, updatePopoverCustomPosition: props.updatePopoverCustomPosition, onClose: closePopoverHandler, createGroup: props.createGroup, setItemVisible: props.setItemVisible, setItemLocked: props.setItemLocked, renameItem: props.renameItem, moveItemDnD: props.moveItemDnD, deleteItem: props.deleteItem })));
});
