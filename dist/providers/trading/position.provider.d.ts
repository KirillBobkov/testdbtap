import { Position } from '../../chart/model/trading/position.model';
export interface PositionProvider {
    observePositions(symbol: string, dataCallback: (positions: Position[]) => void): void;
    closePosition(symbol: string, id: string): Promise<void>;
}
