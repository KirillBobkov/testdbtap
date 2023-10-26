import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { array, option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { useA11yAnchorKeyDown } from '../../../../chart-kit/accessibility/use-a11y-anchor-keydown';
import { useA11yPopFocusController } from '../../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { TEST_IDS } from '../../../../config/e2e/test-ids';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { DrawingGroupsAnchor } from './drawing-groups-anchor.component';
import { createKeyDownHandler } from '../../../../chart-kit/utils/keyDownHandler';
import { DrawingGroupsDropdownMenuItemStyled, DrawingGroupsDropdownMenuStyled, DrawingGroupsMenuItemText, DrawingGroupsPopoverStyled, } from './drawing-groups-dropdown.styled';
import { ChartIndicatorTemplateDeleteButton, ChartIndicatorTemplateEditButton, } from '../../chart-indicator-templates/chart-indicator-templates-dropdown.styled';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { some, none } from 'fp-ts/Option';
import { CustomInputMenuItem } from '../../../../chart-kit/CustomInputMenuItem/CustomInputMenuItem.component';
import { DEFAULT_GROUP_ID } from '../../../model/drawing-groups.model';
export const DrawingGroupsDropdown = memo(props => {
    const { groups, selectedGroup, selectGroup, addGroup, deleteGroup, renameGroup } = props;
    const [opened, setOpened] = useState(false);
    const [editableGroupId, setEditableGroupId] = useState(none);
    const [isNewActive, setIsNewActive] = useState(false);
    const { keyboardModeEnabled, localization } = useContext(MultiChartComponentContext);
    const [mouseOverGroupId, setMouseOverGroupId] = useState(none);
    const anchorRef = useRef(null);
    const menuRef = useRef(null);
    useEffect(() => () => {
        setIsNewActive(false);
        setEditableGroupId(none);
    }, [opened]);
    const onToggleOpenedHandler = useCallback(() => setOpened(!opened), [opened, setOpened]);
    const onRequestCloseHandler = useCallback(() => setOpened(false), [setOpened]);
    const onSelectGroupHandler = useCallback((id) => {
        selectGroup(id);
        onRequestCloseHandler();
    }, [selectGroup, onRequestCloseHandler]);
    const onAddGroupHandler = useCallback((name) => {
        addGroup(name);
        onRequestCloseHandler();
    }, [addGroup, onRequestCloseHandler]);
    useA11yPopFocusController({
        anchorRef,
        popRef: menuRef,
        focusSelector: '*[data-active="true"]', // focus at selected menu item when popover is opened
    });
    const anchorKeyDownHandler = useA11yAnchorKeyDown(() => onToggleOpenedHandler(), [onToggleOpenedHandler]);
    const onNewActiveChange = useCallback((active) => {
        setIsNewActive(active);
        setEditableGroupId(none);
    }, []);
    const setEditableGroupIdHandler = useCallback((groupId) => {
        setIsNewActive(false);
        setEditableGroupId(groupId);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingGroupsAnchor, { ref: anchorRef, onKeyDown: anchorKeyDownHandler, onClick: onToggleOpenedHandler, testId: TEST_IDS.drawing_groups_anchor, value: selectedGroup.id, valueText: selectedGroup.name }),
        React.createElement(DrawingGroupsPopoverStyled, { anchorRef: anchorRef, align: "end", position: "top", opened: opened, onRequestClose: onRequestCloseHandler, keyboardMode: keyboardModeEnabled },
            React.createElement(DrawingGroupsDropdownMenuStyled, { ariaLabel: localization.drawingGroups.a11y_drawingGroupsMenu, ref: menuRef },
                pipe(groups, array.map(gi => {
                    const active = gi.id === selectedGroup.id;
                    const editable = option.fold(() => false, id => gi.id === id)(editableGroupId);
                    const isHovered = option.fold(() => false, id => gi.id === id)(mouseOverGroupId);
                    return (React.createElement(DrawingGroupMenuItem, { key: gi.id, group: gi, active: active, isHovered: isHovered, editable: editable, selectGroup: onSelectGroupHandler, deleteGroup: deleteGroup, renameGroup: renameGroup, setMouseOverGroupId: setMouseOverGroupId, setEditableGroup: setEditableGroupIdHandler }));
                })),
                React.createElement(CustomInputMenuItem, { testIds: {
                        input: TEST_IDS.drawing_groups_input,
                        inactiveText: TEST_IDS.drawing_groups_placeholder,
                    }, key: 'drawing_groups_input', inactiveText: localization.drawingGroups.addNewGroup, placeholder: localization.drawingGroups.addNewGroupPlaceholder, keyboardModeEnabled: keyboardModeEnabled, onEnter: onAddGroupHandler, isActive: isNewActive, onActiveChange: onNewActiveChange })))));
});
const DrawingGroupMenuItem = memo(props => {
    const { group, active, editable, isHovered, selectGroup, deleteGroup, renameGroup, setEditableGroup, setMouseOverGroupId, } = props;
    const { keyboardModeEnabled, localization } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const onSelectGroupHandler = useCallback(() => selectGroup(group.id), [selectGroup, group.id]);
    const onDeleteGroupHandler = useCallback((e) => {
        e.stopPropagation();
        setMouseOverGroupId(none);
        deleteGroup(group.id);
    }, [deleteGroup, group.id, setMouseOverGroupId]);
    const onRenameHandler = useCallback((name) => {
        renameGroup(group.id, name);
        setEditableGroup(none);
    }, [renameGroup, setEditableGroup, group.id]);
    const onSetEditableGroupHandler = useCallback((e) => {
        e.stopPropagation();
        setMouseOverGroupId(none);
        setEditableGroup(some(group.id));
    }, [setMouseOverGroupId, setEditableGroup, group.id]);
    const onEscapeEditableGroupHandler = useCallback(() => setEditableGroup(option.none), [setEditableGroup]);
    const menuItemKeyDownHandler = useMemo(() => createKeyDownHandler(['Enter', onSelectGroupHandler]), [onSelectGroupHandler]);
    const setMouseOverThisLayout = useCallback(() => setMouseOverGroupId(some(group.id)), [group.id, setMouseOverGroupId]);
    const resetMouseOverLayout = useCallback(() => setMouseOverGroupId(none), [setMouseOverGroupId]);
    const onFocusInHandler = useCallback(() => keyboardModeEnabled && setMouseOverThisLayout(), [keyboardModeEnabled, setMouseOverThisLayout]);
    const onFocusOutHandler = useCallback(() => keyboardModeEnabled && resetMouseOverLayout(), [keyboardModeEnabled, resetMouseOverLayout]);
    return editable ? (React.createElement(CustomInputMenuItem, { isActive: editable, defaultValue: group.name, key: `${group.name}_${group.id}`, keyboardModeEnabled: keyboardModeEnabled, onEnter: onRenameHandler, onFocusOut: onEscapeEditableGroupHandler })) : (React.createElement(DrawingGroupsDropdownMenuItemStyled, { key: `${group.name}_${group.id}`, onSelect: onSelectGroupHandler, keyboardModeEnabled: keyboardModeEnabled, onFocus: onFocusInHandler, onBlur: onFocusOutHandler, onMouseEnter: setMouseOverThisLayout, onMouseLeave: resetMouseOverLayout, value: group.id, isActive: active, onKeyDown: menuItemKeyDownHandler },
        React.createElement(DrawingGroupsMenuItemText, null, group.name),
        group.id !== DEFAULT_GROUP_ID && (React.createElement(React.Fragment, null,
            React.createElement(ChartIndicatorTemplateEditButton, { visible: isHovered, "aria-label": localization.drawingGroups.a11y_editGroup, "aria-hidden": true, tabIndex: -1, icon: React.createElement(IconWrapper, null, iconsConfig.drawingGroups.edit), onClick: onSetEditableGroupHandler }),
            React.createElement(ChartIndicatorTemplateDeleteButton, { visible: isHovered, "aria-label": localization.drawingGroups.a11y_deleteGroup, "aria-hidden": true, tabIndex: -1, icon: React.createElement(IconWrapper, null, iconsConfig.drawingGroups.delete), onClick: onDeleteGroupHandler })))));
});
export default DrawingGroupsDropdown;
