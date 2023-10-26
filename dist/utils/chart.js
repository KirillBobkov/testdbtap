import { pipe } from 'fp-ts/function';
import { take } from 'rxjs/operators';
export const waitForCandlesSet = (chart) => pipe(chart.chartModel.candlesSetSubject, take(1));
