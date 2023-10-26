import styled from 'styled-components';
import { ifStyle } from '../../../utils/styled.utils';
import { ButtonIconStyled, IconStyled } from '../../Button/ButtonIcon.styled';
import { IconWrapperStyled } from '../../IconWrapper/IconWrapper.styled';
import { ButtonInnerStyled } from '../../Button/Button.styled';
export const ArrowsStyled = styled.div.withConfig({ displayName: "ArrowsStyled" }) `
	flex: 1;
	width: 21px;
	height: 18px;
`;
export const ArrowsContainerStyled = styled.div.withConfig({ displayName: "ArrowsContainerStyled" }) `
	position: relative;
	width: 100%;
	height: 100%;
`;
export const ArrowsButtonContainerStyled = styled.div.withConfig({ displayName: "ArrowsButtonContainerStyled" }) `
	position: absolute;
	height: 9px;
	width: 100%;
	top: auto;
	bottom: var(--spacer-2);

	${ButtonIconStyled}, ${IconWrapperStyled}, ${IconStyled}, ${ButtonInnerStyled} {
		height: 100%;
		min-width: 40px;
		width: 40px;
	}

	${props => ifStyle(props.isDisabled) `
	  cursor: no-drop;
    ${ButtonIconStyled} {
      opacity: 0.3;
    }
  `}

	&:hover {
		&:nth-of-type(1) {
			transform: translateY(2px);
		}
		border-bottom: 1px solid var(--dropdown-list_item-divider-bg);
		${props => ifStyle(props.isDisabled) `
		background: var(--button-tertiaty-pressed);
	`}
	}

	&:first-child {
		top: var(--spacer-05);
	}

	&:first-child:hover {
		top: 0;
		border-radius: 6px;
	}

	&:last-child {
		bottom: auto;
		top: var(--spacer-3);
	}

	&:last-child:hover {
		border-radius: 6px;
		border-bottom: 0;
	}
`;
