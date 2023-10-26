import { __decorate } from "tslib";
import React from 'react';
import ReactDOM from 'react-dom';
import { KEY_CODE_NUM_MAP } from '../Control/Control';
import { alt, chain, isSome, map, none, some } from 'fp-ts/Option';
import { ActiveSection, checkParentsUpTo, decrementMonthOption, format, inc, incrementMonthOption, isDatesDifferent, } from './DateInput.model';
import { pipe } from 'fp-ts/function';
import { DateInputContent, DateSteppableInputStyled, SectionStyled, SeparatorStyled } from './DateInput.styled';
import { PURE } from '../../utils/pure';
let DateInputKit = class DateInputKit extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isOpened: false,
        };
        this.secondInput = false;
        this.onIncrement = () => {
            this.secondInput = false;
            const { value: { day, month, year }, } = this.props;
            const { activeSection } = this.state;
            switch (activeSection) {
                case ActiveSection.Day: {
                    //day starts from 1 here and cannot be zero
                    const newDay = pipe(day, map(value => (value + 1) % 32 || 1), alt(() => some(1)));
                    this.onValueChange(newDay, month, year);
                    break;
                }
                case ActiveSection.Month: {
                    //month starts from 1 here and cannot be zero
                    const newMonth = incrementMonthOption(month);
                    this.onValueChange(day, newMonth, year);
                    break;
                }
                case ActiveSection.Year: {
                    const newYear = pipe(year, chain(value => {
                        if (value !== 9999) {
                            return some(value + 1);
                        }
                        else {
                            return none;
                        }
                    }), alt(() => some(new Date().getFullYear())));
                    this.onValueChange(day, month, newYear);
                    break;
                }
            }
        };
        this.onDecrement = () => {
            this.secondInput = false;
            const { value: { day, month, year }, } = this.props;
            const { activeSection } = this.state;
            switch (activeSection) {
                case ActiveSection.Day: {
                    //day starts from 1 and cannot be zero
                    const newDay = pipe(day, map(value => (value - 1) % 32 || 31), alt(() => some(31)));
                    this.onValueChange(newDay, month, year);
                    break;
                }
                case ActiveSection.Month: {
                    //month starts from 1 and cannot be zero
                    const newMonth = decrementMonthOption(month);
                    this.onValueChange(day, newMonth, year);
                    break;
                }
                case ActiveSection.Year: {
                    const newYear = pipe(year, chain(value => {
                        if (value !== 0) {
                            return some(value - 1);
                        }
                        else {
                            return none;
                        }
                    }), alt(() => some(new Date().getFullYear())));
                    this.onValueChange(day, month, newYear);
                    break;
                }
            }
        };
        this.onClear = () => {
            this.secondInput = false;
            this.onValueChange(none, none, none);
            const { onClear } = this.props;
            onClear && onClear();
        };
        this.onDayMouseDown = (e) => {
            if (!this.props.isDisabled) {
                this.setState({
                    activeSection: ActiveSection.Day,
                });
            }
        };
        this.onMonthMouseDown = (e) => {
            if (!this.props.isDisabled) {
                this.setState({
                    activeSection: ActiveSection.Month,
                });
            }
        };
        this.onYearMouseDown = (e) => {
            if (!this.props.isDisabled) {
                this.setState({
                    activeSection: ActiveSection.Year,
                });
            }
        };
        this.onKeyDown = (e) => {
            e.stopPropagation();
            const { value: { day, month, year }, } = this.props;
            const { activeSection } = this.state;
            switch (e.code) {
                case 'Escape': {
                    if (this.state.isOpened) {
                        this.setState({
                            isOpened: false,
                        });
                    }
                    break;
                }
                case 'ArrowLeft': {
                    e.preventDefault(); //block h-scrolling
                    switch (activeSection) {
                        case ActiveSection.Month: //fallthrough
                        case ActiveSection.Year: {
                            this.secondInput = false;
                            break;
                        }
                    }
                    this.selectPreviousSection();
                    break;
                }
                case 'ArrowRight': {
                    e.preventDefault(); //block h-scrolling
                    switch (activeSection) {
                        case ActiveSection.Day: //fallthrough
                        case ActiveSection.Month: {
                            this.secondInput = false;
                            break;
                        }
                    }
                    this.selectNextSection();
                    break;
                }
                case 'Delete': //fallthrough
                case 'Backspace': {
                    this.secondInput = false;
                    switch (activeSection) {
                        case ActiveSection.Day: {
                            this.onValueChange(none, month, year);
                            break;
                        }
                        case ActiveSection.Month: {
                            this.onValueChange(day, none, year);
                            break;
                        }
                        case ActiveSection.Year: {
                            this.onValueChange(day, month, none);
                            break;
                        }
                    }
                    break;
                }
                default: {
                    const number = KEY_CODE_NUM_MAP[e.code];
                    if (isDefined(number)) {
                        this.handleDigitKeyDown(number);
                    }
                }
            }
        };
        this.onSteppableInputClick = (e) => {
            if (this.state.isOpened) {
                const calendarButtonDOMNode = ReactDOM.findDOMNode(this.calendarButtonRef);
                const thisNode = ReactDOM.findDOMNode(this);
                if (calendarButtonDOMNode === null ||
                    calendarButtonDOMNode instanceof Text ||
                    thisNode === null ||
                    thisNode instanceof Text) {
                    return;
                }
                // eslint-disable-next-line no-restricted-syntax
                if (checkParentsUpTo(e.target, calendarButtonDOMNode, thisNode)) {
                    //clicked on calendar button
                    this.setState({
                        isOpened: false,
                    });
                }
                else {
                    this.setState({
                        isOpened: true,
                    });
                }
            }
            else {
                this.setState({
                    isOpened: true,
                });
            }
        };
        this.onBlur = (e) => {
            this.secondInput = false;
            this.setState({
                activeSection: undefined,
                isOpened: false,
            });
            this.props.onBlur && this.props.onBlur();
        };
        this.onFocus = (e) => {
            this.secondInput = false;
            if (!isDefined(this.state.activeSection)) {
                this.setState({
                    activeSection: this.getDefaultActiveSection(this.props.dateFormatType),
                });
            }
            this.props.onFocus && this.props.onFocus();
        };
        this.onMouseEnter = (e) => {
            this.props.onMouseEnter && this.props.onMouseEnter();
        };
        this.onMouseLeave = (e) => {
            this.props.onMouseLeave && this.props.onMouseLeave();
        };
    }
    render() {
        const { isDisabled, error, clearIcon, incrementIcon, decrementIcon, SteppableInput = DateSteppableInputStyled, dateFormatType = 'DMY', value: { day, month, year }, } = this.props;
        const { activeSection } = this.state;
        const isActive = !isDisabled && ActiveSection.Year === activeSection;
        // check if "X" clear button should be visible - at least one part of date should be set
        const onClear = isSome(day) || isSome(month) || isSome(year) ? this.onClear : undefined;
        return (React.createElement(SteppableInput, { isDisabled: isDisabled, onClear: onClear, error: error, decrementIcon: decrementIcon, incrementIcon: incrementIcon, clearIcon: clearIcon, onIncrement: this.onIncrement, onDecrement: this.onDecrement, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeyDown, onClick: this.onSteppableInputClick, onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave, ref: this.props.innerRef },
            React.createElement(DateInputContent, { tabIndex: 1 },
                dateFormatType === 'DMY' && this.renderDay(),
                dateFormatType === 'MDY' && this.renderMonth(),
                React.createElement(SeparatorStyled, null, "/"),
                dateFormatType === 'DMY' && this.renderMonth(),
                dateFormatType === 'MDY' && this.renderDay(),
                React.createElement(SeparatorStyled, null, "/"),
                React.createElement(SectionStyled, { isActive: isActive, onMouseDown: this.onYearMouseDown }, format(year, ActiveSection.Year)))));
    }
    renderDay() {
        const { value: { day }, isDisabled, } = this.props;
        const { activeSection } = this.state;
        const isActive = !isDisabled && ActiveSection.Day === activeSection;
        return (React.createElement(SectionStyled, { isActive: isActive, onMouseDown: this.onDayMouseDown }, format(day, ActiveSection.Day)));
    }
    renderMonth() {
        const { value: { month }, isDisabled, } = this.props;
        const { activeSection } = this.state;
        const isActive = !isDisabled && ActiveSection.Month === activeSection;
        const monthValue = map(inc)(month);
        return (React.createElement(SectionStyled, { isActive: isActive, onMouseDown: this.onMonthMouseDown }, format(monthValue, ActiveSection.Month)));
    }
    onValueChange(day, month, year) {
        const { onValueChange, value } = this.props;
        isDatesDifferent(value, { day, month, year }) && onValueChange && onValueChange({ day, month, year });
    }
    getDefaultActiveSection(dateFormatType = 'DMY') {
        switch (dateFormatType) {
            case 'DMY': {
                return ActiveSection.Day;
            }
            case 'MDY': {
                return ActiveSection.Month;
            }
        }
    }
    selectNextSection() {
        const { activeSection } = this.state;
        const { dateFormatType } = this.props;
        switch (activeSection) {
            case ActiveSection.Day: {
                switch (dateFormatType) {
                    case 'DMY': {
                        this.setState({
                            activeSection: ActiveSection.Month,
                        });
                        break;
                    }
                    case 'MDY': {
                        this.setState({
                            activeSection: ActiveSection.Year,
                        });
                        break;
                    }
                }
                break;
            }
            case ActiveSection.Month: {
                switch (dateFormatType) {
                    case 'DMY': {
                        this.setState({
                            activeSection: ActiveSection.Year,
                        });
                        break;
                    }
                    case 'MDY': {
                        this.setState({
                            activeSection: ActiveSection.Day,
                        });
                        break;
                    }
                }
                break;
            }
        }
    }
    selectPreviousSection() {
        const { activeSection } = this.state;
        const { dateFormatType } = this.props;
        switch (activeSection) {
            case ActiveSection.Day: {
                switch (dateFormatType) {
                    case 'MDY': {
                        this.setState({
                            activeSection: ActiveSection.Month,
                        });
                        break;
                    }
                }
                break;
            }
            case ActiveSection.Month: {
                switch (dateFormatType) {
                    case 'DMY': {
                        this.setState({
                            activeSection: ActiveSection.Day,
                        });
                        break;
                    }
                }
                break;
            }
            case ActiveSection.Year: {
                switch (dateFormatType) {
                    case 'DMY': {
                        this.setState({
                            activeSection: ActiveSection.Month,
                        });
                        break;
                    }
                    case 'MDY': {
                        this.setState({
                            activeSection: ActiveSection.Day,
                        });
                        break;
                    }
                }
                break;
            }
        }
    }
    handleDigitKeyDown(digit) {
        const { value: { day, month, year }, } = this.props;
        switch (this.state.activeSection) {
            case ActiveSection.Day: {
                if (this.secondInput) {
                    const newDay = pipe(day, map(value => {
                        const dayValue = Number(`${value}${digit}`);
                        if (value < 3) {
                            return dayValue;
                        }
                        else if (value === 3) {
                            return Math.min(dayValue, 31);
                        }
                        else {
                            return digit;
                        }
                    }));
                    this.onValueChange(newDay, month, year);
                    this.selectNextSection();
                    this.secondInput = false;
                }
                else {
                    this.onValueChange(some(digit), month, year);
                    if (digit > 3) {
                        this.selectNextSection();
                        this.secondInput = false;
                    }
                    else {
                        this.secondInput = true;
                    }
                }
                break;
            }
            case ActiveSection.Month: {
                if (this.secondInput) {
                    const newMonth = pipe(month, map(value => {
                        const correctedMonth = value + 1;
                        const monthValue = Number(`${correctedMonth}${digit}`) - 1;
                        if (correctedMonth < 1) {
                            return monthValue;
                        }
                        else if (correctedMonth === 1) {
                            return Math.min(monthValue, 11);
                        }
                        else {
                            return digit - 1;
                        }
                    }));
                    this.onValueChange(day, newMonth, year);
                    this.selectNextSection();
                    this.secondInput = false;
                }
                else {
                    digit && this.onValueChange(day, some(digit - 1), year);
                    if (digit > 1) {
                        this.selectNextSection();
                        this.secondInput = false;
                    }
                    else {
                        this.secondInput = true;
                    }
                }
                break;
            }
            case ActiveSection.Year: {
                if (this.secondInput) {
                    const newYear = pipe(year, map(value => {
                        if (value < 1000) {
                            return Number(`${value}${digit}`);
                        }
                        else {
                            return Number(`${value}${digit}`.substring(1));
                        }
                    }));
                    this.onValueChange(day, month, newYear);
                }
                else {
                    this.onValueChange(day, month, some(digit));
                    this.secondInput = true;
                }
                break;
            }
        }
    }
};
DateInputKit = __decorate([
    PURE
], DateInputKit);
export { DateInputKit };
function isDefined(value) {
    return typeof value !== 'undefined';
}
