import styled, { css } from 'styled-components';
export const ChartSettingsFieldset = styled.div.withConfig({ displayName: "ChartSettingsFieldset" }) `
	display: flex;
	flex-wrap: wrap;
	border: 0;
	margin: 0;
	font: inherit;
	border-top: 1px solid var(--dropdown-list_item-divider-bg);
	padding: var(--spacer-3) var(--spacer-6) var(--spacer-6) var(--spacer-1);

	&:first-child {
		border-top: none;
	}
`;
export const ChartSettingsFieldsetContainer = styled.div.withConfig({ displayName: "ChartSettingsFieldsetContainer" }) `
	display: flex;
	flex-direction: column;
`;
export const ChartSettingsFieldsetHeader = styled.h3.withConfig({ displayName: "ChartSettingsFieldsetHeader" }) `
	display: block;
	color: var(--form-title-text);
	font-size: var(--font-size-m);
	line-height: var(--line-height-l);
	font-family: var(--font-main-bold);
	text-transform: uppercase;
	letter-spacing: 0.84px;
	margin: 0;
	margin-bottom: var(--spacer-2);
	margin-left: var(--spacer-2);
`;
export const ChartSettingsFieldsetBody = styled.div.withConfig({ displayName: "ChartSettingsFieldsetBody" }) `
	display: flex;
	flex-wrap: wrap;
`;
export const ChartSettingsFieldsetGroup = styled.div.withConfig({ displayName: "ChartSettingsFieldsetGroup" }) `
	${props => props.vertical
    ? css `
					&:not(:first-child) {
						margin-top: var(--spacer-2);
					}
			  `
    : css `
					&:not(:last-child) {
						margin-right: var(--spacer-2);
					}
			  `}
`;
export const ChartSettingsFieldsetGroupItem = styled.div.withConfig({ displayName: "ChartSettingsFieldsetGroupItem" }) `
	width: auto;
	box-sizing: border-box;
	margin: 0;
	margin-bottom: var(--spacer-1);
	padding: var(--spacer-05) var(--spacer-1);
`;
export const ChartSettingsFieldsetGroupItemText = styled.div.withConfig({ displayName: "ChartSettingsFieldsetGroupItemText" }) `
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m);
	color: var(--dropdown-list_item-default-text);
	margin-bottom: var(--spacer-2);
`;
