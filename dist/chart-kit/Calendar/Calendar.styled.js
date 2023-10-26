import styled from 'styled-components';
import { CalendarDayStyled } from './components/Day.styled';
import { ifStyle } from '../../utils/styled.utils';
export const CalendarContainerStyled = styled.div.withConfig({ displayName: "CalendarContainerStyled" }) `
	position: relative;
	display: inline-block;
	overflow: hidden;
	padding: var(--spacer-1) var(--spacer-2) 0;
	background-color: var(--dropdown-default-bg);
	user-select: none;
	cursor: default;
`;
export const CalendarContentStyled = styled.div.withConfig({ displayName: "CalendarContentStyled" }) `
	display: flex;
	width: 100%;
	white-space: nowrap;
`;
export const CalendarStyled = styled.div.withConfig({ displayName: "CalendarStyled" }) `
	display: inline-block;
	vertical-align: top;
`;
export const CalendarHeaderStyled = styled.div.withConfig({ displayName: "CalendarHeaderStyled" }) `
	color: var(--icon-disabled-default-bg);
	font-size: var(--font-size-s);
	margin-bottom: var(--spacer-1);
	border-bottom: 1px solid var(--dropdown-list_item-divider-bg);

	${CalendarDayStyled} {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 28px;
		width: 28px;
		line-height: calc(var(--line-height-xl) * 12);
	}
`;
export const CalendarBodyStyled = styled.div.withConfig({ displayName: "CalendarBodyStyled" }) `
	position: relative;
	font-size: var(--font-size-m);
	padding-bottom: var(--spacer-1);

	${props => ifStyle(props.isFadeVisible) `
    &:before {
      pointer-events: all;
      opacity: 1;
    }
  `}
	${CalendarStyled} {
		position: relative;
	}
`;
export const MonthScrollableContent = styled.div.withConfig({ displayName: "MonthScrollableContent" }) `
	height: 300px;
`;
