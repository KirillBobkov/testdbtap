import styled from 'styled-components';
import { MenuItem } from '../../../../chart-kit/Menu/MenuItem.component';
import { SelectboxAnchorCaretStyled } from '../../../../chart-kit/Selectbox/SelectboxAnchor.styled';
import { Selectbox } from '../../../../chart-kit/Selectbox/Selectbox.component';
export const DrawingSettingsCheckboxStyled = styled.label.withConfig({ displayName: "DrawingSettingsCheckboxStyled" }) `
	display: flex;
	align-items: center;
	color: var(--checkbox-default-text);
	height: 20px;
	padding: var(--spacer-05) 0;
	cursor: pointer;
	user-select: none;

	span:nth-of-type(2) {
		padding-left: var(--spacer-2);
	}
`;
export const DrawingsSettingsSelectboxStyled = styled(Selectbox).withConfig({ displayName: "DrawingsSettingsSelectboxStyled" }) `
	${SelectboxAnchorCaretStyled} {
		color: var(--icon-secondary-default-bg);
		width: 3px;
		height: auto;
	}
`;
export const DrawingsSettingsMenuItemStyled = styled(MenuItem).withConfig({ displayName: "DrawingsSettingsMenuItemStyled" }) `
	padding: 5px 7px;
	margin: 0;
`;
