import styled from 'styled-components';
export const ChartScalingToolbarStyled = styled.div.withConfig({ displayName: "ChartScalingToolbarStyled" }) `
	display: flex;
	button {
		@media (max-width: 480px) {
			display: none;
		}
	}
`;
