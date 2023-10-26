import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { EMPTY } from 'rxjs';
export const createDynamicObjectsViewModel = context.combine(context.key()('chart'), context.key()('actionsHistoryVM'), (chart, actionsHistoryVM) => {
    const bringToFront = (id) => {
        const redo = () => chart.dynamicObjects.model.bringToFront(id);
        const undo = () => chart.dynamicObjects.model.bringToBack(id);
        actionsHistoryVM.pushAction({
            type: 'bring_to_front',
            redo,
            undo,
        });
    };
    const sendToBack = (id) => {
        const redo = () => chart.dynamicObjects.model.bringToBack(id);
        const undo = () => chart.dynamicObjects.model.bringToFront(id);
        actionsHistoryVM.pushAction({
            type: 'bring_to_back',
            redo,
            undo,
        });
    };
    const moveForward = (id) => {
        const redo = () => chart.dynamicObjects.model.moveForward(id);
        const undo = () => chart.dynamicObjects.model.moveBackwards(id);
        actionsHistoryVM.pushAction({
            type: 'move_forward',
            redo,
            undo,
        });
    };
    const moveBackward = (id) => {
        const redo = () => chart.dynamicObjects.model.moveBackwards(id);
        const undo = () => chart.dynamicObjects.model.moveForward(id);
        actionsHistoryVM.pushAction({
            type: 'move_backward',
            redo,
            undo,
        });
    };
    return newSink(callTracerProxy('dynamicObjectsViewModel', {
        bringToFront,
        sendToBack,
        moveForward,
        moveBackward,
    }), EMPTY);
});
