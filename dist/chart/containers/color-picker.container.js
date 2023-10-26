import React, { memo } from 'react';
import { context } from '../../context/context2';
import { useObservable } from '../../utils/use-observable';
import { useSink } from '../../utils/use-sink';
import { createColorsViewModel } from '../view-models/colors.view-model';
import { UIOverridesContext, useUIOverride } from '../ui-overrides';
import { DEFAULT_COLOR_PICKER } from '../ui-overrides/color-picker';
const ColorPicker = DEFAULT_COLOR_PICKER;
export const ColorPickerContainer = context.combine(context.key()('colorsViewModel'), (vm) => {
    const ColorPickerComponent = props => {
        const customColors = useObservable(vm.customColors, []);
        return React.createElement(ColorPicker, { ...props, customColors: customColors });
    };
    return ColorPickerComponent;
});
export const ColorPickerOverridingContext = context.combine(context.defer(ColorPickerContainer, 'colorsViewModel'), context.key()('userDataViewModel'), context.key()('colorPalette'), (ColorPickerComponentDefer, userDataViewModel, colorPalette) => memo(props => {
    const colorsViewModel = useSink(() => createColorsViewModel({
        userDataViewModel,
        colorPalette,
    }).value, [userDataViewModel, colorPalette]);
    const DefaultColorPickerComponentResolved = useSink(() => ColorPickerComponentDefer({
        colorsViewModel,
    }), [colorsViewModel]);
    const restComponents = React.useContext(UIOverridesContext);
    const OverridenColorPicker = useUIOverride(['ColorPickerComponent']) ?? DefaultColorPickerComponentResolved;
    return (React.createElement(UIOverridesContext.Provider, { value: { ...restComponents, ColorPickerComponent: OverridenColorPicker } }, props.children));
}));
