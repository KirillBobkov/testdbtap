import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { TimeZoneAnchor } from './time-zone-anchor.component';
import { EXCHANGE, UTC } from '../../view-models/time-zone.view-model';
import { reformatTimeZoneName, reformatUTC } from './time-zone.model';
import { AdaptivePopoverStyled, TimeZoneContainerStyled, TimeZoneMenuItemStyled, TimeZoneMenuItemUTCDiffStyled, } from './time-zone.styled';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { SelectboxMenuStyled } from '../../../chart-kit/Selectbox/Selectbox.styled';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import scrollIntoView from 'scroll-into-view-if-needed';
import { TimeZoneNoDataTextStyled } from './time-zone-dropdown.styled';
import { TimeZoneInputSearch } from './time-zone-search-input.component';
import { useA11yModalTabKeyHandler } from '../../../chart-kit/accessibility/use-a11y-modal-tab-key-handler';
import { Selectbox } from '../../../chart-kit/Selectbox/Selectbox.component';
const SelectboxPopover = (props) => React.createElement(AdaptivePopoverStyled, { ...props, align: "start", position: "top" });
export const TimeZoneDropdown = props => {
    const { value, currentExchange, onSelect, timeZones, onSearchTimezone } = props;
    const [isOpened, toggleOpen] = useState(false);
    const timeZoneRef = useRef(null);
    const activeTimeZoneMenuItemRef = useRef(null);
    const contentRef = useRef(null);
    const { keyboardModeEnabled, localization } = useContext(MultiChartComponentContext);
    const onSelectHandler = useCallback((timezone) => {
        if (timezone && typeof timezone === 'string' && timezone !== value) {
            onSelect(timezone);
            toggleOpen(false);
        }
    }, [onSelect, value]);
    useEffect(() => {
        const node = activeTimeZoneMenuItemRef.current;
        onSearchTimezone('');
        if (isOpened && node) {
            scrollIntoView(node, {
                block: 'center',
                // it prevents the browser window from scrolling and scrolls elements inside boundary, without scrolling top level elements
                boundary: node.closest('#scrollable-id'),
            });
        }
    }, [isOpened]);
    const handleKeyDown = useCallback((e, value) => {
        if (e.code === 'Enter' || e.code === 'Space') {
            e.preventDefault();
            onSelectHandler?.(value);
        }
    }, [onSelectHandler]);
    const onSearchTimeZoneHandler = useCallback((value) => {
        onSearchTimezone(value);
    }, [onSearchTimezone]);
    const timeZoneInputSearch = useMemo(() => React.createElement(TimeZoneInputSearch, { onValueChange: onSearchTimeZoneHandler }), [onSearchTimeZoneHandler]);
    const onTabPress = useA11yModalTabKeyHandler(contentRef);
    return (React.createElement(TimeZoneContainerStyled, { ref: timeZoneRef },
        React.createElement(Selectbox, { isOpened: isOpened, onToggle: toggleOpen, contentRef: contentRef, focusSelector: "input", value: value === EXCHANGE ? currentExchange : value, onValueChange: onSelectHandler, Popover: SelectboxPopover, onTabPress: onTabPress, Anchor: TimeZoneAnchor, Header: timeZoneInputSearch, shouldWrap: false, Menu: SelectboxMenuStyled, keyboardMode: keyboardModeEnabled, menuAriaLabel: localization.timeZone.a11y_timezoneList }, timeZones.length > 0 ? (timeZones.map(zone => {
            const activeTimeZone = zone.timeZone === value;
            return (React.createElement(TimeZoneMenuItemStyled, { isActive: activeTimeZone, value: zone.timeZone, ref: activeTimeZone ? activeTimeZoneMenuItemRef : undefined, onKeyDown: e => handleKeyDown(e, zone.timeZone), testId: TEST_IDS.time_zone_dropdown_item, key: zone.timeZone, onSelect: onSelectHandler },
                reformatTimeZoneName(zone.name),
                ' ',
                !(zone.timeZone === UTC || zone.timeZone === EXCHANGE) && (React.createElement(TimeZoneMenuItemUTCDiffStyled, { isActive: activeTimeZone },
                    ' ',
                    "UTC",
                    reformatUTC(zone.utcOffset),
                    ' '))));
        })) : (React.createElement(TimeZoneNoDataTextStyled, null, localization.timeZone.input_no_data)))));
};
export default TimeZoneDropdown;
