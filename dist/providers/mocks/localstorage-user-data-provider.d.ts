import { UserDataProvider, UserData } from '../user-data-provider';
interface UserDataProviderOptionsLS {
    expirationPeriod: number;
}
export interface UserDataProviderLS extends UserDataProvider {
    getUserDataSync: () => UserData | null;
}
export declare const USER_DATA_KEY = "userData";
export declare const createLocalStorageUserDataProvider: (storageKey?: string, options?: UserDataProviderOptionsLS) => UserDataProviderLS;
export {};
