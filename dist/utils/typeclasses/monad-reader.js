export function defer(Fs) {
    return (fa, ...keys) => 
    // eslint-disable-next-line no-restricted-syntax
    Fs.asks(outerE => Fs.asks(innerE => Fs.runReader(fa, Object.assign({}, outerE, innerE))));
}
