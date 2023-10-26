export class Deque {
    constructor() {
        this.data = {}; // Or Array, but that really does not add anything useful
        this.front = 0;
        this.back = 1;
        this.size = 0;
    }
    isEmpty() {
        return this.size === 0;
    }
    addFront(value) {
        this.size++;
        this.front = (this.front + 1) % Number.MAX_SAFE_INTEGER;
        this.data[this.front] = value;
    }
    removeFront() {
        if (!this.size) {
            return;
        }
        const value = this.peekFront();
        this.size--;
        delete this.data[this.front];
        this.front = (this.front || Number.MAX_SAFE_INTEGER) - 1;
        return value;
    }
    peekFront() {
        if (this.size) {
            return this.data[this.front];
        }
    }
    addBack(value) {
        this.size++;
        this.back = (this.back || Number.MAX_SAFE_INTEGER) - 1;
        this.data[this.back] = value;
    }
    removeBack() {
        if (!this.size) {
            return;
        }
        const value = this.peekBack();
        this.size--;
        delete this.data[this.back];
        this.back = (this.back + 1) % Number.MAX_SAFE_INTEGER;
        return value;
    }
    peekBack() {
        if (this.size) {
            return this.data[this.back];
        }
    }
}
