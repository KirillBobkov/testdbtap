import styled from 'styled-components';
import { Popover } from '../Popover/Popover.lazy-component';
import { Menu } from '../Menu/Menu.component';
export const FontPickerPopoverStyled = styled(Popover).withConfig({ displayName: "FontPickerPopoverStyled" }) `
	min-width: 43px;
`;
export const FontPickerMenuItemValueStyled = styled.div.withConfig({ displayName: "FontPickerMenuItemValueStyled" }) `
	font-size: var(--font-size-m);
`;
export const FontPickerMenuStyled = styled(Menu).withConfig({ displayName: "FontPickerMenuStyled" }) `
	padding: var(--spacer-1);
	margin: 0;
	padding: 0;
	list-style: none;
	position: relative;
`;
