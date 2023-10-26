import { MultiChartLayout } from '../chart/model/layout.model';
export type MigrationFnType = (layout: Record<string, any>) => MultiChartLayout;
export interface LayoutMigrationScript {
    name: string;
    migrateFn: MigrationFnType;
}
