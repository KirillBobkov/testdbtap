import { useCallback, useRef, useEffect, useMemo } from 'react';
import { animationFrameThrottled, cancelThrottledAnimationFrame, } from '@devexperts/dxcharts-lite/dist/chart/utils/performance/request-animation-frame-throttle.utils';
import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
/**
 * @doc-tags hooks
 */
export function useCVHCssProperty() {
    const mounted = useRef(false);
    const animFrameId = useMemo(() => `cvh_${uuid()}`, []);
    // --cvh is a custom css property created to resolve the problem
    // of vh prop on a mobile devices
    // vh is calculated incorrectly on the mobiles because of url section
    const updateCVHCssProperty = useCallback(() => {
        animationFrameThrottled(animFrameId, () => {
            const cvh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--cvh', `${cvh}px`);
        });
    }, []);
    useEffect(() => {
        if (!mounted.current) {
            updateCVHCssProperty();
            mounted.current = true;
        }
    }, [updateCVHCssProperty]);
    useEffect(() => {
        const resizeObserver = new ResizeObserver(updateCVHCssProperty);
        resizeObserver.observe(document.documentElement);
        return () => {
            cancelThrottledAnimationFrame(animFrameId);
            resizeObserver.unobserve(document.documentElement);
        };
    }, [updateCVHCssProperty]);
}
