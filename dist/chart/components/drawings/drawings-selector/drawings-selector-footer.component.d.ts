import { FC } from 'react';
import { ToolbarDictionary } from '../../../../config/localization/toolbar';
export interface DrawingSelectorFooterProps {
    readonly isVisibilityButtonEnabled: boolean;
    readonly visibilityButtonText: string;
    readonly onVisibilityButtonClick: () => void;
    readonly isClearButtonEnabled: boolean;
    readonly clearButtonText: string;
    readonly onClearButtonClick: () => void;
    readonly localization: ToolbarDictionary;
}
export declare const DrawingSelectorFooter: FC<DrawingSelectorFooterProps>;
