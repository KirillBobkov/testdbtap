import { sequenceT } from 'fp-ts/Apply';
const internal = (Fs) => {
    const sequenceTF = sequenceT(Fs);
    return (...args) => {
        // eslint-disable-next-line no-restricted-syntax
        const fas = args.slice(0, args.length - 1);
        // eslint-disable-next-line no-restricted-syntax
        const project = args[args.length - 1];
        // eslint-disable-next-line no-restricted-syntax
        const sequenced = sequenceTF.apply(null, fas);
        return Fs.map(sequenced, as => project(...as));
    };
};
/**
 * Sequences multiple {@link ProductLeft}s of kind `*->*->*`
 * applicatively accumulating their values and then applying `project` function to those values
 * and wrapping its result in the same {@link ProductLeft} with a `product` (`&`) of types of _left_ side
 */
export function productMapLeft(Fs) {
    return internal(Fs);
}
/**
 * Sequences multiple {@link CoproductLeft}s of kind `*->*->*`
 * applicatively accumulating their values and then applying `project` function to those values
 * and wrapping its result in the same {@link CoproductLeft} with a `coproduct` (`|`) of types of _left_ side
 */
export function coproductMapLeft(Fs) {
    return internal(Fs);
}
