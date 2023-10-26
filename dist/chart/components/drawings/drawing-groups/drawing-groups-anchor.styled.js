import styled from 'styled-components';
import { SelectboxAnchor } from '../../../../chart-kit/Selectbox/SelectboxAnchor.component';
import { SelectboxAnchorCaretStyled, SelectboxAnchorContentStyled, SelectboxAnchorTextStyled, } from '../../../../chart-kit/Selectbox/SelectboxAnchor.styled';
export const DrawingGroupsAnchorStyled = styled(SelectboxAnchor).withConfig({ displayName: "DrawingGroupsAnchorStyled" }) `
	box-sizing: border-box;
	max-width: ${props => props.anchorMaxWidth};
	min-width: ${props => props.anchorMinWidth};
	height: 24px;
	border-radius: 4px;
	padding: var(--spacer-1);
	background-color: var(--main_chart-bg);
	color: var(--main_chart-value-text);
	font-size: var(--font-size-m);
	font-family: var(--font-main-semibold);

	${SelectboxAnchorContentStyled} {
		display: flex;
	}

	${SelectboxAnchorTextStyled} {
		text-align: start;
		flex-grow: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: ${props => props.textWidth};
	}

	${SelectboxAnchorCaretStyled} {
		span {
			margin-right: var(--spacer-05);
		}
	}

	&:hover {
		background-color: var(--dropdown-default-bg);
	}
`;
