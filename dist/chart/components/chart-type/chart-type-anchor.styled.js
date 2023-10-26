import styled, { css } from 'styled-components';
import { SelectboxAnchorStyled, SelectboxAnchorCaretStyled, SelectboxAnchorTextStyled, } from '../../../chart-kit/Selectbox/SelectboxAnchor.styled';
import { SelectboxAnchor } from '../../../chart-kit/Selectbox/SelectboxAnchor.component';
export const ChartTypeAnchorStyled = styled(SelectboxAnchor).withConfig({ displayName: "ChartTypeAnchorStyled" }) `
	${SelectboxAnchorStyled} {
		min-width: 50px;
		width: 50px;
		color: var(--dropdown-default-text-color);
		border-color: var(--dropdown-border-outside-color);
		background-color: var(--button-tertiary-default);
	}

	${SelectboxAnchorStyled}:before {
		border-top-color: var(--dropdown-border-inside-top-color);
		border-bottom-color: var(--dropdown-border-inside-bottom-color);
		border-left-color: var(--dropdown-border-inside-side-color);
		border-right-color: var(--dropdown-border-inside-side-color);
	}

	${SelectboxAnchorTextStyled} {
		color: var(--icon-primary-default-bg);
	}

	${props => props.caretIcon &&
    css `
			${SelectboxAnchorCaretStyled} {
				width: 3px;
				height: 3px;
				color: var(--icon-secondary-default-bg);
			}
		`}
`;
