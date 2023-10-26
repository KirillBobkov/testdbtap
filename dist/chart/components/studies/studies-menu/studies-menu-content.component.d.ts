import React from 'react';
import { StudiesRCMenuItem } from '../../../containers/studies-menu/studies-menu.container';
export interface StudiesMenuContentProps {
    readonly items: StudiesRCMenuItem[][];
    readonly onClose: () => void;
}
export declare const StudiesMenuContent: React.NamedExoticComponent<StudiesMenuContentProps>;
