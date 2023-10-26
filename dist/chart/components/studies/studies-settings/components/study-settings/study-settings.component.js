import * as React from 'react';
import { getOrElse, isNone, isSome, none, some } from 'fp-ts/Option';
import { getStudyById, } from '../../studies-settings.model';
import { selectableOptions } from './study-settings.model';
import { option } from 'fp-ts';
import { pipe, constTrue } from 'fp-ts/function';
import { ChartSettingsField } from '../../../../chart-settings/chart-settings-field.component';
import { ColorPickerWrapperStyled, InputsBlockContentStyled, InputsBlockStyled, InputsBlockTitleStyled, InputWrapperStyled, LabeledFormFieldContainer, LabeledFormFieldLabelStyled, LineInputColorsStyled, LineInputPixelsStyled, LineInputPlotTypeStyled, LineInputStyled, LineInputThickStyled, LineStyled, RestoreToDefaultButtonStyled, SelectBoxItemStyled, StudySettingsEditScriptButtonStyled, StudySettingsSelectBoxAnchorStyled, StudySettingsTitleStyled, StudySettingsTitleWrapperStyled, StudySettingsNumericStepperStyled, InputBlockSettingsStyled, InputBlockPlotsStyled, } from './study-settings.styled';
import { Selectbox } from '../../../../../../chart-kit/Selectbox/Selectbox.component';
import { Checkbox } from '../../../../../../chart-kit/Checkbox/Checkbox.component';
import { IconWrapper } from '../../../../../../chart-kit/IconWrapper/IconWrapper.component';
import { createKeyDownHandler } from '../../../../../../chart-kit/utils/keyDownHandler';
import { UIOverridesContext } from '../../../../../ui-overrides';
const DefaultStudyLineTypeList = ['POINTS', 'LINEAR', 'HISTOGRAM', 'DIFFERENCE'];
const extendedLineOptionsStudies = ['TDSequential', 'WilliamsFractal', 'WaveTrendWithCrosses'];
const ExtendedStudiesLineTypeLists = {
    TDSequential: [
        ...DefaultStudyLineTypeList,
        'ABOVE_CANDLE_TRIANGLE',
        'ABOVE_CANDLE_TEXT',
        'BELOW_CANDLE_TEXT',
        'COLOR_CANDLE',
    ],
    WilliamsFractal: [...DefaultStudyLineTypeList, 'ABOVE_CANDLE_TEXT', 'BELOW_CANDLE_TEXT'],
    WaveTrendWithCrosses: [...DefaultStudyLineTypeList, 'COLOR_CANDLE'],
};
const StudyLineTypeList = [
    'POINTS',
    'LINEAR',
    'HISTOGRAM',
    'DIFFERENCE',
    'ABOVE_CANDLE_TRIANGLE',
    'ABOVE_CANDLE_TEXT',
    'BELOW_CANDLE_TEXT',
    'COLOR_CANDLE',
];
const studySettingsNSInputValidate = (value) => /^-?\d*[.]?\d*$/.test(value);
const initializeState = ({ parameters, lines, id, uuid, overlaying }) => ({
    currentStudyUUID: uuid,
    currentStudyId: id,
    overlaying,
    parameters: parameters.reduce((parameters, { id, value, studyParamType }) => {
        switch (studyParamType) {
            case 'AGGREGATION':
                parameters[id] = pipe(
                // eslint-disable-next-line no-restricted-syntax
                value, // fixme https://jira.in.devexperts.com/browse/DXCF-707
                option.getOrElse(() => 'DEFAULT'));
                break;
            case 'AVERAGE':
                parameters[id] = pipe(
                // eslint-disable-next-line no-restricted-syntax
                value, // fixme https://jira.in.devexperts.com/browse/DXCF-707
                option.getOrElse(() => 'DEFAULT'));
                break;
            case 'PRICE_FIELD':
                parameters[id] = pipe(
                // eslint-disable-next-line no-restricted-syntax
                value, // fixme https://jira.in.devexperts.com/browse/DXCF-707
                option.getOrElse(() => 'DEFAULT'));
                break;
            case 'INTEGER_RANGE':
            case 'DOUBLE_RANGE':
                parameters[id] = pipe(
                // eslint-disable-next-line no-restricted-syntax
                value, // fixme https://jira.in.devexperts.com/browse/DXCF-707
                option.getOrElse(() => 0));
                break;
            default:
                parameters[id] = pipe(
                // eslint-disable-next-line no-restricted-syntax
                value, // fixme https://jira.in.devexperts.com/browse/DXCF-707
                option.fold(() => '', x => (typeof x === 'boolean' ? x : x.toString())));
                break;
        }
        return parameters;
    }, {}),
    lines: lines.reduce((lines, line) => {
        if (isSome(line.title) && isSome(line.colors) && isSome(line.visible)) {
            lines[line.title.value] = {
                colors: line.colors.value,
                thickness: pipe(line.thickness, option.getOrElse(() => 1)),
                visible: pipe(line.visible, option.getOrElse(constTrue)),
                studyLineType: pipe(line.studyLineType, 
                // eslint-disable-next-line no-restricted-syntax
                option.getOrElse(() => 'UNDEFINED_TYPE')),
            };
        }
        return lines;
    }, {}),
    openedSelectbox: none,
});
export class StudySettings extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            ...initializeState(this.props.studySettings),
        };
        this.handleChangeSelectboxParameterValue = (id) => (value) => {
            if (!Array.isArray(value)) {
                this.setValueForParameters(id, value || '');
            }
        };
        this.handleChangeSteppableInput = (id) => (value) => {
            this.setValueForParameters(id, value);
        };
        this.handleChangeLineColorValue = (title) => (i) => (value) => {
            const colors = [...this.state.lines[title].colors];
            colors[i] = value;
            this.setValueForLines(title, 'colors', colors);
        };
        this.handleChangeLineThicknessValue = (title) => (value) => {
            this.setValueForLines(title, 'thickness', value);
        };
        this.handleToggleVisibilityCheckbox = (title) => (value) => {
            this.setValueForLines(title, 'visible', value === undefined ? true : value);
        };
        this.handleChangeLineType = (title) => (value) => {
            // eslint-disable-next-line no-restricted-syntax
            this.setValueForLines(title, 'studyLineType', value);
        };
        this.handleToggleSelectBox = (id) => (value) => {
            const selectBoxId = pipe(some(typeof value === 'boolean' ? value : isNone(this.state.openedSelectbox)), option.map(v => (v ? id : '')));
            this.setState({
                openedSelectbox: selectBoxId,
            });
        };
        this.handleRestoreToDefault = () => {
            const defaultSettings = getStudyById(this.props.studies, this.props.studySettings.id);
            const defaultSettingsValue = pipe(defaultSettings, option.map(s => ({ ...s })), option.getOrElse(() => ({ ...this.props.studySettings })));
            this.setState({
                ...initializeState({ ...defaultSettingsValue }),
                currentStudyUUID: this.props.studySettings.uuid,
            }, () => {
                this.props.onChange(this.createPatchFromState());
            });
        };
        this.onEditScript = () => {
            const { onEditScript, studySettings } = this.props;
            return onEditScript(studySettings.id);
        };
    }
    static getDerivedStateFromProps(props, prevState) {
        if (props.studySettings.uuid === prevState.currentStudyUUID) {
            return null;
        }
        return initializeState(props.studySettings);
    }
    createPatchFromState() {
        const { parameters, lines } = this.props.studySettings;
        const newParameters = parameters.map(parameter => {
            return {
                ...parameter,
                value: some(this.state.parameters[parameter.id]),
            };
        });
        return {
            ...this.props.studySettings,
            parameters: newParameters,
            overlaying: this.state.overlaying,
            lines: lines.map(line => ({
                ...line,
                visible: pipe(line.title, option.fold(() => line.visible, title => some(this.state.lines[title].visible))),
                thickness: pipe(line.title, option.fold(() => line.thickness, title => some(this.state.lines[title].thickness))),
                colors: pipe(line.title, option.fold(() => line.colors, title => some(this.state.lines[title].colors))),
                studyLineType: pipe(line.title, option.fold(() => line.studyLineType, title => some(this.state.lines[title].studyLineType))),
            })),
        };
    }
    setValueForParameters(id, value) {
        this.setState({
            parameters: {
                ...this.state.parameters,
                [id]: value,
            },
        }, () => {
            this.props.onChange(this.createPatchFromState());
        });
    }
    setValueForLines(title, fieldName, value) {
        this.setState({
            lines: {
                ...this.state.lines,
                [title]: {
                    ...this.state.lines[title],
                    [fieldName]: value,
                },
            },
        }, () => {
            this.props.onChange(this.createPatchFromState());
        });
    }
    renderSteppableInputForParameters(id, value, validation = none) {
        const prec = pipe(validation, option.chain(v => v.precision), option.getOrElse(() => 0));
        const step = 1 / 10 ** prec;
        const isIncrementButtonDisabled = pipe(validation, option.chain(v => v.max), option.map(x => value >= x), getOrElse(() => false));
        const isDecrementButtonDisabled = pipe(validation, option.chain(v => v.min), option.map(x => value <= x), getOrElse(() => false));
        const min = pipe(validation, option.chain(v => v.min), option.getOrElse(() => Number.NEGATIVE_INFINITY));
        const max = pipe(validation, option.chain(v => v.max), option.getOrElse(() => Number.POSITIVE_INFINITY));
        return (React.createElement(StudySettingsNumericStepperStyled, { ariaLabel: id, step: step, isIncrementButtonDisabled: isIncrementButtonDisabled, isDecrementButtonDisabled: isDecrementButtonDisabled, min: min, max: max, value: Number(value), onValueChange: this.handleChangeSteppableInput(id), onValidate: studySettingsNSInputValidate }));
    }
    renderSteppableInputForPlots(id, value) {
        return (React.createElement(StudySettingsNumericStepperStyled, { ariaLabel: this.props.localization.studiesPopup.a11y_plotLineThickness, step: 1, isDecrementButtonDisabled: value <= 1, isIncrementButtonDisabled: value >= 99, min: 0, max: 99, value: value, onValueChange: this.handleChangeLineThicknessValue(id) }));
    }
    renderVisibilityCheckboxForPlots(id, value) {
        return (React.createElement(ChartSettingsField, { label: "" },
            React.createElement(Checkbox, { ariaLabel: this.props.localization.studiesPopup.a11y_plotVisibility, value: value, onValueChange: this.handleToggleVisibilityCheckbox(id) })));
    }
    renderCheckbox(id, value) {
        return (React.createElement(ChartSettingsField, { label: "" },
            React.createElement(Checkbox, { ariaLabel: id, value: value, onValueChange: val => this.setValueForParameters(id, val || false) })));
    }
    renderSelectbox(id, value, options, type) {
        const isOpened = pipe(this.state.openedSelectbox, option.map(selectBoxId => selectBoxId === id), option.getOrElse(() => false));
        const onKeyDown = (value) => createKeyDownHandler([
            'Space',
            e => {
                e.preventDefault();
                this.handleChangeSelectboxParameterValue(id)(value);
                this.handleToggleSelectBox(id)(false);
            },
        ], [
            'Enter',
            e => {
                e.preventDefault();
                this.handleChangeSelectboxParameterValue(id)(value);
                this.handleToggleSelectBox(id)(false);
            },
        ]);
        return (React.createElement(Selectbox, { closeOnClickAway: true, anchorAriaLabel: id, value: value, isOpened: isOpened, onToggle: this.handleToggleSelectBox(id), onValueChange: this.handleChangeSelectboxParameterValue(id), Anchor: StudySettingsSelectBoxAnchorStyled, keyboardMode: this.props.keyboardMode }, options.map(option => (React.createElement(SelectBoxItemStyled, { value: option.value, key: option.value, isActive: option.value === value, onKeyDown: onKeyDown(option.value) }, getReadableSelectboxValue(option.caption, type, this.props.localization))))));
    }
    renderInputByParameterType(id, type, value, validation) {
        switch (type) {
            case 'INTEGER_RANGE':
            case 'DOUBLE_RANGE':
                // eslint-disable-next-line no-restricted-syntax
                return this.renderSteppableInputForParameters(id, Number(value), validation); // fixme https://jira.in.devexperts.com/browse/DXCF-707
            case 'PRICE_FIELD':
            case 'AGGREGATION':
            case 'AVERAGE':
                // eslint-disable-next-line no-restricted-syntax
                return this.renderSelectbox(id, String(value), selectableOptions[type], type); // fixme https://jira.in.devexperts.com/browse/DXCF-707
            case 'STRING': // No examples for string type;
            case 'BOOLEAN': // No examples for boolean type;
                // eslint-disable-next-line no-restricted-syntax
                return this.renderCheckbox(id, Boolean(value));
            case 'UNDEFINED': // It's unclear how we should handle 'UNDEFINED' type here;
            default:
                return null;
        }
    }
    renderInputs() {
        const { studySettings: { parameters }, } = this.props;
        const { parameters: parametersValues } = this.state;
        return parameters
            .filter(parameter => pipe(parameter.visible, option.getOrElse(constTrue)))
            .map(parameter => (React.createElement(InputWrapperStyled, { key: parameter.id },
            React.createElement(LabeledFormFieldContainer, null,
                React.createElement(LabeledFormFieldLabelStyled, null, parameter.id),
                this.renderInputByParameterType(parameter.id, parameter.studyParamType, parametersValues[parameter.id], parameter.validation)))));
    }
    renderLineSettings(title, palette) {
        const { lines: linesValues } = this.state;
        const line = linesValues[title];
        return (React.createElement(LineStyled, null,
            React.createElement(LineInputStyled, null, this.renderVisibilityCheckboxForPlots(title, line.visible)),
            React.createElement(LineInputColorsStyled, null, line.colors.map((color, i) => (React.createElement(ColorPickerWrapperStyled, { key: i },
                React.createElement(UIOverridesContext.Consumer, null, ({ ColorPickerComponent }) => ColorPickerComponent && (React.createElement(ColorPickerComponent, { ariaLabel: this.props.localization.studiesPopup.a11y_plotLineColor, key: i, value: color, palette: palette, onValueChange: this.handleChangeLineColorValue(title)(i) }))))))),
            React.createElement(LineInputThickStyled, null,
                this.renderSteppableInputForPlots(title, line.thickness),
                React.createElement(LineInputPixelsStyled, null, "px")),
            React.createElement(LineInputPlotTypeStyled, null, this.renderPlotTypeSelectbox(title, line))));
    }
    renderPlotTypeSelectbox(title, line) {
        const isOpened = pipe(this.state.openedSelectbox, option.map(selectBoxId => selectBoxId === title), option.getOrElse(() => false));
        const onKeyDown = (value) => createKeyDownHandler([
            'Space',
            e => {
                e.preventDefault();
                this.handleChangeLineType(title)(value);
                this.handleToggleSelectBox(title)(false);
            },
        ], [
            'Enter',
            e => {
                e.preventDefault();
                this.handleChangeLineType(title)(value);
                this.handleToggleSelectBox(title)(false);
            },
        ]);
        const getReadablePlotTypeString = (option) => {
            const studyLineTypeLocalization = this.props.localization.studiesPopup.studyLineTypeList;
            const extendedPlotMapping = {
                POINTS: studyLineTypeLocalization.points,
                LINEAR: studyLineTypeLocalization.linear,
                HISTOGRAM: studyLineTypeLocalization.histogram,
                DIFFERENCE: studyLineTypeLocalization.difference,
                ABOVE_CANDLE_TEXT: studyLineTypeLocalization.aboveCandleText,
                BELOW_CANDLE_TEXT: studyLineTypeLocalization.belowCandleText,
                ABOVE_CANDLE_TRIANGLE: studyLineTypeLocalization.aboveCandleTriangle,
                COLOR_CANDLE: studyLineTypeLocalization.colorCandle,
            };
            return extendedPlotMapping[option];
        };
        const optionsList = extendedLineOptionsStudies.includes(this.state.currentStudyId)
            ? ExtendedStudiesLineTypeLists[this.state.currentStudyId]
            : DefaultStudyLineTypeList;
        return (React.createElement(Selectbox, { anchorAriaLabel: this.props.localization.studiesPopup.a11y_plotLineType, value: line.studyLineType, isOpened: isOpened, onToggle: this.handleToggleSelectBox(title), onValueChange: this.handleChangeLineType(title), Anchor: StudySettingsSelectBoxAnchorStyled, closeOnClickAway: true, keyboardMode: this.props.keyboardMode }, optionsList.map((option) => (React.createElement(SelectBoxItemStyled, { value: option, key: option, isActive: option === line.studyLineType, onKeyDown: onKeyDown(option) }, getReadablePlotTypeString(option))))));
    }
    renderPlots() {
        const { studySettings: { lines }, palette, } = this.props;
        return lines
            .filter(line => isSome(line.title))
            .map(line => pipe(line.title, option.fold(() => null, title => (React.createElement(InputWrapperStyled, { key: title },
            React.createElement(LabeledFormFieldContainer, { role: "group", "aria-labelledby": `study_settings_plot_${title}` },
                React.createElement(LabeledFormFieldLabelStyled, { id: `study_settings_plot_${title}` }, title),
                this.renderLineSettings(title, palette)))))));
    }
    renderOverlayingSwitch() {
        const onOverlayChange = (value) => {
            const overlaying = value || false;
            this.setState({ overlaying }, () => {
                this.props.onChange({
                    ...this.props.studySettings,
                    overlaying,
                });
            });
        };
        return (React.createElement(ChartSettingsField, { label: "" },
            React.createElement(Checkbox, { ariaLabel: this.props.localization.studiesPopup.a11y_overlayStudy, value: this.props.studySettings.overlaying, onValueChange: onOverlayChange })));
    }
    render() {
        const { studySettings: { title, parameters, lines, type }, dxScriptEnabled, } = this.props;
        const mobileWidth = 680;
        const filteredParameters = parameters.filter(parameter => pipe(parameter.visible, option.getOrElse(constTrue)));
        return (React.createElement(React.Fragment, null,
            React.createElement(StudySettingsTitleWrapperStyled, null,
                React.createElement(StudySettingsTitleStyled, { id: "study_settings" },
                    this.props.localization.studiesPopup.settings,
                    ' ',
                    window.innerWidth > mobileWidth ? title || 'NONE' : ''),
                type === 'dxScript' && dxScriptEnabled && (React.createElement(StudySettingsEditScriptButtonStyled, { "aria-label": this.props.localization.studiesPopup.a11y_editScript, icon: React.createElement(IconWrapper, null, this.props.iconsConfig.studies.script.studyScript), onClick: this.onEditScript })),
                React.createElement(RestoreToDefaultButtonStyled, { onClick: this.handleRestoreToDefault, isFlat: true }, this.props.localization.studiesPopup.restoreToDefault)),
            filteredParameters.length ? (React.createElement(InputBlockSettingsStyled, { role: "group", "aria-labelledby": "study_settings_inputs" },
                React.createElement(InputsBlockTitleStyled, { id: "study_settings_inputs" }, this.props.localization.studiesPopup.inputs),
                React.createElement(InputsBlockContentStyled, null, this.renderInputs()))) : null,
            lines.length ? (React.createElement(InputBlockPlotsStyled, { role: "group", "aria-labelledby": "study_settings_plots" },
                React.createElement(InputsBlockTitleStyled, { id: "study_settings_plots" }, this.props.localization.studiesPopup.plots),
                React.createElement(InputsBlockContentStyled, null, this.renderPlots()))) : null,
            React.createElement(InputsBlockStyled, { role: "group", "aria-labelledby": "study_settings_overlay" },
                React.createElement(InputsBlockTitleStyled, { id: "study_settings_overlay" }, this.props.localization.studiesPopup.overlaying),
                React.createElement(InputsBlockContentStyled, null, this.renderOverlayingSwitch()))));
    }
}
export const getReadableSelectboxValue = (value, type, localization) => {
    const studiesPopupDict = localization.studiesPopup;
    switch (type) {
        case 'AGGREGATION':
            const readableAggregationValues = {
                DEFAULT: studiesPopupDict.studyParamAggregationType.default,
                DAY: studiesPopupDict.studyParamAggregationType.day,
                WEEK: studiesPopupDict.studyParamAggregationType.week,
                MONTH: studiesPopupDict.studyParamAggregationType.month,
            };
            return readableAggregationValues[value];
        case 'AVERAGE':
            const readableAverageValues = {
                SIMPLE: studiesPopupDict.studyParamAverageType.simple,
                WILDERS: studiesPopupDict.studyParamAverageType.wilders,
                WEIGHTED: studiesPopupDict.studyParamAverageType.weighted,
                EXPONENTIAL: studiesPopupDict.studyParamAverageType.exponential,
            };
            return readableAverageValues[value];
        case 'PRICE_FIELD':
            const readablePriceFieldValues = {
                OPEN: studiesPopupDict.studyParamPriceType.open,
                CLOSE: studiesPopupDict.studyParamPriceType.close,
                HIGH: studiesPopupDict.studyParamPriceType.high,
                LOW: studiesPopupDict.studyParamPriceType.low,
                MEDIAN: studiesPopupDict.studyParamPriceType.median,
                TYPICAL: studiesPopupDict.studyParamPriceType.typical,
                OHLC_AVERAGE: studiesPopupDict.studyParamPriceType.ohlcAvg,
                VOLUME: studiesPopupDict.studyParamPriceType.volume,
            };
            return readablePriceFieldValues[value];
    }
};
