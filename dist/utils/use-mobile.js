import { useState, useEffect, useCallback } from 'react';
import { isMobile } from '@devexperts/dxcharts-lite/dist/chart/utils/device/browser.utils';
function useMobile() {
    const [mobile, setMobile] = useState(false);
    const handleResize = useCallback(() => {
        const isMobileDevice = isMobile();
        if (isMobileDevice) {
            setMobile(true);
        }
        else {
            setMobile(false);
        }
    }, [setMobile]);
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);
    return mobile;
}
export default useMobile;
