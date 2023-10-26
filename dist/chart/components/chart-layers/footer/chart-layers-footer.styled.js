import styled from 'styled-components';
import { Button } from '../../../../chart-kit/Button/Button.component';
import { ButtonInnerStyled } from '../../../../chart-kit/Button/Button.styled';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { ifStyle } from '../../../../utils/styled.utils';
export const ChartLayersFooterContainer = styled.div.withConfig({ displayName: "ChartLayersFooterContainer" }) `
	display: flex;
	justify-content: space-between;
	padding: var(--spacer-1) var(--spacer-6);

	${props => ifStyle(props.showBorder) `
        border-top: 1px solid var(--dropdown-list_item-divider-bg);
    `}
`;
export const ChartLayersFooterIconWrapperStyled = styled(IconWrapper).withConfig({ displayName: "ChartLayersFooterIconWrapperStyled" }) `
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	color: var(--dropdown-list_item-selected-text);
	margin-right: var(--spacer-05);

	svg {
		width: auto;
		height: auto;
	}
`;
export const ChartLayersFooterButtonStyled = styled(Button).withConfig({ displayName: "ChartLayersFooterButtonStyled" }) `
	padding: var(--spacer-1);
	height: auto;
	min-width: auto;
	font-family: var(--font-main-semibold);
	font-size: var(--font-size-m);
	line-height: var(--line-height-m-px);
	color: var(--link-default-text);
	${ButtonInnerStyled} {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	&:hover {
		color: var(--link-default-text);

		${ChartLayersFooterIconWrapperStyled} {
			color: var(--link-default-text);
		}
	}
`;
