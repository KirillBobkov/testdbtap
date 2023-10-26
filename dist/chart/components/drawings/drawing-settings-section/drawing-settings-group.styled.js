import styled from 'styled-components';
import { DrawingSettingsItemStyled } from './drawing-settings-item.styled';
import { ifStyle } from '../../../../utils/styled.utils';
export const DrawingSettingsGroupStyled = styled.div.withConfig({ displayName: "DrawingSettingsGroupStyled" }) `
	display: flex;
	flex-direction: row;
	align-items: ${props => (props.vertical ? 'flex-start' : 'center')};
	justify-content: 'flex-start';
	margin-bottom: ${props => (props.disableBotMargin ? '0' : 'var(--spacer-3)')};

	${props => ifStyle(props.vertical) `
		flex-direction: column;

		${DrawingSettingsItemStyled} {
			margin-bottom: var(--spacer-2);
		}
	`}

	${props => ifStyle(props.noGap) `
		margin-bottom: 0;
	`};

	${props => ifStyle(props.noGapItems) `
		${DrawingSettingsItemStyled} {
			margin-bottom: 0;
		}
	`}
`;
export const DrawingSettingsGroupLabelStyled = styled.div.withConfig({ displayName: "DrawingSettingsGroupLabelStyled" }) `
	margin-bottom: var(--spacer-2);
`;
export const DrawingSettingsGroupWrapperStyled = styled.div.withConfig({ displayName: "DrawingSettingsGroupWrapperStyled" }) `
	display: flex;
	flex-direction: column;
`;
