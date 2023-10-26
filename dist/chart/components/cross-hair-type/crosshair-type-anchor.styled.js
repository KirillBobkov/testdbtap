import styled, { css } from 'styled-components';
import { SelectboxAnchor } from '../../../chart-kit/Selectbox/SelectboxAnchor.component';
import { SelectboxAnchorCaretStyled, SelectboxAnchorTextStyled, SelectboxAnchorContentStyled, SelectboxAnchorStyled, } from '../../../chart-kit/Selectbox/SelectboxAnchor.styled';
export const CrosshairTypeAnchorStyled = styled(SelectboxAnchor).withConfig({ displayName: "CrosshairTypeAnchorStyled" }) `
	${SelectboxAnchorStyled} {
		min-width: 50px;
		width: 50px;
	}

	${SelectboxAnchorStyled}:before {
		border-top-color: var(--dropdown-border-inside-top-color);
		border-bottom-color: var(--dropdown-border-inside-bottom-color);
		border-left-color: var(--dropdown-border-inside-side-color);
		border-right-color: var(--dropdown-border-inside-side-color);
	}

	${props => props.caretIcon &&
    css `
			${SelectboxAnchorCaretStyled} {
				width: 3px;
				height: 3px;
				color: var(--icon-secondary-default-bg);
			}
		`}

	${SelectboxAnchorTextStyled} {
		min-width: 20px;
		white-space: nowrap;
		height: 20px;
		display: flex;
		align-items: center;
		color: var(--icon-primary-default-bg);
	}

	${SelectboxAnchorContentStyled} {
		width: 37px;
	}
`;
