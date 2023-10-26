import { moveLayerItem, updateItemInLayerItems } from '../chart-layers.model';
const layerItemsToStr = (layerTree) => layerTree.map(r => (r.type === 'group' ? `${r.id}-[${r.items.map(i => i.id).join(',')}]` : r.id)).join(',');
describe('chart-layers.model', () => {
    describe('moveLayerItem simple', () => {
        const layerTree = [
            {
                id: '1',
                type: 'drawing',
                groupId: undefined,
                // @ts-ignore
                drawing: undefined,
                name: 'trend line',
            },
            {
                id: '2',
                type: 'drawing',
                groupId: undefined,
                // @ts-ignore
                drawing: undefined,
                name: 'trend line',
            },
            {
                id: '3',
                type: 'drawing',
                groupId: undefined,
                // @ts-ignore
                drawing: undefined,
                name: 'trend line',
            },
            {
                id: '4',
                type: 'drawing',
                groupId: undefined,
                // @ts-ignore
                drawing: undefined,
                name: 'trend line',
            },
        ];
        it('move from start to 3', () => {
            const result = moveLayerItem(layerTree, layerTree[0], 3);
            expect(layerItemsToStr(result)).toBe('2,3,4,1');
        });
        it('move from end to start', () => {
            const result = moveLayerItem(layerTree, layerTree[3], 0);
            expect(layerItemsToStr(result)).toBe('4,1,2,3');
        });
        it('move from start to end', () => {
            const result = moveLayerItem(layerTree, layerTree[0], 4);
            expect(layerItemsToStr(result)).toBe('2,3,4,1');
        });
    });
    describe('moveLayerItem with Group', () => {
        const layerTree = [
            // @ts-ignore
            {
                id: '1',
                type: 'drawing',
                groupId: undefined,
            },
            {
                id: '2',
                type: 'group',
                groupId: undefined,
                items: [
                    // @ts-ignore
                    {
                        id: '5',
                        type: 'drawing',
                        groupId: '2',
                    },
                    // @ts-ignore
                    {
                        id: '6',
                        type: 'drawing',
                        groupId: '2',
                    },
                ],
            },
            // @ts-ignore
            {
                id: '3',
                type: 'drawing',
                groupId: undefined,
            },
            // @ts-ignore
            {
                id: '4',
                type: 'drawing',
                groupId: undefined,
            },
        ];
        it('move from start to 3', () => {
            const result = moveLayerItem(layerTree, layerTree[0], 3);
            expect(layerItemsToStr(result)).toBe('2-[5,6],3,4,1');
        });
        it('move to the end of the group', () => {
            const result = moveLayerItem(layerTree, layerTree[0], 2, '2');
            expect(layerItemsToStr(result)).toBe('2-[5,6,1],3,4');
        });
        it('move to in the middle of the group', () => {
            const result = moveLayerItem(layerTree, layerTree[0], 1, '2');
            expect(layerItemsToStr(result)).toBe('2-[5,1,6],3,4');
        });
        it('move to start of the group', () => {
            const result = moveLayerItem(layerTree, layerTree[0], 0, '2');
            expect(layerItemsToStr(result)).toBe('2-[1,5,6],3,4');
        });
        it('move group to start', () => {
            const result = moveLayerItem(layerTree, layerTree[1], 0);
            expect(layerItemsToStr(result)).toBe('2-[5,6],1,3,4');
        });
        it('move group to end', () => {
            const result = moveLayerItem(layerTree, layerTree[1], 4);
            expect(layerItemsToStr(result)).toBe('1,3,4,2-[5,6]');
        });
        it('move element from the group', () => {
            // @ts-ignore
            const result = moveLayerItem(layerTree, layerTree[1].items[0], 4);
            expect(layerItemsToStr(result)).toBe('1,2-[6],3,4,5');
        });
    });
    describe('updateItemInLayerItems', () => {
        const layerTree = [
            // @ts-ignore
            {
                id: '1',
                type: 'drawing',
                groupId: undefined,
            },
            {
                id: '2',
                type: 'group',
                groupId: undefined,
                items: [
                    // @ts-ignore
                    {
                        id: '5',
                        type: 'drawing',
                        groupId: '2',
                    },
                    // @ts-ignore
                    {
                        id: '6',
                        type: 'drawing',
                        groupId: '2',
                    },
                ],
            },
            // @ts-ignore
            {
                id: '3',
                type: 'drawing',
                groupId: undefined,
            },
            // @ts-ignore
            {
                id: '4',
                type: 'drawing',
                groupId: undefined,
            },
        ];
        it('update plain item visibility', () => {
            const result = updateItemInLayerItems(it => ({ ...it, visible: true }), '1')(layerTree);
            expect(result[0].visible).toBe(true);
        });
        it('update child item visibility', () => {
            const result = updateItemInLayerItems(it => ({ ...it, visible: true }), '5')(layerTree);
            // @ts-ignore
            expect(result[1].items[0].visible).toBe(true);
        });
        it('update group item with children visibility', () => {
            const result = updateItemInLayerItems(it => ({ ...it, visible: true }), '2')(layerTree);
            expect(result[1].visible).toBe(true);
            // note: update item logic doesn't update child items' properties
            // @ts-ignore
            expect(result[1].items[0].visible).toBe(true);
        });
    });
});
