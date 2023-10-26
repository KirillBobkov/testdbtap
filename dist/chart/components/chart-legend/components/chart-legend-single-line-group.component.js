import React, { memo, useCallback, useContext } from 'react';
import { ChartLegendStudiesItemControlsButtonDeleteStyled, ChartLegendStudiesItemControlsButtonSettingsStyled, ChartLegendStudiesItemControlsStyled, ChartLegendStudiesItemIconStyled, ChartLegendStudiesTitleStyled, } from './chart-legend-studies.styled';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { ChartLegendSingleLineGroupWrapperStyled, ChartLegendSingleLineValueStyled, ChartLegendStackedSingleItemWrapperStyled, } from './chart-legend-single-line-group.styled';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { StudiesSettingsPopup } from '../../studies/studies-settings/studies-settings-popup.lazy-component';
import { useStudiesProps } from '../../studies/studies-settings/useStudiesProps';
export const ChartLegendSeriesSingleStudyGroup = memo(({ uuid, line, studiesSettingsProps, onDeleteStudySeries }) => {
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const { onClose, onConfigure, settingsBtnRef, isOpened } = useStudiesProps(studiesSettingsProps, uuid);
    const onDelete = useCallback(() => onDeleteStudySeries(uuid), [onDeleteStudySeries, uuid]);
    return (React.createElement(React.Fragment, null,
        React.createElement(ChartLegendSingleLineGroupWrapperStyled, null,
            React.createElement(ChartLegendStackedSingleItemWrapperStyled, null,
                React.createElement(ChartLegendStudiesTitleStyled, null, line.title),
                React.createElement(ChartLegendStudiesItemControlsStyled, { isVisible: keyboardModeEnabled, position: "static" },
                    React.createElement(ChartLegendStudiesItemControlsButtonSettingsStyled, { onClick: onConfigure, ref: settingsBtnRef, icon: React.createElement(ChartLegendStudiesItemIconStyled, null, iconsConfig.legend.stackedStudies.settings) }),
                    React.createElement(ChartLegendStudiesItemControlsButtonDeleteStyled, { onClick: onDelete, icon: React.createElement(ChartLegendStudiesItemIconStyled, null, iconsConfig.legend.stackedStudies.delete) })),
                React.createElement(ChartLegendSingleLineValueStyled, { isHidden: keyboardModeEnabled, ref: line.ref }))),
        React.createElement(StudiesSettingsPopup, { ...studiesSettingsProps, isOpened: isOpened, onClose: onClose, anchorRef: settingsBtnRef })));
});
