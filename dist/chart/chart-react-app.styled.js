import styled, { css } from 'styled-components';
// this class-name is destined for Chart Root html tags
// For example, ChartReactApp Root, popover roots
// use-case: apply css variables only to chart components, not to whole document body
export const CHART_REACT_WRAPPER_ID = 'chart-react-wrapper';
export const ChartReactAppStyled = styled.div.withConfig({ displayName: "ChartReactAppStyled" }) `
	display: flex;
	flex-direction: column;
	position: relative;
	width: ${props => (props.width ? `${props.width}px` : '100%')};
	min-height: 60px;
	height: ${props => (props.height ? `${props.height}px` : '100%')};
	margin: 0;
	padding: 0;
	font-family: var(--font-main);
	line-height: normal;
	font-size: var(--font-size-l);
	-webkit-overflow-scrolling: touch;

	${props => !props.showPopupsOutside &&
    css `
			overflow: hidden;
		`}
`;
export const OfflineAlert = styled.div.withConfig({ displayName: "OfflineAlert" }) `
	color: #ff0000;
	font-size: 40px;
	position: absolute;
	bottom: 11%;
	left: 0;
`;
