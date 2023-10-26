import { Lazy } from 'fp-ts/function';
interface BtnsKeyCodes {
    undoKeyCode: string;
    redoKeyCode: string;
}
/**
 * Enables undo/redo VM.
 * @param btnsKeyCodes
 * @param undo
 * @param redo
 * @doc-tags undo, shortcut
 */
export declare const useUndoRedo: (btnsKeyCodes: BtnsKeyCodes, undo: Lazy<void>, redo: Lazy<void>) => void;
export {};
