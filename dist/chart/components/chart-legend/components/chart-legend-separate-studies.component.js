import React, { memo, useCallback, useContext } from 'react';
import { ChartLegendStudiesItemControlsStyled, ChartLegendStudiesItemIconStyled, ChartLegendStudiesItemValuesStyled, ChartLegendStudiesTitleStyled, ChartLegendStudiesValueStyled, ChartLegendStudiesWrapper, } from './chart-legend-studies.styled';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { ChartLegendDeleteButtonStyled, ChartLegendSettingsButtonStyled } from './chart-legend-secondary-series.styled';
import { usePreventOutsideScrolling } from '../../../../utils/use-prevent-outside-scrolling';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { StudiesSettingsPopup } from '../../studies/studies-settings/studies-settings-popup.lazy-component';
import { useStudiesProps } from '../../studies/studies-settings/useStudiesProps';
export const ChartLegendSeparateStudies = memo(({ title, lines, uuid, studiesSettingsProps, onDeleteStudySeries }) => {
    const iconsConfig = useContext(IconsOverridingContext);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const chartLegendStudiesWrapperRef = React.createRef();
    const { onClose, onConfigure, settingsBtnRef, isOpened } = useStudiesProps(studiesSettingsProps, uuid);
    usePreventOutsideScrolling(chartLegendStudiesWrapperRef);
    const onDelete = useCallback(() => onDeleteStudySeries(uuid), [onDeleteStudySeries, uuid]);
    return (React.createElement(React.Fragment, null,
        React.createElement(ChartLegendStudiesWrapper, { ref: chartLegendStudiesWrapperRef },
            React.createElement(ChartLegendStudiesTitleStyled, null, title),
            React.createElement(ChartLegendStudiesItemValuesStyled, null, lines.map(line => (React.createElement(ChartLegendStudiesValueStyled, { key: line.title, ref: line.ref })))),
            React.createElement(ChartLegendStudiesItemControlsStyled, { isVisible: keyboardModeEnabled, position: "static" },
                React.createElement(ChartLegendSettingsButtonStyled, { ref: settingsBtnRef, onClick: onConfigure },
                    React.createElement(ChartLegendStudiesItemIconStyled, null, iconsConfig.legend.separateStudies.settings)),
                React.createElement(ChartLegendDeleteButtonStyled, { onClick: onDelete },
                    React.createElement(ChartLegendStudiesItemIconStyled, null, iconsConfig.legend.separateStudies.delete)))),
        React.createElement(StudiesSettingsPopup, { ...studiesSettingsProps, isOpened: isOpened, onClose: onClose, anchorRef: settingsBtnRef })));
});
