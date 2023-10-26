/**
 * Copies data to clipboard.
 * @param data
 * @param type
 * @doc-tags snapshot
 */
export const writeToClipboard = async (data, type) => {
    if (!navigator.clipboard || !navigator.clipboard.write || !ClipboardItem) {
        throw new Error('ClipboardAPI is not supported!');
    }
    let item;
    try {
        item = new ClipboardItem({
            [type]: data,
        });
    }
    catch (error) {
        item = new ClipboardItem({
            [type]: await data,
        });
    }
    if (item) {
        return navigator.clipboard.write([item]);
    }
    throw new Error('ClipboardAPI is not supported!');
};
