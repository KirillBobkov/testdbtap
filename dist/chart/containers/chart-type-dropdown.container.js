import { context } from '../../context/context2';
import { ChartTypeDropdown } from '../components/chart-type/chart-type-dropdown.component';
import { createElement } from 'react';
import { useProperty } from '../../utils/use-property';
import { namedMemo } from '../../utils/named-memo';
export const ChartTypeDropdownContainer = context.combine(context.key()('chartTypeViewModel'), (vm) => namedMemo('ChartTypeDropdownContainer', () => {
    const selectedType = useProperty(vm.type);
    const chartTypes = useProperty(vm.types);
    return createElement(ChartTypeDropdown, {
        onTypeSelect: vm.setType,
        selectedType,
        chartTypes,
    });
}));
