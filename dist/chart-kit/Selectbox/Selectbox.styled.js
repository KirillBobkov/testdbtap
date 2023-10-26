import styled from 'styled-components';
import { Menu } from '../Menu/Menu.component';
export const SelectboxMenuStyled = styled(Menu).withConfig({ displayName: "SelectboxMenuStyled" }) ``;
export const SelectboxItemContainerStyled = styled.div.withConfig({ displayName: "SelectboxItemContainerStyled" }) ``;
export const SelectboxItemTextStyled = styled.div.withConfig({ displayName: "SelectboxItemTextStyled" }) ``;
export const SelectboxPopoverContent = styled.div.withConfig({ displayName: "SelectboxPopoverContent" }) `
	height: 100%;
	display: flex;
	flex-direction: column;
`;
