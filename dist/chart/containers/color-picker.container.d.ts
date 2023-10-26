import React from 'react';
import { CKColorPickerProps } from '../../chart-kit/ColorPicker/ColorPicker.component';
import { ColorsViewModel } from '../view-models/colors.view-model';
import { UserDataViewModel } from '../view-models/user-data.view-model';
export declare const ColorPickerContainer: import("../../context/context2").Context<Record<"colorsViewModel", ColorsViewModel>, React.FC<CKColorPickerProps>>;
interface ColorPickerOverridingContextProps {
}
export declare const ColorPickerOverridingContext: import("../../context/context2").Context<Omit<Record<"colorsViewModel", ColorsViewModel>, "colorsViewModel"> & Record<"userDataViewModel", UserDataViewModel> & Record<"colorPalette", string[]>, React.NamedExoticComponent<React.PropsWithChildren<ColorPickerOverridingContextProps>>>;
export {};
