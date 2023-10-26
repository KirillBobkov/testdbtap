import React, { memo, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ChartIndicatorTemplatesPopoverStyled, ChartIndicatorCustomInputMenuItemStyled, ChartIndicatorTemplateMenuItemStyled, ChartIndicatorTemplateEditButton, ChartIndicatorTemplateDeleteButton, ChartIndicatorTemplateMenuItemText, } from './chart-indicator-templates-dropdown.styled';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { DropdownMenu } from '../../../chart-kit/Menu/dropdown-menu/DropdownMenu.styled';
import { none, some } from 'fp-ts/Option';
import { either, option } from 'fp-ts';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { createKeyDownHandler } from '../../../chart-kit/utils/keyDownHandler';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { CustomInputMenuItem } from '../../../chart-kit/CustomInputMenuItem/CustomInputMenuItem.component';
import { constVoid, pipe } from 'fp-ts/function';
import { useA11yPopFocusController } from '../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { useA11yAnchorKeyDown } from '../../../chart-kit/accessibility/use-a11y-anchor-keydown';
import { A11Y_INDICATOR_TEMPLATE_DESC_ID } from '../../../chart-kit/accessibility/use-a11y-descriptions';
import { ChartToolbarButtonWithTooltip } from '../chart-toolbar/chart-toolbar-button-with-tooltip.component';
import { useAdaptiveHeight } from '../../../chart-kit/Popover/useAdaptiveHeight';
import { Scrollable } from '../../../chart-kit/Scrollable/Scrollable';
export const ChartIndicatorTemplatesDropdown = memo(props => {
    const { localization, templatesData, isOpened, setPopupOpen, addTemplate, updateTemplate } = props;
    const [editableTemplateId, setEditableTemplateId] = useState(none);
    const [mouseOverTemplateId, setMouseOverTemplateId] = useState(none);
    const [isNewActive, setIsNewActive] = useState(false);
    const [addNewTemplateError, setAddNewTemplateError] = useState(undefined);
    const iconsConfig = useContext(IconsOverridingContext);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const anchorRef = useRef(null);
    const menuRef = useRef(null);
    const buttonClickHandler = useCallback(() => {
        setPopupOpen(!isOpened);
        setMouseOverTemplateId(none);
        setEditableTemplateId(none);
        setIsNewActive(false);
        setAddNewTemplateError(undefined);
    }, [setPopupOpen, isOpened]);
    const addNewTemplate = useCallback((name) => pipe(name, addTemplate, either.fold(setAddNewTemplateError, () => {
        setAddNewTemplateError(undefined);
        setIsNewActive(false);
    })), [addTemplate]);
    const updateTemplateHandler = useCallback((id, name) => pipe(updateTemplate(id, name), either.fold(ve => either.left(ve), () => {
        setPopupOpen(false);
        return either.right(void 0);
    })), [updateTemplate, setPopupOpen]);
    const onNewActiveChange = useCallback((active) => {
        setEditableTemplateId(none);
        setIsNewActive(active);
    }, []);
    const setEditableTemplateIdHandler = useCallback((templateId) => {
        setIsNewActive(false);
        setMouseOverTemplateId(none);
        setEditableTemplateId(templateId);
    }, []);
    const onClearErrorHandler = useCallback(() => setAddNewTemplateError(undefined), []);
    const onKeyDown = useA11yAnchorKeyDown(() => buttonClickHandler(), [buttonClickHandler]);
    useA11yPopFocusController({
        anchorRef,
        popRef: menuRef,
        focusSelector: '*[data-active="true"]', // focus at selected menu item when popover is opened
    });
    const adaptiveStyles = useAdaptiveHeight(anchorRef, { maxHeight: 400 });
    return (React.createElement(React.Fragment, null,
        React.createElement(ChartToolbarButtonWithTooltip, { ariaLabel: localization.toolbar.a11y_buttons.a11y_indicator_dropdown, ariaExpanded: isOpened, ariaHaspopup: true, icon: iconsConfig.toolbar.indicatorTemplates, ref: anchorRef, onClick: buttonClickHandler, onKeyDown: onKeyDown, hasMenu: true, isActive: isOpened, testId: TEST_IDS.indicator_template_button, disableTooltip: isOpened, label: localization.toolbar.a11y_buttons.a11y_indicator_dropdown }),
        React.createElement(ChartIndicatorTemplatesPopoverStyled, { anchorRef: anchorRef, align: "start", position: "bottom", opened: isOpened, onRequestClose: buttonClickHandler, keyboardMode: keyboardModeEnabled },
            React.createElement(Scrollable, { mode: "visible", style: adaptiveStyles },
                React.createElement(DropdownMenu, { ariaLabel: localization.toolbar.a11y_buttons.a11y_indicator_dropdown, ref: menuRef },
                    templatesData.map((template, idx) => {
                        const isEditable = option.fold(() => false, id => template.id === id)(editableTemplateId);
                        const isHovered = option.fold(() => false, id => template.id === id)(mouseOverTemplateId);
                        return (React.createElement(IndicatorTemplateMenuItem, { ...props, key: idx, template: template, index: idx, isHovered: isHovered, isEditable: isEditable, updateTemplate: updateTemplateHandler, setEditableTemplateId: setEditableTemplateIdHandler, setMouseOverTemplateId: setMouseOverTemplateId }));
                    }),
                    React.createElement(ChartIndicatorCustomInputMenuItemStyled, { error: addNewTemplateError, onClearError: onClearErrorHandler, keyboardModeEnabled: keyboardModeEnabled, inactiveText: localization.indicatorTemplates.saveIndicatorTemplate, isActive: isNewActive, onActiveChange: onNewActiveChange, onEnter: addNewTemplate, testIds: {
                            input: TEST_IDS.indicator_template_input,
                            inactiveText: TEST_IDS.indicator_template_placeholder,
                        } }))))));
});
const IndicatorTemplateMenuItem = memo(props => {
    const { template, index, localization, isEditable, isHovered, deleteTemplate, selectTemplate, updateTemplate, setMouseOverTemplateId, setEditableTemplateId, } = props;
    const templateId = template.id;
    const iconsConfig = useContext(IconsOverridingContext);
    const [updateTemplateError, setUpdateTemplateError] = useState(undefined);
    const onSelectHandler = useCallback(() => selectTemplate(templateId), [templateId, selectTemplate]);
    const onDeselectTemplateHandler = useCallback(() => setEditableTemplateId(none), [setEditableTemplateId]);
    const onUpdateHandler = useCallback((name) => pipe(updateTemplate(templateId, name), either.fold(setUpdateTemplateError, () => {
        setUpdateTemplateError(undefined);
        setEditableTemplateId(none);
    })), [setEditableTemplateId, templateId, updateTemplate]);
    const onEditTemplateHandler = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        setEditableTemplateId(some(templateId));
    }, [setEditableTemplateId, templateId]);
    const onDeleteHandler = useCallback((e) => {
        e.stopPropagation();
        deleteTemplate(templateId);
    }, [deleteTemplate, templateId]);
    const onMouseEnterHandler = useCallback(() => setMouseOverTemplateId(some(templateId)), [setMouseOverTemplateId, templateId]);
    const onMouseLeaveHandler = useCallback(() => setMouseOverTemplateId(none), [setMouseOverTemplateId]);
    //@doc-tags shortcut
    const keyDownHandler = useMemo(() => createKeyDownHandler(['Enter', onSelectHandler], ['Delete', onDeleteHandler], ['KeyE', onEditTemplateHandler, { ctrlKey: true }]), [onDeleteHandler, onEditTemplateHandler, onSelectHandler]);
    const onClearErrorHandler = useCallback(() => setUpdateTemplateError(undefined), []);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const onFocusInHandler = keyboardModeEnabled ? onMouseEnterHandler : constVoid;
    const onFocusOutHandler = keyboardModeEnabled ? onMouseLeaveHandler : constVoid;
    return isEditable ? (React.createElement(CustomInputMenuItem, { error: updateTemplateError, onClearError: onClearErrorHandler, key: `${template.name}_${template.id}_${index}`, keyboardModeEnabled: keyboardModeEnabled, onEnter: onUpdateHandler, defaultValue: template.name, isActive: isEditable, onFocusOut: onDeselectTemplateHandler })) : (React.createElement(ChartIndicatorTemplateMenuItemStyled, { ariaDescribedBy: A11Y_INDICATOR_TEMPLATE_DESC_ID, key: `${template.name}_${template.id}_${index}`, testId: TEST_IDS.indicator_template_menu_item, value: template.name, keyboardModeEnabled: keyboardModeEnabled, onKeyDown: keyDownHandler, onFocus: onFocusInHandler, onBlur: onFocusOutHandler, onMouseLeave: onMouseLeaveHandler, onMouseEnter: onMouseEnterHandler, onSelect: onSelectHandler },
        React.createElement(ChartIndicatorTemplateMenuItemText, null, template.name),
        React.createElement(ChartIndicatorTemplateEditButton, { visible: isHovered, "aria-label": localization.indicatorTemplates.a11y_editIndicatorTemplate, "aria-hidden": true, tabIndex: -1, icon: React.createElement(IconWrapper, null, iconsConfig.indicatorsTemplate.edit), onClick: onEditTemplateHandler }),
        React.createElement(ChartIndicatorTemplateDeleteButton, { visible: isHovered, "aria-label": localization.indicatorTemplates.a11y_deleteIndicatorTemplate, "aria-hidden": true, tabIndex: -1, icon: React.createElement(IconWrapper, null, iconsConfig.indicatorsTemplate.delete), onClick: onDeleteHandler })));
});
