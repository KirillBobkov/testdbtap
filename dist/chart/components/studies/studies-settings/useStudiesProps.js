import { useCallback, useEffect, useRef, useState } from 'react';
/**
 * The hook is used to create method and properties for studiesSettings popup.
 * Returns an object that contains the following properties:
 *
 * - onClose: a function that closes the studies popup and calls the onClose function from studiesProps.
 *
 * - onConfigure: a function that opens the studies popup, sets popupOpened state to true,
 * and calls the onConfigureStudy function from studiesProps with the uuid argument.
 *
 * - onOpen: a function that opens the studies popup if the onOpen function is defined in studiesProps.
 *
 * - settingsBtnRef: a reference to a HTMLButtonElement that is used to trigger the studies popup.
 *
 * - isOpened: a boolean that determines whether the studies popup should be opened or closed.
 * This is determined by the popupOpened state and the isOpened property from studiesProps.
 * two varriables is used  because if studiesProps.isOpened === true,
 * then in all places where this hook is used studies popup will be open,
 * so we need to incapsulate opening in target component with 'popupOpened' value
 */
export const useStudiesProps = (studiesProps, uuid) => {
    const settingsBtnRef = useRef(null);
    const [popupOpened, setPopupOpened] = useState(false);
    useEffect(() => {
        if (studiesProps.uuidFromRightClick && studiesProps.uuidFromRightClick === uuid) {
            setPopupOpened(true);
        }
    });
    const onConfigure = useCallback(() => {
        setPopupOpened(true);
        studiesProps.onConfigureStudy(uuid);
    }, [studiesProps.onConfigureStudy, uuid]);
    const onClose = useCallback(() => {
        setPopupOpened(false);
        studiesProps.onClose();
    }, []);
    const onOpen = useCallback(() => {
        if (studiesProps.onOpen) {
            setPopupOpened(true);
            studiesProps.onOpen();
        }
    }, []);
    return {
        onClose,
        onConfigure,
        onOpen,
        settingsBtnRef,
        isOpened: popupOpened && studiesProps.isOpened,
    };
};
