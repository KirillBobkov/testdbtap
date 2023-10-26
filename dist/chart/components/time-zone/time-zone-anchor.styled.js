import styled from 'styled-components';
import { Button } from '../../../chart-kit/Button/Button.component';
export const TimeZoneAnchorButtonStyled = styled(Button).withConfig({ displayName: "TimeZoneAnchorButtonStyled" }) `
	box-sizing: border-box;
	width: 100%;
	min-width: 100%;
	height: 24px;
	border-radius: 4px;
	font-size: var(--font-size-m);
	text-align: left;
	padding-left: var(--spacer-1);
	padding-right: var(--spacer-1);
	background-color: var(--main_chart-bg);
	color: var(--main_chart-value-text);
	font-family: var(--font-main-semibold);

	&:hover {
		background-color: var(--dropdown-default-bg);
	}
`;
