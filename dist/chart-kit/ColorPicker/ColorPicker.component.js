import * as React from 'react';
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import { ColorPickerAnchor } from './anchors/ColorPickerAnchor.component';
import { Popover } from '../Popover/Popover.lazy-component';
import { ColorPickerPalette } from './ColorPickerPalette.component';
import { OpacitySelector } from '../OpacitySelector/OpacitySelector.component';
import { ColorPickerContent, ColorPickerContentPlaceHolder, ColorPickerContentWrapper } from './ColorPicker.styled';
import { colorToAlpha, getNewValidRGBAColor, splitRGBAColor } from './utils/color-picker-functions';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { constFalse, constVoid } from 'fp-ts/function';
import Color from 'color';
import { DEFAULT_TRANSPARENT_COLOR } from './ColorPicker.model';
export const ColorPickerPopover = (props) => {
    return React.createElement(Popover, { ...props, closeOnClickAway: true, align: "start", position: "bottom" });
};
export const ColorPicker = memo(props => {
    const { value, PaletteComponent = ColorPickerPalette, OpacitySelectorComponent = OpacitySelector, Anchor = ColorPickerAnchor, onValueChange, parentEventTarget, addNewColor = constVoid, deleteColor = constVoid, isDefaultColor = constFalse, updateColor = constVoid, customColors = [], testIds, style, } = props;
    // popovers state
    const [isOpened, setOpened] = useState(false);
    const [isPalleteOpened, setPalleteOpened] = useState(false);
    const [createdColor, setCreatedColor] = useState('');
    const componentWillUnmount = useRef(false);
    // state for drag'n'drop
    const [, setWindowWidth] = useState(1920);
    const [portal, setPortal] = useState(undefined);
    const handleWindowResize = useCallback(() => setWindowWidth(window.innerWidth), []);
    const addColorFromPallete = useCallback(() => {
        const color = createdColor.length ? createdColor : value;
        addNewColor(color);
    }, [addNewColor, createdColor, value]);
    const opacity = useMemo(() => colorToAlpha(value), [value]);
    const currentColor = useMemo(() => getNewValidRGBAColor(value, colorToAlpha(value)), [value]);
    useLayoutEffect(() => {
        handleWindowResize();
        const _portal = document.createElement('div');
        _portal.setAttribute('class', 'colorPickerPalette');
        document.body.appendChild(_portal);
        setPortal(_portal);
        return () => {
            handleWindowResize();
            _portal.remove();
        };
    }, [handleWindowResize]);
    // Component will unmount
    useEffect(() => () => {
        componentWillUnmount.current = true;
    }, []);
    // Run only when component unmount happens
    useEffect(() => () => {
        if (componentWillUnmount.current) {
            isPalleteOpened && addColorFromPallete();
        }
        // This deps guarantess have a latest value when unmount fires
    }, [addColorFromPallete, isPalleteOpened]);
    const setNewColorParams = useCallback((color, opacity) => {
        const newColor = getNewValidRGBAColor(color, opacity);
        onValueChange(newColor);
    }, [onValueChange]);
    const handleSetOpacity = useCallback((opacity) => {
        const newColor = getNewValidRGBAColor(currentColor, opacity);
        // TODO shouldn't care about "default" / "non-default" - all logic in VM
        if (isDefaultColor(currentColor)) {
            addNewColor(newColor);
        }
        else {
            const idx = customColors.findIndex(color => color === currentColor);
            updateColor(newColor, idx);
        }
        setNewColorParams(currentColor, opacity);
    }, [currentColor, isDefaultColor, setNewColorParams, addNewColor, customColors, updateColor]);
    const onToggle = useCallback((isOpened) => {
        typeof isOpened === 'boolean' && setOpened(isOpened);
        !isOpened && isPalleteOpened && addColorFromPallete();
        setPalleteOpened(false);
    }, [addColorFromPallete, isPalleteOpened]);
    const onColorChangedWithoutClosing = useCallback((color) => {
        const [, , , a] = splitRGBAColor(color);
        const parsedOpacity = parseFloat(a) * 100;
        setNewColorParams(color, parsedOpacity);
    }, [setNewColorParams]);
    const handleDragEnd = useCallback((dropInfo) => {
        if (!dropInfo.destination) {
            deleteColor(dropInfo.draggableId);
            setCreatedColor('');
        }
    }, [deleteColor]);
    const applyCreatedColor = useCallback((color) => {
        const parsedColor = Color(color).rgb().toString();
        const newColor = getNewValidRGBAColor(parsedColor, 100);
        setCreatedColor(newColor);
        onColorChangedWithoutClosing(newColor);
    }, [onColorChangedWithoutClosing]);
    const onTogglePallete = useCallback((isPalleteOpened = false) => {
        // new color only when palette closed
        !isPalleteOpened && addColorFromPallete();
        setPalleteOpened(isPalleteOpened);
    }, [addColorFromPallete]);
    return portal ? (React.createElement(DragDropContext, { onDragStart: constVoid, onDragEnd: handleDragEnd },
        React.createElement(Dropdown, { style: style, Anchor: Anchor, Popover: ColorPickerPopover, isOpened: isOpened, onToggle: onToggle, parentEventTarget: parentEventTarget, anchorAdditionalProps: {
                color: value,
                testId: testIds?.colorButton,
                opacity,
                disabled: props.disabled,
            } },
            !isOpened && React.createElement("span", null, value),
            isOpened && (React.createElement(Droppable, { droppableId: "colorPickerDroppableId" }, droppableProvided => (React.createElement(ColorPickerContentWrapper, { ref: droppableProvided.innerRef },
                React.createElement(ColorPickerContent, null,
                    React.createElement(PaletteComponent, { ...props, portal: portal, value: currentColor, onValueChange: onColorChangedWithoutClosing, isPalleteOpened: isPalleteOpened, isDefaultColor: isDefaultColor, applyCreatedColor: applyCreatedColor, createdColor: currentColor, onTogglePallete: onTogglePallete }),
                    props.showOpacitySelector === false ? null : (React.createElement(OpacitySelectorComponent, { color: currentColor, value: opacity, onChange: handleSetOpacity, isDisabled: currentColor === DEFAULT_TRANSPARENT_COLOR }))),
                React.createElement(ColorPickerContentPlaceHolder, null, droppableProvided.placeholder)))))))) : null;
});
export default ColorPicker;
