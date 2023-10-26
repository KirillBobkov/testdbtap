import styled from 'styled-components';
import { ifStyle } from '../../../utils/styled.utils';
export const ChartContainerStyled = styled.div.withConfig({ displayName: "ChartContainerStyled" }) `
	position: relative;
	height: 100%;
	overflow: hidden;

	&::after {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		content: '';
		opacity: 0;
		top: 0;
		left: 0;
		visibility: hidden;
		background-color: var(--drawing-text-bg);
		transition: all 300ms ease-in-out;
		will-change: opacity, visibility;

		${props => ifStyle(props.isLoading) `
			opacity: 1;
			visibility: visible;
		`}
	}
`;
