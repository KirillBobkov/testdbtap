import React from 'react';
import { CKSelectboxAnchorProps } from '../../../../chart-kit/Selectbox/SelectboxAnchor.component';
export interface DrawingGroupsAnchorProps extends CKSelectboxAnchorProps {
}
export interface AnchorWidths {
    readonly anchorMinWidth: string;
    readonly anchorMaxWidth: string;
    readonly textWidth: string;
}
export declare const DrawingGroupsAnchor: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<DrawingGroupsAnchorProps, "value" | "children" | "className" | "tabIndex" | "onKeyDown" | "onClick" | "testId" | "hasMenu" | "isOpened" | "isDisabled" | "ariaLabel" | "caretIcon" | "prefixIcon" | "valueText" | "isCaretIconChanged" | "ariaDescription"> & React.RefAttributes<HTMLButtonElement>>>;
