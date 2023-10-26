import * as React from 'react';
import { useContext } from 'react';
import { forwardRef, memo } from 'react';
import { ColorPickerPopoverAddColor, ColorPickerAgreeIconWrapperStyled, ColorPickerAgreeButtonPalleteStyled, } from './ColorPickerPlusAnchor.styled';
import { IconWrapper } from '../../IconWrapper/IconWrapper.component';
import { AddColorIcon } from '../icons/add-color.icon';
import { AgreeColorIcon } from '../icons/agree-color.icon';
import { getNewValidRGBAColor } from '../utils/color-picker-functions';
import { DEFAULT_NEW_COLOR } from '../ColorPicker.model';
import { MultiChartComponentContext } from '../../../chart/components/multi-chart/multi-chart-context';
import { getLabelTextColorByBackgroundColor } from '@devexperts/dxcharts-lite/dist/chart/utils/canvas/canvas-text-functions.utils';
const createdColorFallback = getNewValidRGBAColor(DEFAULT_NEW_COLOR.rgb().toString(), 100);
export const ColorPickerPlusAnchor = memo(forwardRef((props, ref) => {
    const { children, onClick, className, additionalProps } = props;
    const createdColor = additionalProps?.createdColor ?? '';
    const isPalleteOpened = additionalProps?.isPalleteOpened ?? false;
    const palleteColor = createdColor.length > 0 ? createdColor : createdColorFallback;
    const iconColor = getLabelTextColorByBackgroundColor(palleteColor, 'rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)');
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    return (React.createElement(React.Fragment, null,
        isPalleteOpened && (React.createElement(ColorPickerAgreeButtonPalleteStyled, { color: palleteColor },
            React.createElement(ColorPickerAgreeIconWrapperStyled, { iconColor: iconColor, width: 9, height: 7 }, AgreeColorIcon))),
        React.createElement(ColorPickerPopoverAddColor, { disabled: keyboardModeEnabled, ref: ref, onClick: onClick, className: className },
            React.createElement(IconWrapper, { width: 10, height: 10 }, AddColorIcon)),
        children));
}));
ColorPickerPlusAnchor.displayName = 'ColorPickerPlusAnchor';
