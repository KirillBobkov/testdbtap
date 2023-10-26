import { createPropertyAdapter } from '../../utils/property.utils';
import { pipe, identity } from 'fp-ts/function';
import { option } from 'fp-ts';
import { DEFAULT_EXPIRATION_PERIOD } from './localstorage-layout-provider';
export const USER_DATA_KEY = 'userData';
const USERDATA_EXPIRATION_DATE_KEY = 'userDataExpirationDate';
export const createLocalStorageUserDataProvider = (storageKey = USER_DATA_KEY, options) => {
    const clearUserdataLocalStorage = () => {
        localStorage.removeItem(storageKey);
        localStorage.removeItem(USERDATA_EXPIRATION_DATE_KEY);
        localStorage.setItem(USERDATA_EXPIRATION_DATE_KEY, JSON.stringify(options?.expirationPeriod ?? DEFAULT_EXPIRATION_PERIOD));
    };
    pipe(option.fromNullable(localStorage.getItem(USERDATA_EXPIRATION_DATE_KEY)), option.map(raw => JSON.parse(raw)), option.fold(() => {
        clearUserdataLocalStorage();
    }, expDate => {
        if (Date.now() > expDate) {
            clearUserdataLocalStorage();
        }
    }));
    const getInitialUserData = () => pipe(option.fromNullable(localStorage.getItem(storageKey)), option.map(raw => JSON.parse(raw)), option.fold(() => null, identity));
    const setUserDataToLS = (userData) => {
        localStorage.setItem(storageKey, JSON.stringify(userData));
    };
    const [updateUserData, userData] = createPropertyAdapter(getInitialUserData());
    const getUserData = () => {
        return Promise.resolve(userData.getValue());
    };
    const setUserData = (newUserData) => {
        setUserDataToLS(newUserData);
        updateUserData(newUserData);
        return Promise.resolve(void 0);
    };
    return {
        getUserDataSync: () => userData.getValue(),
        getUserData,
        setUserData,
    };
};
