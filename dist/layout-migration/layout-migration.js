import { pipe } from 'fp-ts/function';
import { array } from 'fp-ts';
import { right, left } from 'fp-ts/Either';
import { semverCmp } from './semver-compare';
import { MIGRATIONS_LIST } from './migrations-list';
import { CHART_VERSION } from '../version';
import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
/**
 * Tries to migrate layout. Iterates over migrations and applies them 1-by-1.
 * Will migrate only scripts with version > layout version and <= current chart version.
 *
 * @param layout - layout to migrate
 * @doc-tags layout,migration
 */
export const tryMigrate = (layout) => {
    const layoutCopy = cloneUnsafe(layout);
    try {
        const migratedLayout = pipe(MIGRATIONS_LIST, array.filter(migration => filterMigrations(layoutCopy.version, migration.version)), migrations => {
            if (migrations.length !== 0) {
                console.log(`Will run migrations for versions: ${migrations.map(m => m.version).join(', ')}`);
            }
            return migrations;
        }, array.map(migration => migration.scripts), array.flatten, array.reduce(layoutCopy, (currentLayout, script) => {
            try {
                console.log(`Running migration ${script.name}`);
                return script.migrateFn(currentLayout);
            }
            catch (e) {
                console.warn(`Error migrating script: ${script.name}`);
                throw e;
            }
        }));
        // update version
        migratedLayout.version = CHART_VERSION;
        return right(migratedLayout);
    }
    catch (e) {
        return left(e);
    }
};
/**
 * Filters migration scripts which are appropriate for layout migration.
 * Example:
 *
 * 1.0.0  (will not run this migration)
 * 1.1.0  <== layout version
 * 1.2.0    |
 * 2.2.0    |
 * 2.3.0    | appropriate migrations
 * 2.4.0    |
 * 2.4.1    |
 * 2.4.2  <=| current version (run this migration as well)
 * 3.0.0  (will not run this migration)
 * 3.1.0
 * 3.2.0
 *
 * @param layoutVersion - version of layout being migrated
 * @param migrationVersion - version of migration script
 * @doc-tags layout,migration
 */
const filterMigrations = (layoutVersion, migrationVersion) => {
    const currentVersionParsed = CHART_VERSION.replace('-', '.');
    const layoutVersionParsed = layoutVersion.replace('-', '.');
    const migrationVersionParsed = migrationVersion.replace('-', '.');
    if (migrationVersionParsed === 'NEXT_RELEASE_VERSION') {
        return semverCmp(layoutVersionParsed, currentVersionParsed) < 0;
    }
    const layoutCmp = semverCmp(layoutVersionParsed, migrationVersionParsed);
    const currentCmp = semverCmp(currentVersionParsed, migrationVersionParsed);
    const layoutShouldBeLessThanMigrationVersion = layoutCmp < 0;
    const currentShouldBeGreaterOrEqualThanMigrationVersion = currentCmp >= 0;
    return layoutShouldBeLessThanMigrationVersion && currentShouldBeGreaterOrEqualThanMigrationVersion;
};
