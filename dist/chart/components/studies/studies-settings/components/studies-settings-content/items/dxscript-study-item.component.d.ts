import React from 'react';
import { TStudySettings } from '../../../../../../model/studies.model';
import { Localization } from '../../../../../../../config/localization/localization';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
export interface DxScriptStudyItemProps {
    readonly study: TStudySettings;
    readonly isActive: boolean;
    readonly studyTitle: string;
    readonly handleSelectStudy: (id: string, uuid: string) => void;
    readonly handleAddStudy: (id: string, uuid: string) => void;
    readonly onDeleteScript: (id: string) => void;
    readonly onEditScript: (id: string) => void;
    readonly addStudyButtonEnabled: boolean;
    readonly dxScriptEnabled: boolean;
    readonly localization: Localization;
    readonly snapshot: DraggableStateSnapshot;
    readonly isActiveIcons?: boolean;
}
export declare const DxScriptStudyItem: React.MemoExoticComponent<React.ForwardRefExoticComponent<DxScriptStudyItemProps & React.RefAttributes<HTMLDivElement>>>;
