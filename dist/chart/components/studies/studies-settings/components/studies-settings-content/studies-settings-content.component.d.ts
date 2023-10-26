import * as React from 'react';
import { TStudySettings } from '../../studies-settings.model';
import { Localization } from '../../../../../../config/localization/localization';
import { IconsConfig } from '../../../../../../config/icons/icons-config';
interface StudiesSettingsContentProps {
    readonly selectedStudySettingsUUID: string;
    readonly studies: TStudySettings[];
    readonly addedStudies: TStudySettings[];
    readonly maxCountSelected: number;
    readonly onAddStudy: (id: string, insertIndex?: number) => void;
    readonly onRemoveStudy: (uuid: string) => void;
    readonly onChangeStudySettings: (settings: TStudySettings) => void;
    readonly onDeleteAll: () => void;
    readonly palette: string[];
    readonly localization: Localization;
    readonly onCreateNewScript: () => void;
    readonly onEditScript: (scriptId: string) => void;
    readonly onDeleteScript: (scriptId: string) => void;
    readonly onReorderStudies: (startIndex: number, endIndex: number) => void;
    readonly isMobile: boolean;
    readonly dxScriptEnabled: boolean;
    readonly addStudyButtonEnabled: boolean;
    readonly iconsConfig: IconsConfig;
}
export declare const StudiesSettingsContent: React.NamedExoticComponent<StudiesSettingsContentProps>;
export {};
