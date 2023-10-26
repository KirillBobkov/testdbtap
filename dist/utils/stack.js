/**
 * Stack data structure.
 * @doc-tags utility
 */
export class Stack {
    constructor() {
        this._stack = [];
    }
    push(item) {
        this._stack.push(item);
    }
    clear() {
        this._stack = [];
    }
    at(idx) {
        return this._stack[idx];
    }
    pop() {
        return this._stack.pop();
    }
    getLast() {
        console.log();
        return this._stack[this._stack.length - 1];
    }
    get length() {
        return this._stack.length;
    }
}
