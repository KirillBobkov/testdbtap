import { array, option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
export const isDrawingLayerItem = (item) => item.type === 'drawing';
export const isGroupLayerItem = (item) => item.type === 'group';
export const plainItems = (items) => pipe(items, array.chain(i => (i.type === 'group' ? [i, ...i.items] : [i])));
/**
 * A tricky function to move items in the Layer Items tree
 * doesn't mutate source array
 * @doc-tags tricky
 * @returns an array with a new tree structure
 */
export const moveLayerItem = (_items, item, position, toGroupId) => {
    // shallow copy
    const newItems = _items.map(i => (i.type === 'group' ? { ...i, items: i.items.map(it => ({ ...it })) } : { ...i }));
    //#region remove item from old place
    if (item.groupId !== undefined) {
        // if the item is in a group, then we need to remove item from the group,
        pipe(newItems.filter(isGroupLayerItem).find(i => i.id === item.groupId), option.fromNullable, option.fold(() => console.error(`groupId wasn't found: ${item.groupId ?? ''}`), (group) => {
            const idx = group.items.findIndex(i => i.id === item.id);
            group.items.splice(idx, 1);
        }));
    }
    else {
        // otherwise - remove from the root list
        const idx = newItems.findIndex(i => i.id === item.id);
        newItems.splice(idx, 1);
    }
    //#endregion
    if (toGroupId !== undefined) {
        pipe(newItems.filter(isGroupLayerItem).find(i => i.id === toGroupId), option.fromNullable, option.fold(() => console.error(`groupId wasn't found: ${toGroupId ?? ''}`), (group) => {
            group.items.splice(position, 0, { ...item, groupId: group.id });
            group.itemsVisibility = group.items.map(item => ({ id: item.id, visible: item.visible }));
        }));
    }
    else {
        // otherwise - insert in the root list
        newItems.splice(position, 0, { ...item, groupId: undefined });
    }
    return newItems;
};
const compareLayerItemId = (it1Id, it2) => it1Id === it2.id;
/**
 * A tricky function to update items in the Layer Items tree
 * doesn't mutate source array
 * @doc-tags tricky
 * @returns an array with updated items
 */
export const updateItemInLayerItems = (updateFn, itemToUpdateId) => (items) => pipe(items, array.map(i => {
    if (compareLayerItemId(itemToUpdateId, i)) {
        if (isGroupLayerItem(i)) {
            return {
                ...updateFn(i),
                items: i.items.map(updateFn),
            };
        }
        else {
            return updateFn(i);
        }
    }
    else if (isGroupLayerItem(i)) {
        return {
            ...i,
            items: updateItemInLayerItems(updateFn, itemToUpdateId)(i.items),
        };
    }
    else {
        return i;
    }
}));
/**
 * Makes a function for creating uniq names/ids based on predicate
 * @param checker, function checks if name is uniq
 * @returns function generates uniq name incrementing order number
 */
export const generateUniqFn = (checker) => function generateUniq(name, order) {
    return pipe(name, option.fromPredicate(checker), option.fold(() => {
        if (name.match(/([0-9]+)$/)) {
            const newName = name.replace(/([0-9]+)$/, `${order + 1}`);
            return generateUniq(newName, order + 1);
        }
        else {
            return generateUniq(`${name} ${order}`, order);
        }
    }, uniqName => uniqName));
};
