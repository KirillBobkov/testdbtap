import { newSink } from '../../../context/sink2';
import { merge } from 'rxjs';
import { Stack } from '../../../utils/stack';
export const chartActions = [
    'aggregation_change',
    'instrument_change',
    'chart_type_change',
    'settings_change',
    'studies_change',
    'drawings_update',
    'compare_change',
    'y_axis_labels_change',
    'bring_to_front',
    'bring_to_back',
    'move_forward',
    'move_backward',
];
/**
 * @doc-tags chart-react,undo
 */
export const createActionsHistoryVM = () => {
    const undoStack = new Stack();
    const redoStack = new Stack();
    const pushAction = (action, executeOnPush = true) => {
        redoStack.clear();
        undoStack.push(action);
        executeOnPush && action.redo();
    };
    const undo = () => {
        const action = undoStack.pop();
        if (action) {
            console.log(`undo ${action.type}`);
            action.undo();
            redoStack.push(action);
        }
        else {
            console.warn('Nothing to undo');
        }
    };
    const redo = () => {
        const action = redoStack.pop();
        if (action) {
            console.log(`redo ${action.type}`);
            action.redo();
            undoStack.push(action);
        }
        else {
            console.warn('Nothing to redo');
        }
    };
    const effects = merge();
    return newSink({
        redo,
        undo,
        pushAction,
        undoStack,
        redoStack,
    }, effects);
};
