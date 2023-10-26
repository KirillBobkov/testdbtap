import React, { memo, useCallback, useMemo, useRef } from 'react';
import { ThemeSwitcherItemIconWrapperStyled, ThemeSwitcherItemStyled, ThemeSwitcherItemTextStyled, ThemeSwitcherMenuStyled, } from './theme-switcher.styled';
import { ThemeDarkIcon } from './theme-dark.icon';
import { ThemeLightIcon } from './theme-light.icon';
import { useA11yListboxArrowsFocusController } from '../../../chart-kit/accessibility/use-a11y-listbox-arrows-focus-controller';
import { createKeyDownHandler } from '../../../chart-kit/utils/keyDownHandler';
import { themeTypes } from '../../model/theme.model';
export const ThemeSwitcher = memo((props) => {
    const { localization, changeTheme, activeTheme, className } = props;
    const ref = useRef(null);
    useA11yListboxArrowsFocusController({
        wrapperRef: ref,
        childrenSelector: 'div',
        direction: 'horizontal',
        role: 'skip',
        childRole: 'radio',
    });
    return (React.createElement(ThemeSwitcherMenuStyled, { className: className, ref: ref }, themeTypes.map(type => (React.createElement(ThemeSwitcherItem, { key: type, type: type, isActive: activeTheme === type, onClick: changeTheme, localization: localization })))));
});
const ThemeSwitcherItem = memo(props => {
    const { type, isActive, localization, onClick } = props;
    const onClickHandler = useCallback(() => onClick(type), [onClick, type]);
    const keyDownHandler = useMemo(() => createKeyDownHandler(['Space', onClickHandler]), [onClickHandler]);
    return (React.createElement(ThemeSwitcherItemStyled, { "aria-checked": isActive, tabIndex: 0, active: isActive, onClick: onClickHandler, onKeyDown: keyDownHandler, key: type },
        React.createElement(ThemeSwitcherItemIconWrapperStyled, null, type === 'dark' ? ThemeDarkIcon : ThemeLightIcon),
        React.createElement(ThemeSwitcherItemTextStyled, null, localization.themes.types[type])));
});
