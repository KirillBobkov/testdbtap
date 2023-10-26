import React from 'react';
import { importIdle } from '../../utils/react.utils';
import { isBrowser } from '../../utils/browser-api.utils';
// nodeJS env doesn't really like dynamic imports, bcs of this one test fails
// @ts-ignore
export const DEFAULT_COLOR_PICKER = isBrowser
    ? importIdle(() => import('../../chart-kit/ColorPicker/ColorPicker.component'))
    : React.Fragment;
