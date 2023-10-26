import { Sink as SinkImport } from '../utils/sink';
export type Sink<A> = SinkImport<A>;
export declare const newSink: <A>(value: A, effects: import("rxjs").Observable<unknown>) => import("../utils/adt/sink.utils").Sink1<"Observable", A>;
