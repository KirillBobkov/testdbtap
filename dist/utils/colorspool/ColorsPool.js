import { Deque } from './Deque';
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
export class ColorsPool {
    constructor(colors, defaultColor, mode = 'stack') {
        this.colors = colors;
        this.defaultColor = defaultColor;
        this.mode = mode;
        this.deque = new Deque();
        this.cyclePointer = 0;
        colors.forEach(c => this.deque.addBack(c));
    }
    getColors(num) {
        const colors = [];
        for (let i = 0; i < num; i++) {
            switch (this.mode) {
                case 'stack':
                case 'queue':
                case 'cycle':
                    colors.push(this.getColor());
                    break;
                case 'locked':
                    if (this.cyclePointer >= this.colors?.length) {
                        colors.push(this.defaultColor);
                    }
                    else {
                        colors.push(this.colors[this.cyclePointer++]);
                    }
                    break;
            }
        }
        if (this.mode === 'locked') {
            this.cyclePointer = 0;
        }
        return colors;
    }
    getColor() {
        if (this.deque.isEmpty()) {
            return this.defaultColor;
        }
        else {
            switch (this.mode) {
                case 'stack':
                case 'queue':
                    return this.deque.removeFront();
                case 'cycle':
                case 'locked':
                    const color = this.colors[this.cyclePointer];
                    this.cyclePointer = (this.cyclePointer + 1) % this.colors.length;
                    return color;
            }
        }
    }
    returnColors(colors) {
        colors.forEach(c => this.returnColor(c));
    }
    returnColor(color) {
        if (color === this.defaultColor) {
            return;
        }
        switch (this.mode) {
            case 'queue':
                this.deque.addBack(color);
                break;
            case 'stack':
                this.deque.addFront(color);
                break;
            case 'cycle':
                break;
        }
    }
}
