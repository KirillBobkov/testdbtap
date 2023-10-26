import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { MultichartSettingsContainerStyled, MultichartSettingsHeaderRightStyled, MultichartSettingsHeaderStyled, MultichartSettingsLayoutSelectorItemStyled, MultichartSettingsLayoutSelectorStyled, MultichartSettingsOptionCheckIconStyled, MultichartSettingsOptionListStyled, MultichartSettingsOptionStyled, MultichartSettingsOptionTextStyled, MultichartSettingsSectionStyled, } from './mutichart-settings.styled';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { useA11yModalTabKeyHandler } from '../../../chart-kit/accessibility/use-a11y-modal-tab-key-handler';
import { createKeyDownHandler } from '../../../chart-kit/utils/keyDownHandler';
import { namedMemo } from '../../../utils/named-memo';
const layouts = ['1x1', '2x2', '2x1', '1x2', '3x1', '1x3'];
export const MultichartSettings = namedMemo('MultichartSettings', (props) => {
    const { setLayout, layout, isInstrumentSyncEnabled, isChartTypeSyncEnabled, isAggregationPeriodTypeSyncEnabled, isAppearanceSyncEnabled, isStudiesSyncEnabled, isCrosshairSyncEnabled, setInstrumentSync, setChartTypeSync, setAggregationPeriodTypeSync, setAppearanceSync, setStudiesSync, setCrosshairSync, className, localization, } = props;
    const containerRef = useRef(null);
    const selectLayout = useCallback((l) => setLayout(l), [setLayout]);
    const keyDownHandlerLayout = useMemo(() => (l) => createKeyDownHandler(['Enter', () => selectLayout(l)]), [selectLayout]);
    const onInstrumentSync = useCallback(() => setInstrumentSync(!isInstrumentSyncEnabled || false), [setInstrumentSync, isInstrumentSyncEnabled]);
    const onChartTypeSync = useCallback(() => setChartTypeSync(!isChartTypeSyncEnabled), [setChartTypeSync, isChartTypeSyncEnabled]);
    const onAggregationPeriodTypeSync = useCallback(() => setAggregationPeriodTypeSync(!isAggregationPeriodTypeSyncEnabled), [setAggregationPeriodTypeSync, isAggregationPeriodTypeSyncEnabled]);
    const onAppearanceSync = useCallback(() => setAppearanceSync(!isAppearanceSyncEnabled), [setAppearanceSync, isAppearanceSyncEnabled]);
    const onStudiesSync = useCallback(() => setStudiesSync(!isStudiesSyncEnabled), [setStudiesSync, isStudiesSyncEnabled]);
    const onCrosshairSync = useCallback(() => setCrosshairSync(!isCrosshairSyncEnabled), [setCrosshairSync, isCrosshairSyncEnabled]);
    const iconsConfig = useContext(IconsOverridingContext);
    const tabKeyHandler = useA11yModalTabKeyHandler(containerRef);
    const keyDownHandler = useCallback((e) => {
        tabKeyHandler(e.nativeEvent);
    }, [tabKeyHandler]);
    return (React.createElement(MultichartSettingsContainerStyled, { className: className, ref: containerRef, onKeyDown: keyDownHandler, "data-test-id": TEST_IDS.multichart_popover },
        React.createElement(MultichartSettingsSectionStyled, null,
            React.createElement(MultichartSettingsHeaderStyled, null, localization.multichart.layout),
            React.createElement(MultichartSettingsLayoutSelectorStyled, { "data-test-id": TEST_IDS.multichart_layouts }, layouts.map(l => {
                const isActive = layout === l;
                return (React.createElement(MultichartSettingsLayoutSelectorItemStyled, { key: l, layout: l, active: isActive, "data-active": isActive, onClick: () => selectLayout(l), onKeyDown: () => keyDownHandlerLayout(l), "aria-label": l }));
            }))),
        React.createElement(MultichartSettingsSectionStyled, null,
            React.createElement(MultichartSettingsHeaderRightStyled, null, localization.multichart.synchronize),
            React.createElement(MultichartSettingsOptionListStyled, { "data-test-id": TEST_IDS.multichart_sync_options },
                React.createElement(MultichartSettingsOptionStyled, { onClick: onInstrumentSync, "aria-label": localization.a11y_synchronize.a11y_synchronize_instrument },
                    isInstrumentSyncEnabled && (React.createElement(MultichartSettingsOptionCheckIconStyled, null,
                        React.createElement(IconWrapper, null, iconsConfig.toolbar.multichart.settings.checkboxTick))),
                    React.createElement(MultichartSettingsOptionTextStyled, null, localization.multichart.sync_instrument)),
                React.createElement(MultichartSettingsOptionStyled, { onClick: onChartTypeSync, "aria-label": localization.a11y_synchronize.a11y_synchronize_chart_type },
                    isChartTypeSyncEnabled && (React.createElement(MultichartSettingsOptionCheckIconStyled, null,
                        React.createElement(IconWrapper, null, iconsConfig.toolbar.multichart.settings.checkboxTick))),
                    React.createElement(MultichartSettingsOptionTextStyled, null, localization.multichart.sync_chart_type)),
                React.createElement(MultichartSettingsOptionStyled, { onClick: onAggregationPeriodTypeSync, "aria-label": localization.a11y_synchronize.a11y_synchronize_timeframe },
                    isAggregationPeriodTypeSyncEnabled && (React.createElement(MultichartSettingsOptionCheckIconStyled, null,
                        React.createElement(IconWrapper, null, iconsConfig.toolbar.multichart.settings.checkboxTick))),
                    React.createElement(MultichartSettingsOptionTextStyled, null, localization.multichart.sync_timeframe)),
                React.createElement(MultichartSettingsOptionStyled, { onClick: onAppearanceSync, "aria-label": localization.a11y_synchronize.a11y_synchronize_appearance },
                    isAppearanceSyncEnabled && (React.createElement(MultichartSettingsOptionCheckIconStyled, null,
                        React.createElement(IconWrapper, null, iconsConfig.toolbar.multichart.settings.checkboxTick))),
                    React.createElement(MultichartSettingsOptionTextStyled, null, localization.multichart.sync_appearance)),
                React.createElement(MultichartSettingsOptionStyled, { onClick: onStudiesSync, "aria-label": localization.a11y_synchronize.a11y_synchronize_studies },
                    isStudiesSyncEnabled && (React.createElement(MultichartSettingsOptionCheckIconStyled, null,
                        React.createElement(IconWrapper, null, iconsConfig.toolbar.multichart.settings.checkboxTick))),
                    React.createElement(MultichartSettingsOptionTextStyled, null, localization.multichart.sync_studies)),
                React.createElement(MultichartSettingsOptionStyled, { onClick: onCrosshairSync, "aria-label": localization.a11y_synchronize.a11y_synchronize_crosshair },
                    isCrosshairSyncEnabled && (React.createElement(MultichartSettingsOptionCheckIconStyled, null,
                        React.createElement(IconWrapper, null, iconsConfig.toolbar.multichart.settings.checkboxTick))),
                    React.createElement(MultichartSettingsOptionTextStyled, null, localization.multichart.sync_crosshair))))));
});
export default MultichartSettings;
