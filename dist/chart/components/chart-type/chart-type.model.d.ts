import { Localization } from '../../../config/localization/localization';
import { ChartType } from '../../model/chart.model';
export declare const typeToString: (type: ChartType, localization?: Localization) => string;
export declare const toType: (type: string, localization?: Localization) => ChartType;
