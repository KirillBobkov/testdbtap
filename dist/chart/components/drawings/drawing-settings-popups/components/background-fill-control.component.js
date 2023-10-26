import React, { memo, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { DrawingSettingsGroup } from '../../drawing-settings-section/drawing-settings-group';
import { DrawingSettingsItem } from '../../drawing-settings-section/drawing-settings-item';
import { DrawingSettingsCheckboxStyled } from '../../drawing-settings-section/drawing-settings-common.styled';
import { Checkbox } from '../../../../../chart-kit/Checkbox/Checkbox.component';
import Color from 'color';
import { OpacitySelector } from '../../../../../chart-kit/OpacitySelector/OpacitySelector.component';
import { option } from 'fp-ts';
import { ColorPickerSquareAnchor } from '../../../../../chart-kit/ColorPicker/anchors/ColorPickerSquareAnchor.component';
import { pipe } from 'fp-ts/function';
import { useUIOverride } from '../../../../ui-overrides';
import { DEFAULT_COLOR_PICKER } from '../../../../ui-overrides/color-picker';
const DEFAULT_OPACITY = 0.2;
const BackgroundFillControlWrapper = memo(props => {
    const { value, onValueChange, children } = props;
    const [lastAlpha, setLastAlpha] = useState(0.2);
    const updateFillBackground = useCallback((isFilled) => {
        if (!isFilled) {
            setLastAlpha(value.opacity || DEFAULT_OPACITY);
            onValueChange({
                ...value,
                opacity: 0,
            });
        }
        else {
            onValueChange({
                ...value,
                opacity: lastAlpha,
            });
        }
    }, [lastAlpha, onValueChange, value]);
    const updateBackgroundColor = useCallback((color) => {
        onValueChange({
            ...value,
            fillStyle: color,
            opacity: Color.rgb(color).alpha(),
        });
    }, [onValueChange, value]);
    const isTransparent = useMemo(() => value.opacity === 0, [value.opacity]);
    return children({
        isTransparent,
        updateBackgroundColor,
        updateFillBackground,
    });
});
export const BackgroundFillControl = memo(props => {
    const { drawingsDict, palette, value, showBackgroundCheckbox, renderWithWrap, parentEventTarget, className, disableBottomMargin, } = props;
    const backgroundColor = useMemo(() => Color.rgb(value.fillStyle || '')
        .alpha(pipe(option.fromNullable(value.opacity), option.getOrElse(() => 0)))
        .string(), [value.fillStyle, value.opacity]);
    const ColorPicker = useUIOverride(['ColorPickerComponent']) ?? DEFAULT_COLOR_PICKER;
    return (React.createElement(BackgroundFillControlWrapper, { ...props }, ({ isTransparent, updateBackgroundColor, updateFillBackground }) => (React.createElement(DrawingSettingsGroup, { disableMargin: disableBottomMargin, className: className },
        React.createElement(DrawingSettingsItem, null, renderWithWrap ? (React.createElement(ColorPicker, { palette: palette, value: backgroundColor, onValueChange: updateBackgroundColor, Anchor: ColorPickerSquareAnchor, parentEventTarget: parentEventTarget })) : (React.createElement(ColorPickerWrapper, null,
            React.createElement(ColorPicker, { palette: palette, value: backgroundColor, onValueChange: updateBackgroundColor, parentEventTarget: parentEventTarget })))),
        showBackgroundCheckbox && (React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: !isTransparent, onValueChange: updateFillBackground }),
                React.createElement("span", null, drawingsDict.popup.sections.background.title))))))));
});
export const BackgroundFillShortControl = memo(props => {
    const { drawingsDict, value, onValueChange } = props;
    const handleSetOpacity = useCallback((opacity) => {
        const decimalOpacity = opacity / 100;
        onValueChange({
            ...value,
            opacity: decimalOpacity,
        });
    }, [onValueChange, value]);
    const opacity = value.opacity === undefined ? DEFAULT_OPACITY : value.opacity;
    const persentOpacity = opacity * 100;
    return (React.createElement(BackgroundFillControlWrapper, { ...props }, ({ isTransparent, updateFillBackground }) => (React.createElement(DrawingSettingsGroup, null,
        React.createElement(DrawingSettingsItem, null,
            React.createElement(DrawingSettingsCheckboxStyled, null,
                React.createElement(Checkbox, { value: !isTransparent, onValueChange: updateFillBackground }),
                React.createElement("span", null, drawingsDict.popup.sections.background.title))),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(OpacitySelector, { value: persentOpacity, onChange: handleSetOpacity }))))));
});
export const ColorPickerWrapper = styled.div.withConfig({ displayName: "ColorPickerWrapper" }) ``;
