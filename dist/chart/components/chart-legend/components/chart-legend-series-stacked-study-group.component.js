import React, { memo, useCallback, useContext } from 'react';
import { ChartLegendGroupTitleStyled, ChartLegendGroupWrapperStyled, ChartLegendTitleLabelStyled, ChartLegendTitleSettingsStyled, } from './chart-legend-series-group.styled';
import { ChartLegendStudiesItemControlsButtonDeleteStyled, ChartLegendStudiesItemControlsButtonSettingsStyled, ChartLegendStudiesItemControlsStyled, ChartLegendStudiesItemIconStyled, } from './chart-legend-studies.styled';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { StudiesSettingsPopup } from '../../studies/studies-settings/studies-settings-popup.lazy-component';
import { useStudiesProps } from '../../studies/studies-settings/useStudiesProps';
export const ChartLegendSeriesStackedStudyGroup = memo(({ uuid, title, children, studiesSettingsProps, onDeleteStudySeries }) => {
    const iconsConfig = useContext(IconsOverridingContext);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const { onClose, onConfigure, settingsBtnRef, isOpened } = useStudiesProps(studiesSettingsProps, uuid);
    const onDelete = useCallback(() => onDeleteStudySeries(uuid), [onDeleteStudySeries, uuid]);
    if (!React.Children.count(children)) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(ChartLegendGroupWrapperStyled, null,
            React.createElement(ChartLegendGroupTitleStyled, null,
                React.createElement(ChartLegendTitleLabelStyled, null, title),
                React.createElement(ChartLegendTitleSettingsStyled, null,
                    React.createElement(ChartLegendStudiesItemControlsStyled, { isVisible: keyboardModeEnabled, position: "static" },
                        React.createElement(ChartLegendStudiesItemControlsButtonSettingsStyled, { ref: settingsBtnRef, onClick: onConfigure, icon: React.createElement(ChartLegendStudiesItemIconStyled, null, iconsConfig.legend.stackedStudies.settings) }),
                        React.createElement(ChartLegendStudiesItemControlsButtonDeleteStyled, { onClick: onDelete, icon: React.createElement(ChartLegendStudiesItemIconStyled, null, iconsConfig.legend.stackedStudies.delete) })))),
            children),
        React.createElement(StudiesSettingsPopup, { ...studiesSettingsProps, isOpened: isOpened, onClose: onClose, anchorRef: settingsBtnRef })));
});
