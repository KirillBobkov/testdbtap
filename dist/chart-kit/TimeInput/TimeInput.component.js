import { __decorate } from "tslib";
import React, { forwardRef, memo, useContext } from 'react';
import { isSome, map, none, some, toNullable } from 'fp-ts/Option';
import { add, findActiveSectionOnKeyLeft, findActiveSectionOnKeyRight, formatNumericValue, formatTimePeriod, isDefined, isTimesDifferent, MAX_VALID_HOURS_FOR_12H_FORMAT, MAX_VALID_HOURS_FOR_24H_FORMAT, MAX_VALID_MINS_AND_SEC, PeriodTypeMap, renderSection, Section, togglePeriodType, } from './TimeInput.model';
import { pipe } from 'fp-ts/function';
import { KEY_CODE_LETR_MAP, KEY_CODE_NUM_MAP } from '../Control/Control';
import { SeparatorStyled, SectionStyled, TimeInputContainerStyled, TimeInputContentStyled } from './TimeInput.styled';
import { IconWrapper } from '../IconWrapper/IconWrapper.component';
import { SteppableInput } from '../SteppableInput/SteppableInput.component';
import { PURE } from '../../utils/pure';
import { IconsOverridingContext } from '../../utils/icons-overriding-context';
import { InputStyled } from '../SteppableInput/SteppableInput.styled';
export const SITimeInput = memo(forwardRef((props, ref) => {
    return React.createElement(InputStyled, { ref: ref, ...props });
}));
let TimeInputRaw = class TimeInputRaw extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        // Helper, which helps to detect order of input in the two-digit field;
        this.secondInput = false;
        this.onHoursMouseDown = (e) => {
            if (!this.props.isDisabled) {
                this.setState({
                    activeSection: Section.Hours,
                });
                this.secondInput = false;
                this.correctTimeAndUpdate();
            }
        };
        this.onMinutesMouseDown = (e) => {
            if (!this.props.isDisabled) {
                this.setState({
                    activeSection: Section.Minutes,
                });
                this.secondInput = false;
                this.correctTimeAndUpdate();
            }
        };
        this.onSecondsMouseDown = (e) => {
            if (!this.props.isDisabled) {
                this.setState({
                    activeSection: Section.Seconds,
                });
                this.secondInput = false;
                this.correctTimeAndUpdate();
            }
        };
        this.onPeriodTypeMouseDown = () => {
            if (!this.props.isDisabled) {
                this.setState({
                    activeSection: Section.PeriodType,
                });
                this.secondInput = false;
                this.correctTimeAndUpdate();
            }
        };
        this.onIncrement = () => {
            this.secondInput = false;
            this.step(1);
        };
        this.onDecrement = () => {
            this.secondInput = false;
            this.step(-1);
        };
        this.onClear = () => {
            this.secondInput = false;
            this.updateTime(none, none, none, none);
        };
        this.onFocus = () => {
            this.secondInput = false;
            if (!isDefined(this.state.activeSection)) {
                this.setState({
                    activeSection: Section.Hours,
                });
            }
        };
        this.onBlur = () => {
            this.secondInput = false;
            this.correctTimeAndUpdate();
            this.setState({
                activeSection: undefined,
            });
        };
        this.onKeyDown = (e) => {
            e.stopPropagation();
            const { activeSection } = this.state;
            const { withSeconds, withPeriodType } = this.props;
            const { hours, minutes, seconds, periodType } = this.props.value;
            switch (e.code) {
                case 'ArrowLeft': {
                    e.preventDefault(); //block h-scrolling
                    this.secondInput = false;
                    this.correctTimeAndUpdate();
                    this.setState({
                        activeSection: findActiveSectionOnKeyLeft(activeSection, withSeconds),
                    });
                    break;
                }
                case 'ArrowRight': {
                    e.preventDefault(); //block h-scrolling
                    this.secondInput = false;
                    this.correctTimeAndUpdate();
                    this.setState({
                        activeSection: findActiveSectionOnKeyRight(activeSection, withSeconds, withPeriodType),
                    });
                    break;
                }
                case 'Delete': //fallthrough
                case 'Backspace': {
                    this.secondInput = false;
                    switch (activeSection) {
                        case Section.Hours: {
                            this.updateTime(none, minutes, seconds, periodType);
                            break;
                        }
                        case Section.Minutes: {
                            this.updateTime(hours, none, seconds, periodType);
                            break;
                        }
                        case Section.Seconds: {
                            this.updateTime(hours, minutes, none, periodType);
                            break;
                        }
                    }
                    break;
                }
                default: {
                    const keyCode = e.code;
                    const number = KEY_CODE_NUM_MAP[keyCode];
                    const letter = KEY_CODE_LETR_MAP[keyCode];
                    if (isDefined(number)) {
                        this.handleDigitKeyDown(number);
                    }
                    else if (isDefined(letter)) {
                        this.handleLetterKeyDown(letter);
                    }
                }
            }
        };
    }
    render() {
        const { decrementIcon, incrementIcon, isDisabled, clearIcon, error, value, SteppableInput } = this.props;
        const { hours, minutes, seconds, periodType } = value;
        const { withSeconds, withPeriodType } = this.props;
        const onClear = isSome(hours) || isSome(minutes) ? this.onClear : undefined;
        const { activeSection } = this.state;
        return (React.createElement(SteppableInput, { isDisabled: isDisabled, onBlur: this.onBlur, error: error, onFocus: this.onFocus, decrementIcon: decrementIcon, incrementIcon: incrementIcon, clearIcon: clearIcon, onKeyDown: this.onKeyDown, onClear: onClear, onDecrement: this.onDecrement, onIncrement: this.onIncrement, Input: SITimeInput },
            React.createElement(TimeInputContentStyled, { tabIndex: 0 },
                React.createElement(SectionStyled, { isActive: !isDisabled && activeSection === Section.Hours, onMouseDown: this.onHoursMouseDown }, renderSection(pipe(hours, map(formatNumericValue)))),
                React.createElement(SeparatorStyled, null, ":"),
                React.createElement(SectionStyled, { isActive: !isDisabled && activeSection === Section.Minutes, onMouseDown: this.onMinutesMouseDown }, renderSection(pipe(minutes, map(formatNumericValue)))),
                withSeconds && (React.createElement(React.Fragment, null,
                    React.createElement(SeparatorStyled, null, ":"),
                    React.createElement(SectionStyled, { isActive: !isDisabled && activeSection === Section.Seconds, onMouseDown: this.onSecondsMouseDown }, renderSection(pipe(seconds, map(formatNumericValue)))))),
                withPeriodType && (React.createElement(React.Fragment, null,
                    "\u00A0",
                    React.createElement(SectionStyled, { isActive: !isDisabled && activeSection === Section.PeriodType, onMouseDown: this.onPeriodTypeMouseDown }, renderSection(pipe(periodType, map(formatTimePeriod)))))))));
    }
    handleLetterKeyDown(letter) {
        const { hours, minutes, seconds } = this.props.value;
        const { activeSection } = this.state;
        if (activeSection === Section.PeriodType) {
            if (letter === KEY_CODE_LETR_MAP['KeyA']) {
                this.updateTime(hours, minutes, seconds, some(PeriodTypeMap.AM));
            }
            else if (letter === KEY_CODE_LETR_MAP['KeyP']) {
                this.updateTime(hours, minutes, seconds, some(PeriodTypeMap.PM));
            }
        }
    }
    handleDigitKeyDown(digit) {
        const { activeSection } = this.state;
        const { withPeriodType = false, withSeconds = false } = this.props;
        const { hours, minutes, seconds, periodType } = this.props.value;
        switch (activeSection) {
            case Section.Hours: {
                if (this.secondInput && isSome(hours)) {
                    let newHours;
                    if (!withPeriodType) {
                        if (hours.value < 2) {
                            newHours = Number(`${hours.value}${digit}`);
                        }
                        else if (hours.value === 2) {
                            newHours = Math.min(Number(`${hours.value}${digit}`), MAX_VALID_HOURS_FOR_24H_FORMAT);
                        }
                        else {
                            newHours = digit;
                        }
                        this.updateTime(some(newHours), minutes, seconds, periodType);
                        this.setState({
                            activeSection: Section.Minutes,
                        });
                        this.secondInput = false;
                    }
                    else {
                        if (hours.value < 2) {
                            newHours = Math.min(Number(`${hours.value}${digit}`), MAX_VALID_HOURS_FOR_12H_FORMAT);
                        }
                        else {
                            newHours = digit;
                        }
                        this.updateTime(some(newHours), minutes, seconds, periodType);
                        this.setState({
                            activeSection: Section.Minutes,
                        });
                        this.secondInput = false;
                    }
                }
                else {
                    this.updateTime(some(digit), minutes, seconds, periodType);
                    if (digit > 2 && !withPeriodType) {
                        this.setState({
                            activeSection: Section.Minutes,
                        });
                        this.secondInput = false;
                    }
                    else if (digit > 1 && withPeriodType) {
                        this.setState({
                            activeSection: Section.Minutes,
                        });
                        this.secondInput = false;
                    }
                    else {
                        this.secondInput = true;
                    }
                }
                break;
            }
            case Section.Minutes: {
                if (!withSeconds) {
                    let newMinutes;
                    if (this.secondInput) {
                        newMinutes = isSome(minutes) ? Number(`${minutes.value % 10}${digit}`) : digit;
                    }
                    else {
                        newMinutes = digit;
                        this.secondInput = true;
                    }
                    this.updateTime(hours, some(newMinutes), seconds, periodType);
                }
                else {
                    if (this.secondInput && isSome(minutes)) {
                        const newMinutes = Number(`${minutes.value}${digit}`);
                        this.updateTime(hours, some(newMinutes), seconds, periodType);
                        if (withSeconds) {
                            this.setState({
                                activeSection: Section.Seconds,
                            });
                        }
                        else if (withPeriodType) {
                            this.setState({
                                activeSection: Section.PeriodType,
                            });
                        }
                        this.updateTime(hours, some(newMinutes), seconds, periodType);
                        this.secondInput = false;
                    }
                    else {
                        const newMinutes = digit;
                        if (digit > 5 && (withPeriodType || withSeconds)) {
                            if (withSeconds) {
                                this.setState({
                                    activeSection: Section.Seconds,
                                });
                            }
                            else if (withPeriodType) {
                                this.setState({
                                    activeSection: Section.PeriodType,
                                });
                            }
                            this.secondInput = false;
                        }
                        else {
                            this.secondInput = true;
                        }
                        this.updateTime(hours, some(newMinutes), seconds, periodType);
                    }
                }
                break;
            }
            case Section.Seconds: {
                let newSeconds;
                if (this.secondInput) {
                    newSeconds = isSome(seconds) ? Number(`${seconds.value % 10}${digit}`) : digit;
                }
                else {
                    newSeconds = digit;
                    this.secondInput = true;
                }
                this.updateTime(hours, minutes, some(newSeconds), periodType);
                break;
            }
        }
    }
    step(amount) {
        const { activeSection } = this.state;
        const { withPeriodType } = this.props;
        const { hours, minutes, seconds, periodType } = this.props.value;
        switch (activeSection) {
            case Section.Hours: {
                if (withPeriodType) {
                    this.updateTime(add(hours, amount, MAX_VALID_HOURS_FOR_12H_FORMAT), minutes, seconds, periodType);
                }
                else {
                    this.updateTime(add(hours, amount, MAX_VALID_HOURS_FOR_24H_FORMAT), minutes, seconds, periodType);
                }
                break;
            }
            case Section.Minutes: {
                this.updateTime(hours, add(minutes, amount, MAX_VALID_MINS_AND_SEC), seconds, periodType);
                break;
            }
            case Section.Seconds: {
                this.updateTime(hours, minutes, add(seconds, amount, MAX_VALID_MINS_AND_SEC), periodType);
                break;
            }
            case Section.PeriodType: {
                this.updateTime(hours, minutes, seconds, togglePeriodType(periodType));
                break;
            }
        }
    }
    updateTime(newHours, newMinutes, newSeconds, newPeriodType) {
        const { onValueChange, value } = this.props;
        const { hours, minutes, seconds, periodType } = value;
        isTimesDifferent({
            hours: newHours,
            minutes: newMinutes,
            seconds: newSeconds,
            periodType: newPeriodType,
        }, {
            hours,
            minutes,
            seconds,
            periodType,
        }) &&
            onValueChange &&
            onValueChange({
                hours: newHours,
                minutes: newMinutes,
                seconds: newSeconds,
                periodType: newPeriodType,
            });
    }
    correctTimeAndUpdate() {
        const { minutes, hours, seconds, periodType } = this.props.value;
        const isMinutesInvalid = pipe(minutes, map(min => min > MAX_VALID_MINS_AND_SEC));
        const isSecondsInvalid = pipe(seconds, map(sec => sec > MAX_VALID_MINS_AND_SEC));
        if (toNullable(isMinutesInvalid) || toNullable(isSecondsInvalid)) {
            const correctedMinutes = toNullable(isMinutesInvalid) ? some(MAX_VALID_MINS_AND_SEC) : minutes;
            const correctedSeconds = toNullable(isSecondsInvalid) ? some(MAX_VALID_MINS_AND_SEC) : seconds;
            this.updateTime(hours, correctedMinutes, correctedSeconds, periodType);
        }
    }
};
TimeInputRaw = __decorate([
    PURE
], TimeInputRaw);
export const TimeInput = memo((props) => {
    const iconsConfig = useContext(IconsOverridingContext);
    const { value, onValueChange, withPeriodType, isHideSeconds, isDecrementButtonDisabled, isIncrementButtonDisabled, } = props;
    return (React.createElement(TimeInputContainerStyled, null,
        React.createElement(TimeInputRaw, { value: value, onValueChange: onValueChange, withSeconds: !Boolean(isHideSeconds), withPeriodType: withPeriodType, SteppableInput: SteppableInput, isIncrementButtonDisabled: isIncrementButtonDisabled, isDecrementButtonDisabled: isDecrementButtonDisabled, incrementIcon: React.createElement(IconWrapper, null, iconsConfig.stepper.plus), decrementIcon: React.createElement(IconWrapper, null, iconsConfig.stepper.minus) })));
});
