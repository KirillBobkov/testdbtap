import React, { forwardRef, useCallback, useState, memo, useContext } from 'react';
import { LineMenuItemContentWrapperStyled, LineMenuItemStyled, LineStyleMenuStyled, LineMenuItemContentStyled, LineMenuItemIconStyled, LineMenuItemTextStyled, LineMenuSeparatorStyled, LineStyleMenuWrapperStyled, LineStylePickerDropdownStyled, } from './LineStylePicker.styled';
import { IconsOverridingContext } from '../../utils/icons-overriding-context';
import { IconWrapper } from '../IconWrapper/IconWrapper.component';
import { toCanvasLineWidth } from '../../utils/drawing.utils';
import { LineStyleAnchor } from './anchor/LineStyleAnchor.component';
import { MultiChartComponentContext } from '../../chart/components/multi-chart/multi-chart-context';
const widths = ['thin', 'normal', 'semibold', 'bold'];
export const LineStylePicker = memo(props => {
    const { value, onValueChange, isDisabled, Anchor = LineStyleAnchor, ...rest } = props;
    const [isOpened, setIsOpened] = useState(false);
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const onToggle = useCallback((val) => {
        if (typeof val === 'boolean') {
            setIsOpened(val);
        }
    }, []);
    function isLineWidth(lineWidth) {
        return widths.some(t => t === lineWidth);
    }
    const onItemSelect = useCallback((lineWidth) => {
        if (isLineWidth(lineWidth)) {
            const lineStyle = {
                lineWidth,
                lineDash: value.lineDash,
            };
            onValueChange(lineStyle);
            setIsOpened(false);
        }
    }, [value, onValueChange]);
    const onDashedSelect = useCallback((dash) => {
        const lineDash = dash === 'dashed' ? 'solid' : 'dashed';
        const lineStyle = {
            lineWidth: value.lineWidth,
            lineDash,
        };
        onValueChange(lineStyle);
        setIsOpened(false);
    }, [value.lineWidth, onValueChange]);
    const renderAnchor = useCallback(forwardRef((props, ref) => {
        const { children, onClick } = props;
        return (React.createElement(Anchor, { isDisabled: isDisabled, lineDash: value.lineDash, lineWidth: value.lineWidth, ref: ref, onClick: onClick }, children));
    }), [value.lineDash, value.lineWidth]);
    return (React.createElement(LineStylePickerDropdownStyled, { ...rest, Anchor: renderAnchor, onToggle: onToggle, isOpened: isOpened, anchorAdditionalProps: {
            lineWidth: value.lineWidth,
            lineDash: value.lineDash,
        } },
        !isOpened && React.createElement("span", null, value.lineWidth),
        isOpened && (React.createElement(LineStyleMenuWrapperStyled, null,
            React.createElement(LineStyleMenuStyled, { onItemSelect: onItemSelect }, widths.map(width => {
                const isActive = width === value.lineWidth;
                return (React.createElement(LineMenuItemStyled, { key: width, value: width },
                    React.createElement(LineMenuItemContentWrapperStyled, null,
                        React.createElement(LineMenuItemIconStyled, null, isActive && React.createElement(IconWrapper, null, iconsConfig.lineStylePicker.tick)),
                        React.createElement(LineMenuItemContentStyled, { lineWidth: toCanvasLineWidth(width) }))));
            })),
            React.createElement(LineMenuSeparatorStyled, null),
            React.createElement(LineStyleMenuStyled, { onItemSelect: onDashedSelect },
                React.createElement(LineMenuItemStyled, { value: value.lineDash },
                    React.createElement(LineMenuItemContentWrapperStyled, null,
                        React.createElement(LineMenuItemIconStyled, null, value.lineDash === 'dashed' && (React.createElement(IconWrapper, null, iconsConfig.lineStylePicker.tick))),
                        React.createElement(LineMenuItemTextStyled, null, localization.components.lineStylePicker.dashed))))))));
});
LineStylePicker.displayName = 'LineStylePicker';
