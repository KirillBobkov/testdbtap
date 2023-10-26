export const createMockNewsDataProvider = () => ({
    requestNews() {
        return Promise.resolve({
            news: [],
        });
    },
});
