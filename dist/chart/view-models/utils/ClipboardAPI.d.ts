type ImagePng = 'image/png';
type TextPlain = 'text/plain';
export type ClipboardDataType = ImagePng | TextPlain;
/**
 * Copies data to clipboard.
 * @param data
 * @param type
 * @doc-tags snapshot
 */
export declare const writeToClipboard: (data: Promise<Blob> | Blob, type: ClipboardDataType) => Promise<void>;
export {};
