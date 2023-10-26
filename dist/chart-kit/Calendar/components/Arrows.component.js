import { isAfter, isBefore, isSameYear } from 'date-fns';
import React, { memo, useContext, useMemo } from 'react';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { ButtonIcon } from '../../Button/ButtonIcon.component';
import { Holdable } from '../../Holdable/Holdable.component';
import { IconWrapper } from '../../IconWrapper/IconWrapper.component';
import { RangeSide } from '../Calendar.model';
import { _addYears, _subYears, compareDates } from '../calendar.utils';
import { ArrowsButtonContainerStyled, ArrowsContainerStyled, ArrowsStyled } from './Arrows.styled';
export const Arrows = memo(props => {
    const { min, max, rangeSide, singleMode, currentDate, selectedDate, onNextYearClick, onPrevYearClick } = props;
    const isNextDisabled = useMemo(() => compareDates(max, currentDate, isSameYear) ||
        compareDates(currentDate, max, isAfter) ||
        (!singleMode &&
            rangeSide === RangeSide.From &&
            (compareDates(_addYears(selectedDate.from, 1), selectedDate.to, isAfter) ||
                compareDates(selectedDate.from, selectedDate.to, isSameYear))), [currentDate, max, rangeSide, selectedDate.from, selectedDate.to, singleMode]);
    const isPreviousDisabled = useMemo(() => compareDates(min, currentDate, isSameYear) ||
        compareDates(currentDate, min, isBefore) ||
        (!singleMode &&
            rangeSide === RangeSide.To &&
            (compareDates(_subYears(selectedDate.to, 1), selectedDate.from, isBefore) ||
                compareDates(selectedDate.from, selectedDate.to, isSameYear))), [currentDate, min, rangeSide, selectedDate.from, selectedDate.to, singleMode]);
    const iconsConfig = useContext(IconsOverridingContext);
    return (React.createElement(ArrowsStyled, null,
        React.createElement(ArrowsContainerStyled, null,
            React.createElement(Holdable, { onHold: onNextYearClick, isDisabled: isNextDisabled },
                React.createElement(ArrowsButtonContainerStyled, { isDisabled: isNextDisabled },
                    React.createElement(ButtonIcon, { icon: React.createElement(IconWrapper, { width: 12, height: 12 }, iconsConfig.calendar.up), tabIndex: -1, onClick: onNextYearClick, disabled: isNextDisabled }))),
            React.createElement(Holdable, { onHold: onPrevYearClick, isDisabled: isPreviousDisabled },
                React.createElement(ArrowsButtonContainerStyled, { isDisabled: isPreviousDisabled },
                    React.createElement(ButtonIcon, { icon: React.createElement(IconWrapper, { width: 12, height: 12 }, iconsConfig.calendar.down), tabIndex: -1, onClick: onPrevYearClick, disabled: isPreviousDisabled }))))));
});
