import styled from 'styled-components';
import { ifStyle } from '../../../utils/styled.utils';
export const MonthsStyled = styled.div.withConfig({ displayName: "MonthsStyled" }) `
	color: var(--dropdown-list_item-selected-text);
	border-top: 1px solid var(--dropdown-list_item-divider-bg);
	padding-top: var(--spacer-2);
	margin: var(--spacer-2) var(--spacer-1) var(--spacer-1);
	pointer-events: none;
	${props => ifStyle(props.isFirst) `border-top: 0;`}
	${props => ifStyle(props.isSingleLine) `
  	position: relative;
  `}
`;
