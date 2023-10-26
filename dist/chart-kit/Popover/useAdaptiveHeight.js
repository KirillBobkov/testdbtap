import { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
const DEFAULT_POPOVER_CONTENT_SHIFT = 10;
const DEFAULT_POPOVER_WINDOW_MARGIN = 20;
const DEFAULT_POPOVER_MAX_HEIGHT = window.innerHeight;
/**
 * Checks that element fits viewport.
 * If is does not - reduces maxHeight and returns it. We see scrollbar as a consequence.
 * @param anchorRef
 * @param config
 * @doc-tags popover,hooks
 */
export const useAdaptiveHeight = (anchorRef, config = {
    contentShift: DEFAULT_POPOVER_CONTENT_SHIFT,
    windowMargin: DEFAULT_POPOVER_WINDOW_MARGIN,
    maxHeight: DEFAULT_POPOVER_MAX_HEIGHT,
}) => {
    const [adaptiveStyles, setAdaptiveStyles] = useState({});
    const contentShift = config.contentShift ?? DEFAULT_POPOVER_CONTENT_SHIFT;
    const windowMargin = config.windowMargin ?? DEFAULT_POPOVER_WINDOW_MARGIN;
    const maxHeightConfig = config.maxHeight ?? DEFAULT_POPOVER_MAX_HEIGHT;
    const calcAdaptiveStyles = useCallback(() => {
        if (!anchorRef || !anchorRef.current) {
            return;
        }
        const element = ReactDOM.findDOMNode(anchorRef.current);
        if (!(element instanceof Element)) {
            return;
        }
        const anchorBounds = element.getBoundingClientRect();
        const maxHeightToBottom = window.innerHeight - anchorBounds.bottom - contentShift - windowMargin;
        const maxHeightToTop = anchorBounds.top - contentShift - windowMargin;
        const maxHeight = Math.max(maxHeightToBottom, maxHeightToTop);
        setAdaptiveStyles({
            maxHeight: Math.min(maxHeight, maxHeightConfig),
        });
    }, [anchorRef, contentShift, windowMargin]);
    useEffect(() => {
        calcAdaptiveStyles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        window.addEventListener('resize', calcAdaptiveStyles);
        return () => {
            window.removeEventListener('resize', calcAdaptiveStyles);
        };
    }, [calcAdaptiveStyles]);
    return adaptiveStyles;
};
