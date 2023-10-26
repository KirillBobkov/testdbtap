import { observable } from 'fp-ts-rxjs';
import { pipe } from 'fp-ts/function';
import { context } from '../../../context/context2';
import { chartSettingsLens } from '../chart-configurator.view-model';
export const separateVolumesOnHistogramEffect = context.combine(context.key()('chartConfiguratorViewModel'), context.key()('chartTypeViewModel'), (chartConfiguratorViewModel, chartTypeViewModel) => pipe(chartTypeViewModel.type, observable.filter(type => type === 'histogram'), observable.map(() => chartConfiguratorViewModel.setSettingsByPath(chartSettingsLens(['chartCore', 'components', 'volumes', 'showSeparately']), true))));
