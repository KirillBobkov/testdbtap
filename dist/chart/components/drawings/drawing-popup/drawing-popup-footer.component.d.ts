import { DrawingsDictionary } from '../../../../config/localization/drawings';
export interface DrawingPopupFooterProps {
    readonly requestRestoreDefaults: () => void;
    readonly onCloseRequest: () => void;
    readonly drawingsDict: DrawingsDictionary;
}
export declare const DrawingPopupFooter: (props: DrawingPopupFooterProps) => JSX.Element;
