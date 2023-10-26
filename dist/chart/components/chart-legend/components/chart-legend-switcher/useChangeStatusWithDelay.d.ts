interface UseChangeStatusWithDelay {
    isOpening: boolean;
    isOpened: boolean;
    openToggle: () => void;
}
export declare const useChangeStatusWithDelay: (duration?: number, initIsOpened?: boolean, handler?: (isOpened: boolean) => void) => UseChangeStatusWithDelay;
export {};
