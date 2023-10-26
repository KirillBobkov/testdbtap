import React, { memo, useCallback, useContext, useMemo } from 'react';
import { PriceIncrementsUtils } from '@devexperts/dxcharts-lite/dist/chart/utils/price-increments.utils';
import { getTimezoneOffset } from '@devexperts/dxcharts-lite/dist/chart/model/time-zone.model';
import { fromDateInputValueToDate, fromDateToDateInputValue, fromDateToTimeInputValue, fromTimeInputValueToDate, getPricePrecisionFormatter, } from '../../../../../../utils/inputs.utils';
import { DrawingSettingsGroup } from '../../../drawing-settings-section/drawing-settings-group';
import { DrawingSettingsItem } from '../../../drawing-settings-section/drawing-settings-item';
import { NumericStepper } from '../../../../../../chart-kit/NumericStepper/NumericStepper.component';
import { pipe, constVoid } from 'fp-ts/function';
import { array, option } from 'fp-ts';
import { DateInput } from '../../../../../../chart-kit/DateInput/DateInput.component';
import { TimeInput } from '../../../../../../chart-kit/TimeInput/TimeInput.component';
import { PopupEventTargetConsumer } from '../../../../../../chart-kit/Popup/PopupUI.component';
import { ChartReactAppContext } from '../../../../../defaults';
const MIN_DATE = new Date(1970);
const MAX_DATE = new Date();
export const DRAWINGS_DATE_COORDINATES_SECTION = Symbol('DRAWINGS_DATE_COORDINATES_SECTION');
// TODO: Remove themes and rewrite to a generic component with a lens logic incapsulated like in the other groups
export const DateCoordinatesGroup = memo((props) => {
    const { value, onValueChange, withPrice, currentTimezone, instrument, drawingsDict, updateAllPointsPrice } = props;
    const updateCoordinate = useCallback((newValue, index) => pipe(value, array.updateAt(index, newValue), option.fold(constVoid, onValueChange)), [value, onValueChange]);
    return (React.createElement(React.Fragment, null, value.map((point, index) => (React.createElement(DateCoordinatesSectionItem, { key: `DrawingSettingsCoordinatesGroup_${index}`, pointIndex: index, point: point, points: value, onValueChange: onValueChange, updatePoint: updateCoordinate, drawingsDict: drawingsDict, withPrice: withPrice, instrument: instrument, currentTimezone: currentTimezone, updateAllPointsPrice: updateAllPointsPrice })))));
});
const DateCoordinatesSectionItem = memo(props => {
    const { point, updatePoint, pointIndex, drawingsDict, instrument, currentTimezone, withPrice, points, onValueChange, updateAllPointsPrice, } = props;
    //#region localization
    const coordinatesSectionDict = drawingsDict.popup.sections.coordinates;
    const priceLabel = coordinatesSectionDict.priceLabel;
    const dateLabel = coordinatesSectionDict.dateLabel;
    const timeLabel = coordinatesSectionDict.timeLabel;
    const calendarDict = drawingsDict.calendar;
    //#endregion
    const { config: chartReactConfig } = useContext(ChartReactAppContext);
    const tzOffset = useMemo(() => getTimezoneOffset(currentTimezone, point.timestamp), [currentTimezone]);
    const pointDate = useMemo(() => new Date(point.timestamp + tzOffset), [point.timestamp, tzOffset]);
    const updatePrice = useCallback((changedPrice) => pipe(updateAllPointsPrice, option.fromNullable, option.fold(() => updatePoint({ ...point, value: changedPrice }, pointIndex), () => pipe(points, array.map(p => ({ ...p, value: changedPrice })), onValueChange))), [onValueChange, point, pointIndex, points, updatePoint, updateAllPointsPrice]);
    const updateTime = useCallback((time) => pipe(fromTimeInputValueToDate(pointDate, time), date => date.getTime() - tzOffset, timestamp => updatePoint({ ...point, timestamp }, pointIndex)), [point, pointIndex, updatePoint, tzOffset, pointDate]);
    const updateDate = useCallback((inputDate) => pipe(fromDateInputValueToDate(pointDate, inputDate), date => date.getTime() - tzOffset, timestamp => updatePoint({ ...point, timestamp }, pointIndex)), [point, pointIndex, updatePoint, pointDate, tzOffset]);
    const step = useMemo(() => instrument !== undefined
        ? PriceIncrementsUtils.getPriceIncrement(point.value, instrument.priceIncrements)
        : 0, [point.value, instrument]);
    const pricePrecision = useMemo(() => PriceIncrementsUtils.calculatePrecision(step), [step]);
    return (React.createElement(PopupEventTargetConsumer, null, eventTarget => (React.createElement(DrawingSettingsGroup, null,
        withPrice && (React.createElement(DrawingSettingsItem, { label: priceLabel },
            React.createElement(NumericStepper, { min: 0, max: Number.POSITIVE_INFINITY, step: step, value: point.value, onValueChange: updatePrice, formatter: getPricePrecisionFormatter(pricePrecision) }))),
        React.createElement(DrawingSettingsItem, { label: dateLabel },
            React.createElement(DateInput, { value: fromDateToDateInputValue(pointDate), min: MIN_DATE, max: MAX_DATE, onValueChange: updateDate, calendarDict: calendarDict, parentEventTarget: eventTarget, dateFormatType: chartReactConfig.dateFormatters?.dateInput })),
        React.createElement(DrawingSettingsItem, { label: timeLabel },
            React.createElement(TimeInput, { value: fromDateToTimeInputValue(pointDate), onValueChange: updateTime }))))));
});
