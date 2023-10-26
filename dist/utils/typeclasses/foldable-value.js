import { identity } from 'fp-ts/function';
export function getOrElse(Fs) {
    return onNever => fa => Fs.foldValue(fa, onNever, identity);
}
