import * as React from 'react';
import { Option } from 'fp-ts/Option';
import { StudyLineType, TStudySettings } from '../../studies-settings.model';
import { Localization } from '../../../../../../config/localization/localization';
import { IconsConfig } from '../../../../../../config/icons/icons-config';
interface StudySettingsLineValue {
    colors: string[];
    thickness: number;
    visible: boolean;
    studyLineType: StudyLineType;
}
type SelectboxParameterType = 'AGGREGATION' | 'AVERAGE' | 'PRICE_FIELD';
interface StudySettingsParametersValues {
    [key: string]: string | number | boolean;
}
interface StudySettingsLinesValues {
    [key: string]: StudySettingsLineValue;
}
export interface StudySettingsProps {
    palette: string[];
    studySettings: TStudySettings;
    studies: TStudySettings[];
    onChange: (settings: TStudySettings) => void;
    localization: Localization;
    onEditScript: (scriptId: string) => void;
    dxScriptEnabled?: boolean;
    iconsConfig: IconsConfig;
    keyboardMode: boolean;
}
export interface StudySettingsState {
    readonly currentStudyId: string;
    readonly currentStudyUUID: string;
    readonly parameters: StudySettingsParametersValues;
    readonly lines: StudySettingsLinesValues;
    readonly openedSelectbox: Option<string>;
    readonly overlaying: boolean;
}
export declare class StudySettings extends React.PureComponent<StudySettingsProps, StudySettingsState> {
    readonly state: StudySettingsState;
    static getDerivedStateFromProps(props: StudySettingsProps, prevState: StudySettingsState): StudySettingsState | null;
    private createPatchFromState;
    private setValueForParameters;
    private setValueForLines;
    private handleChangeSelectboxParameterValue;
    private handleChangeSteppableInput;
    private handleChangeLineColorValue;
    private handleChangeLineThicknessValue;
    private handleToggleVisibilityCheckbox;
    private handleChangeLineType;
    private handleToggleSelectBox;
    private handleRestoreToDefault;
    private renderSteppableInputForParameters;
    private renderSteppableInputForPlots;
    private renderVisibilityCheckboxForPlots;
    private renderCheckbox;
    private renderSelectbox;
    private renderInputByParameterType;
    private renderInputs;
    private renderLineSettings;
    private renderPlotTypeSelectbox;
    private renderPlots;
    private renderOverlayingSwitch;
    private onEditScript;
    render(): JSX.Element;
}
export declare const getReadableSelectboxValue: (value: string, type: SelectboxParameterType, localization: Localization) => any;
export {};
