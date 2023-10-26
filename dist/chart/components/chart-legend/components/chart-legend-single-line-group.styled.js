import styled from 'styled-components';
import { ChartLegendItemContainerStyled } from './chart-legend-item.styled';
import { ChartLegendStudiesItemControlsStyled, ChartLegendStudiesValueStyled } from './chart-legend-studies.styled';
export const ChartLegendSingleLineGroupWrapperStyled = styled.div.withConfig({ displayName: "ChartLegendSingleLineGroupWrapperStyled" }) `
	margin-top: var(--spacer-3);
`;
export const ChartLegendStackedSingleItemWrapperStyled = styled(ChartLegendItemContainerStyled).withConfig({ displayName: "ChartLegendStackedSingleItemWrapperStyled" }) `
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-top: 0;

	${ChartLegendStudiesItemControlsStyled} {
		@media (max-width: 480px) {
			visibility: hidden;
		}
	}

	&:hover {
		${ChartLegendStudiesItemControlsStyled} {
			visibility: visible;
		}

		${ChartLegendStudiesValueStyled} {
			display: none;
		}
	}
`;
export const ChartLegendSingleLineValueStyled = styled(ChartLegendStudiesValueStyled).withConfig({ displayName: "ChartLegendSingleLineValueStyled" }) `
	display: ${props => (props.isHidden ? 'none' : 'block')};
`;
