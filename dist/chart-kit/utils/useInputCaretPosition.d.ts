import { Ref } from 'react';
interface InputCaretAdditionalProps {
    start: number;
    end: number;
}
export declare const useInputCaretPosition: (ref: Ref<HTMLElement>) => [HTMLInputElement | undefined, InputCaretAdditionalProps];
export {};
