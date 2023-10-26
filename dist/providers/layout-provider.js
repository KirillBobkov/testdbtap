export const getSelectedLayout = (layoutData) => {
    // TODO: REMOVE @ts-ignore and to it right way with the option
    // @ts-ignore
    return layoutData.layouts.find(l => l.id === layoutData.selectedLayoutId);
};
