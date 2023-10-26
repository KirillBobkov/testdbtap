import { createContext } from 'react';
export const DEFAULT_ICONS_RENDER_CONTEXT = {
    svgShapeRendering: 'auto',
};
export const IconsRenderContext = createContext(DEFAULT_ICONS_RENDER_CONTEXT);
