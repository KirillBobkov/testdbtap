import * as React from 'react';
import { TStudySettings } from '../../../../../../model/studies.model';
import { Localization } from '../../../../../../../config/localization/localization';
export interface AddedStudyItemProps {
    readonly study: TStudySettings;
    readonly index: number;
    readonly isActive: boolean;
    readonly portal: HTMLElement;
    readonly studyTitle: string;
    readonly onRemoveStudy: (uuid: string) => void;
    readonly onSelectStudySettings: (id: string, uuid: string) => void;
    readonly appendix?: string;
    readonly isMobile: boolean;
    readonly localization: Localization;
}
export declare const AddedStudyItem: React.MemoExoticComponent<React.ForwardRefExoticComponent<AddedStudyItemProps & React.RefAttributes<HTMLDivElement>>>;
