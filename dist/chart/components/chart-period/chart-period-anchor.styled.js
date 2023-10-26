import styled, { css } from 'styled-components';
import { ButtonInnerStyled } from '../../../chart-kit/Button/Button.styled';
import { SelectboxAnchorStyled, SelectboxAnchorCaretStyled, SelectboxAnchorTextStyled, } from '../../../chart-kit/Selectbox/SelectboxAnchor.styled';
import { PeriodAnchor } from './chart-period-anchor.component';
export const ChartPeriodAnchorStyled = styled(PeriodAnchor).withConfig({ displayName: "ChartPeriodAnchorStyled" }) `
	border-radius: var(--spacer-1);
	min-width: 24px;
	height: 24px;
	width: auto;
	color: var(--button-tertiaty-default-text);
	background-color: var(--main_chart-bg);
	margin-right: var(--spacer-1);
	padding: 0;

	${props => props.caretIcon &&
    css `
			${SelectboxAnchorCaretStyled} {
				color: var(--icon-secondary-default-bg);
				width: 3px;
				height: 3px;
			}
		`}

	${props => props.isOpened &&
    css `
			background-color: var(--dropdown-list_item-hovered-bg);
		`}
			
			&:hover {
		background-color: var(--dropdown-list_item-hovered-bg);
	}

	${ButtonInnerStyled} {
		width: unset;
		height: unset;
	}

	${SelectboxAnchorStyled} {
		min-width: 24px;
		width: auto;
	}

	${SelectboxAnchorStyled}:before {
		border-top-color: var(--dropdown-border-inside-top-color);
		border-bottom-color: var(--dropdown-border-inside-bottom-color);
		border-left-color: var(--dropdown-border-inside-side-color);
		border-right-color: var(--dropdown-border-inside-side-color);
	}

	${SelectboxAnchorTextStyled} {
		min-width: 24px;
		white-space: nowrap;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--icon-primary-default-bg);
	}
`;
