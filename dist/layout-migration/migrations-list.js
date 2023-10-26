import { DXCF_2236 } from './scripts/DXCF-2236/DXCF-2236';
import { DXCF_2553 } from './scripts/DXCF-2553/DXCF-2553';
import { DXCF_3762 } from './scripts/DXCF-3762/DXCF-3762';
import { DXCF_3889 } from './scripts/DXCF-3889/DXCF-3889';
import { DXCF_4128 } from './scripts/DXCF-4128/DXCF-4128';
import { DXCF_4202 } from './scripts/DXCF-4202/DXCF-4202';
import { DXCF_4344 } from './scripts/DXCF-4344/DXCF-4344';
import { DXCF_4657 } from './scripts/DXCF-4657/DXCF-4657';
import { DXCF_4820 } from './scripts/DXCF-4820/DXCF-4820';
/**
 * The list of all migrations.
 * For new migrations use "NEXT_RELEASE_VERSIO_N" as a version - it will be updated during release.
 * @doc-tags layout,migration
 */
export const MIGRATIONS_LIST = [
    {
        version: '3.9.30',
        scripts: [DXCF_2236],
    },
    {
        version: '4.2.0',
        scripts: [DXCF_2553],
    },
    {
        version: '4.8.15',
        scripts: [DXCF_3889],
    },
    {
        version: '4.9.3',
        scripts: [DXCF_3762],
    },
    {
        version: '5.0.13',
        scripts: [DXCF_4128],
    },
    {
        version: '5.0.21',
        scripts: [DXCF_4202],
    },
    {
        version: '5.2.3',
        scripts: [DXCF_4344],
    },
    {
        version: '5.4.11',
        scripts: [DXCF_4657],
    },
    {
        version: '5.6.1',
        scripts: [DXCF_4820],
    },
];
