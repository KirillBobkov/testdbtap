import { option } from 'fp-ts';
import { constVoid, pipe } from 'fp-ts/function';
import React, { memo, useCallback, useContext, useRef, useState } from 'react';
import { useA11yAnchorKeyDown } from '../../../chart-kit/accessibility/use-a11y-anchor-keydown';
import { useA11yPopFocusController } from '../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { DropdownMenuItem } from '../../../chart-kit/Menu/dropdown-menu/DropdownMenuItem.component';
import { MENU_ID } from '../../../chart-kit/Menu/Menu.component';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { ChartToolbarButtonWithTooltip } from '../chart-toolbar/chart-toolbar-button-with-tooltip.component';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { ChartSnapshotDropdownStyled, ChartSnapshotPopoverStyled } from './chart-snapshot-dropdown.styled';
export const ChartSnapshotDropdown = memo((props) => {
    const { localization, items } = props;
    const [isOpened, setIsOpened] = useState(false);
    const buttonRef = useRef(null);
    const popoverRef = useRef(null);
    const togglePopover = useCallback(() => setIsOpened(!isOpened), [isOpened]);
    const closePopover = useCallback(() => setIsOpened(false), []);
    const onKeyDown = useA11yAnchorKeyDown(() => togglePopover(), [togglePopover]);
    useA11yPopFocusController({
        anchorRef: buttonRef,
        popRef: popoverRef,
    });
    const iconsConfig = useContext(IconsOverridingContext);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const handleItemSelect = useCallback((value) => pipe(items.find(i => i.key === value), option.fromNullable, option.fold(constVoid, item => {
        item.onSelect?.();
        closePopover();
    })), []);
    return (React.createElement(React.Fragment, null,
        React.createElement(ChartToolbarButtonWithTooltip, { ariaLabel: localization.toolbar.a11y_buttons.a11y_snapshot_dropdown, ariaExpanded: isOpened, ariaHaspopup: true, ariaControls: MENU_ID, icon: iconsConfig.toolbar.chartSnapshot, ref: buttonRef, onClick: togglePopover, onKeyDown: onKeyDown, hasMenu: true, isActive: isOpened, testId: TEST_IDS.snapshot_sharing_button, disableTooltip: isOpened, label: localization.toolbar.tooltip.snapshot }),
        React.createElement(ChartSnapshotPopoverStyled, { anchorRef: buttonRef, align: "start", position: "bottom", opened: isOpened, keyboardMode: keyboardModeEnabled, onRequestClose: closePopover },
            React.createElement(ChartSnapshotDropdownStyled, { ariaLabel: localization.toolbar.a11y_buttons.a11y_snapshot_dropdown, testId: TEST_IDS.snapshot_menu, ref: popoverRef, onItemSelect: handleItemSelect }, items.map(({ key, label, icon }) => (React.createElement(DropdownMenuItem, { key: key, testId: TEST_IDS.snapshot_sharing_item, label: label, icon: icon, value: key })))))));
});
