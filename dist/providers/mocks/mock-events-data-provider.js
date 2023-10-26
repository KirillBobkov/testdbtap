import { generateEvents } from '../../utils/generator/event-generator.utls';
export const createMockEventDataProvider = () => {
    return {
        requestEventsData: () => Promise.resolve({ events: generateEvents() }),
    };
};
