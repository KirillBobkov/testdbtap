import { escapeRegExp, getCapitalLetters } from './string.utils';
import { valueByPath } from './get-value-by-path.util';
// Filter list by properties when at least one of them is true to filter
export function filterListByProperties(list, filter, properties) {
    if (properties.length < 1 || filter.trim().length < 1) {
        return list;
    }
    return list.filter(element => {
        const filterBy = filter.trim();
        for (const property of properties) {
            const { path, filterByCapitalLetters, transformValue } = property;
            const value = valueByPath(element, path);
            if (typeof value === 'string') {
                let shortValue = null;
                if (filterByCapitalLetters) {
                    shortValue = getCapitalLetters(value);
                }
                let transformedValue = null;
                if (transformValue) {
                    transformedValue = transformValue(value);
                }
                const regExpFilter = new RegExp(escapeRegExp(filterBy), 'gi');
                return (regExpFilter.test(value) ||
                    (shortValue && regExpFilter.test(shortValue)) ||
                    (transformedValue && regExpFilter.test(transformedValue)));
            }
        }
        return true;
    });
}
