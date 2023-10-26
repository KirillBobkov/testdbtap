import styled from 'styled-components';
import { ButtonIcon } from '../../../chart-kit/Button/ButtonIcon.component';
export const ZoomingToolContainerStyled = styled.div.withConfig({ displayName: "ZoomingToolContainerStyled" }) `
	position: absolute;
	display: flex;
	width: fit-content;
	height: fit-content;
	left: 50%;
	transform: translate(-50%);
	bottom: ${props => props.marginBottom}px;
	margin-left: auto;
	margin-right: auto;
	justify-content: center;
	align-items: flex-end;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

	&:hover {
		button {
			opacity: 1;
		}
	}

	button {
		min-width: 36px;
		width: 36px;
		height: 28px;
		margin-right: 0;
		opacity: ${props => (props.isVisible ? '1' : '0')};
		transition: opacity ease-in 0.2s;
		svg {
			width: 20px;
			height: 20px;
		}
	}
`;
export const ZoomingToolZoomInStyled = styled(ButtonIcon).withConfig({ displayName: "ZoomingToolZoomInStyled" }) `
	border-top-right-radius: 0px;
	border-bottom-right-radius: 0px;
`;
export const ZoomingToolZoomOutStyled = styled(ButtonIcon).withConfig({ displayName: "ZoomingToolZoomOutStyled" }) `
	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
`;
