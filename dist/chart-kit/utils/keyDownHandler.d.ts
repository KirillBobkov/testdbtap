import { KeyCodeType } from '../Control/Control';
import React from 'react';
export interface KeyCodeHandlerOptions {
    readonly ctrlKey?: boolean;
    readonly shiftKey?: boolean;
}
export type KeyCodeHandler<T> = [KeyCodeType, (e: React.KeyboardEvent<T>) => void, KeyCodeHandlerOptions?];
/**
 * TODO describe
 * @param handlers
 * @doc-tags utility,hotkeys
 */
export declare function createKeyDownHandler<T>(...handlers: KeyCodeHandler<T>[]): (e: React.KeyboardEvent<T>) => void;
