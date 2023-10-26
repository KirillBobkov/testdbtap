export type ColorPoolMode = 'queue' | 'stack' | 'cycle' | 'locked';
/**
 * ColorsPool is used to take colors from its in a specified order.
 * Colors are returned in the order they were added in the queue, if there are no colors left, the default one is returned.
 * There are 2 main methods getColor() and getColors(), which is used to take colors from the pool.
 * And there are 4 types of order:
 * 	- queue: if you return a color back to the pool it will be added to the queue TAIL
 * 		it's important to return colors back after use in this mode, using returnColor() or returnColors() methods.
 *  - stack: if you return a color back to the pool it will be added to the queue HEAD
 * 		it's important to return colors back after use in this mode, using returnColor() or returnColors() methods.
 * 	- locked: in this mode you should take colors only using getColors() method and you don't have to use returnColors() methods.
 * 		Every time you call getColors() it will return the array of colors starting from the beginning,
 * 		that's why there is no point in returning colors back to it.
 *  - cycle: same as locked, but it will return the colors from the pool starting from the color just after the last returned color,
 *  	if there are no colors left it will start from the beginning, that's why it's called cycle.
 *
 *  @doc-tags chart-core
 */
export declare class ColorsPool {
    private colors;
    private readonly defaultColor;
    private mode;
    private readonly deque;
    private cyclePointer;
    constructor(colors: Array<string>, defaultColor: string, mode?: ColorPoolMode);
    getColors(num: number): string[];
    getColor(): string;
    returnColors(colors: string[]): void;
    returnColor(color: string): void;
}
