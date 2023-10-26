import styled from 'styled-components';
import { YAxisMainPopoverDivider } from './yaxis-main-popover.styled';
export const YAxisLinesPopoverMenuContainerStyled = styled.div.withConfig({ displayName: "YAxisLinesPopoverMenuContainerStyled" }) `
	box-sizing: border-box;
	width: 205px;
	height: auto;
	padding: var(--spacer-1);
	display: flex;
	flex-direction: column;
	align-items: center;
	user-select: none;
`;
export const YAxisLinesPopoverDivider = styled(YAxisMainPopoverDivider).withConfig({ displayName: "YAxisLinesPopoverDivider" }) `
	width: 100%;
`;
