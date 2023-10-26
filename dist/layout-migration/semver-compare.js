/**
 * Copy of https://www.npmjs.com/package/semver-compare.
 * Compares versions like 1.2.3 and 3.4.0.
 * @param a
 * @param b
 * @doc-tags utility,layout,migration
 */
export function semverCmp(a, b) {
    const pa = a.split('.');
    const pb = b.split('.');
    for (let i = 0; i < 4; i++) {
        const na = Number(pa[i]);
        const nb = Number(pb[i]);
        if (na > nb) {
            return 1;
        }
        if (nb > na) {
            return -1;
        }
        if (!isNaN(na) && isNaN(nb)) {
            return 1;
        }
        if (isNaN(na) && !isNaN(nb)) {
            return -1;
        }
    }
    return 0;
}
