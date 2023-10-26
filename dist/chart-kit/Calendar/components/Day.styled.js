import styled from 'styled-components';
import { ifStyle } from '../../../utils/styled.utils';
import { ButtonStyled as ButtonContainer } from '../../Button/Button.styled';
import { ButtonStyled } from '../../Button/default/Button.styled';
export const DayWrapperStyled = styled.div.withConfig({ displayName: "DayWrapperStyled" }) `
	width: 27px;
	height: 23px;
	margin-right: var(--spacer-05);
	${props => ifStyle(props.disabled) `cursor: no-drop;`}
`;
export const CalendarDayStyled = styled.div.withConfig({ displayName: "CalendarDayStyled" }) `
	width: 100%;
	height: 100%;
	font-size: var(--font-size-s);
	min-width: 0;
	text-align: center;
	border-color: transparent;

	&:not(:last-child) {
		margin-right: var(--spacer-05);
	}
`;
export const CalendarDayButtonStyled = styled(CalendarDayStyled).withConfig({ displayName: "CalendarDayButtonStyled" }) `
	${ButtonContainer}, ${ButtonStyled} {
		min-width: 27px;
		height: 23px;
		line-height: var(--line-height-m);
		font-size: var(--font-size-m);
		padding: var(--spacer-1) 0;
		color: var(--dropdown-list_item-default-text);
		border: 1px solid transparent;
		border-radius: 1px;
		transition: none;

		&:hover {
			background-color: var(--dropdown-list_item-hovered-bg);
		}

		&:active {
			background-color: var(--dropdown-list_item-selected-text);
			padding-top: 0;
			padding-bottom: 0;
		}

		${props => ifStyle(props.isSelected) `
  		color: var(--dropdown-list_item-selected-text);
  	`};

		&[disabled],
		[disabled]:hover,
		[disabled]:active {
			color: var(--dropdown-list_item-default-text);
			border-color: transparent;
			background-color: transparent;
		}

		${props => ifStyle(props.isHidden) `
  	&[disabled],:hover,[disabled]:hover,:active,[disabled]:active {
  		color: transparent;
		border-color: transparent;
		background-color: transparent;
  	}
  `};

		${props => ifStyle(props.isCurrent) `
  	border-color: var(--dropdown-list_item-disabled-text);
  	&[disabled],:hover,[disabled]:hover,:active,[disabled]:active {
  		border-color: var(--dropdown-list_item-disabled-text);
  	}
  `};
	}
`;
