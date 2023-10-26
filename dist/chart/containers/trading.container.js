import { createElement } from 'react';
import { context } from '../../context/context2';
import { namedMemo } from '../../utils/named-memo';
import { resolveComponentWithPredicate } from '../../utils/resolve-component-with-predicate.utils';
import { constNull } from 'fp-ts/function';
import { waitIdle } from '../../utils/browser-api.utils';
const TradingComponent = context.lazy(() => import(/* webpackChunkName: "trading" */ '../components/trading/trading.component'), constNull, waitIdle);
export const TradingContainer = context.combine(TradingComponent, context.key()('chartReactConfig'), (TradingComponent, chartReactConfig) => resolveComponentWithPredicate(chartReactConfig.trading.enabled, namedMemo('TradingContainer', () => createElement(TradingComponent, {}))));
