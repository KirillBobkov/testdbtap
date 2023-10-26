import React, { memo } from 'react';
export const NotImplementedSettings = memo((props) => {
    return React.createElement("span", null, props.drawingsDict.popup.sections.default);
});
