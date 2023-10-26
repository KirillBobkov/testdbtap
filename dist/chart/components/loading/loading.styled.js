import styled from 'styled-components';
export const ChartLoadingStyled = styled.div.withConfig({ displayName: "ChartLoadingStyled" }) `
	display: ${props => (props.hidden ? 'none' : 'flex')};
	position: absolute;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: #1b2021;
	color: white;
	font-size: 24px;
	z-index: 25;
`;
