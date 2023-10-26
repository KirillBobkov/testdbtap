import React, { useCallback } from 'react';
import { SliderSelectItemStyled, SliderSelectItemIconStyled } from './slider-select-item.styled';
import { typedMemo } from '../../utils/typed-memo';
const RawSliderSelectItem = (props) => {
    const { value, onItemSelect, isActive, icon, children, className } = props;
    const onItemSelectHandler = useCallback(() => onItemSelect(value), [onItemSelect, value]);
    return (React.createElement(SliderSelectItemStyled, { className: className, onClick: onItemSelectHandler, isActive: isActive }, icon ? React.createElement(SliderSelectItemIconStyled, null, icon) : children));
};
export const SliderSelectItem = typedMemo(RawSliderSelectItem);
