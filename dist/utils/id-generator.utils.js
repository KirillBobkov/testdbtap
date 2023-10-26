import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
const ids = {};
export const createIdGenerator = (generatorName = '') => {
    const generatorId = `${generatorName}_${uuid()}`;
    ids[generatorId] = 0;
    return generatorId;
};
export const nextId = (generatorId) => {
    const nextId = ++ids[generatorId];
    ids[generatorId] = nextId;
    return `${generatorId}_${nextId}`;
};
export function generateRandomId() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return 'uuid:' + Math.random().toString(36).substring(2, 11);
}
