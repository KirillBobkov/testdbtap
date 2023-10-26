import * as React from 'react';
import { TStudySettings } from './studies-settings.model';
export interface StudiesSettingsPopupProps {
    readonly selectedStudySettingsUUID: string;
    readonly isOpened: boolean;
    readonly studies: TStudySettings[];
    readonly addedStudies: TStudySettings[];
    readonly maxCountSelected: number;
    readonly onAddedStudy: (id: string) => void;
    readonly onRemoveStudy: (uuid: string) => void;
    readonly onChangeStudy: (settings: TStudySettings) => void;
    readonly onReorderStudies: (startIndex: number, endIndex: number) => void;
    readonly onConfigureStudy: (uuid: string) => void;
    readonly onRemoveAllStudies: () => void;
    readonly onClose: () => void;
    readonly palette: string[];
    readonly onCreateNewScript: () => void;
    readonly onEditScript: (scriptId: string) => void;
    readonly onDeleteScript: (scriptId: string) => void;
    readonly className?: string;
    readonly dxScriptEnabled: boolean;
    readonly addStudyButtonEnabled: boolean;
    readonly anchorRef?: React.MutableRefObject<HTMLElement | null>;
    readonly uuidFromRightClick?: string;
}
export declare const StudiesSettingsFooter: React.NamedExoticComponent<StudiesSettingsPopupProps>;
declare const StudiesSettingsPopup: React.NamedExoticComponent<StudiesSettingsPopupProps>;
export default StudiesSettingsPopup;
