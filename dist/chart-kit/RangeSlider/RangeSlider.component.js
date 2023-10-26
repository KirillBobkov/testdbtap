import { array, number } from 'fp-ts';
import { contramap } from 'fp-ts/Ord';
import { pipe } from 'fp-ts/function';
import React, { useCallback, useState, useMemo, memo, useContext } from 'react';
import { MultiChartComponentContext } from '../../chart/components/multi-chart/multi-chart-context';
import { RangeSliderBreakpoint, RangeSliderBreakpointDisabled, RangeSliderBreakpoints, RangeSliderStyled, RangeSliderWrapper, } from './RangeSlider.styled';
export const RangeSlider = memo((props) => {
    const { elements, selectedIdx, minIdx, maxIdx, showLabels = true, onValueChange } = props;
    const sortedElements = pipe(elements, array.sort(contramap((elem) => elem.value)(number.Ord)));
    const minValueIdx = useMemo(() => (minIdx !== undefined ? sortedElements.findIndex(el => el.value === elements[minIdx].value) : 0), [minIdx, elements, sortedElements]);
    const maxValueIdx = useMemo(() => (maxIdx !== undefined ? sortedElements.findIndex(el => el.value === elements[maxIdx].value) : 0), [maxIdx, elements, sortedElements]);
    const selectedValueIdx = useMemo(() => {
        if (selectedIdx !== undefined) {
            if (minIdx !== undefined && elements[selectedIdx].value < elements[minIdx].value) {
                return minValueIdx;
            }
            if (maxIdx !== undefined && elements[selectedIdx].value > elements[maxIdx].value) {
                return maxValueIdx;
            }
            return sortedElements.findIndex(el => el.value === elements[selectedIdx].value);
        }
        return minValueIdx;
    }, [selectedIdx, elements, maxIdx, maxValueIdx, minIdx, minValueIdx, sortedElements]);
    const values = sortedElements.map(e => e.value);
    const [sliderWidth, setSliderWidth] = useState(1);
    const onChangeHandler = useCallback((e) => {
        if (e.target.value) {
            if ((minIdx !== undefined && values[e.target.value] < elements[minIdx].value) ||
                (maxIdx !== undefined && values[e.target.value] > elements[maxIdx].value)) {
                return;
            }
        }
        onValueChange?.(parseFloat(e.currentTarget.value));
    }, [elements, maxIdx, minIdx, values, onValueChange]);
    const sectionWidth = sliderWidth / (elements.length - 1);
    const disabledLeftWidth = minIdx !== undefined ? minValueIdx * sectionWidth : 0;
    const disabledRightWidth = maxIdx !== undefined ? maxValueIdx * sectionWidth : sliderWidth;
    const disabledColor = 'rgba(79, 79, 79, 0.3)';
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    return (React.createElement(RangeSliderWrapper, { keyboardModeEnabled: keyboardModeEnabled, labels: { first: sortedElements[0].desc, last: sortedElements[sortedElements.length - 1].desc }, showLabels: showLabels, ref: (node) => node && setSliderWidth(node.offsetWidth) },
        React.createElement(RangeSliderBreakpoints, null, sortedElements.map(elem => {
            if ((minIdx !== undefined && elem.value <= elements[minIdx].value) ||
                (maxIdx !== undefined && elem.value >= elements[maxIdx].value)) {
                return (React.createElement(RangeSliderBreakpointDisabled, { disabledBreakpointColor: disabledColor, sectionWidth: sectionWidth, key: elem.key }));
            }
            else {
                return React.createElement(RangeSliderBreakpoint, { sectionWidth: sectionWidth, key: elem.key });
            }
        })),
        React.createElement(RangeSliderStyled, { disabledLeftWidth: disabledLeftWidth, disabledRightWidth: disabledRightWidth, disabledSectionsColor: disabledColor, type: "range", min: 0, max: elements.length - 1, value: selectedValueIdx, step: 1, onChange: onChangeHandler })));
});
