import { context } from '../../context/context2';
import { CrosshairType } from '../components/cross-hair-type/crosshair-type';
import { createElement } from 'react';
import { useObservable } from '../../utils/use-observable';
import { namedMemo } from '../../utils/named-memo';
export const CrosshairTypeContainer = context.combine(context.key()('chartConfiguratorViewModel'), (vm) => namedMemo('CrosshairTypeContainer', () => {
    const value = useObservable(vm.config$, vm.defaultConfig);
    return createElement(CrosshairType, {
        onValueChange: vm.setConfig,
        value,
    });
}));
