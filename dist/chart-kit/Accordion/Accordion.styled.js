import styled from 'styled-components';
import { ifStyle } from '../../utils/styled.utils';
import { IconWrapper } from '../IconWrapper/IconWrapper.component';
export const ArrowStyled = styled(IconWrapper).withConfig({ displayName: "ArrowStyled" }) `
	cursor: pointer;
	transition: transform ease 0.3s;
	svg {
		transition: color ease-in 0.3s;
	}
	display: flex;
	align-items: center;
	justify-content: center;
	${props => ifStyle(props.isCollapsed) `
		transform: rotate(-180deg);
	`}
`;
export const AccordionContainerStyled = styled.div.attrs(props => ({
    'data-selected': props.isSelected,
    'data-hidden': props.isHidden,
    'data-no-animation': props.skipAnimation,
    'data-focused': props.isFocused,
})).withConfig({ displayName: "AccordionContainerStyled" }) `
	${props => ifStyle(props.skipAnimation) `
		${ArrowStyled} {
			transition: none;
		}
	`}
`;
export const AccordionWrapperContainerStyled = styled.div.withConfig({ displayName: "AccordionWrapperContainerStyled" }) `
	display: flex;
	align-items: center;
	justify-content: start;
`;
