import { context } from '../../context/context2';
import { Subject } from 'rxjs';
// TODO: add unsubscribe from utility servce
export const createUtilityDataService = context.combine(context.key()('chartDataProvider'), (chartDataProvider) => {
    const subscribeServiceData = (symbol) => {
        const subject = new Subject();
        const dataCallback = (data) => subject.next(data);
        chartDataProvider.subscribeServiceData(symbol, dataCallback);
        return subject;
    };
    return {
        subscribeServiceData,
    };
});
