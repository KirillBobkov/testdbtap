export declare const KeyCodes: readonly ["Space", "Escape", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight", "Delete", "Tab", "Enter", "Backspace", "ShiftLeft", "ShiftRight", "Digit0", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Numpad0", "Numpad1", "Numpad2", "Numpad3", "Numpad4", "Numpad5", "Numpad6", "Numpad7", "Numpad8", "Numpad9", "NumpadEnter", "KeyA", "KeyP", "KeyE", "KeyO", "KeyD"];
export type KeyCodeType = (typeof KeyCodes)[number];
export declare function isKeyCode<KeyCodeType>(type: string): type is Extract<keyof KeyCodeType, string>;
export declare const KEY_CODE_NUM_MAP: {
    [code: string]: number;
};
export declare const KEY_CODE_LETR_MAP: {
    [code: string]: string;
};
export type DynamicValue<V, N extends string> = {
    [value in N]: V;
};
export type DynamicValueHandler<V, H extends string> = {
    [handler in H]: (value: V) => void;
};
export type ControlProps<V, N extends string = 'value', H extends string = 'onValueChange'> = DynamicValue<V, N> & DynamicValueHandler<V, H>;
