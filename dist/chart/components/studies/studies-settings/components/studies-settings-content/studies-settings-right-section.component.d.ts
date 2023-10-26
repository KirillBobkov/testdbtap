import * as React from 'react';
import { Localization } from '../../../../../../config/localization/localization';
import { TStudySettings } from '../../../../../model/studies.model';
import { IconsConfig } from '../../../../../../config/icons/icons-config';
export interface StudiesSettingsRightSectionProps {
    readonly isDragging: boolean;
    readonly palette: string[];
    readonly localization: Localization;
    readonly addedStudies: TStudySettings[];
    readonly studies: TStudySettings[];
    readonly portal: HTMLElement;
    readonly isMobile: boolean;
    readonly onDeleteAll: () => void;
    readonly onEditScript: (scriptId: string) => void;
    readonly handleRemoveStudy: (uuid: string) => void;
    readonly handleSelectStudySettings: (id: string, uuid: string) => void;
    readonly onChangeStudySettings: (settings: TStudySettings) => void;
    readonly getStudyTitle: (title: string) => string;
    readonly currentStudySettingsUUID: string;
    readonly iconsConfig: IconsConfig;
    readonly dxScriptEnabled: boolean;
}
export declare const StudiesSettingsRightSection: React.MemoExoticComponent<(props: StudiesSettingsRightSectionProps) => JSX.Element>;
