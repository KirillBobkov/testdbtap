/// <reference types="react" />
import { ChartReactAPIProps } from '.';
export type ToolbarButtonDeclaration = [string, React.ComponentType<ChartReactAPIProps>] | string;
/**
 * This list defines default chart toolbar buttons and their order.
 * If you remove or reorder a key in this list, this change will affect the toolbar.
 * The keys in this list should have the exact same name as its button containers.
 * You can also add some custom buttons (not context buttons)
 * to this list in the following format: ['buttonKey', CustomButtonComponent].
 * CustomButtonComponent - is a React component.
 * @doc-tags tricky
 */
export interface CustomToolbarButton {
    readonly index?: number;
    readonly key?: string;
    readonly button: React.ComponentType<ChartReactAPIProps>;
}
export declare const DEFAULT_TOOLBAR_BUTTONS: Array<ToolbarButtonDeclaration>;
/**
 * @name addCustomToolbarButtons
 * @description
 * You can use this 'helper' function to add custom buttons.
 * The result of this function is an array with toolbar button declarations (it also includes the default buttons).
 */
export declare const addCustomToolbarButtons: (...buttons: CustomToolbarButton[]) => Array<ToolbarButtonDeclaration>;
export declare const DEFAULT_TOOLBAR: {
    ToolbarContainer: null;
    ToolbarButtons: ToolbarButtonDeclaration[];
    ToolbarComponent: import("react").MemoExoticComponent<(props: import("../components/chart-toolbar/chart-toolbar.component").ChartToolbarProps) => JSX.Element>;
};
