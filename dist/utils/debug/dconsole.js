const debugLog = (...args) => console.log('%c[DEBUG]:', 'background: #3294B7; color: #fff; padding: 2px; border-radius: 2px; font-size: 10px;', ...args);
const warnLog = (...args) => console.log('%c[WARNING]:', 'background: #FFCD0097; color: #fff; padding: 2px; border-radius: 2px; font-size: 10px;', ...args);
function errorLog(...args) {
    return console.log('%c[ERROR]:', 'background: #8B1D1D; color: #fff; padding: 2px; border-radius: 2px; font-size: 10px;', ...args);
}
export const dconsole = {
    log: debugLog,
    warn: warnLog,
    error: errorLog,
};
