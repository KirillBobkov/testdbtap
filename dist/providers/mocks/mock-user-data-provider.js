import { createPropertyAdapter } from '../../utils/property.utils';
export function createMockUserDataProvider() {
    const [updateUserData, userData] = createPropertyAdapter(null);
    const getUserData = () => {
        return Promise.resolve(userData.getValue());
    };
    const setUserData = (userData) => {
        updateUserData(userData);
        return Promise.resolve(void 0);
    };
    return {
        setUserData,
        getUserData,
    };
}
