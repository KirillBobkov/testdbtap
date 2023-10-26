export const iteratorForEach = (iterator, forEach) => {
    let value = iterator.next();
    while (!value.done) {
        forEach(value.value);
        value = iterator.next();
    }
};
