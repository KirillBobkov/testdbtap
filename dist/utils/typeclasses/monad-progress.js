import { none, some } from 'fp-ts/Option';
export function fromProgressEvent(Ms) {
    return e => Ms.fromProgress({
        loaded: e.loaded,
        total: e.lengthComputable ? some(e.total) : none,
    });
}
