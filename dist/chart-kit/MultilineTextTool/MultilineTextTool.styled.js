import styled from 'styled-components';
import { currentSymbolWidthMultiplier } from '@dx-private/dxchart5-modules/dist/drawings/common/text-drawing-functions';
export const MultilineTextToolContainerStyled = styled.div.withConfig({ displayName: "MultilineTextToolContainerStyled" }) `
	display: flex;
	position: fixed;
	padding: 4px 7px;
	border-radius: 2px;
	border: none;
	background: ${props => props.background};
`;
export const MultilineTextToolTextareaStyled = styled.textarea.withConfig({ displayName: "MultilineTextToolTextareaStyled" }) `
	color: ${props => (props.color ? props.color : `var(--main_chart-crosshair-tag-inverted-text)`)};
	font-size: ${props => props.fontSize + 'pt'};
	line-height: ${props => props.lineheight + 'px'};
	max-width: ${props => props.fontSize * currentSymbolWidthMultiplier + 'px'};
	// HACK: 1 is needed to show text area cursor when width is 0
	width: ${props => (props.width || 1) + 'px'};
	overflow: hidden !important;
	background: inherit;
	outline: none !important;
	border: none;
	padding: 0;
	resize: none;
	font-family: var(--font-main-semibold);
`;
