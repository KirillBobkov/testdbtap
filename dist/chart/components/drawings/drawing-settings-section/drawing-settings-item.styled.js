import styled from 'styled-components';
export const DrawingSettingsItemStyled = styled.div.withConfig({ displayName: "DrawingSettingsItemStyled" }) `
	display: flex;
	flex-direction: column;
	margin-right: var(--spacer-2);
`;
export const DrawingSettingsItemContentStyled = styled.div.withConfig({ displayName: "DrawingSettingsItemContentStyled" }) `
	display: flex;
	align-items: center;

	&:last-child {
		margin-right: 0;
	}
`;
export const DrawingSettingsItemLabelStyled = styled.div.withConfig({ displayName: "DrawingSettingsItemLabelStyled" }) `
	margin-bottom: var(--spacer-2);
`;
