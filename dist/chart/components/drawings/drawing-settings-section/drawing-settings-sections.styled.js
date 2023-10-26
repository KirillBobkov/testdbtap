import styled from 'styled-components';
export const DrawingSettingsSectionStyled = styled.div.withConfig({ displayName: "DrawingSettingsSectionStyled" }) `
	padding: 0;
	margin-bottom: var(--spacer-5);
`;
export const DrawingSettingsSectionTitleStyled = styled.div.withConfig({ displayName: "DrawingSettingsSectionTitleStyled" }) `
	margin: 0 0 var(--spacer-4);
	padding: 0;
	border: 0;
	vertical-align: baseline;
	color: var(--form-title-text);
	font-weight: bold;
	letter-spacing: 0.8px;
	text-transform: uppercase;
`;
export const DrawingSettingsSectionContentStyled = styled.div.withConfig({ displayName: "DrawingSettingsSectionContentStyled" }) `
	display: flex;
	flex-direction: column;
`;
export const DrawingSettingsSectionsCombiner = styled.div.withConfig({ displayName: "DrawingSettingsSectionsCombiner" }) `
	display: flex;
	flex-direction: row;

	& > * {
		margin-right: var(--spacer-6);
	}

	& > *:last-child {
		margin-right: 0;
	}
`;
