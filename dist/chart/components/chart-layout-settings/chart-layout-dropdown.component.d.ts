import React from 'react';
import { ChartLayoutData } from '../../../providers/layout-provider';
import { Localization } from '../../../config/localization/localization';
import { either } from 'fp-ts';
import { ValidationError } from '../../view-models/utils/validators';
interface ChartLayoutDropdownProps {
    readonly chartLayoutData: ChartLayoutData;
    readonly addLayout: (name: string) => either.Either<ValidationError, void>;
    readonly deleteLayout: (id: string) => void;
    readonly updateSelectedLayout: (id: string) => void;
    readonly updateLayoutById: (id: string, name: string) => either.Either<ValidationError, void>;
    readonly localization: Localization;
    readonly isLayoutSaving: boolean;
    readonly isErrorLayoutSaving: boolean;
    readonly lastUpdateTimeStamp: number;
    readonly togglePopupOpen: (open: boolean) => void;
    readonly isOpened: boolean;
    readonly setEditableLayoutId: (id: string) => void;
    readonly editableLayoutId: string;
}
export declare const ChartLayoutDropdown: React.MemoExoticComponent<(props: ChartLayoutDropdownProps) => JSX.Element>;
export {};
