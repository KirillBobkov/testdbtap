import styled, { css } from 'styled-components';
import { ChartContainerStyled } from '../../containers/chart-container/chart-container.styled';
export const MultiChartContainerStyled = styled.div.withConfig({ displayName: "MultiChartContainerStyled" }) `
	position: relative;
	flex-grow: 1;
	${props => props.maximized &&
    css `
			display: grid;
		`}

	${props => props.layout && getContainerCssByLayout(props.layout)}
`;
export const MultiChartSnapshotCanvas = styled.canvas.withConfig({ displayName: "MultiChartSnapshotCanvas" }) `
	position: absolute;
	width: 100%;
	height: 100%;
`;
export const ChartMainAreaStyled = styled.div.withConfig({ displayName: "ChartMainAreaStyled" }) `
	height: 100%;
	display: flex;
	flex-flow: column;
	flex: 1;
	min-width: 0;
`;
export const MultiChartComponentStyled = styled.div.withConfig({ displayName: "MultiChartComponentStyled" }) `
	display: flex;
	height: 100%;
	position: relative;
	width: 100%;
`;
export const MultiChartChartStyled = styled.div.attrs(props => ({
    'data-maximized': props.maximized,
    'data-selected': props.selected,
})).withConfig({ displayName: "MultiChartChartStyled" }) `
	position: relative;
	${ChartContainerStyled} {
		border: 1px solid var(--main_chart-grid-line);
		border-left: 1px solid var(--main_chart-bg);
	}
	display: flex;
	flex-direction: column;
	min-width: 0;

	&[data-maximized='true'] {
		width: 100%;
		height: 100%;
		${ChartContainerStyled} {
			border-width: 0;
			border-top-width: 1px;
		}
		flex-basis: 100% !important;
	}

	${props => props.hidden &&
    css `
			display: none;
		`}

	&[data-selected='true'] {
		${ChartContainerStyled} {
			border-color: var(--main_chart-border-active);
		}
		z-index: 1;
	}
`;
const getContainerCssByLayout = (layout) => {
    switch (layout) {
        case '1x1':
            return css `
				${MultiChartChartStyled} {
					width: 100%;
					height: 100%;
				}
				${ChartContainerStyled} {
					border-top-width: 1px;
					border-width: 0;
				}
			`;
        case '1x2':
            return css `
				grid-template-columns: repeat(2, 1fr);
				grid-template-rows: 1fr;
			`;
        case '1x3':
            return css `
				grid-template-columns: repeat(3, 1fr);
				grid-template-rows: 1fr;
			`;
        case '2x1':
            return css `
				grid-template-columns: 1fr;
				grid-template-rows: repeat(2, 1fr);
			`;
        case '2x2':
            return css `
				grid-template-columns: repeat(2, 1fr);
				grid-template-rows: repeat(2, 1fr);
			`;
        case '3x1':
            return css `
				grid-template-columns: 1fr;
				grid-template-rows: repeat(3, 1fr);
			`;
    }
};
