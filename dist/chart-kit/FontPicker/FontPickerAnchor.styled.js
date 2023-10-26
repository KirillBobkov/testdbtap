import styled from 'styled-components';
import { Button } from '../Button/Button.component';
export const FontPickerButtonStyled = styled(Button).withConfig({ displayName: "FontPickerButtonStyled" }) `
	font-size: var(--font-size-m);
	font-family: var(--font-main);
	padding: 3px 4px;
	border-radius: 4px;
	background-color: transparent;
	height: 24px;
	min-width: 24px;

	&:hover {
		background: var(--dropdown-list_item-hovered-bg);
	}

	&:after {
		content: '';
		position: absolute;
		bottom: 0px;
		left: 0;
		border: 2px solid transparent;
		border-bottom: 2px solid #6e6c6b;
		border-left: 2px solid #6e6c6b;
		border-radius: 1px;
	}
`;
export const FontPickerAnchorContent = styled.div.withConfig({ displayName: "FontPickerAnchorContent" }) `
	display: flex;
	font-weight: normal;
	align-items: center;
	flex-wrap: nowrap;
	justify-content: space-between;
	color: var(--databox-text-default);

	&:hover {
		color: inherit;
	}
`;
export const FontPickerAnchorRenderFont = styled.div.withConfig({ displayName: "FontPickerAnchorRenderFont" }) `
	display: flex;
	box-shadow: inherit;
`;
export const FontPickerAnchorIcon = styled.div.withConfig({ displayName: "FontPickerAnchorIcon" }) `
	width: 9px;
	height: 5px;
	margin-left: 10px;
	margin-right: 5px;
	color: inherit;

	&:hover {
		color: inherit;
	}
`;
