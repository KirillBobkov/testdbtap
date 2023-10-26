import React, { useContext, useRef, useCallback } from 'react';
import { YAxisLinesPopoverMenuContainerStyled, YAxisLinesPopoverDivider } from './yaxis-labels-popover.styled';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { YAxisPopoverMenuItemContentStyled, YAxisPopoverMenuItemStyled, YAxisPopoverMenuItemContentIconStyled, YAxisPopoverMenuItemContentTextSubStyled, } from './yaxis-confiigurator-popover.styled';
import { useA11yPopFocusController } from '../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { useA11yModalTabKeyHandler } from '../../../chart-kit/accessibility/use-a11y-modal-tab-key-handler';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { Popover } from '../../../chart-kit/Popover/Popover.lazy-component';
import { RightClickPopoverMenuStyled } from '../right-click-menu/right-click-menu.styled';
const labelModeSelectionOrder = ['none', 'label', 'line', 'line-label'];
const getNextOption = (mode) => {
    const index = (labelModeSelectionOrder.indexOf(mode) + 1) % labelModeSelectionOrder.length;
    return labelModeSelectionOrder[index];
};
export const YAxisLabelsPopover = React.memo(props => {
    const { onClose, isOpened, labelsConfig: { labels, descriptions, countDownToBarClose }, changeLabelMode, selectDescription, selectCountDownBarClose, yAxisDict, position, align, labelsPopoverRef, selectorRef = labelsPopoverRef, } = props;
    const popoverRef = useRef(null);
    const onChangeLabelAndLineHandler = React.useCallback((value) => {
        // eslint-disable-next-line no-restricted-syntax
        const type = value;
        const mode = labels[type];
        if (value && mode) {
            changeLabelMode(type, getNextOption(mode));
        }
    }, [changeLabelMode, labels]);
    const onCountDownBarCloseHandler = () => {
        selectCountDownBarClose(!countDownToBarClose);
    };
    const onSelectDescriptionHandler = () => {
        selectDescription(!descriptions);
    };
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const labelIcons = {
        none: React.createElement("span", null),
        'line-label': React.createElement(IconWrapper, null, iconsConfig.yAxisLabelsPopover.lineLabel),
        label: React.createElement(IconWrapper, null, iconsConfig.yAxisLabelsPopover.label),
        line: React.createElement(IconWrapper, null, iconsConfig.yAxisLabelsPopover.line),
    };
    const setPopoverRefHandler = useCallback((node) => {
        popoverRef.current = node;
    }, []);
    useA11yPopFocusController({
        anchorRef: selectorRef,
        popRef: popoverRef,
    });
    const tabKeyHandler = useA11yModalTabKeyHandler(popoverRef);
    return (React.createElement(Popover, { onTabPress: tabKeyHandler, keyboardMode: keyboardModeEnabled, opened: isOpened, onRequestClose: onClose, selectorRef: selectorRef, anchorRef: labelsPopoverRef, align: align, 
        // top use to be on one horizontal line with hovered anchor
        style: { top: '4px' }, position: position },
        React.createElement(YAxisLinesPopoverMenuContainerStyled, { ref: setPopoverRefHandler },
            React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onChangeLabelAndLineHandler }, Object.entries(labels).map(([name, mode], index) => mode ? (React.createElement(YAxisPopoverMenuItemStyled, { key: `item-${name}-${index}`, value: name },
                React.createElement(YAxisPopoverMenuItemContentStyled, null,
                    React.createElement(YAxisPopoverMenuItemContentIconStyled, null, labelIcons[mode]),
                    React.createElement(YAxisPopoverMenuItemContentTextSubStyled, null, yAxisDict.labels[name])))) : null)),
            React.createElement(YAxisLinesPopoverDivider, null),
            React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onSelectDescriptionHandler },
                React.createElement(YAxisPopoverMenuItemStyled, { value: 'descriptions' },
                    React.createElement(YAxisPopoverMenuItemContentStyled, null,
                        React.createElement(YAxisPopoverMenuItemContentIconStyled, null, descriptions && (React.createElement(IconWrapper, null, iconsConfig.yAxisLabelsPopover.checkboxTick))),
                        React.createElement(YAxisPopoverMenuItemContentTextSubStyled, null, yAxisDict.descriptions)))),
            React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onCountDownBarCloseHandler },
                React.createElement(YAxisPopoverMenuItemStyled, { value: 'countDownBarClose' },
                    React.createElement(YAxisPopoverMenuItemContentStyled, null,
                        React.createElement(YAxisPopoverMenuItemContentIconStyled, null, countDownToBarClose && (React.createElement(IconWrapper, null, iconsConfig.yAxisLabelsPopover.checkboxTick))),
                        React.createElement(YAxisPopoverMenuItemContentTextSubStyled, null, yAxisDict.countDownToBarClose)))))));
});
