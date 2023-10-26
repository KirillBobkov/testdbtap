import { option } from 'fp-ts';
export const getQueryParam = (param) => {
    const url = new URL(window.location.href);
    return option.fromNullable(url.searchParams.get(param));
};
export const getQueryParamArray = (param) => {
    const url = new URL(window.location.href);
    return option.fromNullable(url.searchParams.getAll(param));
};
