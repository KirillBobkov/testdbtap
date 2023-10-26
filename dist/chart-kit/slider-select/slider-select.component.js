import React from 'react';
import { SliderSelectContainerStyled } from './slider-select.styled';
import { SliderSelectItem } from './slider-select-item.component';
import { typedMemo } from '../../utils/typed-memo';
export const RawSliderSelect = (props) => {
    const { options, value, onValueChange, className } = props;
    return (React.createElement(SliderSelectContainerStyled, { className: className }, options.map(option => (React.createElement(SliderSelectItem, { ...option, key: option.value, isActive: value === option.value, onItemSelect: onValueChange })))));
};
export const SliderSelect = typedMemo(RawSliderSelect);
