import { IconsConfig } from '../../../config/icons/icons-config';
import { ButtonsState, SidebarFooterButtonType } from './chart-sidebar.model';
import { SidebarDictionary } from '../../../config/localization/sidebar';
export declare const getSidebarFooterIconByType: (type: SidebarFooterButtonType, iconsConfig: IconsConfig, buttonsState: ButtonsState) => JSX.Element;
export declare const getSidebarFooterButtonName: (type: SidebarFooterButtonType, dictSidebar: SidebarDictionary, buttonsState: ButtonsState) => string;
