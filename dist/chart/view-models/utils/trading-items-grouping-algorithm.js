import { pipe } from 'fp-ts/function';
import { array, record, string } from 'fp-ts';
import { notEmpty } from '../../../utils/typeGuards';
import { fromCompare } from 'fp-ts/Ord';
import { getTradingItemPrice, sortTradingItems } from '../../model/trading/trading.model';
/**
 * Creates groups from trading items.
 * Current algorithm requires the distance between items - for grouping predicate.
 * @param ordersAndPositions
 * @param orderHeight
 * @param marketPrice
 */
export function groupTradingItems(ordersAndPositions, orderHeight, marketPrice) {
    const minGap = 2;
    const mappedOrdersAndPositions = pipe(ordersAndPositions, record.collect(string.Ord)((_, i) => i), array.map(item => ({
        id: item.model.id,
        y: item.y || 0,
        top: (item.y || 0) - orderHeight / 2,
        bottom: (item.y || 0) + orderHeight / 2,
    })), array.sort(fromCompare((a, b) => (a.y === b.y ? 0 : a.y < b.y ? -1 : 1))));
    const arrayOfGroups = [];
    let isGroupStarted = false;
    let isGroupInterrupted = false;
    let isAddingContinue = false;
    for (let i = 0; i < mappedOrdersAndPositions.length; i++) {
        const currentItem = mappedOrdersAndPositions[i];
        const prevItem = mappedOrdersAndPositions[i - 1];
        const nextItem = mappedOrdersAndPositions[i + 1];
        if (nextItem) {
            const currentItemBottom = isGroupStarted && !isGroupInterrupted
                ? arrayOfGroups[arrayOfGroups.length - 1][0].bottom
                : currentItem.bottom;
            const nextItemTop = nextItem.top;
            const deltaNext = nextItemTop - currentItemBottom;
            const firstCondition = currentItemBottom >= nextItemTop;
            const secondCondition = currentItemBottom < nextItemTop && Math.abs(deltaNext) <= minGap;
            if (firstCondition || secondCondition) {
                isGroupStarted = true;
                isGroupInterrupted = false;
            }
            else if (isGroupStarted) {
                isGroupInterrupted = true;
                isAddingContinue = false;
            }
            if (isGroupStarted && !isGroupInterrupted && !isAddingContinue) {
                isAddingContinue = true;
                arrayOfGroups.push([currentItem]);
            }
        }
        if (isGroupStarted && prevItem) {
            const lastGroupIndex = arrayOfGroups.length - 1;
            const currentItemTop = currentItem.top;
            const prevItemBottom = isGroupStarted ? arrayOfGroups[lastGroupIndex][0].bottom : prevItem.bottom;
            const deltaPrev = currentItemTop - prevItemBottom;
            const firstCondition = currentItemTop >= prevItemBottom && Math.abs(deltaPrev) <= minGap;
            const secondCondition = currentItemTop < prevItemBottom;
            if (firstCondition || secondCondition) {
                arrayOfGroups[lastGroupIndex] = Array.from(new Set([...arrayOfGroups[lastGroupIndex], currentItem]));
            }
            else {
                isGroupStarted = false;
            }
        }
    }
    return pipe(arrayOfGroups, array.reduce({}, (groupsMap, group) => {
        const items = pipe(group, array.map(item => ordersAndPositions[item.id]), array.filter(notEmpty), sortTradingItems);
        const groupPrice = getTradingItemPrice(items[0], marketPrice);
        groupsMap[groupPrice] = {
            items,
            groupPrice,
            visible: items[0].visible,
        };
        return groupsMap;
    }));
}
