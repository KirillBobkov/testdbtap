import React, { MouseEventHandler, ReactNode, ReactText, Ref } from 'react';
import { LineDash, LineWidth } from '../../../../chart/model/drawing.model';
export interface CKLineStyleSquareAnchorProps {
    readonly isOpened?: boolean;
    readonly caretIcon?: ReactNode;
    readonly valueText?: ReactNode;
    readonly value?: ReactText | ReactText[];
    readonly onClick?: MouseEventHandler;
    readonly isDisabled?: boolean;
    readonly ref?: Ref<HTMLButtonElement>;
    readonly className?: string;
    readonly lineWidth: LineWidth;
    readonly lineDash: LineDash;
    readonly children?: ReactNode;
}
export declare const LineStyleSquareAnchor: React.FC<CKLineStyleSquareAnchorProps>;
