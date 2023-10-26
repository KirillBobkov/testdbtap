import React, { memo, useCallback, useState, useContext, useMemo, useEffect } from 'react';
import { Selectbox } from '../../../chart-kit/Selectbox/Selectbox.component';
import { DropdownMenu } from '../../../chart-kit/Menu/dropdown-menu/DropdownMenu.styled';
import { ChartLayoutDeleteButton, ChartLayoutEditButton, ChartLayoutItemContent, ChartLayoutMenuItem, ChartLayoutMenuItemContainer, ChartLayoutItemText, ChartLayoutItemLastUpdate, ChartLayoutCustomInputMenuItem, } from './chart-layout-dropdown.styled';
import { LayoutAnchor } from './chart-layout-anchor.component';
import { getSelectedLayout } from '../../../providers/layout-provider';
import { useThrottle } from '../../../chart-kit/utils/useThrottle';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { intervalToDuration } from 'date-fns';
import { createKeyDownHandler } from '../../../chart-kit/utils/keyDownHandler';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { A11Y_LAYOUT_TEMPLATE_DESC_ID } from '../../../chart-kit/accessibility/use-a11y-descriptions';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
import { constVoid, pipe } from 'fp-ts/function';
import { either } from 'fp-ts';
const SelectboxPopover = memo((props) => {
    return React.createElement(Popover, { ...props, align: "start", position: "bottom" });
});
export const ChartLayoutDropdown = memo((props) => {
    const { addLayout, deleteLayout, chartLayoutData, isLayoutSaving, isErrorLayoutSaving, lastUpdateTimeStamp, updateSelectedLayout, updateLayoutById, localization, togglePopupOpen, isOpened, setEditableLayoutId, editableLayoutId, } = props;
    const [mouseOverLayout, setMouseOverLayout] = useState(undefined);
    const [newLayoutItemError, setNewLayoutItemError] = useState(undefined);
    const [isNewActive, setIsNewActive] = useState(false);
    const isLayoutSavingThrottle = useThrottle(isLayoutSaving, 500);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const { loader: SpinnerIcon, errorIndicator: ErrorIndicator, tick } = iconsConfig.layout;
    const currentIcon = isLayoutSavingThrottle ? SpinnerIcon : iconsConfig.selectBox.arrow;
    const LayoutPrefixIcon = isErrorLayoutSaving ? ErrorIndicator : tick;
    const layouts = chartLayoutData.layouts;
    const selectedLayoutId = chartLayoutData.selectedLayoutId;
    const layoutsCanBeDeleted = layouts.length > 0;
    useEffect(() => () => setIsNewActive(false), [isOpened]);
    const updateLayoutHandler = useCallback((id, name) => pipe(updateLayoutById(id, name), either.fold(ve => either.left(ve), () => {
        togglePopupOpen(false);
        return either.right(void 0);
    })), [updateLayoutById, togglePopupOpen]);
    const selectLayoutHandler = useCallback((id) => {
        if (isErrorLayoutSaving) {
            return;
        }
        updateSelectedLayout(id);
        togglePopupOpen(false);
    }, [updateSelectedLayout, isErrorLayoutSaving, togglePopupOpen]);
    const addNewLayoutHandler = useCallback((name) => {
        if (isErrorLayoutSaving) {
            return;
        }
        return pipe(name, addLayout, either.fold(setNewLayoutItemError, () => {
            setNewLayoutItemError(undefined);
            togglePopupOpen(false);
        }));
    }, [isErrorLayoutSaving, addLayout, togglePopupOpen]);
    const deleteLayoutHandler = useCallback((id) => {
        if (isErrorLayoutSaving) {
            // remove this in future
            return;
        }
        deleteLayout(id);
        setMouseOverLayout(undefined);
        togglePopupOpen(false);
    }, [layouts, selectedLayoutId, isErrorLayoutSaving, deleteLayout]);
    const setEditableTemplateHandler = useCallback((id) => {
        if (isErrorLayoutSaving) {
            // remove this in future
            return;
        }
        setEditableLayoutId(id);
        setMouseOverLayout(undefined);
        setIsNewActive(false);
    }, [isErrorLayoutSaving, setEditableLayoutId]);
    const onClearErrorHandler = useCallback(() => setNewLayoutItemError(undefined), []);
    const getLastUpdateValue = useCallback((lastUpdateDiff) => {
        let lastUpdateValue = 'Just now';
        const lastUpdate = intervalToDuration({
            start: lastUpdateDiff,
            end: 0,
        });
        for (const prop of Object.keys(lastUpdate)) {
            const value = lastUpdate[prop];
            if (value && value > 0) {
                lastUpdateValue = `${value} ${prop} ago`;
                if (prop === 'minutes') {
                    lastUpdateValue = `${value} mins ago`;
                    return lastUpdateValue;
                }
                return lastUpdateValue;
            }
        }
        return lastUpdateValue;
    }, []);
    const onNewActiveChange = useCallback((active) => {
        setEditableLayoutId('');
        setIsNewActive(active);
    }, [setEditableLayoutId]);
    const content = chartLayoutData.layouts.map((layout, idx) => {
        const isActive = layout.id === chartLayoutData.selectedLayoutId;
        const isHovered = mouseOverLayout === layout.id;
        const isEditable = editableLayoutId === layout.id;
        return (React.createElement(ChartLayoutItem, { key: idx, layout: layout, idx: idx, isActive: isActive, isHovered: isHovered, isEditable: isEditable, isDeletable: layoutsCanBeDeleted, lastUpdateTimeStamp: lastUpdateTimeStamp, keyboardModeEnabled: keyboardModeEnabled, localization: localization, error: isErrorLayoutSaving, setMouseOverLayout: setMouseOverLayout, deleteLayout: deleteLayoutHandler, selectLayout: selectLayoutHandler, updateLayout: updateLayoutHandler, setEditableLayout: setEditableTemplateHandler, getLastUpdateValue: getLastUpdateValue }));
    });
    content.push(React.createElement(ChartLayoutCustomInputMenuItem, { error: newLayoutItemError, onClearError: onClearErrorHandler, testIds: {
            input: TEST_IDS.chart_layout_input,
            inactiveText: TEST_IDS.chart_layout_placeholder,
        }, key: 'custom', isDisabled: isErrorLayoutSaving, inactiveText: localization.layout.newLayout, placeholder: localization.layout.newLayout, keyboardModeEnabled: keyboardModeEnabled, onActiveChange: onNewActiveChange, isActive: isNewActive, onEnter: addNewLayoutHandler }));
    const selectedLayout = (chartLayoutData && getSelectedLayout(chartLayoutData)?.name) ?? '';
    return (React.createElement(Selectbox, { tabIndex: -1, isOpened: isOpened, onToggle: togglePopupOpen, value: selectedLayout, onValueChange: constVoid, Popover: SelectboxPopover, Anchor: LayoutAnchor, Menu: DropdownMenu, caretIcon: currentIcon, isCaretIconChanged: isLayoutSavingThrottle, prefixIcon: LayoutPrefixIcon, keyboardMode: keyboardModeEnabled, anchorAriaLabel: localization.toolbar.a11y_buttons.a11y_layout_dropdown, shouldWrap: false }, content));
});
const ChartLayoutItem = memo(props => {
    const { isEditable, isHovered, isActive, isDeletable, layout, idx, lastUpdateTimeStamp, keyboardModeEnabled, localization, deleteLayout, updateLayout, getLastUpdateValue, selectLayout, setMouseOverLayout, setEditableLayout, } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const [updateLayoutError, setUpdateLayoutError] = useState(undefined);
    const lastUpdateValue = useMemo(() => lastUpdateTimeStamp - layout.lastUpdateTimeStamp < 0
        ? getLastUpdateValue(0)
        : getLastUpdateValue(lastUpdateTimeStamp - layout.lastUpdateTimeStamp), [getLastUpdateValue, lastUpdateTimeStamp, layout.lastUpdateTimeStamp]);
    const selectLayoutHandler = useCallback((id) => {
        if (typeof id !== 'string') {
            return;
        }
        selectLayout(id);
    }, [selectLayout]);
    const updateLayoutHandler = useCallback((name) => pipe(updateLayout(layout.id, name), either.fold(setUpdateLayoutError, () => {
        setUpdateLayoutError(undefined);
        setEditableLayout('');
    })), [layout.id, updateLayout, setEditableLayout]);
    const deleteTemplateHandler = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        deleteLayout(layout.id, idx);
    }, [deleteLayout, idx, layout.id]);
    const editTemplateHandler = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        setEditableLayout(layout.id);
    }, [layout.id, setEditableLayout]);
    const onClearErrorHandler = useCallback(() => setUpdateLayoutError(undefined), []);
    const deselectEditableLayoutHandler = useCallback(() => setEditableLayout(''), [setEditableLayout]);
    const setMouseOverThisLayout = useCallback(() => setMouseOverLayout(layout.id), [layout.id, setMouseOverLayout]);
    const resetMouseOverLayout = useCallback(() => setMouseOverLayout(undefined), [setMouseOverLayout]);
    const onFocusInHandler = useCallback(() => keyboardModeEnabled && setMouseOverThisLayout(), [keyboardModeEnabled, setMouseOverThisLayout]);
    const onFocusOutHandler = useCallback(() => keyboardModeEnabled && resetMouseOverLayout(), [keyboardModeEnabled, resetMouseOverLayout]);
    //@doc-tags shortcut
    const keyDownHandler = useMemo(() => createKeyDownHandler(['Delete', deleteTemplateHandler], ['KeyE', editTemplateHandler, { ctrlKey: true }]), [deleteTemplateHandler, editTemplateHandler]);
    return isEditable ? (React.createElement(ChartLayoutCustomInputMenuItem, { error: updateLayoutError, onClearError: onClearErrorHandler, onEnter: updateLayoutHandler, keyboardModeEnabled: keyboardModeEnabled, defaultValue: layout.name, key: layout.id, isActive: isEditable, onFocusOut: deselectEditableLayoutHandler })) : (React.createElement(ChartLayoutMenuItem, { isActive: isActive, ariaDescribedBy: A11Y_LAYOUT_TEMPLATE_DESC_ID, testId: TEST_IDS.chart_layout_menu_item, onKeyDown: keyDownHandler, keyboardModeEnabled: keyboardModeEnabled, onFocus: onFocusInHandler, onBlur: onFocusOutHandler, onMouseEnter: setMouseOverThisLayout, onMouseLeave: resetMouseOverLayout, value: layout.id, onSelect: selectLayoutHandler, key: layout.id },
        React.createElement(ChartLayoutMenuItemContainer, null,
            React.createElement(ChartLayoutItemContent, null,
                React.createElement(ChartLayoutItemText, null, layout.name)),
            !isHovered && React.createElement(ChartLayoutItemLastUpdate, null, lastUpdateValue),
            React.createElement(ChartLayoutEditButton, { visible: isHovered, "aria-label": localization.layout.a11y_editLayoutTemplate, "aria-hidden": true, tabIndex: -1, icon: React.createElement(IconWrapper, null, iconsConfig.layout.edit), onClick: editTemplateHandler }),
            isDeletable && (React.createElement(ChartLayoutDeleteButton, { visible: isHovered, "aria-label": localization.layout.a11y_deleteLayoutTemplate, "aria-hidden": true, tabIndex: -1, icon: React.createElement(IconWrapper, null, iconsConfig.layout.delete), onClick: deleteTemplateHandler })))));
});
