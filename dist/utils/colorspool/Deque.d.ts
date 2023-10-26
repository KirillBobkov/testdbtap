export declare class Deque<T> {
    private readonly data;
    private front;
    private back;
    private size;
    constructor();
    isEmpty(): boolean;
    addFront(value: T): void;
    removeFront(): any;
    peekFront(): any;
    addBack(value: T): void;
    removeBack(): any;
    peekBack(): any;
}
