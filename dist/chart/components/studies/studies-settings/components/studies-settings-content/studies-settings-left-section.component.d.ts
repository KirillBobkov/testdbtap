import * as React from 'react';
import { Localization } from '../../../../../../config/localization/localization';
import { TStudySettings } from '../../../../../model/studies.model';
export interface StudiesSettingsLeftSectionProps {
    readonly filterString: string;
    readonly handleTextFilterChange: (value?: string) => void;
    readonly localization: Localization;
    readonly studies: TStudySettings[];
    readonly onCreateNewScript: () => void;
    readonly handleSelectStudy: (id: string, uuid: string) => void;
    readonly portal: HTMLElement;
    readonly handleAddStudy: (id: string, uuid: string, insertIndex?: number) => void;
    readonly currentSelectedStudyId: string;
    readonly onDeleteScript: (scriptId: string) => void;
    readonly onEditScript: (scriptId: string) => void;
    readonly isMobile: boolean;
    readonly dxScriptEnabled: boolean;
    readonly addStudyButtonEnabled: boolean;
    readonly getStudyTitle: (title: string) => string;
    readonly isDragging: boolean;
}
export declare const StudiesSettingsLeftSection: React.NamedExoticComponent<StudiesSettingsLeftSectionProps>;
