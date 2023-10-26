import { isSome } from 'fp-ts/Option';
import { option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { constVoid } from 'fp-ts/function';
import { replaceInArray } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
export const LAYOUTS_KEY = 'layouts';
const LAYOUTS_EXPIRATION_DATE_KEY = 'layoutsExpirationDate';
export const DEFAULT_EXPIRATION_PERIOD = Number.MAX_SAFE_INTEGER;
export const createLocalStorageLayoutProvider = (storageKey = LAYOUTS_KEY, options) => {
    const setLayoutExpirationDate = () => localStorage.setItem(LAYOUTS_EXPIRATION_DATE_KEY, JSON.stringify(options?.expirationPeriod ?? DEFAULT_EXPIRATION_PERIOD));
    pipe(option.fromNullable(localStorage.getItem(LAYOUTS_EXPIRATION_DATE_KEY)), option.map(raw => JSON.parse(raw)), option.fold(setLayoutExpirationDate, expDate => {
        if (Date.now() > expDate) {
            localStorage.removeItem(storageKey);
            setLayoutExpirationDate();
        }
    }));
    const getLayoutFromLS = () => pipe(option.fromNullable(localStorage.getItem(storageKey)), option.map(raw => JSON.parse(raw)));
    return {
        createLayout(layout) {
            const id = Math.random().toString(36).substring(2, 11);
            console.log(`Creating new layout: ${id}`);
            const layoutWithId = { id, ...layout };
            pipe(option.fromNullable(localStorage.getItem(storageKey)), option.fold(() => {
                const lastUpdateTimeStamp = Date.now();
                const newLayoutData = {
                    selectedLayoutId: id,
                    layouts: [{ ...layoutWithId, lastUpdateTimeStamp }],
                };
                return newLayoutData;
            }, raw => {
                const lastUpdateTimeStamp = Date.now();
                const layoutData = JSON.parse(raw);
                layoutData.layouts.push({ ...layoutWithId, lastUpdateTimeStamp });
                return layoutData;
            }), layoutData => {
                localStorage.setItem(storageKey, JSON.stringify(layoutData));
            });
            return Promise.resolve(id);
        },
        getLayouts() {
            const layoutData = getLayoutFromLS();
            if (isSome(layoutData)) {
                return Promise.resolve(layoutData.value);
            }
            console.warn('No layouts created yet');
            return Promise.reject();
        },
        updateLayout(layout) {
            const raw = localStorage.getItem(storageKey);
            if (!raw) {
                return Promise.reject(new Error(`There is no localstorage item ${storageKey}`));
            }
            const layoutData = JSON.parse(raw);
            layoutData.layouts = replaceInArray(layoutData.layouts, (item) => item.id === layout.id, layout);
            localStorage.setItem(storageKey, JSON.stringify(layoutData));
            return Promise.resolve();
        },
        deleteLayout(id) {
            pipe(option.fromNullable(localStorage.getItem(storageKey)), option.map(raw => JSON.parse(raw)), option.fold(constVoid, layoutData => {
                layoutData.layouts = layoutData.layouts.filter(layout => layout.id !== id);
                localStorage.setItem(storageKey, JSON.stringify(layoutData));
            }));
            return Promise.resolve();
        },
        updateSelectedLayout(id) {
            pipe(option.fromNullable(localStorage.getItem(storageKey)), option.map(raw => JSON.parse(raw)), option.fold(constVoid, layoutData => {
                layoutData.selectedLayoutId = id;
                localStorage.setItem(storageKey, JSON.stringify(layoutData));
            }));
            return Promise.resolve();
        },
    };
};
