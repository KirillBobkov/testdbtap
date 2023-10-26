export function valueByPath(obj, path) {
    // @ts-ignore
    return path.reduce((obj, prop) => obj && obj[prop], obj);
}
