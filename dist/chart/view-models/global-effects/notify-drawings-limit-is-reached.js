import { context } from '../../../context/context2';
import { identity, pipe } from 'fp-ts/function';
import { filter, skip, tap } from 'rxjs/operators';
export const notifyDrawingsLimitIsReachedEffect = context.combine(context.key()('notificationVM'), context.key()('drawingViewModel'), context.key()('multiChartViewModel'), (notificationVM, drawingViewModel, multiChartViewModel) => {
    return pipe(drawingViewModel.isDrawingsLimitReached, skip(1), filter(identity), tap(() => multiChartViewModel.setDrawingMode(false)), tap(() => notificationVM.sendNotification('The limit of drawings is reached')));
});
