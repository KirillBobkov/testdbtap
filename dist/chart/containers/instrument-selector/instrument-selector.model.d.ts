import { Suggest } from '../../components/symbol-suggest/symbol-suggest.model';
import { Instrument } from '../../model/instrument.model';
export interface InstrumentSuggestComponentProps {
    onInstrumentChanged: (instrument: Instrument) => void;
    instrument?: string;
}
export declare const toSuggest: (instrument: Instrument, index: number) => Suggest;
export declare const toInstrument: (suggest: Suggest) => Instrument;
