export const createMockPositionProvider = () => {
    return {
        closePosition() {
            return Promise.resolve();
        },
        observePositions() { },
    };
};
