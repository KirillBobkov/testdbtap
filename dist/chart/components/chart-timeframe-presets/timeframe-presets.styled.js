import styled from 'styled-components';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { StyledScrollableContainer, } from '../../../chart-kit/Scrollable/Scrollable.styled';
export const TimeframePresetsContainer = styled.div.withConfig({ displayName: "TimeframePresetsContainer" }) `
	display: flex;
`;
export const EditButtonActiveIconWrapper = styled(IconWrapper).withConfig({ displayName: "EditButtonActiveIconWrapper" }) `
	color: var(--icon-active-bg);
`;
export const EditButtonIconWrapper = styled(IconWrapper).withConfig({ displayName: "EditButtonIconWrapper" }) `
	color: var(--main_chart-value-text);
`;
export const TimeframeScrollableContainer = styled(StyledScrollableContainer).withConfig({ displayName: "TimeframeScrollableContainer" }) `
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	overflow-y: hidden;

	&::-webkit-scrollbar {
		height: 0;
	}
`;
