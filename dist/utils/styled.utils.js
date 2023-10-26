import { constant } from 'fp-ts/function';
import { css } from 'styled-components';
/**
 * Use in SC to render styles based on condition.
 * @param condition
 * @doc-tags utility,styling
 */
export const ifStyle = (condition = false) => (condition ? css : constant(''));
