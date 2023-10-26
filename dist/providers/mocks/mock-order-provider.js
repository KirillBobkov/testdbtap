export const createMockOrderProvider = () => {
    return {
        createOrder() {
            return Promise.resolve('');
        },
        deleteOrder() {
            return Promise.resolve();
        },
        observeExecutedOrders() { },
        observeOrders() { },
        updateOrder() {
            return Promise.resolve();
        },
    };
};
