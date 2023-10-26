import React from 'react';
import { StudiesRCMenuItem } from '../../../containers/studies-menu/studies-menu.container';
export interface StudiesMenuGroupProps {
    readonly items: StudiesRCMenuItem[];
    readonly showDivider: boolean;
    readonly groupIdx: number;
    readonly onItemSelect: (value: string | number, groupIdx: number) => void;
}
export declare const StudiesMenuGroup: React.NamedExoticComponent<StudiesMenuGroupProps>;
