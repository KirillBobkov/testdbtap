import React from 'react';
import { RCMenuProps } from '../../../../chart-kit/Popover/popover-menu-generic';
import { StudiesRCMenuItem } from '../../../containers/studies-menu/studies-menu.container';
export interface StudiesMenuProps extends RCMenuProps {
    readonly items: StudiesRCMenuItem[][];
}
export declare const StudiesMenu: React.NamedExoticComponent<StudiesMenuProps>;
