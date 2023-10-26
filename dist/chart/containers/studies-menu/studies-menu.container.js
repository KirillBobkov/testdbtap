import { createElement, useContext, useMemo } from 'react';
import { context } from '../../../context/context2';
import { useProperty } from '../../../utils/react.utils';
import { useSink } from '../../../utils/use-sink';
import { createStudiesMenuViewModel } from '../../view-models/studies/studies-menu.vm';
import { StudiesMenu } from '../../components/studies/studies-menu/studies-menu.component';
import { MultiChartComponentContext } from '../../components/multi-chart/multi-chart-context';
import { useObservable } from '../../../utils/use-observable';
export const StudiesMenuContainer = context.combine(createStudiesMenuViewModel, context.key()('chartLegendVM'), (studiesMenuVMSink, chartLegendVM) => () => {
    const studiesMenuVM = useSink(() => studiesMenuVMSink, []);
    const isOpened = useProperty(studiesMenuVM.isOpened);
    const position = useProperty(studiesMenuVM.menuPosition);
    const { localization } = useContext(MultiChartComponentContext);
    const uuidFromRightClick = useObservable(chartLegendVM.uuidFromRightClick, '');
    const menuItems = useMemo(() => [
        [
            {
                key: 'bringToFront',
                label: localization.dynamicObjects.bringToFront,
                onItemSelect: () => studiesMenuVM.bringToFrontStudy(uuidFromRightClick),
            },
            {
                key: 'sendToBack',
                label: localization.dynamicObjects.sendToBack,
                onItemSelect: () => studiesMenuVM.sendToBackStudy(uuidFromRightClick),
            },
            {
                key: 'duplicate',
                label: localization.studies.rightClickMenu.duplicate,
                onItemSelect: () => studiesMenuVM.onDuplicateStudy(uuidFromRightClick),
            },
        ],
        [
            {
                key: 'settings',
                label: localization.studies.rightClickMenu.settings,
                onItemSelect: () => studiesMenuVM.onOpenSettings(uuidFromRightClick),
            },
        ],
    ], [uuidFromRightClick]);
    return createElement(StudiesMenu, {
        isOpened,
        onClose: studiesMenuVM.closeMenu,
        position,
        items: menuItems,
    });
});
