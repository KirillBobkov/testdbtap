import styled from 'styled-components';
import { Popover } from './Popover.lazy-component';
import { PopoverContentStyled } from './Popover.styled';
import { ChartSettingsFieldsetGroupItem } from '../../chart/components/chart-settings/chart-settings-fieldset.styled';
export const RCMenuPopover = styled(Popover).withConfig({ displayName: "RCMenuPopover" }) `
	${PopoverContentStyled} {
		padding: var(--spacer-1);
		border-radius: var(--spacer-1);
	}
	${ChartSettingsFieldsetGroupItem} {
		margin-bottom: 0;
		padding: var(--spacer-05) var(--spacer-05);
		user-select: none;
	}
`;
