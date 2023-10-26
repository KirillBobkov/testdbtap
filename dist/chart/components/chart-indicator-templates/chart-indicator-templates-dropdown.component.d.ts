import React from 'react';
import { IndicatorTemplates } from '../../../providers/indicator-templates-provider';
import { either } from 'fp-ts';
import { Localization } from '../../../config/localization/localization';
import { ValidationError } from '../../view-models/utils/validators';
export interface ChartIndicatorTemplate {
    id: number;
    name: string;
}
export interface ChartIndicatorTemplatesProps {
    readonly localization: Localization;
    readonly templatesData: IndicatorTemplates;
    readonly isOpened: boolean;
    readonly setPopupOpen: (value: boolean) => void;
    readonly onRequestClose: () => void;
    readonly addTemplate: (name: string) => either.Either<ValidationError, void>;
    readonly deleteTemplate: (id: string) => void;
    readonly updateTemplate: (id: string, name: string) => either.Either<ValidationError, void>;
    readonly selectTemplate: (id: string) => void;
}
export declare const ChartIndicatorTemplatesDropdown: React.NamedExoticComponent<ChartIndicatorTemplatesProps>;
