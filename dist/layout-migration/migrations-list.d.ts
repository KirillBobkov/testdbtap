import { LayoutMigrationScript } from './migration.model';
interface MigrationInfo {
    /**
     * Version in which migration takes place.
     */
    version: string;
    /**
     * The migrations to perform.
     * !!! ORDER MATTERS !!!
     */
    scripts: LayoutMigrationScript[];
}
/**
 * The list of all migrations.
 * For new migrations use "NEXT_RELEASE_VERSIO_N" as a version - it will be updated during release.
 * @doc-tags layout,migration
 */
export declare const MIGRATIONS_LIST: MigrationInfo[];
export {};
