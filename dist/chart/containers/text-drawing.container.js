import { context } from '../../context/context2';
import { createElement } from 'react';
import { createTextDrawingViewModel } from '../view-models/drawings/text-drawing.view-model';
import { TextNote } from '../components/text-note/text-note.component';
import { useProperty } from '../../utils/use-property';
import { option } from 'fp-ts';
import { constNull, pipe } from 'fp-ts/function';
import { namedMemo } from '../../utils/named-memo';
import { useSink } from '../../utils/use-sink';
export const TextDrawingContainer = context.combine(createTextDrawingViewModel, context.key()('localization'), context.key()('chart'), (textDrawingViewModelSink, localization, chart) => namedMemo('TextDrawingContainer', () => {
    const textDrawingViewModel = useSink(() => textDrawingViewModelSink, [textDrawingViewModelSink]);
    const canvasChartContainer = chart.parentElement;
    const data = useProperty(textDrawingViewModel.data);
    return pipe(data, option.fold(constNull, data => createElement(TextNote, {
        container: canvasChartContainer,
        data,
        onChange: textDrawingViewModel.onChange,
        onSubmit: textDrawingViewModel.onSubmit,
        onCancel: textDrawingViewModel.onCancel,
    })));
}));
