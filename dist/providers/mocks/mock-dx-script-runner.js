export const createMockDxScriptRunner = () => ({
    compileScript() {
        return Promise.reject(`DxScript runtime isn't available.`);
    },
    keywords() {
        return Promise.resolve([]);
    },
    runScript() {
        return Promise.reject(`DxScript runtime isn't available.`);
    },
    updateDxScriptParams() {
        return Promise.reject(`DxScript runtime isn't available.`);
    },
});
