import styled from 'styled-components';
export const ToolbarSeparatorStyled = styled.div.withConfig({ displayName: "ToolbarSeparatorStyled" }) `
	height: 20px;
	width: 1px;
	background-color: var(--main_chart-divider-default-bg);
	margin-top: 0;
	margin-bottom: 0;
	margin-left: var(--spacer-1);
	margin-right: var(--spacer-05);
`;
export const FullHeightToolbarSeparatorStyled = styled(ToolbarSeparatorStyled).withConfig({ displayName: "FullHeightToolbarSeparatorStyled" }) `
	height: 32px;
	margin-right: var(--spacer-1);
`;
