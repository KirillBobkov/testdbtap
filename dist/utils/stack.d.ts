/**
 * Stack data structure.
 * @doc-tags utility
 */
export declare class Stack<T> {
    private _stack;
    push(item: T): void;
    clear(): void;
    at(idx: number): T | undefined;
    pop(): T | undefined;
    getLast(): T | undefined;
    get length(): number;
}
