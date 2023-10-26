import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import { isDrawingType } from './drawings-selector.model';
import { getIconByDrawingType } from './getIconByDrawingType';
import { DrawingTypeAnchor } from './drawing-selector-anchor.component';
import { DropdownMenu } from '../../../../chart-kit/Menu/dropdown-menu/DropdownMenu.styled';
import { DrawingsClearConfirmationPopup } from './drawings-clear-confirmation-popup.component';
import { DrawingSelectorFooter } from './drawings-selector-footer.component';
import { AdaptivePopoverStyled, SelectboxStyled } from './drawings-selector.styled';
import { IconsDrawingPopover } from './icons-drawing-popover.component';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { DropdownMenuItemWithPopover } from '../../../../chart-kit/Menu/dropdown-menu/DropdownMenuItemWithPopover.component';
import { DropdownMenuItem } from '../../../../chart-kit/Menu/dropdown-menu/DropdownMenuItem.component';
import { string } from 'fp-ts';
const SelectboxPopover = (props) => {
    return React.createElement(AdaptivePopoverStyled, { ...props, align: "start", position: "bottom" });
};
export const DrawingsSelector = memo((props) => {
    const { drawingType, changeDrawingType, startNewDrawing, startNewIconDrawing, drawingMode, isVisibilityButtonEnabled, changeVisibility, isClearButtonEnabled, clearDrawings, areDrawingsVisible, areDrawingsDisabled, cancelDrawing, withPopup = true, isPopoverOpened, onTogglePopover, localization, mapTypeToIconFunc = getIconByDrawingType, icons, drawingsList, } = props;
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    //#region drawings selector popover
    const toggleOpen = useCallback(() => onTogglePopover(!isPopoverOpened), [onTogglePopover, isPopoverOpened]);
    const closePopover = useCallback(() => onTogglePopover(false), [onTogglePopover]);
    //#endregion
    //#region confirmation popup
    const [isConfirmationPopupOpened, changeConfirmationPopupOpened] = useState(false);
    const closeConfirmationPopup = useCallback(() => changeConfirmationPopupOpened(false), [changeConfirmationPopupOpened]);
    const openConfirmationPopup = useCallback(() => changeConfirmationPopupOpened(true), [changeConfirmationPopupOpened]);
    const onOpenConfirmationPopup = useCallback(() => {
        closePopover();
        openConfirmationPopup();
    }, [closePopover, openConfirmationPopup]);
    //#endregion
    //#region icons drawing popover
    const [isIconsPopoverOpened, toggleIconsPopover] = useState(false);
    const onIconsDrawingHover = useCallback(() => {
        !isIconsPopoverOpened && toggleIconsPopover(true);
    }, [toggleIconsPopover, isIconsPopoverOpened]);
    const onIconsDrawingLeave = useCallback(() => {
        isIconsPopoverOpened && toggleIconsPopover(false);
    }, [toggleIconsPopover, isIconsPopoverOpened]);
    //#endregion
    const isDrawingModeActive = useMemo(() => drawingMode === 'NewDrawing' || drawingMode === 'EditDrawing', [drawingMode]);
    const toggleVisibility = useCallback(() => {
        changeVisibility(!areDrawingsVisible);
    }, [changeVisibility, areDrawingsVisible]);
    const changeDrawing = useCallback((type) => {
        changeDrawingType(type);
        onTogglePopover(false);
        startNewDrawing(type);
    }, [changeDrawingType, startNewDrawing, onTogglePopover]);
    const onSelectIconDrawing = useCallback((icon) => {
        changeDrawingType('icon');
        onTogglePopover(false);
        startNewIconDrawing(icon);
    }, [changeDrawingType, onTogglePopover, startNewIconDrawing]);
    const onClearDrawings = useCallback(() => {
        if (isDrawingModeActive) {
            cancelDrawing();
        }
        if (!withPopup) {
            closePopover();
        }
        clearDrawings();
        closeConfirmationPopup();
    }, [clearDrawings, closeConfirmationPopup, isDrawingModeActive, cancelDrawing, withPopup, closePopover]);
    const onClearBtnHandler = useCallback(() => (withPopup ? onOpenConfirmationPopup() : onClearDrawings()), [withPopup, onClearDrawings, onOpenConfirmationPopup]);
    const onChange = useCallback((val) => {
        isDrawingType(val) && changeDrawing(val);
    }, [changeDrawing]);
    const isTypeActive = useCallback((type) => string.Eq.equals(drawingType, type), [drawingType]);
    const getLabel = useCallback((type) => localization.drawings.types[type] || localization.drawings.types.default, [localization.drawings]);
    const renderMenuFooter = useMemo(() => (React.createElement(DrawingSelectorFooter, { isVisibilityButtonEnabled: isVisibilityButtonEnabled, visibilityButtonText: areDrawingsVisible ? localization.drawings.dropdown.hideBtn : localization.drawings.dropdown.showBtn, onVisibilityButtonClick: toggleVisibility, isClearButtonEnabled: isClearButtonEnabled, clearButtonText: localization.drawings.dropdown.clearBtn, onClearButtonClick: onClearBtnHandler, localization: localization.toolbar })), [
        isVisibilityButtonEnabled,
        areDrawingsVisible,
        localization.drawings.dropdown.hideBtn,
        localization.drawings.dropdown.showBtn,
        localization.drawings.dropdown.clearBtn,
        localization.toolbar,
        toggleVisibility,
        isClearButtonEnabled,
        onClearBtnHandler,
    ]);
    const renderIconsDrawingPopover = useCallback((anchorRef) => areDrawingsDisabled ? null : (React.createElement(IconsDrawingPopover, { icons: icons, parentRef: anchorRef, onRequestClose: onIconsDrawingLeave, isOpened: isIconsPopoverOpened, onSelectIcon: onSelectIconDrawing })), [onIconsDrawingLeave, isIconsPopoverOpened, icons, onSelectIconDrawing, areDrawingsDisabled]);
    const handleKeyDown = useCallback((e, value) => {
        if (e.code === 'Enter' || e.code === 'Space') {
            e.preventDefault();
            onChange && onChange(value);
        }
    }, [onChange]);
    const iconsConfig = useContext(IconsOverridingContext);
    return (React.createElement(React.Fragment, null,
        React.createElement(SelectboxStyled, { tabIndex: -1, isOpened: isPopoverOpened, onToggle: toggleOpen, value: drawingType, onValueChange: onChange, Anchor: DrawingTypeAnchor, Menu: DropdownMenu, Footer: renderMenuFooter, Popover: SelectboxPopover, keyboardMode: keyboardModeEnabled, anchorAriaLabel: localization.toolbar.a11y_buttons.a11y_drawings_dropdown }, drawingsList.map(type => {
            if (type === 'icon') {
                return (React.createElement(DropdownMenuItemWithPopover, { disabled: areDrawingsDisabled, onMouseEnter: onIconsDrawingHover, key: type, value: type, isActive: isTypeActive(type), opened: isIconsPopoverOpened, label: getLabel(type), popover: renderIconsDrawingPopover, icon: mapTypeToIconFunc(type, iconsConfig) }));
            }
            else {
                return (React.createElement(DropdownMenuItem, { disabled: areDrawingsDisabled, onMouseEnter: onIconsDrawingLeave, key: type, onKeyDown: e => handleKeyDown(e, type), value: type, isActive: isTypeActive(type), label: getLabel(type), icon: mapTypeToIconFunc(type, iconsConfig) }));
            }
        })),
        withPopup && (React.createElement(DrawingsClearConfirmationPopup, { isOpened: isConfirmationPopupOpened, onCancel: closeConfirmationPopup, onClear: onClearDrawings, drawingsDict: localization.drawings }))));
});
