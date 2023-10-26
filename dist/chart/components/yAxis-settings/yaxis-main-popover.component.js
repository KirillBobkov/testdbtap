import { isSome, none, some } from 'fp-ts/Option';
import { constVoid } from 'fp-ts/function';
import React, { useCallback, useContext, useMemo } from 'react';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { ChartReactAppContext } from '../../defaults';
import { YAxisPopoverMenuItemContentIconStyled, YAxisPopoverMenuItemContentStyled, YAxisPopoverMenuItemContentTextStyled, YAxisPopoverMenuItemLabelsAndLinesStyled, YAxisPopoverMenuItemStyled, } from './yaxis-confiigurator-popover.styled';
import { YAxisMainPopoverDivider, YAxisMainPopoverMainSectionStyled, YAxisMainPopoverMenuContainerStyled, YAxisMainPopoverMenuItemContentArrowIconStyled, YAxisMainPopoverStyled, YAxisMainSettingsItemLabelsAndLinesStyled, } from './yaxis-main-popover.styled';
import { RightClickPopoverMenuItemLabelStyled, RightClickPopoverMenuStyled, } from '../right-click-menu/right-click-menu.styled';
import { YAxisLabelsPopover } from './yaxis-labels-popover.component';
const yAxisAlignReversed = {
    left: 'right',
    right: 'left',
};
export const YAxisMainPopover = React.memo(props => {
    const { onClose, popoverCoordinates, isOpened, config, changeFitType, toggleAutoScale, toggleAxisType, labelPopoverOpen, toggleLabelsPopup, yAxisDict, toggleLockPriceToBarRatio, togglePriceScaleInverse, setAxisAlign, labelsAndLinesRef, position, onLabelClose, labelsConfig, setLabelMode, selectCountDownBarClose, selectDescription, labelsPopoverPosition, } = props;
    const onLabelAndLineHover = useCallback(() => {
        !labelPopoverOpen && toggleLabelsPopup(true);
    }, [toggleLabelsPopup, labelPopoverOpen]);
    const onLabelAndLineLeaveHandler = useCallback(() => {
        labelPopoverOpen && toggleLabelsPopup(false);
    }, [toggleLabelsPopup, labelPopoverOpen]);
    const onRequestClose = useCallback(() => {
        !labelPopoverOpen && onClose();
    }, [labelPopoverOpen, onClose]);
    const axisType = useMemo(() => ({
        regular: config.chartCore.components.yAxis.type === 'regular',
        percent: config.chartCore.components.yAxis.type === 'percent',
        logarithmic: config.chartCore.components.yAxis.type === 'logarithmic',
    }), [config.chartCore.components.yAxis.type]);
    const { auto, lockPriceToBarRatio } = config.chartCore.scale;
    const { align: axisAlignType } = config.chartCore.components.yAxis;
    const fit = useMemo(() => ({
        studies: config.chartReact.scale.fit.studies,
        orders: config.chartReact.scale.fit.orders,
        positions: config.chartReact.scale.fit.positions,
    }), [
        config.chartReact.scale.fit.studies,
        config.chartReact.scale.fit.orders,
        config.chartReact.scale.fit.positions,
    ]);
    const scaleAppearance = {
        inverse: config.chartCore.scale.inverse,
    };
    const onChangeFitTypeHandler = React.useCallback((item) => {
        const fitType = textToFitType(item);
        if (isSome(fitType)) {
            changeFitType(fitType.value, !fit[fitType.value]);
            if (!fit[fitType.value] || (!auto && fit[fitType.value])) {
                toggleAutoScale(true);
            }
        }
        onRequestClose();
    }, [auto, changeFitType, fit, toggleAutoScale, onRequestClose]);
    const onToggleAutoScaleHandler = React.useCallback(() => {
        toggleAutoScale(!auto);
        onRequestClose();
    }, [toggleAutoScale, auto, onRequestClose]);
    const onChangeAxisTypeHandler = React.useCallback((item) => {
        switch (item) {
            case 'logarithmic':
                toggleAxisType('logarithmic');
                break;
            case 'percent':
                toggleAxisType('percent');
                break;
            case 'regular':
            default:
                toggleAxisType('regular');
        }
        onRequestClose();
    }, [toggleAxisType, onRequestClose]);
    const onChangeScaleAppearanceHandler = useCallback((item) => {
        switch (item) {
            case 'inverse':
                togglePriceScaleInverse();
                break;
        }
        onRequestClose();
    }, [togglePriceScaleInverse, onRequestClose]);
    const toggleLockPriceToBarRatioHandler = useCallback(() => {
        toggleLockPriceToBarRatio();
        onRequestClose();
    }, [toggleLockPriceToBarRatio, onRequestClose]);
    const onChangeAxisAlignHandler = React.useCallback((item) => {
        switch (item) {
            case 'right':
                setAxisAlign('left');
                break;
            case 'left':
            default:
                setAxisAlign('right');
        }
        onRequestClose();
    }, [onRequestClose, setAxisAlign]);
    const { isMobile } = useContext(ChartReactAppContext);
    const iconsConfig = useContext(IconsOverridingContext);
    return (React.createElement(React.Fragment, null,
        React.createElement(YAxisMainPopoverStyled, { customPosition: popoverCoordinates, opened: isOpened, onRequestClose: onRequestClose, align: "start", position: position },
            React.createElement(YAxisMainPopoverMenuContainerStyled, null,
                React.createElement(YAxisMainPopoverMainSectionStyled, { onTouchStart: onLabelAndLineLeaveHandler },
                    React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onToggleAutoScaleHandler },
                        React.createElement(YAxisPopoverMenuItemStyled, { disabled: axisType.percent, key: `item-auto-0`, value: "auto" }, renderSettingsItem(yAxisDict.auto, auto, React.createElement(IconWrapper, null, iconsConfig.yAxisMainPopover.checkboxTick)))),
                    React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onChangeFitTypeHandler }, Object.entries(fit).map(([settingName, settingValue], index) => (React.createElement(YAxisPopoverMenuItemStyled, { disabled: axisType.percent, key: `item-${settingName}-${index}`, value: settingName }, renderSettingsItem(yAxisDict.fit[settingName], settingValue, React.createElement(IconWrapper, null, auto && iconsConfig.yAxisMainPopover.checkboxTick), !auto))))),
                    React.createElement(YAxisMainPopoverDivider, null),
                    React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onChangeScaleAppearanceHandler }, Object.entries(scaleAppearance).map(([settingName, settingValue], index) => {
                        return (React.createElement(YAxisPopoverMenuItemStyled, { disabled: false, key: `item-${settingName}-${index}`, value: settingName }, renderSettingsItem(yAxisDict.scale[settingName], settingValue, React.createElement(IconWrapper, null, iconsConfig.yAxisMainPopover.checkboxTick))));
                    })),
                    React.createElement(RightClickPopoverMenuStyled, { onItemSelect: toggleLockPriceToBarRatioHandler },
                        React.createElement(YAxisPopoverMenuItemStyled, { key: `item-lock`, value: yAxisDict.scale.lock }, renderSettingsItem(yAxisDict.scale.lock, lockPriceToBarRatio, React.createElement(IconWrapper, null, iconsConfig.yAxisMainPopover.checkboxTick)))),
                    React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onChangeAxisAlignHandler },
                        React.createElement(YAxisPopoverMenuItemStyled, { key: `item-axis-align`, value: axisAlignType },
                            React.createElement(RightClickPopoverMenuItemLabelStyled, null, yAxisDict.axisAlign[yAxisAlignReversed[axisAlignType]]))),
                    React.createElement(YAxisMainPopoverDivider, null),
                    React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onChangeAxisTypeHandler }, Object.entries(axisType).map(([settingName], index) => (React.createElement(YAxisPopoverMenuItemStyled, { key: `item-${settingName}-${index}`, value: settingName, disabled: lockPriceToBarRatio }, renderSettingsItem(yAxisDict.axisType[settingName], axisType[settingName], React.createElement(IconWrapper, null, iconsConfig.yAxisMainPopover.checkboxTick))))))),
                React.createElement(YAxisMainPopoverDivider, null),
                React.createElement(RightClickPopoverMenuStyled, null,
                    React.createElement("div", { ref: labelsAndLinesRef },
                        React.createElement(YAxisPopoverMenuItemLabelsAndLinesStyled, { value: "labelsAndLines" },
                            React.createElement("div", { style: { width: '100%', display: 'flex', alignItems: 'center' }, onClick: isMobile ? onLabelAndLineHover : constVoid, onMouseEnter: isMobile ? constVoid : onLabelAndLineHover, onMouseLeave: isMobile ? constVoid : onLabelAndLineLeaveHandler },
                                React.createElement(YAxisMainSettingsItemLabelsAndLinesStyled, null, renderSettingsItem(yAxisDict.labelsAndLines, true, React.createElement(IconWrapper, null, iconsConfig.yAxisMainPopover.reverseLabel), false, React.createElement(IconWrapper, null, iconsConfig.yAxisMainPopover.arrow))),
                                React.createElement(YAxisLabelsPopover, { isOpened: labelPopoverOpen, onClose: onLabelClose, labelsConfig: labelsConfig, changeLabelMode: setLabelMode, labelsPopoverRef: labelsAndLinesRef, selectCountDownBarClose: selectCountDownBarClose, selectDescription: selectDescription, yAxisDict: yAxisDict, align: "start", position: labelsPopoverPosition })))))))));
});
export const renderSettingsItem = (settingName, active, icon, disabled, nestedMenuIcon) => {
    return (React.createElement(YAxisPopoverMenuItemContentStyled, { disabled: disabled },
        React.createElement(YAxisPopoverMenuItemContentIconStyled, { disabled: disabled }, active && icon),
        React.createElement(YAxisPopoverMenuItemContentTextStyled, null, settingName),
        nestedMenuIcon && (React.createElement(YAxisMainPopoverMenuItemContentArrowIconStyled, null, nestedMenuIcon))));
};
const textToFitType = (value) => {
    switch (value) {
        case 'orders':
        case 'positions':
        case 'studies':
            return some(value);
        default:
            return none;
    }
};
