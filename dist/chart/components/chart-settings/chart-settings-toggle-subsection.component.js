import React, { useEffect, memo, useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { usePrevious } from '../../../utils/use-previous';
export const ChartSettingsToggleSubsectionAnimation = memo((props) => {
    const { isOpened, children } = props;
    const ref = useRef(null);
    const prevIsOpened = usePrevious(isOpened);
    const [style, animate] = useSpring(() => ({
        config: { duration: 200 },
        height: '0px',
    }), []);
    useEffect(() => {
        animate({
            height: (isOpened ? ref.current?.offsetHeight : 0) + 'px',
        });
    }, [animate, ref, isOpened]);
    // undefined means initial state(preventing animation from unnecesary triggers)
    return isOpened && prevIsOpened === undefined ? (React.createElement("div", { style: {
            overflow: 'hidden',
        }, ref: ref }, children)) : (React.createElement(animated.div, { style: {
            overflow: 'hidden',
            ...style,
        } },
        React.createElement("div", { ref: ref }, children)));
});
